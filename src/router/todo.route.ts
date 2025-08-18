import { os } from "@orpc/server";

import prisma from "@/lib/prisma";
import {
    createCollectionRouter,
    createPrismaRouterHandler,
} from "@/lib/router-collection";

import { todoSchema } from "@/schemas/todo.schema";

export const todoRouter = createCollectionRouter(
    {
        schema: todoSchema,
        os: os,
    },
    ({ os }) => {
        const handler = createPrismaRouterHandler(todoSchema, prisma, "todo");
        return {
            create: os.create.handler(({ input }) => {
                return handler.create({ input });
            }),
            update: os.update.handler(({ input }) => {
                return handler.update({ input });
            }),
            delete: os.delete.handler(({ input }) => {
                return handler.delete({ input });
            }),
            findMany: os.findMany.handler(async ({ input }) => {
                return handler.findMany({ input });
            }),
            findOne: os.findOne.handler(({ input }) => {
                return handler.findOne({ input });
            }),
        };
    }
);
