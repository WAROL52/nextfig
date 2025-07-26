"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
    Control,
    FieldPath,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";

import { ReactNode } from "react";

import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FormFieldLabel } from "./form-field-label";

export type FormFieldCheckboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    "name" | "form"
> & {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    name: TName;
    label: ReactNode;
    required?: boolean;
    extra?: ReactNode;
};

export function FormFieldCheckbox<
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
}: FormFieldCheckboxProps<TFieldValues, TContext, TTransformedValues, TName>) {
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
                <FormItem className="flex w-full items-center gap-2">
                    <FormControl>
                        <Checkbox
                            {...props}
                            checked={field.value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (props.onCheckedChange) {
                                    props.onCheckedChange(checked);
                                }
                                return checked;
                            }}
                        />
                    </FormControl>
                    <FormFieldLabel
                        label={label}
                        required={required}
                        extra={props.extra}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
