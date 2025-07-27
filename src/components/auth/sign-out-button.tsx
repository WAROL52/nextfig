"use client";

import { Loader2, LogOutIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

export type SignOutButtonProps = {};

export function SignOutButton({}: SignOutButtonProps) {
    const router = useRouter();
    const [isSignOuting, startSignOut] = useTransition();
    const signOut = () =>
        startSignOut(async () => {
            await authClient.signOut();
            router.push("/sign-in");
        });
    return (
        <Button
            disabled={isSignOuting}
            onClick={signOut}
            variant={"outline"}
            className="flex w-full justify-start"
        >
            {isSignOuting ? (
                <Loader2 size={16} className="opacity-60" aria-hidden="true" />
            ) : (
                <LogOutIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                />
            )}
            <span>Logout</span>
        </Button>
    );
}
