export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

export type PokemonDetail = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
    height: number;
    weight: number;
    abilities: string[];
    stats: {
        name: string;
        value: number;
    }[];
}