import type { PokeAPIListResponse, PokeAPIPokemonResponse, PokeAPITypeSlot, Pokemon, PokemonDetail } from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";


async function fetchFromAPI<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`);

    if (!res.ok) {
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

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
    const data = await fetchFromAPI<PokeAPIListResponse>("/pokemon?limit=151");

    const details = await Promise.all(
        data.results.map(async (entry) => fetchFromAPI<PokeAPIPokemonResponse>(`/pokemon/${entry.name}`).then(mapToPokemon))
    )

    return details;
}

export const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
    const raw = await fetchFromAPI<PokeAPIPokemonResponse>(`/pokemon/${name}`);

    return {
        id: raw.id,
        name: raw.name,
        types: raw.types.map((typeSlot: PokeAPITypeSlot) => typeSlot.type.name),
        sprite: raw.sprites.front_default,
        height: raw.height,
        weight: raw.weight,
        abilities: raw.abilities.map((a: { ability: { name: string } }) => a.ability.name),
        stats: raw.stats.map((s: { base_stat: number; stat: { name: string } }) => ({ name: s.stat.name, value: s.base_stat })),
    }
}