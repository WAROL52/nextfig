"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { signUp } from "@/lib/auth-client";
import { convertFileToBase64 } from "@/lib/utils";

export const signUpFormSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string().min(7),
        confirmPassword: z.string(),
        image: z.instanceof(File).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine(
        (data) => (data.image ? data.image.size <= 2 * 1024 * 1024 : true),
        {
            message: "Image size must be less than 2MB",
            path: ["image"],
        }
    );

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export type useSignUpFormProps = {
    callbackURL?: string;
};

export function useSignUpForm({
    callbackURL = "/profile",
}: useSignUpFormProps = {}) {
    const router = useRouter();
    const [isSubmitting, startSubmitting] = useTransition();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {},
    });

    return {
        form,
        isSubmitting,
        onSubmit: form.handleSubmit((formData: SignUpFormData) =>
            startSubmitting(async () => {
                await signUp.email({
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: formData.password,
                    name: `${formData.firstName} ${formData.lastName}`,
                    image: formData.image
                        ? await convertFileToBase64(formData.image)
                        : "",
                    fetchOptions: {
                        redirect: "manual",
                        onError: (ctx) => {
                            toast.error(ctx.error.message);
                        },
                        onSuccess: async () => {
                            router.push(callbackURL);
                        },
                    },
                });
            })
        ),
    };
}
