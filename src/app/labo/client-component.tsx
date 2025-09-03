"use client";

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc";

import { createColumnDef } from "@/data-table/column-def";
import { RessourceTable } from "@/ressources/components/ressource-table";
import { todoSchema } from "@/schemas/todo.schema";

import { useSearchRessource } from "./input-search-ressource";
import { ResourceFilter } from "./resource-filter";
import { RessourceFilter } from "./ressource";
import { useRessourceFilterContext } from "./ressource-store";
import { usePaginationSearchParams } from "./search-params.pagination";

export type ClientComponentProps = {};

export function ClientComponent({}: ClientComponentProps) {
    const [pagination] = usePaginationSearchParams();
    const { debouncedSearch } = useSearchRessource();
    const { data: result, isLoading } = useQuery(
        orpc.todo.findMany.queryOptions({
            context: { cache: true },
            input: {
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                search: debouncedSearch,
            },
        })
    );
    const data = result?.items || [];
    const pageCount = Math.ceil(
        (result?.count._all || 0) / pagination.pageSize
    );
    return (
        <div className="container mx-auto p-4">
            <RessourceTable
                columns={createColumnDef(todoSchema.schema)}
                data={data}
                pageCount={pageCount}
                isLoading={isLoading}
                pagination={pagination}
                title="Todos"
                description="Manage your Todos"
            />
        </div>
    );
}

function ResourceFilterController({
    fieldMap,
}: {
    fieldMap: RessourceFilter.FieldMap;
}) {
    const ressourceFilter = useRessourceFilterContext({ fieldMap });

    return <ResourceFilter {...ressourceFilter} />;
}
