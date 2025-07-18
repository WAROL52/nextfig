import React from "react";

import { HomeNavbar } from "@/components/home/home-navbar";

type Props = {
    children?: React.ReactNode;
};

export default async function Layout(props: Props) {
    return (
        <div>
            <HomeNavbar />
            <div>{props.children}</div>
            <footer>Footer content here</footer>
        </div>
    );
}
