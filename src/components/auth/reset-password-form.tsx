"use client";

import { AlertCircleIcon, Loader2 } from "lucide-react";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/lib/auth-client";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type ResetPasswordFormProps = {};

export function ResetPasswordForm({}: ResetPasswordFormProps) {
    const token = useSearchParams().get("token");
    const [email, setEmail] = useState("");
    const [password] = useState("");
    const [loading, setLoading] = useState(false);

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
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                    Forgot Password {token}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    We'll send you instructions to reset your password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        onClick={async () => {
                            await signIn.email(
                                {
                                    email,
                                    password,
                                },
                                {
                                    onRequest: () => {
                                        setLoading(true);
                                    },
                                    onResponse: () => {
                                        setLoading(false);
                                    },
                                }
                            );
                        }}
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <p> Reset Password </p>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
