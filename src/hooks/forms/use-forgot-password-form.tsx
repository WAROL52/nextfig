"use client";

import z from "zod";

import { authClient } from "@/lib/auth-client";

import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export type UseForgotPasswordFormProps = {};

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export function useForgotPasswordForm({}: UseForgotPasswordFormProps = {}) {
    return useMutationForm(forgotPasswordSchema, {
        name: "Reset Password",
        onSubmit: async ({ email }) => {
            const redirectTo =
                window.location.origin + urlLinks.resetPassword.url;

            const response = await authClient.requestPasswordReset({
                email: email, // required
                redirectTo: redirectTo, // optional
            });
            if (response.error) {
                throw response.error;
            }
            return response;
        },
    });
}
