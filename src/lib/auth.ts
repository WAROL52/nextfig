import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { headers } from "next/headers";

// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
});

export const getSession = async () =>
    await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
