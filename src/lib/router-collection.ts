import { ErrorMap, ProcedureHandler, os } from "@orpc/server";
import z from "zod";

import { Prisma, PrismaClient } from "@/generated/prisma";

const op = {
    equals: "equals",
    gt: "gt",
    gte: "gte",
    lt: "lt",
    lte: "lte",
    in: "in",
    startsWith: "startsWith",
    endsWith: "endsWith",
    has: "has",
    hasEvery: "hasEvery",
    hasSome: "hasSome",
    isEmpty: "isEmpty",
    contains: "contains",
    not: "not",
    notIn: "notIn",
    mode: "mode",
} as const;
const opKeys = Object.keys(op) as (keyof typeof op)[];
const opKeysSchema = z.enum(opKeys as [keyof typeof op & string]);
const opSchema = {
    [op.equals]: z.literal("equals"),
    [op.gt]: z.literal("gt"),
    [op.gte]: z.literal("gte"),
    [op.lt]: z.literal("lt"),
    [op.lte]: z.literal("lte"),
    [op.in]: z.literal("in"),
    [op.startsWith]: z.literal("startsWith"),
    [op.endsWith]: z.literal("endsWith"),
    [op.has]: z.literal("has"),
    [op.hasEvery]: z.literal("hasEvery"),
    [op.hasSome]: z.literal("hasSome"),
    [op.isEmpty]: z.literal("isEmpty"),
    [op.contains]: z.literal("contains"),
    [op.not]: z.literal("not"),
    [op.notIn]: z.literal("notIn"),
    [op.mode]: z.literal("mode"),
} as const;

export const operatorType = [
    "string",
    "number",
    "boolean",
    "date",
    "enum",
    "json",
    "list",
] as const;
export const operatorTypeSchema = z.enum(operatorType);

export const operatorMap = {
    boolean: [op.equals, op.not] as const,
    date: [
        op.equals,
        op.in,
        op.notIn,
        op.lt,
        op.lte,
        op.gte,
        op.gt,
        op.not,
    ] as const,
    string: [
        op.equals,
        op.in,
        op.notIn,
        op.lt,
        op.lte,
        op.gt,
        op.gte,
        op.contains,
        op.startsWith,
        op.endsWith,
        op.not,
        op.mode,
    ] as const,
    number: [
        op.equals,
        op.in,
        op.notIn,
        op.lt,
        op.lte,
        op.gt,
        op.gte,
        op.not,
    ] as const,
    enum: [op.equals, op.in, op.notIn, op.not] as const,
    json: [op.has, op.hasEvery, op.hasSome, op.isEmpty] as const,
    list: [op.has, op.hasEvery, op.hasSome, op.isEmpty] as const,
};
type OperatorMap = typeof operatorMap;
type OperatorMapType = {
    [K in keyof OperatorMap]: OperatorMap[K][number];
};
const operatorMapShape = {
    boolean: z.union([opSchema[op.equals], opSchema[op.not]]),
    date: z.union([
        opSchema[op.equals],
        opSchema[op.in],
        opSchema[op.notIn],
        opSchema[op.lt],
        opSchema[op.lte],
        opSchema[op.gte],
        opSchema[op.gt],
        opSchema[op.not],
    ]),
    string: z.union([
        opSchema[op.equals],
        opSchema[op.in],
        opSchema[op.notIn],
        opSchema[op.lt],
        opSchema[op.lte],
        opSchema[op.gt],
        opSchema[op.gte],
        opSchema[op.contains],
        opSchema[op.startsWith],
        opSchema[op.endsWith],
        opSchema[op.not],
        opSchema[op.mode],
    ]),
    number: z.union([
        opSchema[op.equals],
        opSchema[op.in],
        opSchema[op.notIn],
        opSchema[op.lt],
        opSchema[op.lte],
        opSchema[op.gt],
        opSchema[op.gte],
        opSchema[op.not],
    ]),
    enum: z.union([
        opSchema[op.equals],
        opSchema[op.in],
        opSchema[op.notIn],
        opSchema[op.not],
    ]),
    json: z.union([
        opSchema[op.has],
        opSchema[op.hasEvery],
        opSchema[op.hasSome],
        opSchema[op.isEmpty],
    ]),
    list: z.union([
        opSchema[op.has],
        opSchema[op.hasEvery],
        opSchema[op.hasSome],
        opSchema[op.isEmpty],
    ]),
} as const;
export const operatorMapSchema: z.ZodType<OperatorMapType> =
    z.object(operatorMapShape);
export type CollectionSchema<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
> = ReturnType<typeof createCollectionSchema<T, ID, C, U, W>>;

