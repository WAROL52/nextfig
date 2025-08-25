"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
};

export function PaginationSearchParams({
    totalPages,
}: PaginationSearchParamsProps) {
    const [{ pageIndex, pageSize }, setPagination] =
        usePaginationSearchParams();
    const currentPage = pageIndex + 1;
    const length = totalPages > 5 ? 5 : totalPages;
    const start = Math.max(
        0,
        Math.min(currentPage - Math.ceil(length / 2), totalPages - length)
    );
    const pages = Array.from({ length }, (_, i) => i + start);
    const showLeftEllipsis = start > 0 && totalPages > length;
    const showRightEllipsis =
        start + length < totalPages && totalPages > length;
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setPagination({ pageIndex: pageIndex + 1, pageSize });
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setPagination({ pageIndex: pageIndex - 1, pageSize });
        }
    };
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
                            <Button
                                asChild
                                variant="ghost"
                                onClick={handlePreviousPage}
                                size="sm"
                                className="cursor-pointer"
                            >
                                <PaginationLink
                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                    aria-label="Go to previous page"
                                    aria-disabled={
                                        currentPage === 1 ? true : undefined
                                    }
                                    role={
                                        currentPage === 1 ? "link" : undefined
                                    }
                                >
                                    <ChevronLeftIcon
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </PaginationLink>
                            </Button>
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
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-pointer"
                                >
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
                                </Button>
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
                            <Button
                                asChild
                                variant="ghost"
                                onClick={handleNextPage}
                                size="sm"
                                className="cursor-pointer"
                            >
                                <PaginationLink
                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
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
                            </Button>
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
