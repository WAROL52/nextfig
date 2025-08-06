"use client";

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc";

import { ResourceFilter } from "./resource-filter";
import { useFiltersToPrismaWhere } from "./use-filters-to-prisma-where";

export type ClientComponentProps = {};

export function ClientComponent({}: ClientComponentProps) {
    const { filters, setFilters, where } = useFiltersToPrismaWhere([
        "email",
        "name",
    ]);
    console.log("Filters:", filters);
    console.log("Where clause:", where);

    const query = useQuery(
        orpc.user.list.queryOptions({
            input: { where },
        })
    );
    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error: {query.error.message}</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <div>
                <ResourceFilter
                    fields={["email", "name"]}
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
            <ul>
                {query.data!.map((user) => (
                    <li key={user.id}>
                        {user.email} - {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
