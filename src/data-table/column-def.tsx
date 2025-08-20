import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export function createColumnDef<T extends Record<string, any>>(
    schema: z.ZodType<T>
): ColumnDef<T>[] {
    if (!schema || !(schema instanceof z.ZodObject)) {
        throw new Error("Invalid schema provided to createColumnDef");
    }
    const shape = schema.shape;
    const fields = Object.keys(shape) as (keyof T)[];
    return fields.map((field) => {
        return {
            accessorKey: field,
            header: field,
            cell: (info) => {
                const value = info.getValue();
                return typeof value === "string"
                    ? value
                    : JSON.stringify(value);
            },
        } as ColumnDef<T> & { accessorKey: keyof T };
    });
}
