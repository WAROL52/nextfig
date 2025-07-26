"use client";

import { ReactNode } from "react";

import { FormLabel } from "../ui/form";

export type FormFieldLabelProps = {
    label: ReactNode;
    required?: boolean;
    extra?: ReactNode;
};

export function FormFieldLabel({
    label,
    required,
    extra,
}: FormFieldLabelProps) {
    return (
        <FormLabel className="flex w-full justify-between">
            <div>
                {label}
                {required && <span style={{ color: "red" }}>*</span>}
            </div>
            <div>{extra}</div>
        </FormLabel>
    );
}
