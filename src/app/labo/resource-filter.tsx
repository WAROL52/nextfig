// components/ResourceFilter.tsx
"use client";

import { UseListStateHandlers, useListState } from "@mantine/hooks";
import {
    DeleteIcon,
    FilterXIcon,
    ListFilterIcon,
    PlusIcon,
} from "lucide-react";
import { ParserBuilder, SetValues, Values } from "nuqs";

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

export function ResourceFilter({ fields, operators }: ResourceFilterProps) {
    const allFilters: FilterItem[] = fields.flatMap((field) =>
        operators.map((operator) => ({
            field,
            value: "",
            show: true,
            operator,
        }))
    );
    const [listRest, setListRest] = useListState<FilterItem>(allFilters);
    const [listSearch, setListSearch] = useListState<FilterItem>([]);
    const first = listRest[0] || null;
    const clearSearch = () => {
        setListSearch.setState([]);
        setListRest.setState(allFilters);
    };
    const addFirst = () => {
        if (first) {
            setListRest.filter(
                (item) =>
                    item.field + item.operator !== first.field + first.operator
            );
            setListSearch.append(first);
        }
    };
    const removeSearch = (item: FilterItem, index: number) => {
        setListSearch.remove(index);
        setListRest.setState((current) => [...current, item]);
    };
    const listRestSorted = listRest.sort((a, b) => {
        const fieldA = a.field.toLowerCase() + a.operator.toLowerCase();
        const fieldB = b.field.toLowerCase() + b.operator.toLowerCase();
        return fieldA.localeCompare(fieldB);
    });
    const listSearchSorted = listSearch.sort((a, b) => {
        const fieldA = a.field.toLowerCase() + a.operator.toLowerCase();
        const fieldB = b.field.toLowerCase() + b.operator.toLowerCase();
        return fieldA.localeCompare(fieldB);
    });
    return (
        <div className="flex items-center justify-between space-x-2">
            <div>
                {listRestSorted.map((item) => (
                    <div key={item.field + item.operator}>
                        {item.field} {item.operator}
                    </div>
                ))}
            </div>
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
                            {listSearch.length}/{allFilters.length} filter
                            {listSearch.length > 1 ? "s" : ""}
                        </span>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            onClick={clearSearch}
                        >
                            <FilterXIcon />
                        </Button>
                        <Button size={"sm"} onClick={addFirst}>
                            <PlusIcon /> Add Filter
                        </Button>
                    </div>
                    <div className="mt-2 max-h-[300px] space-y-1 overflow-y-auto rounded-md border p-2">
                        {listSearch.map((item, index) => (
                            <div
                                key={item.field + item.operator}
                                className="flex items-center space-x-2"
                            >
                                <FilterField
                                    item={item}
                                    listRest={listRestSorted}
                                    listSearch={listSearchSorted}
                                    setListSearch={setListSearch}
                                    setListRest={setListRest}
                                />
                                <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                    onClick={() => removeSearch(item, index)}
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
                <div>
                    {listSearchSorted.map((item) => (
                        <div key={item.field + item.operator}>
                            {item.field} {item.operator}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
type FilterFieldProps = {
    item: FilterItem;
    setListRest: UseListStateHandlers<FilterItem>;
    listRest: FilterItem[];
    listSearch: FilterItem[];
    setListSearch: UseListStateHandlers<FilterItem>;
};

function FilterField(props: FilterFieldProps) {
    const { item, listRest, setListRest, setListSearch } = props;
    const fieldOptions: string[] = [];
    listRest.map((item) => {
        if (!fieldOptions.includes(item.field)) {
            fieldOptions.push(item.field);
        }
    });
    if (!fieldOptions.includes(item.field)) {
        fieldOptions.unshift(item.field);
    }
    const operatorAvailable = listRest
        .filter((i) => i.field === item.field)
        .map((i) => i.operator);
    return (
        <div className="flex items-center space-x-2">
            <SelectField
                fieldOptions={fieldOptions}
                fieldValue={item.field}
                onChange={(field) => {
                    if (!field) return;
                    const newItem = listRest.find(
                        (i) => i.field === field && i.operator === item.operator
                    );
                    if (!newItem) {
                        return;
                    }
                    item.value = "";
                    setListRest.setState((current) => [
                        ...current.filter(
                            (i) =>
                                i.field !== newItem.field ||
                                i.operator !== newItem.operator
                        ),
                        item,
                    ]);
                    setListSearch.setState((current) => [
                        ...current.filter(
                            (i) =>
                                i.field !== item.field ||
                                i.operator !== item.operator
                        ),
                        newItem,
                    ]);
                }}
            />
            <SelectOperator
                operators={operatorAvailable}
                value={item.operator}
                onChange={(operator) => {
                    if (!operator) return;
                    if (item.operator === operator) return;
                    const newItem = listRest.find(
                        (i) => i.field === item.field && i.operator === operator
                    );
                    if (!newItem) {
                        return;
                    }
                    item.value = "";
                    setListRest.setState((current) => [
                        ...current.filter(
                            (i) =>
                                i.field !== newItem.field ||
                                i.operator !== newItem.operator
                        ),
                        item,
                    ]);
                    setListSearch.setState((current) => [
                        ...current.filter(
                            (i) =>
                                i.field !== item.field ||
                                i.operator !== item.operator
                        ),
                        newItem,
                    ]);
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
