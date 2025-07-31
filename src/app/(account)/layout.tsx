import React from "react";

import { NavbarAccount } from "@/components/user/navbar-account";

type Props = {
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
