"use client";

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

export type FieldInputProps = ComponentProps<typeof FieldInput>;
