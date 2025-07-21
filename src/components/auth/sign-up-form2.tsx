"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export interface ActionResponse<T = any> {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof T]?: string[];
    };
    inputs?: T;
}
export const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    image: z.string().optional(),
});

const initialState = {
    success: false,
    message: "",
};

export function DraftForm() {
    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(
            async () =>
                await signUp.email({
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    birthDate: new Date(),
                    password: values.password,
                    name: `${values.firstName} ${values.lastName}`,
                    image: image ? await convertImageToBase64(image) : "",
                    callbackURL: "/dashboard",
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
                            router.push("/dashboard");
                        },
                    },
                })
        );
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-md border p-2 md:p-5"
                >
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <p className="text-base">
                        Enter your information to create an account
                    </p>

                    <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap"></div>

                    <div className="flex w-full items-center justify-end pt-3">
                        <Button className="rounded-lg" size="sm">
                            {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
