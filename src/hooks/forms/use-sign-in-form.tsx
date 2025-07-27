"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { authClient } from "@/lib/auth-client";

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
    callbackURL = "/profile",
}: UseSignInFormProps = {}) {
    const router = useRouter();
    const [isSubmitting, startSubmitting] = useTransition();
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });
    return {
        form,
        isSubmitting,
        onSubmit: form.handleSubmit(async (data) => {
            startSubmitting(async () => {
                await authClient.signIn.email({
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
            });
        }),
    };
}
