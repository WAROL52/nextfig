import Link from "next/link";

import SignUp from "@/components/auth/sign-up";
import { BgLogo } from "@/components/bg-logo";
import { LinkToHome } from "@/components/link-to-home";

import { cn } from "@/lib/utils";

type Props = {
    params: Promise<{ signUp: string }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function Page(props: Props) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <LinkToHome />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <BgLogo />
            </div>
        </div>
    );
}

function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Create an account to access all features and start your
                    journey with us.
                </p>
            </div>
            <div className="grid gap-6">
                <SignUp />
            </div>
            <div className="text-center text-sm">
                have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                    Sign in
                </Link>
            </div>
        </div>
    );
}
