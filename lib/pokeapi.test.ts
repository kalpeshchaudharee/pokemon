import { describe, expect, it } from "vitest";
import { fetchPokemonList } from "./pokeapi";

describe("fetchPokemonList", () => {
    it("returns an array of Pokemon with id, name, types, and sprite", async () => {
        const result = await fetchPokemonList();

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);

        const pokemon = result[0];
        expect(pokemon).toHaveProperty("id");
        expect(pokemon).toHaveProperty("name");
        expect(pokemon).toHaveProperty("types");
        expect(pokemon).toHaveProperty("sprite");
    });

    it("returns correctly shaped data for bulbasaur", async () => {
        const result = await fetchPokemonList();
        const bulbasaur = result.find((pokemon) => pokemon.name === "bulbasaur");

        expect(bulbasaur).toBeDefined();
        expect(bulbasaur!.id).toBe(1);
        expect(bulbasaur!.name).toBe("bulbasaur");
        expect(bulbasaur!.types).toEqual(["grass", "poison"]);
        expect(typeof bulbasaur!.sprite).toBe("string");
        expect(bulbasaur!.sprite).toContain("pokemon/1");
    });

    it("maps types from nested API response to flat string array", async () => {
        const result = await fetchPokemonList();
       
        result.forEach((pokemon) => {
            expect(Array.isArray(pokemon.types)).toBe(true);

            pokemon.types.forEach((type: string) => {
                expect(typeof type).toBe("string");
            });
        })
    });
})