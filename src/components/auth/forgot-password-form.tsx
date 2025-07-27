"use client";

import { Loader2 } from "lucide-react";

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

import { authClient } from "@/lib/auth-client";

import { urlLinks } from "@/url-links";

export type ForgotPasswordFormProps = {};

export function ForgotPasswordForm({}: ForgotPasswordFormProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                    Forgot Password
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
                            setLoading(true);
                            const redirectTo =
                                window.location.origin +
                                urlLinks.resetPassword.href;
                            console.log("redirect to:", redirectTo);

                            const { data, error } =
                                await authClient.requestPasswordReset({
                                    email: email, // required
                                    redirectTo: redirectTo, // optional
                                });
                            setLoading(false);
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
