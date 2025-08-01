import {
    Bell,
    BookUserIcon,
    GlobeLockIcon,
    Home,
    IdCardIcon,
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
    UsersIcon,
} from "lucide-react";

import { ForwardRefExoticComponent, RefAttributes } from "react";

import { cn } from "./lib/utils";

export type UrlLink = {
    url: string;
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
        url: "/",
        label: "Home",
        icon: Home,
    },
    account: {
        url: "/account",
        label: "Account",
        icon: UserCircle,
    },
    org: {
        url: "/org",
        label: "Organizations",
        icon: LayoutDashboardIcon,
    },
    settings: {
        url: "/settings",
        label: "Settings",
        icon: Settings,
    },
    notifications: {
        url: "/notifications",
        label: "Notifications",
        icon: Bell,
    },
    signIn: {
        url: "/sign-in",
        label: "Sign In",
        icon: LogInIcon,
    },
    signUp: {
        url: "/sign-up",
        label: "Sign Up",
        icon: PlusIcon,
    },
    signOut: {
        url: "/sign-out",
        label: "Sign Out",
        icon: LogOutIcon,
    },
    forgotPassword: {
        url: "/forgot-password",
        label: "Forgot Password",
        icon: RectangleEllipsisIcon,
    },
    resetPassword: {
        url: "/reset-password",
        label: "Reset Password",
        icon: RotateCcwKeyIcon,
    },
    super: {
        url: "/super",
        label: "Super",
        icon: ShieldUserIcon,
    },
    admin: {
        url: "/admin",
        label: "Admin",
        icon: UserLockIcon,
    },
    ["super.users.management"]: {
        url: "/super/users-management",
        label: "User Management",
        icon: IdCardIcon,
    },
    ["super.users"]: {
        url: "/super/users",
        label: "Users List",
        icon: UsersIcon,
    },
    ["super.users:id"]: {
        url: "/super/users",
        label: "User Account",
        icon: UserCircle,
    },
    ["super.users.activity"]: {
        url: "/super/users/activity",
        label: "User Activity",
        icon: BookUserIcon,
    },
    ["super.users.accessControl"]: {
        url: "/super/users/access-control",
        label: "Access Control",
        icon: UserLockIcon,
    },
    ["super.accessControl"]: {
        url: "/super/access-control",
        label: "Access Control",
        icon: GlobeLockIcon,
    },
    ["super.accessControl.roles"]: {
        url: "/super/access-control/roles",
        label: "Roles",
        icon: ShieldUserIcon,
    },
    ["super.accessControl.attributes"]: {
        url: "/super/access-control/attributes",
        label: "Attributes",
        icon: ShieldUserIcon,
    },
    ["super.accessControl.resources"]: {
        url: "/super/access-control/resources",
        label: "Resources",
        icon: ShieldUserIcon,
    },
    ["super.accessControl.permissions"]: {
        url: "/super/access-control/permissions",
        label: "Permissions",
        icon: ShieldUserIcon,
    },
    ["super.accessControl.jit"]: {
        url: "/super/access-control/jit",
        label: "Just-in-Time",
        icon: ShieldUserIcon,
    },
    ["super.organizations.management"]: {
        url: "/super/organizations-management",
        label: "Organizations",
        icon: LayoutDashboardIcon,
    },
    ["super.organizations"]: {
        url: "/super/organizations",
        label: "Organizations List",
        icon: LayoutDashboardIcon,
    },
    ["super.organizations:id"]: {
        url: "/super/organizations",
        label: "Organization Details",
        icon: LayoutDashboardIcon,
    },
    ["super.organizations.activity"]: {
        url: "/super/organizations/activity",
        label: "Organization Activity",
        icon: BookUserIcon,
    },
    ["super.organizations.accessControl"]: {
        url: "/super/organizations/access-control",
        label: "Access Control",
        icon: GlobeLockIcon,
    },
    ["super.organizations.teams:id"]: {
        url: "/super/organizations/teams",
        label: "Team Details",
        icon: UsersIcon,
    },
    ["super.projects.management"]: {
        url: "/super/projects/management",
        label: "Project Management",
        icon: LayoutDashboardIcon,
    },
    ["super.projects"]: {
        url: "/super/projects",
        label: "Projects List",
        icon: LayoutDashboardIcon,
    },
    ["super.projects:id"]: {
        url: "/super/projects",
        label: "Project Details",
        icon: LayoutDashboardIcon,
    },
    ["super.projects.activity"]: {
        url: "/super/projects/activity",
        label: "Project Activity",
        icon: BookUserIcon,
    },
    ["super.projects.accessControl"]: {
        url: "/super/projects/access-control",
        label: "Access Control",
        icon: GlobeLockIcon,
    },
    ["super.teams.management"]: {
        url: "/super/teams-management",
        label: "Team Management",
        icon: UsersIcon,
    },
    ["super.teams"]: {
        url: "/super/teams",
        label: "Teams List",
        icon: UsersIcon,
    },
    ["super.teams:id"]: {
        url: "/super/teams",
        label: "Team Details",
        icon: UsersIcon,
    },
    ["super.teams.activity"]: {
        url: "/super/teams/activity",
        label: "Team Activity",
        icon: BookUserIcon,
    },
    ["super.teams.accessControl"]: {
        url: "/super/teams/access-control",
        label: "Access Control",
        icon: GlobeLockIcon,
    },
    ["super.teams.projects"]: {
        url: "/super/teams/projects",
        label: "Projects",
        icon: LayoutDashboardIcon,
    },
});
export type UrlLinkName = keyof typeof urlLinks;

export const accountNavigations: UrlLinkWithName<UrlLinkName>[] = [
    urlLinks.account,
    urlLinks.org,
    urlLinks.settings,
    urlLinks.notifications,
];
