"use client";

import Link from "next/link";

import { UrlLinkName, urlLinks } from "@/url-links";

type UrlParams<T extends UrlLinkName> = T extends `${string}:${infer P}`
    ? { params: { [K in P]: string } }
    : { params?: never };

export type LinkAutoProps<T extends UrlLinkName> = Omit<
    React.ComponentProps<"a">,
    "href"
> & {
    to: T;
    withIcon?: boolean;
    searchParams?: Record<string, string>;
} & UrlParams<T>;

export function LinkAuto<T extends UrlLinkName>({
    to,
    withIcon,
    searchParams,
    children,
    params = undefined,
    ...props
}: LinkAutoProps<T>) {
    const urlLink = urlLinks[to];
    if (!urlLink) {
        return null;
    }
    if (params) {
        const paramsKeys: keyof typeof params = (
            Object.keys(params) as Array<keyof typeof params>
        )[0];
        urlLink.url += `/${params[paramsKeys]}`;
    }
    const IconComponent = urlLink.icon;
    const searchParamsString = searchParams
        ? `?${new URLSearchParams(searchParams).toString()}`
        : "";
    return (
        <Link href={`${urlLink.url}${searchParamsString}`} {...props}>
            <span className="flex items-center gap-1">
                {withIcon && <IconComponent className="mr-2" />}
                {children || urlLink.label}
            </span>
        </Link>
    );
}
