"use client";

import {
    DatabaseIcon,
    FlagIcon,
    LifeBuoy,
    LogsIcon,
    MessageCircleIcon,
    Send,
} from "lucide-react";

import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "@/components/super/nav-main";
import { NavProjects } from "@/components/super/nav-projects";
import { NavSecondary } from "@/components/super/nav-secondary";
import { NavUser } from "@/components/super/nav-user";

import { Info } from "@/provider";
import { urlLinks } from "@/url-links";

import { LinkAuto } from "../link-auto";
import { Logo } from "../logo";

const data = {
    navMain: [
        {
            ...urlLinks["super.users.management"],
            items: [
                urlLinks["super.users"],
                urlLinks["super.users.activity"],
                urlLinks["super.users.accessControl"],
            ],
        },
        {
            ...urlLinks["super.accessControl"],
            items: [
                urlLinks["super.accessControl.roles"],
                urlLinks["super.accessControl.attributes"],
                urlLinks["super.accessControl.resources"],
                urlLinks["super.accessControl.permissions"],
                urlLinks["super.accessControl.jit"],
            ],
        },
        {
            ...urlLinks["super.organizations.management"],
            items: [
                urlLinks["super.organizations"],
                urlLinks["super.organizations.activity"],
                urlLinks["super.organizations.accessControl"],
            ],
        },
        {
            ...urlLinks["super.projects.management"],
            items: [
                urlLinks["super.projects"],
                urlLinks["super.projects.activity"],
                urlLinks["super.projects.accessControl"],
            ],
        },
        {
            ...urlLinks["super.teams.management"],
            items: [
                urlLinks["super.teams"],
                urlLinks["super.teams.activity"],
                urlLinks["super.teams.accessControl"],
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Prisma Studio",
            url: "#",
            icon: DatabaseIcon,
        },
        {
            name: "Contact Center",
            url: "#",
            icon: MessageCircleIcon,
        },
        {
            name: "Signals",
            url: "#",
            icon: FlagIcon,
        },
        {
            name: "Logs",
            url: "#",
            icon: LogsIcon,
        },
    ],
};

export function SuperSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <LinkAuto to="home">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                                    <Logo />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {Info.projectName}
                                    </span>
                                    <span className="truncate text-xs">
                                        Super Admin
                                    </span>
                                </div>
                            </LinkAuto>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
