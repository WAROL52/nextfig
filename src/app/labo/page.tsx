import { orpc } from "@/lib/orpc";
import { HydrateClient, getQueryClient } from "@/lib/query/hydration";

import { ClientComponent } from "./client-component";
import { buildPrismaWhere } from "./ressource";
import { RessourceProvider } from "./ressource-store";

type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;
    const where = buildPrismaWhere(params, {
        email: "string",
        name: "string",
    });
    const queryClient = getQueryClient();

    console.log("Search Params:", params);
    console.log("Prisma Where:", where);

    queryClient.prefetchQuery(
        orpc.user.list.queryOptions({
            input: {
                where,
            },
        })
    );

    return (
        <div>
            <RessourceProvider>
                <HydrateClient client={queryClient}>
                    <ClientComponent />
                </HydrateClient>
            </RessourceProvider>
        </div>
    );
}
