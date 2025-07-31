import React from "react";

import { UserNavbar } from "@/components/user/user-navbar";

type Props = {
    children?: React.ReactNode;
};

export default async function Layout(props: Props) {
    return (
        <div>
            <UserNavbar />
            <div>{props.children}</div>
        </div>
    );
}
