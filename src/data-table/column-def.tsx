import { ColumnDef } from "@tanstack/react-table";
import {
    Calendar1Icon,
    HashIcon,
    LetterTextIcon,
    SigmaIcon,
    ToggleRightIcon,
} from "lucide-react";
import z from "zod";

import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Skeleton } from "@/components/ui/skeleton";

function ColumnIcon({ type }: { type: z.ZodType<any> }) {
    if (type instanceof z.ZodString) {
        return <LetterTextIcon />;
    }
    if (type instanceof z.ZodNumber) {
        return <HashIcon />;
    }
    if (type instanceof z.ZodBoolean) {
        return <ToggleRightIcon />;
    }
    if (type instanceof z.ZodDate) {
        return <Calendar1Icon />;
    }
    if (type instanceof z.ZodArray) {
        return <HashIcon />;
    }
    if (type instanceof z.ZodObject) {
        return <HashIcon />;
    }
    if (type instanceof z.ZodEnum) {
        return <SigmaIcon />;
    }
    return undefined;
}
export function createColumnDef<T extends Record<string, any>>(
    schema: z.ZodType<T>
): ColumnDef<T>[] {
    if (!schema || !(schema instanceof z.ZodObject)) {
        throw new Error("Invalid schema provided to createColumnDef");
    }
    const shape = (schema as z.ZodObject<T>).shape as Record<
        keyof T,
        z.ZodType<any>
    >;
    const fields = Object.keys(shape) as (keyof T)[];
    return fields.map((field) => {
        return {
            accessorKey: field,
            header: ({ column }) => {
                return (
                    <DataGridColumnHeader
                        title={String(field)}
                        visibility={true}
                        column={column}
                        icon={<ColumnIcon type={shape[field]} />}
                    />
                );
            },

            cell: (info) => {
                const value = info.getValue();
                return typeof value === "string"
                    ? value
                    : JSON.stringify(value);
            },
            meta: {
                skeleton: <Skeleton className="h-7 w-28" />,
            },
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        } as ColumnDef<T> & { accessorKey: keyof T };
    });
}
