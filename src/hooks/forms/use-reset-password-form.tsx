"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { authSchema } from "@/schemas/auth.schema";
import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export type UseResetPasswordFormProps = {
    token?: string;
};

export function useResetPasswordForm({
    token,
}: UseResetPasswordFormProps = {}) {
    const router = useRouter();
    return useMutationForm(authSchema.resetPassword, {
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
