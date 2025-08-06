import { parseAsString, useQueryStates } from "nuqs";

import { useMemo } from "react";

import { buildPrismaWhere } from "./ressource";

type Operator =
    | "eq"
    | "like"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "gte"
    | "lte"
    | "gt"
    | "lt"
    | "in"
    | "not";

const operators: Operator[] = ["eq", "like", "lt", "lte", "gt", "gte"];
export function useFiltersToPrismaWhere(fields: string[]) {
    // Build query keys dynamically based on fields and operators
    const querySchema = useMemo(() => {
        const schema: Record<
            string,
            ReturnType<typeof parseAsString.withDefault>
        > = {};

        for (const field of fields) {
            for (const op of operators) {
                const key = `${field}[${op}]`;
                schema[key] = parseAsString.withDefault("");
            }
        }

        return schema;
    }, [fields]);

    // Hook de nuqs
    const [filters, setFilters] = useQueryStates(querySchema, {
        history: "push",
        shallow: false,
    });

    const where = useMemo(() => {
        return buildPrismaWhere(filters);
    }, [filters]);

    return {
        filters,
        setFilters,
        where,
    };
}
