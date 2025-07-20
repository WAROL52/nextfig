"use client";

export type BgLogoProps = {};

export function BgLogo({}: BgLogoProps) {
    return (
        <img
            src="https://placehold.co/200x300?text=logo"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    );
}
