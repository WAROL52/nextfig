"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PropsWithChildren, useState } from "react";

import { createQueryClient } from "@/lib/query/client";

export type QueryProviderProps = PropsWithChildren;

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(() => createQueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
