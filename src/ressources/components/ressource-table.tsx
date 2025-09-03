"use client";

import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { FilterIcon, Settings2 } from "lucide-react";

import { ReactNode, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTable,
    CardTitle,
    CardToolbar,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataGrid } from "@/components/ui/data-grid";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { InputSearchRessource } from "@/app/labo/input-search-ressource";
import { PaginationSearchParams } from "@/app/labo/pagination-search-params";

export type RessourceTableProps<T extends Record<string, any>> = {
    columns: ColumnDef<T>[];
    data: T[];
    pageCount: number;
    isLoading?: boolean;
    title?: ReactNode;
    description?: ReactNode;
    pagination?: PaginationState;
};

export function RessourceTable<T extends Record<string, any>>({
    columns,
    data,
    pageCount,
    isLoading,
    description,
    title,
    pagination,
}: RessourceTableProps<T>) {
    if (!pagination) pagination = { pageIndex: 0, pageSize: data.length };
    const [sorting, setSorting] = useState<SortingState>([
        { id: "status", desc: true },
    ]);

    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((column) => column.id as string)
    );
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    const handleStatusChange = (checked: boolean, value: string) => {
        setSelectedStatuses(
            (
                prev = [] // Default to an empty array
            ) => (checked ? [...prev, value] : prev.filter((v) => v !== value))
        );
    };
    const statusCounts = useMemo(() => {
        return data.reduce(
            (acc, item) => {
                acc[item.status] = (acc[item.status] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );
    }, [data]);
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Filter by status
            const matchesStatus =
                !selectedStatuses?.length ||
                selectedStatuses.includes(item.status);

            return matchesStatus;
        });
    }, [data, selectedStatuses]);
    const table = useReactTable({
        columns,
        data: filteredData,
        getRowId: (row) => row.id,
        state: {
            sorting,
            columnOrder,
            pagination,
        },
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
                recordCount={data.length}
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
                    <CardHeader className="mb-0 border-b-0">
                        <CardTitle>
                            <div>{title}</div>
                            <CardDescription>
                                <div>{description}</div>
                            </CardDescription>
                        </CardTitle>
                    </CardHeader>
                    <CardHeader className="mt-0 pb-0">
                        <CardTitle className="flex items-center gap-3">
                            <InputSearchRessource />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        <FilterIcon />
                                        Status
                                        {selectedStatuses.length > 0 && (
                                            <Badge
                                                size="sm"
                                                appearance="outline"
                                            >
                                                {selectedStatuses.length}
                                            </Badge>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-40 p-3"
                                    align="start"
                                >
                                    <div className="space-y-3">
                                        <div className="text-muted-foreground text-xs font-medium">
                                            Filters
                                        </div>
                                        <div className="space-y-3">
                                            {Object.keys(statusCounts).map(
                                                (status) => (
                                                    <div
                                                        key={status}
                                                        className="flex items-center gap-2.5"
                                                    >
                                                        <Checkbox
                                                            id={status}
                                                            checked={selectedStatuses.includes(
                                                                status
                                                            )}
                                                            onCheckedChange={(
                                                                checked
                                                            ) =>
                                                                handleStatusChange(
                                                                    checked ===
                                                                        true,
                                                                    status
                                                                )
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={status}
                                                            className="flex grow items-center justify-between gap-1.5 font-normal"
                                                        >
                                                            {status}
                                                            <span className="text-muted-foreground">
                                                                {
                                                                    statusCounts[
                                                                        status
                                                                    ]
                                                                }
                                                            </span>
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </CardTitle>
                        <CardToolbar>
                            <DataGridColumnVisibility
                                table={table}
                                trigger={
                                    <Button variant="outline" size="sm">
                                        <Settings2 />
                                        Columns
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
                        <PaginationSearchParams totalPages={pageCount} />
                    </CardFooter>
                </Card>
            </DataGrid>
        </div>
    );
}
