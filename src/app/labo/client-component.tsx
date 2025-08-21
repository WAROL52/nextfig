"use client";

import { DataTableLabo } from "./data-table-labo";
import { ResourceFilter } from "./resource-filter";
import { RessourceFilter } from "./ressource";
import { useRessourceFilterContext } from "./ressource-store";

export type ClientComponentProps = {};

export function ClientComponent({}: ClientComponentProps) {
    return (
        <div className="container mx-auto p-4">
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
