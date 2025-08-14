import { ErrorMap, ProcedureHandler, os } from "@orpc/server";
import z from "zod";
import { util } from "zod/v4/core";

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
    Mask extends util.Exactly<
        {
            [k in keyof T]?: true;
        },
        Mask
    >,
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
    return {
        one: schema,
        many: z.array(schema),
        createArg: createSchema,
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
        deleteArg: idArg,
        findManyArg: schema,
        findOneArg: idArg,
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
