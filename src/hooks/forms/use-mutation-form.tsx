"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    DefaultError,
    UseMutationOptions,
    useMutation,
} from "@tanstack/react-query";
import { AlertCircleIcon } from "lucide-react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    return {
        ...result,
        isSubmitting: isPending,
        form,
        onSubmitForm: form.handleSubmit(async (data) => {
            return result.mutateAsync(data);
        }),
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
    };
}
function getMessageError(error: NonNullable<DefaultError>) {
    if (error.message) {
        return error.message;
    }

    return "An unexpected error occurred. Please try again later.";
}
