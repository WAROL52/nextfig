"use client";

import { toast } from "sonner";
import z from "zod";

import { useRouter } from "next/navigation";

import { signUp } from "@/lib/auth-client";
import { convertFileToBase64 } from "@/lib/utils";

import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export const signUpFormSchema = z
    .object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(7),
        confirmPassword: z.string().min(7),
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
    callbackURL = urlLinks.account.url,
}: useSignUpFormProps = {}) {
    const router = useRouter();
    return useMutationForm(signUpFormSchema, {
        name: "Create an account",
        onSubmit: async (data) => {
            const response = await signUp.email({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                name: `${data.firstName} ${data.lastName}`,
                image: data.image ? await convertFileToBase64(data.image) : "",
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
            if (response.error) {
                throw response.error;
            }
            return response;
        },
    });
}
