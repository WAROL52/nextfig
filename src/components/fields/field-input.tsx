"use client";

import { FieldPath, FieldValues } from "react-hook-form";

import { ComponentProps } from "react";

import { createFormFieldComponent } from "@/lib/create-field-component";

import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const FieldInput = createFormFieldComponent<
    React.ComponentProps<typeof Input>
>(({ FormLabelWithExtra }) => ({
    render: ({ field, fieldProps }) => (
        <FormItem className="w-full">
            <FormLabelWithExtra />
            <FormControl>
                <Input
                    {...fieldProps}
                    value={field.value}
                    onChange={(e) => {
                        field.onChange(e.target.value);
                        if (fieldProps.onChange) {
                            fieldProps.onChange(e);
                        }
                    }}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    ),
}));

export type FieldInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ComponentProps<
    typeof FieldInput<TFieldValues, TContext, TTransformedValues, TName>
>;
