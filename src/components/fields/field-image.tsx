"use client";

import { X } from "lucide-react";
import { FieldPath, FieldValues } from "react-hook-form";

import Image from "next/image";
import { ComponentProps, useState } from "react";

import { createFormFieldComponent } from "@/lib/create-field-component";

import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const FieldImage = createFormFieldComponent<
    React.ComponentProps<typeof Input>
>(({ FormLabelWithExtra, props }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [value, setValue] = useState<string | undefined>(undefined);

    return {
        render: ({ field, fieldProps }) => (
            <FormItem className="w-full">
                <FormLabelWithExtra />
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
                                {...fieldProps}
                                accept="image/*"
                                value={value}
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
                                    console.log(file);
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
        ),
    };
});

export type FieldImageProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ComponentProps<
    typeof FieldImage<TFieldValues, TContext, TTransformedValues, TName>
>;
