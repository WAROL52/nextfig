"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input, InputWrapper } from "@/components/ui/input";

export type InputSearchRessourceProps = {};

export function InputSearchRessource({}: InputSearchRessourceProps) {
    const { search, setSearch } = useSearchRessource();

    const inputRef = useRef<HTMLInputElement>(null);
    const handleClearInput = () => {
        setSearch("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return (
        <div className="w-80">
            <InputWrapper>
                <Input
                    placeholder="search..."
                    ref={inputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    onClick={handleClearInput}
                    className="-me-4"
                    disabled={search === ""}
                >
                    {search !== "" && <X size={16} />}
                </Button>
            </InputWrapper>
        </div>
    );
}

export function useSearchRessource() {
    const [search, setSearch] = useQueryState(
        "q",
        parseAsString.withDefault("")
    );
    const [debouncedSearch] = useDebouncedValue(search, 300);
    return { search, setSearch, debouncedSearch };
}
