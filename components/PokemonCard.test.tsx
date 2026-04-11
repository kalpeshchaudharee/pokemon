import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonCard } from "./PokemonCard";

const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
};

describe("PokemonCard", () => {
    it("renders the pokemon name", () => {
        render(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });

    it("renders the pokemon sprite image with alt text", () => {
        render(<PokemonCard pokemon={mockPokemon} />);
        const img = screen.getByRole("img", { name: /bulbasaur/i });

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", mockPokemon.sprite);
        expect(img).toHaveAttribute("alt", "bulbasaur");
        expect(img).toHaveAttribute("src");
    });

    it("renders all type badges", () => {
        render(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByText("grass")).toBeInTheDocument();
        expect(screen.getByText("poison")).toBeInTheDocument();
    });

    it("renders the pokemon id formatted as #001", () => {
        render(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByText("#001")).toBeInTheDocument();
    });

    it("renders a pokemon with a single type", () => {
        const singleTypePokemon = {
            id: 4,
            name: "charmander",
            types: ["fire"],
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        };

        render(<PokemonCard pokemon={singleTypePokemon} />);
        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.getByText("fire")).toBeInTheDocument();
    })
});