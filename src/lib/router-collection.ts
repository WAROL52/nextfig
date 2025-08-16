import { ErrorMap, ProcedureHandler, os } from "@orpc/server";
import z from "zod";

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
    TOne,
    TFindMany,
    TFindOne,
    TCreate,
    TUpdate,
    TDelete,
> = {
    one: z.ZodType<TOne>;
    many: z.ZodArray<z.ZodType<TOne>>;
    createArg: z.ZodType<TCreate>;
    updateArg: z.ZodType<TUpdate>;
    deleteArg: z.ZodType<TDelete>;
    findManyArg: z.ZodType<TFindMany>;
    findOneArg: z.ZodType<TFindOne>;
};

export type CollectionSchemaAny = CollectionSchema<
    any,
    any,
    any,
    any,
    any,
    any
>;
export function createCollectionSchema2<
    T extends z.ZodRawShape,
    C extends z.ZodType,
    TId extends z.ZodType,
    UnknownKeys extends z.UnknownKeysParam = z.UnknownKeysParam,
    Catchall extends z.ZodTypeAny = z.ZodTypeAny,
>(
    schema: z.ZodObject<T, UnknownKeys, Catchall>,
    createSchema: C,
    idSchema: TId
) {
    const idArg = z.object({
        id: idSchema,
    });
    const fields = Object.keys(schema.shape) as [keyof T & string];
    const errorSchema = z.object({
        message: z.string(),
        details: z.array(z.string()).optional(),
        code: z.string(),
    });
    const schemaWithError = schema.or(errorSchema);

    return {
        one: schema,
        createArg: createSchema,
        createResult: schemaWithError,
        updateArg: z.object({
            id: idSchema,
            data: schema.partial() as z.ZodObject<
                {
                    [k in keyof T]: z.ZodOptional<T[k]>;
                },
                UnknownKeys,
                Catchall
            >,
        }),
        updateResult: schemaWithError,
        deleteArg: idArg,
        deleteResult: schemaWithError,
        findManyArg: z.object({
            where: z
                .object(
                    Object.fromEntries(
                        fields.map((field) => {
                            let type: (typeof operatorType)[number] = "string";
                            if (schema.shape[field] instanceof z.ZodString) {
                                type = "string";
                            } else if (
                                schema.shape[field] instanceof z.ZodNumber
                            ) {
                                type = "number";
                            } else if (
                                schema.shape[field] instanceof z.ZodBoolean
                            ) {
                                type = "boolean";
                            } else if (
                                schema.shape[field] instanceof z.ZodDate
                            ) {
                                type = "date";
                            } else if (
                                schema.shape[field] instanceof z.ZodEnum
                            ) {
                                type = "enum";
                            } else if (
                                schema.shape[field] instanceof z.ZodArray ||
                                schema.shape[field] instanceof z.ZodSet
                            ) {
                                type = "list";
                            } else if (
                                schema.shape[field] instanceof z.ZodObject ||
                                schema.shape[field] instanceof z.ZodRecord
                            ) {
                                type = "json";
                            }
                            const typeSchema = operatorMapShape[type];
                            return [
                                field as keyof T,
                                z.record(typeSchema, z.string()),
                            ];
                        })
                    )
                )
                .optional(),
            orderBy: z.object({
                field: z.enum(fields),
                direction: z.enum(["asc", "desc"]),
            }),
            page: z.number().optional(),
            pageSize: z.number().optional(),
        }),
        findManyResult: z.object({
            items: z.array(schema),
            totalCount: z.number(),
            page: z.number(),
            pageSize: z.number(),
        }),
        findOneArg: idArg,
        findOneResult: schemaWithError.or(z.null()),
    };
}
export function createCollectionSchema<
    TOne,
    TFindMany,
    TFindOne,
    TCreate,
    TUpdate,
    TDelete,
>(
    schema: CollectionSchema<
        TOne,
        TFindMany,
        TFindOne,
        TCreate,
        TUpdate,
        TDelete
    >
) {
    return schema;
}
type OsBuilder = typeof os;
export type CollectionRouterOptions<
    TSchema extends CollectionSchemaAny,
    Os extends OsBuilder,
> = {
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
    findMany: ProcedureHandlerType<Os, TSchema["findManyArg"], TSchema["many"]>;
    findOne: ProcedureHandlerType<Os, TSchema["findOneArg"], TSchema["one"]>;
};
function createProcedureBuilderWithInputOutput<
    TOne,
    TFindMany,
    TFindOne,
    TCreate,
    TUpdate,
    TDelete,
    Os extends OsBuilder,
>(
    schema: CollectionSchema<
        TOne,
        TFindMany,
        TFindOne,
        TCreate,
        TUpdate,
        TDelete
    >,
    os: Os
) {
    return {
        create: os.input(schema.createArg).output(schema.one),
        update: os.input(schema.updateArg).output(schema.one),
        delete: os.input(schema.deleteArg).output(schema.one),
        findMany: os.input(schema.findManyArg).output(schema.many),
        findOne: os.input(schema.findOneArg).output(schema.one.or(z.null())),
    };
}
type CreateProcedureBuilderWithInputOutput<
    TOne,
    TFindMany,
    TFindOne,
    TCreate,
    TUpdate,
    TDelete,
    Os extends OsBuilder,
> = ReturnType<
    typeof createProcedureBuilderWithInputOutput<
        TOne,
        TFindMany,
        TFindOne,
        TCreate,
        TUpdate,
        TDelete,
        Os
    >
>;

export function createCollectionRouter<
    TOne,
    TFindMany,
    TFindOne,
    TCreate,
    TUpdate,
    TDelete,
    Os extends OsBuilder,
    T,
>(
    options: CollectionRouterOptions<
        CollectionSchema<TOne, TFindMany, TFindOne, TCreate, TUpdate, TDelete>,
        Os
    >,
    router: (option: {
        os: CreateProcedureBuilderWithInputOutput<
            TOne,
            TFindMany,
            TFindOne,
            TCreate,
            TUpdate,
            TDelete,
            Os
        >;
    }) => T
): T {
    const { schema, os } = options;
    return router({ os: createProcedureBuilderWithInputOutput(schema, os) });
}
