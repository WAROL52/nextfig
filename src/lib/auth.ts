import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { headers } from "next/headers";

// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
    user: {
        additionalFields: {
            firstName: {
                type: "string",
                optional: true,
                required: false,
                input: true,
            },
            lastName: {
                type: "string",
                optional: true,
                required: false,
                input: true,
            },
            website: {
                type: "string",
                optional: true,
                required: false,
            },
            bio: {
                type: "string",
                optional: true,
                required: false,
            },
            location: {
                type: "string",
                optional: true,
                required: false,
            },
            phone: {
                type: "string",
                optional: true,
                required: false,
            },
            birthDate: {
                type: "date",
                optional: true,
                required: false,
            },
            birthPlace: {
                type: "string",
                optional: true,
                required: false,
            },
            profilePicture: {
                type: "string",
                optional: true,
                required: false,
            },
        },
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword({ user, url, token }, request) {
            // Send an email to the user with a link to reset their password
            console.log(
                `Sending password reset email to ${user.email} with token ${token}`
            );
            console.log(`Reset link: ${url}`);
        },
        onPasswordReset: async ({ user }, request) => {
            // your logic here
            console.log(`Password for user ${user.email} has been reset.`);
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});

export const getSession = async () =>
    await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
