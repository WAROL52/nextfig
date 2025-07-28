"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    DefaultError,
    UseMutationOptions,
    useMutation,
} from "@tanstack/react-query";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import z from "zod";

import { ComponentProps, ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
    FieldCheckbox,
    FieldCheckboxProps,
} from "@/components/fields/field-checkbox";
import { FieldImage, FieldImageProps } from "@/components/fields/field-image";
import { FieldInput, FieldInputProps } from "@/components/fields/field-input";

type AsyncDefaultValues<TFieldValues> = (
    payload?: unknown
) => Promise<TFieldValues>;

export type UseMutationFormProps<
    Z extends z.ZodType<any, any>,
    TData = unknown,
    TError = NonNullable<DefaultError>,
    TVariables extends FieldValues = z.infer<Z>,
    TContext = unknown,
> = Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
> & {
    defaultValues?: DefaultValues<TVariables> | AsyncDefaultValues<TVariables>;
    onSubmit: (data: z.infer<Z>) => Promise<TData>;
    name: string;
};

export function useMutationForm<
    Z extends z.ZodType<any, any>,
    TData = unknown,
    TError = NonNullable<DefaultError>,
    TVariables extends FieldValues = z.infer<Z>,
    TContext = unknown,
>(
    schema: Z,
    option: UseMutationFormProps<Z, TData, TError, TVariables, TContext>
) {
    const { defaultValues, onSubmit, name, ...mutationOptions } = option;
    const { isPending, ...result } = useMutation<
        TData,
        TError,
        TVariables,
        TContext
    >({
        ...mutationOptions,
        mutationKey: mutationOptions.mutationKey || [name],
        mutationFn: async (variables: TVariables) => {
            const data = schema.parse(variables);
            return onSubmit(data);
        },
    });
    const form = useForm<TVariables>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    const handleSubmit = form.handleSubmit(async (data) => {
        return result.mutateAsync(data);
    });
    return {
        ...result,
        isSubmitting: isPending,
        form,
        onSubmitForm: handleSubmit,
        alertError: result.error ? (
            <Alert variant="destructive" className="mb-4">
                <AlertCircleIcon />
                <AlertTitle>{name} Error</AlertTitle>
                <AlertDescription>
                    <p>
                        {getMessageError(
                            result.error as unknown as NonNullable<DefaultError>
                        )}
                    </p>
                </AlertDescription>
            </Alert>
        ) : null,
        FormComponent: function FormComponent(props: ComponentProps<"form">) {
            const { children, onSubmit, ...rest } = props;
            return (
                <Form {...form}>
                    <form
                        {...rest}
                        onSubmit={(e) => {
                            if (onSubmit) {
                                onSubmit(e);
                            } else {
                                handleSubmit(e);
                            }
                        }}
                        {...rest}
                    >
                        {children}
                    </form>
                </Form>
            );
        },
        Field: {
            Input: function FieldInputComponent(
                props: Omit<FieldInputProps<z.infer<Z>>, "form">
            ) {
                return <FieldInput {...props} form={form} />;
            },
            Checkbox: function FieldCheckboxComponent(
                props: Omit<FieldCheckboxProps<z.infer<Z>>, "form">
            ) {
                return <FieldCheckbox {...props} form={form} />;
            },
            Image: function FieldImageComponent(
                props: Omit<FieldImageProps<z.infer<Z>>, "form">
            ) {
                return <FieldImage {...props} form={form} />;
            },
            Submit: function FieldSubmitComponent({
                loadingText,
                ...props
            }: Omit<
                React.ComponentProps<typeof Button>,
                "type" | "disabled"
            > & {
                disabled?: boolean;
                loadingText?: ReactNode;
            }) {
                let children = props.children || name;
                if (form.formState.isSubmitting && loadingText)
                    children = loadingText;
                return (
                    <Button
                        type="submit"
                        disabled={props.disabled || form.formState.isSubmitting}
                        {...props}
                    >
                        {form.formState.isSubmitting && (
                            <Loader2 size={16} className="animate-spin" />
                        )}
                        {children}
                    </Button>
                );
            },
        },
    };
}
function getMessageError(error: NonNullable<DefaultError>) {
    if (error.message) {
        return error.message;
    }

    return "An unexpected error occurred. Please try again later.";
}
