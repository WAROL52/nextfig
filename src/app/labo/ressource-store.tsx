"use client";

import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { RessourceFilter } from "./ressource";
import { useRessourceFilter } from "./use-ressource-filter";

export type RessourceContext = {
    fieldMap: RessourceFilter.FieldMap;
    setRessource: Dispatch<SetStateAction<RessourceContext>>;
    addFieldMap: (fieldMap: RessourceFilter.FieldMap) => void;
    removeFieldMap: (field: string) => void;
};
const ressourceContext = createContext<RessourceContext | null>(null);
export function RessourceProvider({ children }: PropsWithChildren) {
    const [ressource, setRessource] = useState<RessourceContext>({
        fieldMap: {},
        setRessource: (newRessource) =>
            setRessource((prev) => ({ ...prev, ...newRessource })),
        addFieldMap: (fieldMap) => {
            setRessource((prev) => ({
                ...prev,
                fieldMap: { ...prev.fieldMap, ...fieldMap },
            }));
        },
        removeFieldMap: (field) => {
            setRessource((prev) => {
                const newFieldMap = { ...prev.fieldMap };
                delete newFieldMap[field];
                return { ...prev, fieldMap: newFieldMap };
            });
        },
    });
    return (
        <ressourceContext.Provider value={ressource}>
            <RessourceFilterProvider fieldMap={ressource.fieldMap}>
                {children}
            </RessourceFilterProvider>
        </ressourceContext.Provider>
    );
}
export function useRessourceContext() {
    const context = useContext(ressourceContext);
    if (!context) {
        throw new Error(
            "useRessourceContext must be used within a RessourceProvider"
        );
    }
    return context;
}

export type RessourceFilterContext = ReturnType<typeof useRessourceFilter>;
const ressourceFilterContext = createContext<RessourceFilterContext | null>(
    null
);
export function RessourceFilterProvider({
    children,
    fieldMap,
}: PropsWithChildren<{ fieldMap: RessourceFilter.FieldMap }>) {
    const tools = useRessourceFilter({ fieldMap });
    return (
        <ressourceFilterContext.Provider value={tools}>
            {children}
        </ressourceFilterContext.Provider>
    );
}

export function useRessourceFilterContext({
    fieldMap,
}: {
    fieldMap: RessourceFilter.FieldMap;
}) {
    const ressource = useRessourceContext();
    const context = useContext(ressourceFilterContext);
    if (!context) {
        throw new Error(
            "useRessourceFilterContext must be used within a RessourceFilterProvider"
        );
    }
    // chexk if fieldMap is empty
    useEffect(() => {
        // if fieldMap is not empty, merge it with the context fieldMap using ressource.setRessource in useEffect
        if (Object.keys(fieldMap).length > 0) {
            ressource.addFieldMap(fieldMap);
        }
        return () => {
            Object.keys(fieldMap).forEach((field) => {
                // remove field from context when component unmounts
                ressource.removeFieldMap(field);
            });
        };
    }, []);
    return context;
}

// create a hook to get the filter where by fieldMap
export function useRessourceFilterWhereClause(
    fieldMap: RessourceFilter.FieldMap
) {
    const { where } = useRessourceFilterContext({ fieldMap });
    if (Object.keys(fieldMap).length === 0) {
        return {
            where: {},
        };
    }
    return {
        where: Object.fromEntries(
            Object.entries(where).filter(([key]) =>
                Object.keys(fieldMap).some((field) => key == field)
            )
        ),
    };
}
