"use client";

import { toast } from "sonner";
import z from "zod";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
    rememberMe: z.boolean().optional(),
});
export type SignInFormData = z.infer<typeof signInFormSchema>;

export type UseSignInFormProps = {
    callbackURL?: string;
};

export function useSignInForm({
    callbackURL = urlLinks.account.href,
}: UseSignInFormProps = {}) {
    const router = useRouter();
    return useMutationForm(signInFormSchema, {
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
