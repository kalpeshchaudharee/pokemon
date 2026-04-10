import { describe, expect, it } from "vitest";
import { fetchPokemonList, fetchPokemonDetail } from "./pokeapi";
import { http, HttpResponse } from "msw";

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
});

describe("fetchPokemonDetail", () => {
    it("returns a PokemonDetail with all required fields", async () => {
        const result = await fetchPokemonDetail("bulbasaur");

        expect(result).toBeDefined();
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("types");
        expect(result).toHaveProperty("sprite");
        expect(result).toHaveProperty("height");
        expect(result).toHaveProperty("weight");
        expect(result).toHaveProperty("abilities");
        expect(result).toHaveProperty("stats");
    });

    it("returns correctly mapped data for bulbasaur", async () => {
        const result = await fetchPokemonDetail("bulbasaur");

        expect(result).toBeDefined();
        expect(result!.id).toBe(1);
        expect(result!.name).toBe("bulbasaur");
        expect(result!.types).toEqual(["grass", "poison"]);
        expect(typeof result!.sprite).toBe("string");
        expect(result!.sprite).toContain("pokemon/1");
        expect(result!.height).toBe(7);
        expect(result!.weight).toBe(69);
    })

    it("maps abilities from nested API response to flat string array", async () => {
        const result = await fetchPokemonDetail("bulbasaur");

        result.abilities.forEach((ability: string) => {
            expect(typeof ability).toBe("string");
        });
    });

    it("maps stats with name and value from API response", async () => {
        const result = await fetchPokemonDetail("bulbasaur");

        expect(result!.stats).toEqual([{ name: "hp", value: 45 }, { name: "attack", value: 49 }, { name: "defense", value: 49 }, { name: "special-attack", value: 65 }, { name: "special-defense", value: 65 }, { name: "speed", value: 45 }]);
    });

    it("throws an error for non-existent pokemon", async () => {
        const { server } = await import("@/test/mocks/server");

        server.use(
            http.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
                return HttpResponse.json({ error: "Not Found" }, { status: 404 });
            })
        );

        await expect(fetchPokemonDetail("non-existent")).rejects.toThrow("API request failed: 404");
    })
});