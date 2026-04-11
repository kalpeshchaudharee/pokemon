import { mockBulbasaurDetail, mockPokemonList } from "@/test/mocks/fixtures";
import { PokemonDetail as PokemonDetailType } from "@/types/pokemon";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pokeapi", () => ({
    fetchPokemonDetail: vi.fn().mockResolvedValue(mockBulbasaurDetail),
    fetchPokemonList: vi.fn().mockResolvedValue(mockPokemonList),
}));

vi.mock("@/components/PokemonDetail", () => ({
    PokemonDetail: ({ pokemon }: { pokemon: PokemonDetailType }) => (
        <div data-testid="pokemon-detail">{pokemon.name}</div>
    ) 
}));

import { render, screen } from "@testing-library/react";
import PokemonPage from "./page";

describe("detail Page", () => {
    it("renders the page with pokemon detail component", async () => {
        const page = await PokemonPage({params: Promise.resolve({name: "bulbasaur"})});
        render(page);
        expect(screen.getByTestId("pokemon-detail")).toBeInTheDocument();
        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });

    it("passes the correct pokemon data to PokemonDetail", async () => {
        const { fetchPokemonDetail } = await import("@/lib/pokeapi");
        const page = await PokemonPage({params: Promise.resolve({name: "bulbasaur"})});
        render(page);
        expect(fetchPokemonDetail).toHaveBeenCalledWith("bulbasaur");
    });

    it("renders a back link to the listing page", async () => {
        const page = await PokemonPage({params: Promise.resolve({name: "bulbasaur"})});
        render(page);
        const backLink = screen.getByRole("link", { name: /back/i });
        expect(backLink).toBeInTheDocument();
        expect(backLink).toHaveAttribute("href", "/");
    })
});