export type CollectionSchemaAny = CollectionSchema<
    Record<string, any>,
    z.ZodType<any>,
    z.ZodType<any>,
    z.ZodType<any>,
    z.ZodType<any>
>;
export type createCollectionSchemaOptions<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
> = {
    schema: z.ZodObject<T>;
    createSchema: C;
    updateSchema: U;
    idSChema: ID;
    whereSchema: W;
};
export function createCollectionSchema<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
>(options: createCollectionSchemaOptions<T, ID, C, U, W>) {
    const { schema, createSchema, updateSchema, idSChema, whereSchema } =
        options;
    // const idArg = schema.pick({ [idName]: true } as const);

    const fields = Object.keys(schema.shape) as [keyof T];
    const errorSchema = z.object({
        message: z.string(),
        details: z.array(z.string()).optional(),
        code: z.string(),
    });
    const schemaWithError = schema.or(errorSchema);

    const countSchema = z.record(
        z.enum(fields as [keyof T & string]),
        z.literal(true)
    );
    const countResultSchema = z
        .record(z.enum(fields as [keyof T & string]), z.number())
        .and(
            z.object({
                _all: z.number(),
            })
        );
    return {
        one: schema,
        schema,
        createSchema,
        updateSchema,
        idSChema,
        whereSchema,
        createArg: createSchema,
        createResult: schemaWithError,
        updateArg: z
            .object({
                data: updateSchema,
            })
            .and(idSChema),
        updateResult: schemaWithError,
        deleteArg: idSChema,
        deleteResult: schemaWithError,
        findManyArg: z.object({
            where: whereSchema.optional(),
            orderBy: z
                .record(
                    z.enum(fields as [keyof T & string]),
                    z.enum(["asc", "desc"])
                )
                .optional(),
            page: z.number().optional(),
            pageSize: z.number().optional(),
            count: countSchema.optional(),
        }),
        findManyResult: z.object({
            items: z.array(schema),
            page: z.number(),
            pageSize: z.number(),
            count: countResultSchema,
        }),
        findOneArg: idSChema,
        findOneResult: schemaWithError.or(z.null()),
    };
}
type OsBuilder = typeof os;
export type CollectionRouterOptions<TSchema, Os extends OsBuilder> = {
    schema: TSchema;
    os: Os;
};

type ProcedureHandlerType<
    Os extends OsBuilder,
    TInput,
    TOutput,
> = ProcedureHandler<Os["$context"], TInput, TOutput, ErrorMap, Os["$meta"]>;
export type CollectionRouter<
    TSchema extends CollectionSchemaAny,
    Os extends OsBuilder,
> = {
    create: ProcedureHandlerType<Os, TSchema["createArg"], TSchema["one"]>;
    update: ProcedureHandlerType<Os, TSchema["updateArg"], TSchema["one"]>;
    delete: ProcedureHandlerType<Os, TSchema["deleteArg"], TSchema["one"]>;
    findMany: ProcedureHandlerType<
        Os,
        TSchema["findManyArg"],
        TSchema["findManyResult"]
    >;
    findOne: ProcedureHandlerType<Os, TSchema["findOneArg"], TSchema["one"]>;
};
function createProcedureBuilderWithInputOutput<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    Os extends OsBuilder,
>(schema: CollectionSchema<T, ID, C, U, W>, os: Os) {
    return {
        create: os.input(schema.createArg).output(schema.createResult),
        update: os.input(schema.updateArg).output(schema.updateResult),
        findOne: os.input(schema.findOneArg).output(schema.findOneResult),
        findMany: os.input(schema.findManyArg).output(schema.findManyResult),
        delete: os.input(schema.deleteArg).output(schema.deleteResult),
    };
}

type CreateProcedureBuilderWithInputOutput<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    Os extends OsBuilder,
> = ReturnType<
    typeof createProcedureBuilderWithInputOutput<T, ID, C, U, W, Os>
>;
export function createPrismaRouterHandler<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    ModelName extends Prisma.ModelName,
>(
    collectionSchema: CollectionSchema<T, ID, C, U, W>,
    prisma: PrismaClient,
    modelName: Uncapitalize<ModelName>
) {
    return {
        create: createHandlerCreate<T, ID, C, U, W, ModelName>(
            collectionSchema,
            prisma,
            modelName
        ),
        update: createHandlerUpdate<T, ID, C, U, W, ModelName>(
            collectionSchema,
            prisma,
            modelName
        ),
        delete: createHandlerDelete<T, ID, C, U, W, ModelName>(
            collectionSchema,
            prisma,
            modelName
        ),
        findMany: createHandlerFindMany<T, ID, C, U, W, ModelName>(
            collectionSchema,
            prisma,
            modelName
        ),
        findOne: createHandlerFindOne<T, ID, C, U, W, ModelName>(
            collectionSchema,
            prisma,
            modelName
        ),
    };
}
export function createHandlerCreate<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    ModelName extends Prisma.ModelName,
>(
    collectionSchema: CollectionSchema<T, ID, C, U, W>,
    prisma: PrismaClient,
    modelName: Uncapitalize<ModelName>
) {
    type Model = Prisma.TypeMap["model"][ModelName];
    const model = prisma[modelName];
    if (!model) {
        throw new Error(`Model ${modelName} not found in PrismaClient`);
    }
    return function handlerCreate({
        input,
    }: {
        input: z.infer<typeof collectionSchema.createArg>;
    }) {
        const data = input as Model["operations"]["create"]["args"]["data"];
        // @ts-ignore
        return model.create({
            data,
        }) as Promise<z.infer<typeof collectionSchema.createResult>>;
    };
}

