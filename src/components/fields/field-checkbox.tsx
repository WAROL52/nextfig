"use client";

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

export type FieldCheckboxProps = ComponentProps<typeof FieldCheckbox>;
