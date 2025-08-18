import { createCollectionSchema } from "@/lib/router-collection";

import {
    TodoCreateInputSchema,
    TodoSchema,
    TodoUpdateInputSchema,
    TodoWhereInputSchema,
} from "@/generated/zod";

export const todoSchema = createCollectionSchema({
    schema: TodoSchema,
    createSchema: TodoCreateInputSchema,
    updateSchema: TodoUpdateInputSchema,
    idSChema: TodoSchema.pick({ id: true }),
    whereSchema: TodoWhereInputSchema,
});
