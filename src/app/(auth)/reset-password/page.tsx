import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { BgLogo } from "@/components/bg-logo";
import { LinkToHome } from "@/components/link-to-home";

import { cn } from "@/lib/utils";

type Props = {};

export default async function Page({}: Props) {
    return (
        <div>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <ResetPasswordSection />
                </div>
            </div>
        </div>
    );
}

function ResetPasswordSection({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <LinkToHome />
                                <h1 className="text-2xl font-bold">
                                    Reset Password
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    Enter your new password below to reset it
                                </p>
                            </div>
                            <ResetPasswordForm />
                            <div className="text-center text-sm">
                                Remembered your password?{" "}
                                <Link
                                    href="/sign-in"
                                    className="underline underline-offset-4"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted relative hidden md:block">
                        <BgLogo />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
