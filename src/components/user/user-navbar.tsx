"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import Logo from "@/components/navbar-components/logo";

import { accountNavigations } from "@/url-links";

import { AuthMenu } from "../auth/auth-menu";
import { LinkAuto } from "../link-auto";

export type UserNavbarProps = {};

export function UserNavbar({}: UserNavbarProps) {
    const path = usePathname();
    const navigationLinks = accountNavigations.map((link) => ({
        ...link,
        active: path.startsWith(link.url),
    }));
    return (
        <header className="border-b px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex flex-1 items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-36 p-1 md:hidden"
                        >
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem
                                            key={index}
                                            className="w-full"
                                        >
                                            <NavigationMenuLink
                                                className="py-1.5"
                                                active={link.active}
                                                asChild
                                            >
                                                <LinkAuto
                                                    to={link.name}
                                                    withIcon
                                                />
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-primary hover:text-primary/90"
                        >
                            <Logo />
                        </Link>
                    </div>
                </div>
                {/* Middle area */}
                <div className="grow"></div>
                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-2">
                    <AuthMenu />
                </div>
            </div>
            {/* Bottom navigation */}
            <div className="border-t py-2 max-md:hidden">
                {/* Navigation menu */}
                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        {navigationLinks.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink
                                    active={link.active}
                                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                    asChild
                                >
                                    <LinkAuto to={link.name} withIcon />
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}
