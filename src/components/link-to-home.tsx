"use client";

import Link from "next/link";

import { Info } from "@/provider";

import { Logo } from "./logo";

export type LinkToHomeProps = {};

export function LinkToHome({}: LinkToHomeProps) {
    return (
        <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
            {Info.projectName}
        </Link>
    );
}
