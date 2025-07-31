import {
    Bell,
    Home,
    LayoutDashboardIcon,
    LogInIcon,
    LogOutIcon,
    LucideProps,
    PlusIcon,
    RectangleEllipsisIcon,
    RotateCcwKeyIcon,
    Settings,
    ShieldUserIcon,
    UserCircle,
    UserLockIcon,
} from "lucide-react";

import { ForwardRefExoticComponent, RefAttributes } from "react";

import { cn } from "./lib/utils";

export type UrlLink = {
    href: string;
    label: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
};
export type UrlLinkWithName<N extends string = string> = UrlLink & {
    name: N;
};

function createUrlLink<K extends string, V extends UrlLink>(
    params: Record<K, V>
): Record<K, UrlLinkWithName<K>> {
    return Object.fromEntries(
        (Object.keys(params) as Array<K>).map((key: K) => {
            const value = params[key] as V;
            const newValue: UrlLinkWithName<K> = {
                name: key,
                ...value,
                icon: function IconComponent(props: LucideProps) {
                    return (
                        <value.icon
                            size={16}
                            {...props}
                            className={cn(props.className)}
                        />
                    );
                },
            };
            return [key, newValue];
        })
    ) as Record<K, UrlLinkWithName<K>>;
}

export const urlLinks = createUrlLink({
    home: {
        href: "/",
        label: "Home",
        icon: Home,
    },
    account: {
        href: "/account",
        label: "Account",
        icon: UserCircle,
    },
    org: {
        href: "/org",
        label: "Organizations",
        icon: LayoutDashboardIcon,
    },
    settings: {
        href: "/settings",
        label: "Settings",
        icon: Settings,
    },
    notifications: {
        href: "/notifications",
        label: "Notifications",
        icon: Bell,
    },
    signIn: {
        href: "/sign-in",
        label: "Sign In",
        icon: LogInIcon,
    },
    signUp: {
        href: "/sign-up",
        label: "Sign Up",
        icon: PlusIcon,
    },
    signOut: {
        href: "/sign-out",
        label: "Sign Out",
        icon: LogOutIcon,
    },
    forgotPassword: {
        href: "/forgot-password",
        label: "Forgot Password",
        icon: RectangleEllipsisIcon,
    },
    resetPassword: {
        href: "/reset-password",
        label: "Reset Password",
        icon: RotateCcwKeyIcon,
    },
    super: {
        href: "/super",
        label: "Super",
        icon: ShieldUserIcon,
    },
    admin: {
        href: "/admin",
        label: "Admin",
        icon: UserLockIcon,
    },
});
export type UrlLinkName = keyof typeof urlLinks;

export const accountNavigations: UrlLinkWithName<UrlLinkName>[] = [
    urlLinks.account,
    urlLinks.org,
    urlLinks.settings,
    urlLinks.notifications,
];
