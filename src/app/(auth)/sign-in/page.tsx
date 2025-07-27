import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { SignInForm } from "@/components/auth/sign-in-form";
import { BgLogo } from "@/components/bg-logo";
import { LinkToHome } from "@/components/link-to-home";

import { cn } from "@/lib/utils";

type Props = {
    params: Promise<{ signIn: string }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function Page({}: Props) {
    return (
        <div>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <LoginSection />
                </div>
            </div>
        </div>
    );
}

function LoginSection({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    <LinkToHome />
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your Acme Inc account
                                </p>
                            </div>
                            <SignInForm />
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/sign-up"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
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
