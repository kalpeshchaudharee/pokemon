import { mockPokemonList } from "@/test/mocks/fixtures";
import { Pokemon } from "@/types/pokemon";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pokeapi", () => ({
    fetchPokemonList: vi.fn().mockResolvedValue(mockPokemonList),
}));

vi.mock("@/components/PokemonGrid", () => ({
    PokemonGrid: ({ pokemonList }: { pokemonList: Pokemon[] }) => (
        <div data-testid="pokemon-grid">{pokemonList.length} pokemon</div>
    )
}));

import Home from "./page";
import { render, screen } from "@testing-library/react";

describe("Listing Page", () => {
    it("renders the page heading", async () => {
        const page  = await Home();
        render(page);
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("passes fetched pokemon data to PokemonGrid", async () => {
        const page  = await Home();
        render(page);
        expect(screen.getByTestId("pokemon-grid")).toBeInTheDocument();
        expect(screen.getByText(`${mockPokemonList.length} pokemon`)).toBeInTheDocument();
    });
});

