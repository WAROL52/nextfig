"use client";

import Link from "next/link";

import { UrlLinkName, urlLinks } from "@/url-links";

export type LinkAutoProps<T extends UrlLinkName> = Omit<
    React.ComponentProps<"a">,
    "href"
> & {
    to: T;
    withIcon?: boolean;
    searchParams?: Record<string, string>;
};

export function LinkAuto<T extends UrlLinkName>({
    to,
    withIcon,
    searchParams,
    children,
    ...props
}: LinkAutoProps<T>) {
    const urlLink = urlLinks[to];
    if (!urlLink) {
        return null;
    }
    const IconComponent = urlLink.icon;
    const searchParamsString = searchParams
        ? `?${new URLSearchParams(searchParams).toString()}`
        : "";
    return (
        <Link href={`${urlLink.href}${searchParamsString}`} {...props}>
            <span className="flex items-center gap-1">
                {withIcon && <IconComponent className="mr-2" />}
                {children || urlLink.label}
            </span>
        </Link>
    );
}
