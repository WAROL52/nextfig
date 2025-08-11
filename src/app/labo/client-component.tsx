"use client";

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc";

import { ResourceFilter } from "./resource-filter";
import { RessourceFilter } from "./ressource";
import {
    useRessourceFilterContext,
    useRessourceFilterWhereClause,
} from "./ressource-store";

export type ClientComponentProps = {};

export function ClientComponent({}: ClientComponentProps) {
    const fieldMap: RessourceFilter.FieldMap = {
        email: "string",
        name: "string",
    };
    const { where: where } = useRessourceFilterWhereClause(fieldMap);
    console.log("Filter Where Clause:", where);

    const query = useQuery(
        orpc.user.list.queryOptions({
            input: { where },
        })
    );

    if (query.isError) {
        return <div>Error: {query.error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1>Users {query.isLoading ? "Loading..." : ""} </h1>

            <div>
                <ResourceFilterController fieldMap={fieldMap} />
            </div>
            <ul>
                {query.data?.map((user) => (
                    <li key={user.id}>
                        {user.email} - {user.name}
                    </li>
                ))}
            </ul>
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
