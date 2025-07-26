"use client";

import { LogOutIcon } from "lucide-react";

import { useTransition } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

export type SignOutButtonProps = {};

export function SignOutButton({}: SignOutButtonProps) {
    const [isSignOuting, startSignOut] = useTransition();
    const signOut = () =>
        startSignOut(() => {
            authClient.signOut();
        });
    return (
        <Button
            disabled={isSignOuting}
            onClick={signOut}
            variant={"secondary"}
            className="flex w-full justify-start"
        >
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
        </Button>
    );
}
