"use client";

import z from "zod";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export const resetPasswordSchema = z
    .object({
        token: z.string().min(6, "Token is required"),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type UseResetPasswordFormProps = {
    token?: string;
};

export function useResetPasswordForm({
    token,
}: UseResetPasswordFormProps = {}) {
    const router = useRouter();
    return useMutationForm(resetPasswordSchema, {
        defaultValues: {
            token,
        },
        name: "Reset Password",
        mutationKey: ["reset-password", token],
        async onSubmit(data) {
            const response = await authClient.resetPassword({
                token: data.token,
                newPassword: data.password,
            });
            if (response.error) {
                throw response.error;
            }
            router.push(urlLinks.signIn.url);
            return response;
        },
    });
}
