import type { Pokemon } from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async () : Promise<Pokemon[]> => {
    const res = await fetch(`${API_URL}/pokemon?limit=151`);

    const data = await res.json();

    const details = await Promise.all(
        data.results.map(async (entry: {name: string}) => {
            const detailRes = await fetch(`${API_URL}/pokemon/${entry.name}`);
            const detailData = await detailRes.json();

            return {
                id: detailData.id,
                name: detailData.name,
                types: detailData.types.map((type: {type: {name: string}}) => type.type.name),
                sprite: detailData.sprites.front_default,
            };
        })
    )

    return details;
}