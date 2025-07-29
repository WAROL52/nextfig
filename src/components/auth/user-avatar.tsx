"use client";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type UserAvatarProps = {
    withName?: boolean;
    withEmail?: boolean;
};

export function UserAvatar({ withName, withEmail }: UserAvatarProps) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const avatar = user?.image || "";
    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                    {user?.name
                        ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                        : "CN"}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                {withName && (
                    <span className="truncate font-medium">{user?.name}</span>
                )}
                {withEmail && (
                    <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                    </span>
                )}
            </div>
        </div>
    );
}
