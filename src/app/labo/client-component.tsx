"use client";

import { useQuery } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";

import { orpc } from "@/lib/orpc";

export type ClientComponentProps = {};

export function ClientComponent({}: ClientComponentProps) {
    const sortOrder = ["asc", "desc"] as const;

    // Then pass it to the parser

    const [emailOrder, setEmailOrder] = useQueryState(
        "emailOrder",
        parseAsStringLiteral(sortOrder).withDefault("asc")
    );
    const query = useQuery(
        orpc.user.list.queryOptions({
            input: {
                orderBy: {
                    email: emailOrder,
                },
            },
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
            <Button
                onClick={() =>
                    setEmailOrder(emailOrder === "asc" ? "desc" : "asc")
                }
            >
                Order by Email: {emailOrder}
            </Button>
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
