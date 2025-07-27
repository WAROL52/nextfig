"use client";

import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { FormLabel } from "../ui/form";

export type FieldLabelProps = {
    label: ReactNode;
    required?: boolean;
    extra?: ReactNode;
} & ComponentProps<typeof FormLabel>;

export function FieldLabel({
    label,
    required,
    extra,
    ...props
}: FieldLabelProps) {
    return (
        <FormLabel
            {...props}
            className={cn("flex w-full justify-between", props.className)}
        >
            <div>
                {label}
                {required && <span style={{ color: "red" }}>*</span>}
            </div>
            <div>{extra}</div>
        </FormLabel>
    );
}
