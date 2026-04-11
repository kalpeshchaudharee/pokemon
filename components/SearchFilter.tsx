"use client";

import { useEffect, useRef, useState } from "react";

type SearchFilterProps = {
    onSearchChange: (search: string) => void;
    onTypeChange: (type: string) => void;
    types: string[];
    debounceTime?: number;
}

export function SearchFilter({ onSearchChange, onTypeChange, types, debounceTime = 300 }: SearchFilterProps) {
    const [search, setSearch] = useState("");

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        if(debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            onSearchChange(search);
        }, debounceTime);

        return () => {
            if(debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        }

    }, [search, onSearchChange]);

    return (
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <select
            onChange={(e) => onTypeChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      );
}