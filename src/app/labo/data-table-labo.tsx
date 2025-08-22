"use client";

import { useQuery } from "@tanstack/react-query";
import {
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardFooter,
    CardHeader,
    CardTable,
    CardTitle,
    CardToolbar,
} from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { orpc } from "@/lib/orpc";

import { createColumnDef } from "@/data-table/column-def";
import { todoSchema } from "@/schemas/todo.schema";

import { usePaginationSearchParams } from "./search-params.pagination";

const todoColumn = createColumnDef(todoSchema.schema);

export type DataTableLaboProps = {};

export function DataTableLabo({}: DataTableLaboProps) {
    const [pagination, setPagination] = usePaginationSearchParams();
    const [pageIndex, setPageIndex] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([
        { id: "status", desc: true },
    ]);

    const {
        data: result,
        isPending,
        isLoading,
    } = useQuery(
        orpc.todo.findMany.queryOptions({
            context: { cache: true },
            input: {
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            },
        })
    );
    const data = result?.items || [];
    const columns = useMemo(() => todoColumn, []);
    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((column) => column.id as string)
    );
    const recordCount = result?.count._all || 0;
    const table = useReactTable({
        columns,
        data: data,
        pageCount: Math.ceil(recordCount / pagination.pageSize),
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
            columnOrder,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <div>
            <DataGrid
                table={table}
                recordCount={recordCount}
                isLoading={isLoading}
                tableLayout={{
                    headerSticky: true,
                    columnsPinnable: true,
                    columnsResizable: true,
                    columnsMovable: true,
                    columnsVisibility: true,
                }}
            >
                <Card>
                    <CardHeader className="py-3">
                        <CardTitle>
                            Todo{" "}
                            <Button onClick={() => setPageIndex(pageIndex + 1)}>
                                pageIndex {pageIndex}
                            </Button>
                            data size {data.length}{" "}
                            <pre>
                                {JSON.stringify(pagination, null, 2)}
                            </pre>{" "}
                        </CardTitle>
                        <CardToolbar>
                            <DataGridColumnVisibility
                                table={table}
                                trigger={
                                    <Button variant="outline" size="sm">
                                        <Settings2 />
                                        Columnss
                                    </Button>
                                }
                            />
                        </CardToolbar>
                    </CardHeader>
                    <CardTable className="bg-background">
                        <ScrollArea className="max-h-[75svh]">
                            <DataGridTable />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardTable>
                    <CardFooter>
                        <DataGridPagination />
                    </CardFooter>
                </Card>
            </DataGrid>
        </div>
    );
}
