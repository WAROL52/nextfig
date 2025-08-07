// components/ResourceFilter.tsx
"use client";

import { useMap } from "@mantine/hooks";
import {
    DeleteIcon,
    FilterXIcon,
    ListFilterIcon,
    PlusIcon,
} from "lucide-react";
import { ParserBuilder, SetValues, Values } from "nuqs";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { Operator } from "./use-filters-to-prisma-where";

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

// components/ResourceFilter.tsx

type Field = string;
interface ResourceFilterProps {
    fields: Field[];
    operators: Operator[];
    setFilters: SetValues<
        Record<
            string,
            Omit<ParserBuilder<string>, "parseServerSide"> & {
                readonly defaultValue: string;
                parseServerSide(value: string | string[] | undefined): string;
            }
        >
    >;
    filters: Values<
        Record<
            string,
            Omit<ParserBuilder<string>, "parseServerSide"> & {
                readonly defaultValue: string;
                parseServerSide(value: string | string[] | undefined): string;
            }
        >
    >;
}
type FilterItem = {
    field: string;
    value: string;
    show: boolean;
    operator: Operator;
};

export function ResourceFilter({
    fields,
    filters,
    setFilters,
    operators,
}: ResourceFilterProps) {
    const [selectedOperators, setSelectedOperators] = useState(
        Object.fromEntries(fields.map((field) => [field, operators]))
    );

    const addOperator = (field: string, operator: Operator) => {
        if (!selectedOperators[field]) {
            return;
        }
        if (selectedOperators[field].includes(operator)) {
            return; // Already selected
        }
        setSelectedOperators((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), operator],
        }));
    };

    const removeOperator = (field: string, operator: Operator) => {
        if (!selectedOperators[field]) {
            return;
        }
        if (!selectedOperators[field].includes(operator)) {
            return; // Not selected
        }
        // Otherwise, just remove the operator
        setSelectedOperators((prev) => ({
            ...prev,
            [field]: (prev[field] || []).filter((op) => op !== operator),
        }));
    };
    const getFirst = () => {
        // find fisrt field what has an operator
        const firstFieldWithOperator = Object.keys(selectedOperators).find(
            (field) => selectedOperators[field].length > 0
        );
        if (!firstFieldWithOperator) {
            return;
        }
        if (!selectedOperators[firstFieldWithOperator]) {
            return;
        }
        const firstOperator = selectedOperators[firstFieldWithOperator][0];
        if (!firstOperator) {
            return;
        }

        return {
            field: firstFieldWithOperator,
            operator: firstOperator,
        };
    };
    const first = getFirst();

    const map = useMap<number, FilterItem>([]);

    const fieldsHavingOperators = Object.keys(selectedOperators).filter(
        (field) => selectedOperators[field].length > 0
    );
    const addItem = () => {
        if (map.size === fields.length * operators.length) {
            return;
        }
        if (first) {
            removeOperator(first.field, first.operator);
            map.set((map.keys().toArray().at(-1) || 0) + 1, {
                field: first.field,
                value: "",
                show: true,
                operator: first.operator,
            });
        }
    };
    return (
        <div className="flex items-center justify-between space-x-2">
            <pre>{JSON.stringify(Array.from(map.entries()), null, 2)}</pre>
            <pre>{JSON.stringify(first, null, 2)}</pre>
            <Popover open>
                <PopoverTrigger>
                    <Button>
                        <ListFilterIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] space-y-3">
                    <div className="flex items-center justify-end space-x-2">
                        <span>
                            {map.size}/{fields.length * operators.length} filter
                            {map.size > 1 ? "s" : ""}
                        </span>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            onClick={() => map.clear()}
                        >
                            <FilterXIcon />
                        </Button>
                        <Button size={"sm"} onClick={addItem}>
                            <PlusIcon /> Add Filter
                        </Button>
                    </div>
                    <div className="mt-2 max-h-[300px] space-y-1 overflow-y-auto rounded-md border p-2">
                        {map.entries().map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center space-x-2"
                            >
                                <FilterField
                                    item={value}
                                    addOperator={addOperator}
                                    removeOperator={removeOperator}
                                    fieldsHavingOperators={
                                        fieldsHavingOperators
                                    }
                                    onItemChange={(item) => {
                                        map.set(key, item);
                                    }}
                                    operatorAvailable={
                                        selectedOperators[value.field] || []
                                    }
                                />
                                <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                    onClick={() => map.delete(key)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            <div>
                selectedOperators
                <pre>{JSON.stringify(selectedOperators, null, 2)}</pre>
                fields
                <pre>{JSON.stringify(fields, null, 2)}</pre>
            </div>
        </div>
    );
}

