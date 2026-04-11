import { mockPokemonList } from "@/test/mocks/fixtures";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PokemonGrid } from "./PokemonGrid";

describe("PokemonGrid", () => {
    it("renders all pokemon cards", () => {
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.getByText("squirtle")).toBeInTheDocument();
    });

    it("filters pokemon by search text", async () => {
        const user = userEvent.setup();
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        const input = screen.getByPlaceholderText(/search/i);
        await user.type(input, "char");

        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
        expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
    });

    it("filters pokemon by type", async () => {
        const user = userEvent.setup();
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "fire");

        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
        expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
    });

    it("filters pokemon by search text and type", async () => {
        const user = userEvent.setup();
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "grass");

        const input = screen.getByPlaceholderText(/search/i);
        await user.type(input, "bulb");

        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        expect(screen.queryByText("charmander")).not.toBeInTheDocument();
    });

    it("show a message when no pokemon is found", async () => {
        const user = userEvent.setup();
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        const input = screen.getByPlaceholderText(/search/i);
        await user.type(input, "mew");

        expect(screen.getByText(/no pok[eé]mon found/i)).toBeInTheDocument();
    });

    it("reset filter when 'All' type is selected", async () => {
        const user = userEvent.setup();
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "fire");
        expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();

        await user.selectOptions(select, "");
        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.getByText("squirtle")).toBeInTheDocument();
    });

    it("renders the type filter dropdown with unique types from the pokemon list", () => {
        render(<PokemonGrid pokemonList={mockPokemonList} />);

        expect(screen.getByRole("option", { name: "grass" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "fire" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "water" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "poison" })).toBeInTheDocument();
    });
})