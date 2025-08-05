"use client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { authSchema } from "@/schemas/auth.schema";
import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export type UseSignInFormProps = {
    callbackURL?: string;
};

export function useSignInForm({
    callbackURL = urlLinks.account.url,
}: UseSignInFormProps = {}) {
    const router = useRouter();
    return useMutationForm(authSchema.signIn, {
        name: "sign-in",
        onSubmit: async (data) => {
            const response = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: data.rememberMe,
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
