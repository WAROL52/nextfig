"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { usePaginationSearchParams } from "./search-params.pagination";

export type PaginationSearchParamsProps = {
    totalPages: number;
    showLeftEllipsis?: boolean;
    showRightEllipsis?: boolean;
};

export function PaginationSearchParams({
    totalPages,
    showLeftEllipsis = true,
    showRightEllipsis = true,
}: PaginationSearchParamsProps) {
    const [{ pageIndex, pageSize }, setPagination] =
        usePaginationSearchParams();
    const currentPage = pageIndex + 1;
    const pages = Array.from({ length: 5 }, (_, i) => i + pageIndex);
    return (
        <div className="flex w-full items-center justify-between gap-3">
            {/* Page number information */}
            <p
                className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
                aria-live="polite"
            >
                Page <span className="text-foreground">{currentPage}</span> of{" "}
                <span className="text-foreground">{totalPages}</span>
            </p>

            {/* Pagination */}
            <div className="grow">
                <Pagination>
                    <PaginationContent>
                        {/* Previous page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={
                                    currentPage === 1
                                        ? undefined
                                        : `#/page/${currentPage - 1}`
                                }
                                aria-label="Go to previous page"
                                aria-disabled={
                                    currentPage === 1 ? true : undefined
                                }
                                role={currentPage === 1 ? "link" : undefined}
                            >
                                <ChevronLeftIcon size={16} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Left ellipsis (...) */}
                        {showLeftEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Page number links */}
                        {pages.map((page) => (
                            <PaginationItem key={page * pageSize}>
                                <PaginationLink
                                    onClick={() =>
                                        setPagination({
                                            pageIndex: page,
                                            pageSize,
                                        })
                                    }
                                    isActive={page === currentPage - 1}
                                >
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Right ellipsis (...) */}
                        {showRightEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Next page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={
                                    currentPage === totalPages
                                        ? undefined
                                        : `#/page/${currentPage + 1}`
                                }
                                aria-label="Go to next page"
                                aria-disabled={
                                    currentPage === totalPages
                                        ? true
                                        : undefined
                                }
                                role={
                                    currentPage === totalPages
                                        ? "link"
                                        : undefined
                                }
                            >
                                <ChevronRightIcon
                                    size={16}
                                    aria-hidden="true"
                                />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Results per page */}
            <div className="flex flex-1 justify-end">
                <Select
                    value={String(pageSize)}
                    onValueChange={(value) =>
                        setPagination({ pageIndex: 0, pageSize: Number(value) })
                    }
                    aria-label="Results per page"
                >
                    <SelectTrigger
                        id="results-per-page"
                        className="w-fit whitespace-nowrap"
                    >
                        <SelectValue placeholder="Select number of results" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 / page</SelectItem>
                        <SelectItem value="20">20 / page</SelectItem>
                        <SelectItem value="50">50 / page</SelectItem>
                        <SelectItem value="100">100 / page</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
