"use client";

import { FieldPath, FieldValues } from "react-hook-form";

import { ComponentProps } from "react";

import { createFormFieldComponent } from "@/lib/create-field-component";

import { Checkbox } from "../ui/checkbox";
import { FormControl, FormItem, FormMessage } from "../ui/form";

export const FieldCheckbox = createFormFieldComponent<
    React.ComponentProps<typeof Checkbox>
>(({ FormLabelWithExtra, props }) => ({
    render: ({ field, fieldProps }) => (
        <FormItem className="flex w-full items-center gap-2">
            <FormControl>
                <Checkbox
                    {...fieldProps}
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
            <FormLabelWithExtra />
            <FormMessage />
        </FormItem>
    ),
}));

export type FieldCheckboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ComponentProps<
    typeof FieldCheckbox<TFieldValues, TContext, TTransformedValues, TName>
>;
