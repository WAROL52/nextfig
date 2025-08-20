"use client";

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc";

import { createColumnDef } from "@/data-table/column-def";
import { todoSchema } from "@/schemas/todo.schema";

import { DataTable } from "./data-table";

const todoColumn = createColumnDef(todoSchema.schema);

export type DataTableLaboProps = {};

export function DataTableLabo({}: DataTableLaboProps) {
    const { data: result } = useQuery(orpc.todo.findMany.queryOptions({}));
    const data = result?.items || [];
    return (
        <div>
            <DataTable columns={todoColumn} data={data} />
        </div>
    );
}
