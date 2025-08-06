import { orpc } from "@/lib/orpc";
import { HydrateClient, getQueryClient } from "@/lib/query/hydration";

import { ClientComponent } from "./client-component";

type PageProps = {
    searchParams: Promise<{
        emailOrder: "asc" | "desc" | undefined;
    }>;
};

export default async function Page({ searchParams }: PageProps) {
    const { emailOrder } = await searchParams;
    const queryClient = getQueryClient();

    queryClient.prefetchQuery(
        orpc.user.list.queryOptions({
            input: {
                orderBy: {
                    email: emailOrder,
                },
            },
        })
    );

    return (
        <div>
            <HydrateClient client={queryClient}>
                <ClientComponent />
            </HydrateClient>
        </div>
    );
}
