"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useForgotPasswordForm } from "@/hooks/forms/use-forgot-password-form";

export type ForgotPasswordFormProps = {};

export function ForgotPasswordForm({}: ForgotPasswordFormProps) {
    const { Field, FormComponent, alertError, data } = useForgotPasswordForm();
    if (data?.data.status)
        return (
            <Card className="max-w-md">
                <CardContent>
                    <p className="text-center text-sm">
                        If an account with that email exists, we have sent you
                        instructions to reset your password.
                    </p>
                </CardContent>
            </Card>
        );

    return (
        <FormComponent>
            <Card className="max-w-md">
                <CardHeader>
                    {alertError}
                    <CardTitle className="text-lg md:text-xl">
                        Forgot Password
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        We&apos;ll send you instructions to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Field.Input
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <Field.Submit className="w-full" />
                    </div>
                </CardContent>
            </Card>
        </FormComponent>
    );
}
