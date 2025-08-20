"use client";

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc";

import { DataTableLabo } from "./data-table-labo";
import { ResourceFilter } from "./resource-filter";
import { RessourceFilter } from "./ressource";
import {
    useRessourceFilterContext,
    useRessourceFilterWhereClause,
} from "./ressource-store";

export type ClientComponentProps = {};

export function ClientComponent({}: ClientComponentProps) {
    const fieldMap: RessourceFilter.FieldMap = {
        title: "string",
        description: "string",
        status: "enum",
    };
    const { where: where } = useRessourceFilterWhereClause(fieldMap);
    console.log("Filter Where Clause:", where);

    const query = useQuery(orpc.todo.findMany.queryOptions({}));

    if (query.isError) {
        return <div>Error: {query.error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1>Users {query.isLoading ? "Loading..." : ""} </h1>
            <DataTableLabo />
            {/* <div>
                <ResourceFilterController fieldMap={fieldMap} />
                {query.data?.page}-{query.data?.pageSize}/
                {query.data?.count._all}
            </div>
            <ul>
                {query.data?.items?.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} - {todo.status}
                    </li>
                ))}
            </ul> */}
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
