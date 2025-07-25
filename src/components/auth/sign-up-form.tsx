"use client";

import { Loader2 } from "lucide-react";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useSignUpForm } from "@/hook-forms/use-sign-up-form";

import { FormFieldImage } from "../form-fields/form-field-image";
import { FormFieldInput } from "../form-fields/form-field-input";
import { Form } from "../ui/form";

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

export type SignUpFormProps = {};

export function SignUpForm({}: SignUpFormProps) {
    const { form, onSubmit, isSubmitting } = useSignUpForm();

    return (
        <div>
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <Card className="z-50 max-w-lg rounded-md">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl">
                                Sign Up
                            </CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Enter your information to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <FormFieldInput
                                            form={form}
                                            type="text"
                                            name="firstName"
                                            label="First name"
                                            placeholder="Max"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormFieldInput
                                            form={form}
                                            type="text"
                                            name="lastName"
                                            label="Last name"
                                            placeholder="Robinson"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <FormFieldInput
                                        form={form}
                                        type="email"
                                        name="email"
                                        label="Email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormFieldInput
                                        form={form}
                                        type="password"
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormFieldInput
                                        form={form}
                                        type="password"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormFieldImage
                                        form={form}
                                        name="image"
                                        label="Profile Image (optional)"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        "Create an account"
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="grid gap-6">
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-background text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <Button variant="outline" className="w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with GitHub
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}

async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
