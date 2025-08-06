import { os } from "@orpc/server";

import prisma from "@/lib/prisma";

import { UserFindManyArgsSchema, UserSchema } from "@/generated/zod";

const listUser = os
    .input(UserFindManyArgsSchema)
    .output(UserSchema.array())
    .handler(async ({ input }) => {
        return prisma.user.findMany(input);
    });

export const userRoute = {
    list: listUser,
};
