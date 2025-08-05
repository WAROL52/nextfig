import { oc } from "@orpc/contract";
import z from "zod";

import prisma from "@/lib/prisma";

import {
    UserCreateInputObjectSchema,
    UserCreateOneSchema,
    UserFindFirstSchema,
    UserFindManySchema,
    UserFindUniqueSchema,
} from "@/generated/schemas";

const listUserContract = oc
    .input(UserFindManySchema)
    .output(UserCreateInputObjectSchema.array());

const findUniqueUserContract = oc
    .input(UserFindUniqueSchema)
    .output(UserCreateOneSchema);
const findFirstUserContract = oc
    .input(UserFindFirstSchema)
    .output(UserCreateOneSchema);
export const userContract = {
    list: listUserContract,
    findUnique: findUniqueUserContract,
    findFirst: findFirstUserContract,
};
let arg: z.infer<typeof UserCreateInputObjectSchema>;
let argCreate: z.infer<typeof UserCreateInputObjectSchema>;

prisma.user.findMany(arg);
prisma.user.create(argCreate);
