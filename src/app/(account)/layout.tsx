import React from "react";

import { NavbarAccount } from "@/components/navbar-account";

type Props = {
    params: Promise<Record<string, string>>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
    children?: React.ReactNode;
};

export default async function Layout(props: Props) {
    return (
        <div>
            <NavbarAccount />
            <div>{props.children}</div>
        </div>
    );
}
