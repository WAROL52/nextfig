"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signUp } from "@/lib/auth-client";
import { convertFileToBase64 } from "@/lib/utils";

export const formSchema = z
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
    });

export type useSignUpFormProps = {
    callbackURL?: string;
};

export function useSignUpForm({ callbackURL = "/" }: useSignUpFormProps = {}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    async function onSubmit({
        firstName,
        email,
        lastName,
        password,
        image,
    }: z.infer<typeof formSchema>) {
        await signUp.email({
            email,
            firstName,
            lastName,
            password,
            name: `${firstName} ${lastName}`,
            image: image ? await convertFileToBase64(image) : "",
            callbackURL: callbackURL,
            fetchOptions: {
                onResponse: () => {
                    setLoading(false);
                },
                onRequest: () => {
                    setLoading(true);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: async () => {
                    router.push(callbackURL);
                },
            },
        });
    }
    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting: loading,
    };
}
