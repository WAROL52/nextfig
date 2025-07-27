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

import { SignOutButton } from "../auth/sign-out-button";
import { UserAvatar } from "../auth/user-avatar";
import { LinkAuto } from "../link-auto";
import { Button } from "../ui/button";

export default function UserMenu() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    if (!user) {
        return null; // or handle unauthenticated state
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="px-2">
                    <UserAvatar withName withEmail />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserAvatar withName withEmail />
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
