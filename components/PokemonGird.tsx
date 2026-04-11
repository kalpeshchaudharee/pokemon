"use client"

import { Pokemon } from "@/types/pokemon";
import { useMemo, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { SearchFilter } from "./SearchFilter";

type PokemonGridProps = {
    pokemonList: Pokemon[];
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
    const [searchText, setSearchText] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const uniqueTypes = useMemo(() => {
        const types = pokemonList.flatMap((pokemon) => pokemon.types);
        return [...new Set(types)].sort();
    }, [pokemonList]);

    const filteredPokemon = useMemo(() => {
        return pokemonList.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = selectedType === "" || pokemon.types.includes(selectedType);
            return matchesSearch && matchesType;
        });
    }, [pokemonList, searchText, selectedType]);

    return (
        <div>
            <SearchFilter
                types={uniqueTypes}
                onSearchChange={setSearchText}
                onTypeChange={setSelectedType}
                debounceTime={0}
            />
            {filteredPokemon.length === 0 ? (
                <p className="mt-8 text-center text-gray-500">No Pokemon found</p>
            ) : (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredPokemon.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
}