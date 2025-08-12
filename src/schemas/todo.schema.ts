import z from "zod";

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
