"use client";

import {
    Control,
    ControllerProps,
    FieldPath,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";

import { ComponentProps, ReactElement, ReactNode } from "react";

import { FormField, FormLabel } from "@/components/ui/form";

import { FieldLabel } from "@/components/fields/field-label";

export type FormFieldProps<
    P extends Record<any, any>,
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<P, "name" | "form"> & {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    name: TName;
    label: ReactNode;
    required?: boolean;
    extra?: ReactNode;
};
export type createFormFieldComponentProps<T extends Record<any, any>> = {
    render: (props: T) => ReactNode;
};
export type FormFieldInputHook<P extends Record<any, any>> = <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: FormFieldProps<
        {},
        TFieldValues,
        TContext,
        TTransformedValues,
        TName
    > & {
        props: Omit<
            FormFieldProps<
                P,
                TFieldValues,
                TContext,
                TTransformedValues,
                TName
            >,
            "name" | "form" | "label" | "extra" | "required"
        >;
        FormLabelWithExtra: (
            props: Omit<ComponentProps<typeof FormLabel>, "children">
        ) => ReactNode;
    }
) => {
    render: (
        props: ComponentProps<
            ControllerProps<TFieldValues, TName>["render"]
        > & {
            fieldProps: Omit<
                FormFieldProps<
                    P,
                    TFieldValues,
                    TContext,
                    TTransformedValues,
                    TName
                >,
                "name" | "form" | "label" | "extra" | "required"
            >;
        }
    ) => ReactElement;
};
type MinimalProps = Record<any, any>;

export function createFormFieldComponent<P extends MinimalProps>(
    useProps: FormFieldInputHook<P>
) {
    return function FieldComponent<
        TFieldValues extends FieldValues = FieldValues,
        TContext = any,
        TTransformedValues = TFieldValues,
        TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    >(
        props: FormFieldProps<
            P,
            TFieldValues,
            TContext,
            TTransformedValues,
            TName
        >
    ) {
        const { form, label, name, extra, required, ...componentProps } = props;
        const { render } = useProps({
            form,
            label,
            name,
            extra,
            required,
            FormLabelWithExtra(props) {
                return (
                    <FieldLabel
                        {...props}
                        label={label}
                        required={required}
                        extra={extra}
                    />
                );
            },
            props: componentProps,
        });
        return (
            <FormField<TFieldValues, TName>
                control={
                    props.form.control as unknown as Control<
                        TFieldValues,
                        any,
                        TFieldValues
                    >
                }
                name={props.name}
                render={({ field, fieldState, formState }) =>
                    render({
                        fieldProps: {
                            ...componentProps,
                            ref: field.ref,
                            name: name,
                            disabled:
                                componentProps.disabled ||
                                formState.isSubmitting ||
                                field.disabled,
                            required: required,

                            onBlur: (e: any) => {
                                field.onBlur();
                                if (componentProps.onBlur) {
                                    componentProps.onBlur(e);
                                }
                            },
                        },
                        field,
                        fieldState,
                        formState,
                    })
                }
            />
        );
    };
}
