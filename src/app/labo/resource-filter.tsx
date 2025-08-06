// components/ResourceFilter.tsx
"use client";

import { ParserBuilder, SetValues, Values } from "nuqs";

import React from "react";

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

type Operator = "eq" | "like" | "lt" | "lte" | "gt" | "gte";
const operators: Operator[] = ["eq", "like", "lt", "lte", "gt", "gte"];

const operatorLabels: Record<Operator, string> = {
    eq: "=",
    like: "contient",
    lt: "<",
    lte: "<=",
    gt: ">",
    gte: ">=",
};

type Field = string;

interface ResourceFilterProps {
    fields: Field[];
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

export function ResourceFilter({
    fields,
    filters,
    setFilters,
}: ResourceFilterProps) {
    // Générer dynamiquement le schéma de parsing pour chaque champ + opérateur

    // Hook de nuqs
    // const [filters, setFilters] = useQueryStates(querySchema, {
    //     history: "push",
    //     shallow: false,
    // });

    // Générer la liste des filtres actifs (ceux qui ont une valeur)
    const activeFilters = Object.entries(filters).filter(([, value]) => value);

    // Gestion locale d’un filtre en cours d’ajout
    const handleAddFilter = (
        field: string,
        operator: Operator,
        value: string
    ) => {
        const key = `${field}[${operator}]`;
        setFilters({ [key]: value });
        console.log(`Filter added: ${key} = ${value}`);
    };

    return (
        <div className="space-y-4">
            {/* Interface pour ajouter un filtre */}
            <FilterForm fields={fields} onAdd={handleAddFilter} />

            {/* Affichage des filtres actifs */}
            {activeFilters.length > 0 && (
                <div className="text-sm">
                    <h4>Filtres actifs :</h4>
                    <ul className="ml-4 list-disc">
                        {activeFilters.map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}</strong> = {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Composant de formulaire de filtre
function FilterForm({
    fields,
    onAdd,
}: {
    fields: string[];
    onAdd: (field: string, operator: Operator, value: string) => void;
}) {
    const [field, setField] = React.useState(fields[0] || "");
    const [operator, setOperator] = React.useState<Operator>("eq");
    const [value, setValue] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (field && operator && value) {
            onAdd(field, operator, value);
            // setValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div>
                <label className="block text-xs">Champ</label>
                <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="border p-1"
                >
                    {fields.map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs">Opérateur</label>
                <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value as Operator)}
                    className="border p-1"
                >
                    {operators.map((op) => (
                        <option key={op} value={op}>
                            {operatorLabels[op]}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs">Valeur</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border p-1"
                    placeholder="..."
                />
            </div>

            <button
                type="submit"
                className="rounded bg-blue-500 px-2 py-1 text-white"
            >
                Ajouter
            </button>
        </form>
    );
}
