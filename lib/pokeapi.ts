import type { PokeAPIListResponse, PokeAPIPokemonResponse, PokeAPITypeSlot, Pokemon } from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";


async function fetchFromAPI<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`);

    if(!res.ok) {
        throw new Error(`API request failed: ${res.status}`)
    }

    return res.json();
}

function mapToPokemon(raw: PokeAPIPokemonResponse): Pokemon {
    return {
        id: raw.id,
        name: raw.name,
        types: raw.types.map((typeSlot: PokeAPITypeSlot) => typeSlot.type.name),
        sprite: raw.sprites.front_default,
    };
}

export const fetchPokemonList = async () : Promise<Pokemon[]> => {
    const data = await fetchFromAPI<PokeAPIListResponse>("/pokemon?limit=151");

    const details = await Promise.all(
        data.results.map(async (entry) => fetchFromAPI<PokeAPIPokemonResponse>(`/pokemon/${entry.name}`).then(mapToPokemon))
    )

    return details;
}