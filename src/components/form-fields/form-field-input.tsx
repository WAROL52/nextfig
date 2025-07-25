"use client";

import {
    Control,
    FieldPath,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";

import { ReactNode } from "react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export type FormFieldInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<"input">, "name" | "form"> & {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    name: TName;
    label: ReactNode;
    required?: boolean;
};

export function FormFieldInput<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    form,
    name,
    label,
    required,
    ...props
}: FormFieldInputProps<TFieldValues, TContext, TTransformedValues, TName>) {
    return (
        <FormField<TFieldValues, TName>
            control={
                form.control as unknown as Control<
                    TFieldValues,
                    any,
                    TFieldValues
                >
            }
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...props}
                            required={required}
                            value={field.value}
                            onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val);
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
