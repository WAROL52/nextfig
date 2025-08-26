import { CellContext, ColumnDef } from "@tanstack/react-table";
import {
    Calendar1Icon,
    HashIcon,
    LetterTextIcon,
    SigmaIcon,
    ToggleRightIcon,
} from "lucide-react";
import z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

function ColumnIcon({ type }: { type: z.ZodType<any> }) {
    if (isZodTypeString(type)) {
        return <LetterTextIcon />;
    }
    if (isZodTypeNumber(type)) {
        return <HashIcon />;
    }
    if (isZodTypeBoolean(type)) {
        return <ToggleRightIcon />;
    }
    if (isZodTypeDate(type)) {
        return <Calendar1Icon />;
    }
    if (isZodTypeArray(type)) {
        return <HashIcon />;
    }
    if (isZodTypeObject(type)) {
        return <HashIcon />;
    }
    if (isZodTypeEnum(type)) {
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

            cell: renderCell(shape[field]),
            meta: {
                skeleton: <Skeleton className="h-7 w-28" />,
            },
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        } as ColumnDef<T> & { accessorKey: keyof T };
    });
}
function renderCell(cellType: z.ZodTypeAny) {
    return function render<T>(cell: CellContext<T, unknown>) {
        if (isZodTypeString(cellType)) {
            return renderStringCell(cell)();
        }
        if (isZodTypeNumber(cellType)) {
            return renderNumberCell(cell)();
        }
        if (isZodTypeBoolean(cellType)) {
            return renderBooleanCell(cell)();
        }
        if (isZodTypeDate(cellType)) {
            return renderDateCell(cell)();
        }
        if (isZodTypeEnum(cellType)) {
            return renderEnumCell(cell)();
        }
        if (isZodTypeArray(cellType)) {
            return renderArrayCell(cell)();
        }
        if (isZodTypeObject(cellType)) {
            return renderObjectCell(cell)();
        }
        const value = cell.getValue();
        return typeof value === "string" ? value : JSON.stringify(value);
    };
}
function renderStringCell(cell: CellContext<any, unknown>) {
    return function render() {
        const value = cell.getValue();
        return typeof value === "string" ? value : JSON.stringify(value);
    };
}
function renderNumberCell(cell: CellContext<any, unknown>) {
    return function render() {
        const value = cell.getValue();
        return typeof value === "number" ? value : JSON.stringify(value);
    };
}
function renderBooleanCell(cell: CellContext<any, unknown>) {
    return function render() {
        const value = cell.getValue();
        return typeof value === "boolean"
            ? value
                ? "True"
                : "False"
            : JSON.stringify(value);
    };
}
function renderDateCell(cell: CellContext<any, unknown>) {
    return function Render() {
        const date = new Date(cell.getValue() as string);
        return (
            <Popover>
                <PopoverTrigger>
                    <Button variant="ghost" className="w-full justify-start">
                        {date.toLocaleDateString()}
                    </Button>
                </PopoverTrigger>
                <PopoverContent asChild className="z-50">
                    <Calendar
                        mode="single"
                        selected={date}
                        className="bg-background text-foreground rounded-lg border opacity-100"
                    />
                </PopoverContent>
            </Popover>
        );
    };
}
function renderEnumCell(cell: CellContext<any, unknown>) {
    return function render() {
        const value = cell.getValue();
        const valueFinal =
            typeof value === "string" ? value : JSON.stringify(value);
        return <Badge variant={"outline"}>{valueFinal}</Badge>;
    };
}
function renderArrayCell(cell: CellContext<any, unknown>) {
    return function render() {
        const value = cell.getValue();
        if (Array.isArray(value)) {
            return value.join(", ");
        }
        return JSON.stringify(value);
    };
}
function renderObjectCell(cell: CellContext<any, unknown>) {
    return function render() {
        const value = cell.getValue();
        if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        }
        return String(value);
    };
}

function isZodTypeString(type: z.ZodTypeAny) {
    if (type instanceof z.ZodString) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeString(type._def.innerType);
    }
    return false;
}
function isZodTypeNumber(type: z.ZodTypeAny) {
    if (type instanceof z.ZodNumber) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeNumber(type._def.innerType);
    }
    return false;
}
function isZodTypeBoolean(type: z.ZodTypeAny) {
    if (type instanceof z.ZodBoolean) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeBoolean(type._def.innerType);
    }
    return false;
}
function isZodTypeDate(type: z.ZodTypeAny) {
    if (type instanceof z.ZodDate) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeDate(type._def.innerType);
    }
    return false;
}
function isZodTypeEnum(type: z.ZodTypeAny) {
    if (type instanceof z.ZodEnum) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeEnum(type._def.innerType);
    }
    return false;
}
function isZodTypeArray(type: z.ZodTypeAny) {
    if (type instanceof z.ZodArray) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeArray(type._def.innerType);
    }
    return false;
}
function isZodTypeObject(type: z.ZodTypeAny) {
    if (type instanceof z.ZodObject) {
        return true;
    }
    if (type instanceof z.ZodOptional || type instanceof z.ZodNullable) {
        return isZodTypeObject(type._def.innerType);
    }
    return false;
}
