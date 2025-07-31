"use client";

import Link from "next/link";

import { useSession } from "@/lib/auth-client";

import NotificationMenu from "../navbar-components/notification-menu";
import ThemeToggle from "../navbar-components/theme-toggle";
import { Button } from "../ui/button";
import UserMenu from "../user/user-menu";

export type AuthMenuProps = {};

export function AuthMenu({}: AuthMenuProps) {
    const session = useSession();
    if (session.isPending)
        return (
            <div className="flex gap-2">
                <ThemeToggle />
                <Button
                    disabled={session.isPending}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-sm"
                >
                    <Link href="#">Sign In</Link>
                </Button>
                <Button
                    disabled={session.isPending}
                    asChild
                    size="sm"
                    className="text-sm"
                >
                    <Link href="#">Sign up</Link>
                </Button>
            </div>
        );
    if (!session.data)
        return (
            <div className="flex gap-2">
                <ThemeToggle />
                <Button
                    disabled={session.isPending}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-sm"
                >
                    <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                    disabled={session.isPending}
                    asChild
                    size="sm"
                    className="text-sm"
                >
                    <Link href="/sign-up">Sign up</Link>
                </Button>
            </div>
        );
    return (
        <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Notification */}
            <NotificationMenu />
            {/* User menu */}
            <UserMenu />
        </div>
    );
}
