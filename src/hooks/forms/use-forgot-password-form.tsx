"use client";

import { authClient } from "@/lib/auth-client";

import { authSchema } from "@/schemas/auth.schema";
import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export type UseForgotPasswordFormProps = {};

export function useForgotPasswordForm({}: UseForgotPasswordFormProps = {}) {
    return useMutationForm(authSchema.forgotPassword, {
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
