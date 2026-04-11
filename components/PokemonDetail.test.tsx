import { mockBulbasaurDetail } from "@/test/mocks/fixtures";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonDetail } from "./PokemonDetail";

describe("PokemonDetail", () => {
    it("renders the pokemon name", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);
        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });

    it("renders the pokemon sprite image with alt text", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);
        const img = screen.getByRole("img", { name: /bulbasaur/i });

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src");
        expect(img).toHaveAttribute("src", mockBulbasaurDetail.sprite);
        expect(img).toHaveAttribute("alt", "bulbasaur");
    });

    it("renders all type badges", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);
        expect(screen.getByText("grass")).toBeInTheDocument();
        expect(screen.getByText("poison")).toBeInTheDocument();
    });

    it("renders the pokemon height and weight", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);
        expect(screen.getByText(/7/)).toBeInTheDocument();
        expect(screen.getByText(/69/)).toBeInTheDocument();
    });

    it("renders the pokemon abilities", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);
        expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
        expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();
    });

    it("renders the pokemon stats with name and value", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);

        const expectedStats = [
            { name: "hp", value: "45" },
            { name: "attack", value: "49" },
            { name: "defense", value: "49" },
            { name: "special-attack", value: "65" },
            { name: "special-defense", value: "65" },
            { name: "speed", value: "45" },
        ];

        expectedStats.forEach(({ name, value }) => {
            const row = screen.getByTestId(`stat-${name}`);
            expect(row).toHaveTextContent(name);
            expect(row).toHaveTextContent(value);
        });

    });

    it("renders the pokemon id formatted as #001", () => {
        render(<PokemonDetail pokemon={mockBulbasaurDetail} />);
        expect(screen.getByText("#001")).toBeInTheDocument();
    });
});