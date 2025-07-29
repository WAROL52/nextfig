"use client";

import { AlertCircleIcon } from "lucide-react";

import { useSearchParams } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useResetPasswordForm } from "@/hooks/forms/use-reset-password-form";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type ResetPasswordFormProps = {};

export function ResetPasswordForm({}: ResetPasswordFormProps) {
    const token = useSearchParams().get("token");
    const { Field, FormComponent, alertError } = useResetPasswordForm({
        token: token || undefined,
    });

    if (!token) {
        return (
            <div>
                <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>
                        You cannot access this page if you do not access it from
                        a password reset email
                    </AlertTitle>
                    <AlertDescription>
                        <p>If you actually come from such an email:</p>
                        <ul className="list-inside list-disc text-sm">
                            <li>Check your email inbox</li>
                            <li>Check your spam folder</li>
                            <li>
                                Ensure you are using the correct email address
                            </li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <FormComponent>
            <Card className="max-w-md">
                <CardHeader>
                    {alertError}
                    <CardTitle className="text-lg md:text-xl">
                        Reset Password
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Enter your new password below. Make sure it is at least
                        8 characters long and contains a mix of letters,
                        numbers, and symbols.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Field.Input
                                name="password"
                                type="password"
                                label="New Password"
                                placeholder="********"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Field.Input
                                name="confirmPassword"
                                type="password"
                                label="Confirm New Password"
                                placeholder="********"
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
