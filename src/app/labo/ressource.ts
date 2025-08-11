type PrismaFilterArg = Record<string, any>;
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
export const operatorType = [
    "string",
    "number",
    "boolean",
    "date",
    "enum",
    "json",
    "list",
] as const;

export const operatorMap: RessourceFilter.OperatorMap = {
    boolean: [op.equals, op.not],
    date: [op.equals, op.in, op.notIn, op.lt, op.lte, op.gte, op.gt, op.not],
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
    ],
    number: [op.equals, op.in, op.notIn, op.lt, op.lte, op.gt, op.gte, op.not],
    enum: [op.equals, op.in, op.notIn, op.not],
    json: [op.has, op.hasEvery, op.hasSome, op.isEmpty],
    list: [op.has, op.hasEvery, op.hasSome, op.isEmpty],
};

export namespace RessourceFilter {
    export type OperatorType = (typeof operatorType)[number];
    export type OperatorKey = keyof typeof op;
    export type Operator = (typeof op)[OperatorKey];
    export type FieldMap = Record<string, OperatorType>;
    export type OperatorMap = Record<OperatorType, Operator[]>;
}
export const allOperators = Object.values(op);
export function buildPrismaWhere(
    params: Record<string, string | string[] | undefined>,
    fieldTypes: RessourceFilter.FieldMap
): PrismaFilterArg {
    const where: PrismaFilterArg = {};
    for (const [key, value] of Object.entries(params)) {
        if (!value) continue;
        // Gérer les opérateurs : ex. age[gte]
        const match = key.match(/^(\w+)\[(\w+)\]$/);
        if (match) {
            const [, field, operator] = match as [
                string,
                string,
                RessourceFilter.OperatorKey,
            ];
            if (!fieldTypes || !fieldTypes[field]) {
                continue;
            }
            const parsedValue = Array.isArray(value)
                ? value.map((v) => parseValue(v, fieldTypes[field]))
                : parseValue(value, fieldTypes[field]);
            if (
                allOperators.includes(operator) &&
                fieldTypes &&
                fieldTypes[field] &&
                operatorMap[fieldTypes[field]]?.includes(operator)
            ) {
                if (!where[field]) where[field] = {};
                where[field][operator] = parsedValue;
            }
        }
    }
    return where;
}
function parseValue(
    value: string,
    type: RessourceFilter.OperatorType
): string | number | boolean | Date | undefined {
    if (type === "boolean") {
        return value === "true";
    } else if (type === "number") {
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    } else if (type === "date") {
        return new Date(value);
    }
    // Pour les types string, enum, json, list, on retourne la valeur telle quelle
    return value;
}

/**
 * 
 * 
 * 
 * 

On dérive selon la présentation des options :

SelectFilter.Basic → simple liste déroulante

SelectFilter.Searchable → liste avec champ de recherche

SelectFilter.Multi → multi-sélection

SelectFilter.WithIcons → options avec icônes

SelectFilter.Grouped → options regroupées par catégorie

2️⃣ Pour ComparisonFilter
On dérive selon le type d’entrée et d’opérateur :

ComparisonFilter.Text → opérateurs : contains, startsWith, endsWith, equals

ComparisonFilter.Number → opérateurs : =, <, <=, >, >=, between

ComparisonFilter.Date → opérateurs : before, after, between, today

ComparisonFilter.Boolean → opérateurs : is true, is false

ComparisonFilter.RangeSlider → plage numérique avec curseurs

 */
