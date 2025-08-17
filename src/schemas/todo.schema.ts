import { os } from "@orpc/server";
import z from "zod";

import prisma from "@/lib/prisma";
import {
    createCollectionRouter,
    createCollectionSchema,
} from "@/lib/router-collection";

import {
    TodoCreateInputSchema,
    TodoSchema,
    TodoUpdateInputSchema,
    TodoWhereUniqueInputSchema,
} from "@/generated/zod";

export const todoSchema = {
    one: TodoSchema,
    many: z.array(TodoSchema),
    create: TodoCreateInputSchema,
    update: TodoUpdateInputSchema,
    delete: TodoWhereUniqueInputSchema,
};

export namespace TodoSchemaType {
    export type One = z.infer<typeof todoSchema.one>;
    export type Many = z.infer<typeof todoSchema.many>;
    export type Create = z.infer<typeof todoSchema.create>;
    export type Update = z.infer<typeof todoSchema.update>;
    export type Delete = z.infer<typeof todoSchema.delete>;
}
const tdSchema = createCollectionSchema({
    schema: TodoSchema,
    createSchema: TodoCreateInputSchema,
    updateSchema: TodoUpdateInputSchema,
    idSChema: TodoSchema.pick({ id: true }),
});

export namespace TodoSchemaType2 {
    export type One = z.infer<typeof tdSchema.one>;
    export type CreateArg = z.infer<typeof tdSchema.createArg>;
    export type CreateResult = z.infer<typeof tdSchema.createResult>;
    export type UpdateArg = z.infer<typeof tdSchema.updateArg>;
    export type UpdateResult = z.infer<typeof tdSchema.updateResult>;
    export type DeleteArg = z.infer<typeof tdSchema.deleteArg>;
    export type DeleteResult = z.infer<typeof tdSchema.deleteResult>;

    export type FindManyArg = z.infer<typeof tdSchema.findManyArg>;

    export type FindManyResult = z.infer<typeof tdSchema.findManyResult>;
    export type FindOneArg = z.infer<typeof tdSchema.findOneArg>;
    export type FindOneResult = z.infer<typeof tdSchema.findOneResult>;
}
const FindManyArg: TodoSchemaType2.FindManyArg = {
    orderBy: {
        updatedAt: "asc",
    },
    where: {
        title: {
            contains: "example",
        },
    },
};

const router = createCollectionRouter(
    {
        schema: tdSchema,
        os: os,
    },
    ({ os }) => ({
        create: os.create.handler(({ input }) => {
            return prisma.todo.create({
                data: input,
            });
        }),
        update: os.update.handler(({ input }) => {
            return prisma.todo.update({
                where: { id: input.id },
                data: input.data,
            });
        }),
        delete: os.delete.handler(({ input }) => {
            return prisma.todo.delete({ where: input });
        }),
        findMany: os.findMany.handler(async ({ input }) => {
            let skip = 0;
            if (input.page && input.pageSize) {
                skip = (input.page - 1) * input.pageSize;
            }
            const todos = await prisma.todo.findMany({
                where: input.where,
                orderBy: input.orderBy,
                take: input.pageSize,
                skip,
            });
            const totalCount = await prisma.todo.count({
                select: {
                    ...input.count,
                    _all: true,
                },
            });
            return {
                items: todos,
                page: input.page ?? 1,
                pageSize: input.pageSize ?? todos.length,
                count: totalCount,
            };
        }),
        findOne: os.findOne.handler(({ input }) => {
            return prisma.todo.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    })
);
const users = await prisma.user.delete({
    where: { email: "user@example.com" },
});