export function createHandlerUpdate<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    ModelName extends Prisma.ModelName,
>(
    collectionSchema: CollectionSchema<T, ID, C, U, W>,
    prisma: PrismaClient,
    modelName: Uncapitalize<ModelName>
) {
    type Model = Prisma.TypeMap["model"][ModelName];
    const model = prisma[modelName];
    if (!model) {
        throw new Error(`Model ${modelName} not found in PrismaClient`);
    }
    return function handlerUpdate({
        input,
    }: {
        input: z.infer<typeof collectionSchema.updateArg>;
    }) {
        const data = input as Model["operations"]["update"]["args"]["data"];
        // @ts-ignore
        return model.update({
            data,
        }) as Promise<z.infer<typeof collectionSchema.updateResult>>;
    };
}

export function createHandlerDelete<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    ModelName extends Prisma.ModelName,
>(
    collectionSchema: CollectionSchema<T, ID, C, U, W>,
    prisma: PrismaClient,
    modelName: Uncapitalize<ModelName>
) {
    const model = prisma[modelName];
    if (!model) {
        throw new Error(`Model ${modelName} not found in PrismaClient`);
    }
    return function handlerDelete({
        input,
    }: {
        input: z.infer<typeof collectionSchema.deleteArg>;
    }) {
        // @ts-ignore
        return model.delete({
            where: input,
        }) as Promise<z.infer<typeof collectionSchema.deleteResult>>;
    };
}

export function createHandlerFindMany<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    ModelName extends Prisma.ModelName,
>(
    collectionSchema: CollectionSchema<T, ID, C, U, W>,
    prisma: PrismaClient,
    modelName: Uncapitalize<ModelName>
) {
    const model = prisma[modelName];
    if (!model) {
        throw new Error(`Model ${modelName} not found in PrismaClient`);
    }
    return async function handlerFindMany({
        input,
    }: {
        input: z.infer<typeof collectionSchema.findManyArg>;
    }) {
        const { where, orderBy, pageSize, page } = input;
        let skip = 0;
        if (page && pageSize) {
            skip = (page - 1) * pageSize;
        }
        // @ts-ignore
        const items = (await model.findMany({
            where,
            orderBy,
            take: pageSize,
            skip,
        })) as z.infer<typeof collectionSchema.findManyResult>["items"];

        // @ts-ignore
        const count = (await model.count({
            where,
        })) as z.infer<typeof collectionSchema.findManyResult>["count"];

        return {
            items,
            page: page || 1,
            pageSize: pageSize || items.length,
            count,
        };
    };
}

export function createHandlerFindOne<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    ModelName extends Prisma.ModelName,
>(
    collectionSchema: CollectionSchema<T, ID, C, U, W>,
    prisma: PrismaClient,
    modelName: Uncapitalize<ModelName>
) {
    const model = prisma[modelName];
    if (!model) {
        throw new Error(`Model ${modelName} not found in PrismaClient`);
    }
    return async function handlerFindOne({
        input,
    }: {
        input: z.infer<typeof collectionSchema.findOneArg>;
    }) {
        // @ts-ignore
        return (await model.findUnique({
            where: input,
        })) as z.infer<typeof collectionSchema.findOneResult>;
    };
}

export function createCollectionRouter<
    T extends Record<string, any>,
    ID extends z.ZodType<any>,
    C extends z.ZodType<any>,
    U extends z.ZodType<any>,
    W extends z.ZodType<any>,
    Os extends OsBuilder,
    R,
>(
    options: CollectionRouterOptions<CollectionSchema<T, ID, C, U, W>, Os>,
    router: (option: {
        os: CreateProcedureBuilderWithInputOutput<T, ID, C, U, W, Os>;
    }) => R
): R {
    const { schema, os } = options;
    return router({ os: createProcedureBuilderWithInputOutput(schema, os) });
}