function FilterField({
    item,
    fieldsHavingOperators,
    addOperator,
    removeOperator,
    onItemChange,
    operatorAvailable,
}: {
    item: FilterItem;
    fieldsHavingOperators: string[];
    addOperator: (field: string, operator: Operator) => void;
    removeOperator: (field: string, operator: Operator) => void;
    onItemChange: (item: FilterItem) => void;
    operatorAvailable: Operator[];
}) {
    const fieldOptions = fieldsHavingOperators;
    if (!fieldOptions.includes(item.field)) {
        fieldOptions.unshift(item.field);
    }
    return (
        <div className="flex items-center space-x-2">
            <SelectField
                fieldOptions={fieldOptions}
                fieldValue={item.field}
                onChange={(value) => {
                    if (!value) return;
                    console.log("Selected field:", value, item.operator);

                    addOperator(item.field, item.operator);
                    removeOperator(value, item.operator);
                    item.field = value;
                    onItemChange(item);
                }}
            />
            <SelectOperator
                operators={operatorAvailable}
                value={item.operator}
                onChange={(value) => {
                    item.operator = value;
                    addOperator(item.field, item.operator);
                    removeOperator(item.field, value);
                    onItemChange(item);
                }}
            />
            <InputQuery field={item.field} operator={item.operator} />
        </div>
    );
}

const Square = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <span
        data-square
        className={cn(
            "bg-muted text-muted-foreground flex size-5 items-center justify-center rounded text-xs font-medium",
            className
        )}
        aria-hidden="true"
    >
        {children}
    </span>
);

function SelectField({
    fieldOptions,
    fieldValue,
    onChange,
}: {
    fieldOptions: string[];
    fieldValue: string;
    onChange?: (value: string) => void;
}) {
    return (
        <div className="*:not-first:mt-2">
            <Select value={fieldValue} onValueChange={onChange}>
                <SelectTrigger className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0">
                    <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                    <SelectGroup>
                        <SelectLabel className="ps-2">
                            Impersonate user
                        </SelectLabel>
                        {fieldOptions.sort().map((field) => (
                            <SelectItem key={field} value={field}>
                                <Square className="bg-blue-400/20 text-blue-500">
                                    {field[0].toUpperCase()}
                                </Square>
                                <span className="truncate">{field}</span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
function SelectOperator({
    operators,
    value,
    onChange,
}: {
    operators: Operator[];
    value: Operator;
    onChange: (value: Operator) => void;
}) {
    const operatorOptions = operators;
    if (!operators.includes(value)) {
        operatorOptions.unshift(value);
    }
    return (
        <div className="*:not-first:mt-2">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0">
                    <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                    <SelectGroup>
                        <SelectLabel className="ps-2">
                            Impersonate user
                        </SelectLabel>
                        {operatorOptions.sort().map((operator) => (
                            <SelectItem key={operator} value={operator}>
                                <span className="truncate">{operator}</span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
function InputQuery({ field }: { field: string; operator: Operator }) {
    return (
        <div className="*:not-first:mt-2">
            <Input placeholder={`Enter ${field}`} />
        </div>
    );
}
