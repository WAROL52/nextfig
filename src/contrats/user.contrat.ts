import { oc } from "@orpc/contract";
import z from "zod";

import {
    UserFindFirstArgsSchema,
    UserFindManyArgsSchema,
    UserFindUniqueArgsSchema,
    UserSchema,
} from "@/generated/zod";

const listUserContract = oc
    .route({
        method: "GET",
        inputStructure: "compact",
    })
    .input(UserFindManyArgsSchema)
    .output(UserSchema.array());

const findUniqueUserContract = oc
    .input(UserFindUniqueArgsSchema)
    .output(UserSchema.or(z.null()));
const findFirstUserContract = oc
    .input(UserFindFirstArgsSchema)
    .output(UserSchema.or(z.null()));
export const userContract = {
    list: listUserContract,
    findUnique: findUniqueUserContract,
    findFirst: findFirstUserContract,
};
