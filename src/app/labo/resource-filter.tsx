"use client";

import { useState } from "react";

type FilterOperator =
    | "eq"
    | "ne"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "like"
    | "startsWith"
    | "endsWith";

const operatorLabels: Record<FilterOperator, string> = {
    eq: "égal à",
    ne: "différent de",
    gt: "supérieur à",
    gte: "supérieur ou égal à",
    lt: "inférieur à",
    lte: "inférieur ou égal à",
    in: "dans",
    nin: "pas dans",
    like: "contient",
    startsWith: "commence par",
    endsWith: "finit par",
};

export type ResourceFilterState = {
    field: string;
    operator: FilterOperator;
    value: string;
};

export type ResourceFilterProps = {
    fields: string[];
    onChange?: (filter: ResourceFilterState) => void;
};

export function ResourceFilter({ fields, onChange }: ResourceFilterProps) {
    const [filter, setFilter] = useState<ResourceFilterState>({
        field: fields[0] || "",
        operator: "eq",
        value: "",
    });

    const handleChange = (key: keyof ResourceFilterState, val: string) => {
        const updated = { ...filter, [key]: val };
        setFilter(updated);
        onChange?.(updated);
    };

    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
            {/* Champ à filtrer */}
            <select
                className="rounded border px-3 py-1"
                value={filter.field}
                onChange={(e) => handleChange("field", e.target.value)}
            >
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>

            {/* Opérateur */}
            <select
                className="rounded border px-3 py-1"
                value={filter.operator}
                onChange={(e) =>
                    handleChange("operator", e.target.value as FilterOperator)
                }
            >
                {Object.entries(operatorLabels).map(([op, label]) => (
                    <option key={op} value={op}>
                        {label}
                    </option>
                ))}
            </select>

            {/* Valeur */}
            <input
                type="text"
                className="rounded border px-3 py-1"
                placeholder="Valeur"
                value={filter.value}
                onChange={(e) => handleChange("value", e.target.value)}
            />
        </div>
    );
}
