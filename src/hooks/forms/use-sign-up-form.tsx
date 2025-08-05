"use client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { signUp } from "@/lib/auth-client";
import { convertFileToBase64 } from "@/lib/utils";

import { authSchema } from "@/schemas/auth";
import { urlLinks } from "@/url-links";

import { useMutationForm } from "./use-mutation-form";

export type useSignUpFormProps = {
    callbackURL?: string;
};

export function useSignUpForm({
    callbackURL = urlLinks.account.url,
}: useSignUpFormProps = {}) {
    const router = useRouter();
    return useMutationForm(authSchema.signUp, {
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
