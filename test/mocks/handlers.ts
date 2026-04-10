import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get("https://pokeapi.co/api/v2/pokemon", ({ request }) => {
        const url = new URL(request.url);

        const limit = url.searchParams.get("limit") || "151";

        const results = Array.from({ length: Number(limit) }, (_, i) => ({
            name: ["bulbasaur", "charmander", "squirtle"][i] ?? `pokemon-${i + 1}`,
            url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
        }));

        return HttpResponse.json({
            count: results.length,
            results
        });
    }),

    http.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
        const { name } = params;

        const pokemon: Record<string, unknown> = {
            id: name === "bulbasaur" ? 1 : name === "charmander" ? 4 : 7,
            name,
            height: 7,
            weight: 69,
            types: [
                { slot: 1, type: { name: "grass", url: "" } },
                { slot: 2, type: { name: "poison", url: "" } },
            ],
            abilities: [
                { ability: { name: "overgrow" }, is_hidden: false },
                { ability: { name: "chlorophyll" }, is_hidden: true },
            ],
            stats: [
                { base_stat: 45, stat: { name: "hp" } },
                { base_stat: 49, stat: { name: "attack" } },
                { base_stat: 49, stat: { name: "defense" } },
                { base_stat: 65, stat: { name: "special-attack" } },
                { base_stat: 65, stat: { name: "special-defense" } },
                { base_stat: 45, stat: { name: "speed" } },
            ],
            sprites: {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name === "bulbasaur" ? 1 : 4}.png`,
                other: {
                    "official-artwork": {
                        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${name === "bulbasaur" ? 1 : 4}.png`,
                    },
                },
            },
        };

        return HttpResponse.json(pokemon);
    }),
]