import { os } from "@orpc/server";
import z from "zod";

import prisma from "@/lib/prisma";
import {
    createCollectionRouter,
    createCollectionSchema,
    createCollectionSchema2,
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
const schema2 = createCollectionSchema2(
    TodoSchema,
    TodoCreateInputSchema,
    TodoSchema.shape.id
);

const tdSchema = createCollectionSchema({
    one: TodoSchema,
    many: z.array(TodoSchema),
    createArg: TodoCreateInputSchema,
    updateArg: TodoSchema.pick({ id: true }).merge(
        z.object({
            data: TodoSchema.partial(),
        })
    ),
    deleteArg: TodoSchema.pick({ id: true }),
    findManyArg: TodoSchema,
    findOneArg: TodoSchema.pick({ id: true }),
});

export namespace TodoSchemaType2 {
    export type One = z.infer<typeof schema2.one>;
    export type CreateArg = z.infer<typeof schema2.createArg>;
    export type CreateResult = z.infer<typeof schema2.createResult>;
    export type UpdateArg = z.infer<typeof schema2.updateArg>;
    export type UpdateResult = z.infer<typeof schema2.updateResult>;
    export type DeleteArg = z.infer<typeof schema2.deleteArg>;
    export type DeleteResult = z.infer<typeof schema2.deleteResult>;
    export type FindManyArg = z.infer<typeof schema2.findManyArg>;
    export type FindManyResult = z.infer<typeof schema2.findManyResult>;
    export type FindOneArg = z.infer<typeof schema2.findOneArg>;
    export type FindOneResult = z.infer<typeof schema2.findOneResult>;
}
const FindManyArg: TodoSchemaType2.FindManyArg = {
    orderBy: {
        field: "status",
        direction: "asc",
    },
    where: {
        title: {
            isEmpty: "true",
        },
    },
};

const router = createCollectionRouter(
    {
        schema: tdSchema,
        os: os,
    },
    ({ os }) => ({
        create: os.create.handler(async ({ input }) => {
            return prisma.todo.create({ data: input });
        }),
        update: os.update.handler(async ({ input }) => {
            return prisma.todo.update({
                where: { id: input.id },
                data: input.data,
            });
        }),
        delete: os.delete.handler(async ({ input }) => {
            return prisma.todo.delete({ where: input });
        }),
        findMany: os.findMany.handler(async ({ input }) => {
            return prisma.todo.findMany({
                where: input,
            });
        }),
        findOne: os.findOne.handler(async ({ input }) => {
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
