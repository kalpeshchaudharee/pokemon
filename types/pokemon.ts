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

export type PokeAPIListResponse = {
    count: number;
    results: { name: string; url: string }[];
};

export type PokeAPITypeSlot = {
    slot: number;
    type: { name: string };
};

export type PokeAPIAbility = {
    ability: { name: string };
    is_hidden: boolean;
};

export type PokeAPIStat = {
    base_stat: number;
    stat: { name: string };
};

export type PokeAPIPokemonResponse = {
    id: number;
    name: string;
    types: PokeAPITypeSlot[];
    sprites: {
        front_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    height: number;
    weight: number;
    abilities: PokeAPIAbility[];
    stats: PokeAPIStat[];
};