import { ComponentProps } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";

import { useIsMobile } from "@/hooks/use-mobile";

import { SignOutButton } from "../auth/sign-out-button";
import { LinkAuto } from "../link-auto";
import { Button } from "../ui/button";
import { UserAvatar } from "./user-avatar";

export default function UserMenu() {
    const { data: session } = authClient.useSession();
    const isMobile = useIsMobile();
    const user = session?.user;
    if (!user) {
        return null; // or handle unauthenticated state
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="px-2">
                    <UserAvatar withName={!isMobile} withEmail={!isMobile} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <Header />
                <DropdownMenuSeparator />
                <GroupSuper />
                <DropdownMenuSeparator />
                <GroupAccount />
                <DropdownMenuSeparator />
                <GroupAdmin />
                <DropdownMenuSeparator />
                <Footer />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function GroupAccount(props: ComponentProps<"div">) {
    return (
        <DropdownMenuGroup {...props}>
            <DropdownMenuItem asChild>
                <LinkAuto withIcon to="account" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <LinkAuto withIcon to="org" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <LinkAuto withIcon to="notifications" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <LinkAuto withIcon to="settings" />
            </DropdownMenuItem>
        </DropdownMenuGroup>
    );
}

function GroupSuper(props: ComponentProps<"div">) {
    return (
        <DropdownMenuGroup {...props}>
            <DropdownMenuItem asChild>
                <LinkAuto withIcon to="super" />
            </DropdownMenuItem>
        </DropdownMenuGroup>
    );
}

function GroupAdmin(props: ComponentProps<"div">) {
    return (
        <DropdownMenuGroup {...props}>
            <DropdownMenuItem asChild>
                <LinkAuto withIcon to="admin" />
            </DropdownMenuItem>
        </DropdownMenuGroup>
    );
}

function Footer() {
    return (
        <DropdownMenuItem asChild>
            <SignOutButton />
        </DropdownMenuItem>
    );
}

function Header() {
    return (
        <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar withName withEmail />
            </div>
        </DropdownMenuLabel>
    );
}

UserMenu.GroupAccount = GroupAccount;
UserMenu.Footer = Footer;
UserMenu.Header = Header;
UserMenu.GroupSuper = GroupSuper;
UserMenu.GroupAdmin = GroupAdmin;
