"use client";

import { X } from "lucide-react";
import {
    Control,
    FieldPath,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";

import Image from "next/image";
import { ReactNode, useState } from "react";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldLabel } from "./form-field-label";

export type FormFieldImageProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<"input">, "name" | "form" | "type"> & {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    name: TName;
    label: ReactNode;
    required?: boolean;
    extra?: ReactNode;
};

export function FormFieldImage<
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
}: FormFieldImageProps<TFieldValues, TContext, TTransformedValues, TName>) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [value, setValue] = useState<string | undefined>(undefined);
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
                    <FormFieldLabel
                        label={label}
                        required={required}
                        extra={props.extra}
                    />
                    <FormControl>
                        <div className="flex items-end gap-4">
                            {imagePreview && (
                                <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                                    <Image
                                        src={imagePreview}
                                        alt="Profile preview"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            )}
                            <div className="flex w-full items-center gap-2">
                                <Input
                                    accept="image/*"
                                    {...props}
                                    required={required}
                                    value={props.value || value}
                                    type="file"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue(val);

                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setImagePreview(
                                                    reader.result as string
                                                );
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                        field.onChange(file);
                                        if (props.onChange) {
                                            props.onChange(e);
                                        }
                                    }}
                                />
                                {imagePreview && (
                                    <X
                                        className="cursor-pointer"
                                        onClick={() => {
                                            field.onChange(undefined);
                                            setImagePreview(null);
                                            setValue("");
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
