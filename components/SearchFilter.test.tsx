import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchFilter } from "./SearchFilter";

const allTypes = ["grass", "fire", "water", "poison", "electric"];

describe("SearchFilter", () => {
    it("renders a search input", () => {
        render(<SearchFilter onSearchChange={() => {}} onTypeChange={() => {}} types={allTypes} />);
        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it("renders a type filter dropdown", () => {
        render(<SearchFilter onSearchChange={() => {}} onTypeChange={() => {}} types={allTypes} />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders all type options plus 'All' option in dropdown", () => {
        render(<SearchFilter onSearchChange={() => {}} onTypeChange={() => {}} types={allTypes} />);
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(allTypes.length + 1);
        expect(options[0]).toHaveTextContent("All");
        allTypes.forEach((type) => {
            expect(screen.getByRole("option", { name: type })).toHaveTextContent(type);
        });
    });

    it("calls onSearchChange when user types in search input", async () => {
        const user = userEvent.setup();
        const handleSearch = vi.fn();
        render(<SearchFilter onSearchChange={handleSearch} onTypeChange={() => {}} types={allTypes} debounceTime={0} />);

        const input = screen.getByPlaceholderText(/search/i);
        await user.type(input, "pikachu");

        expect(handleSearch).toHaveBeenCalled();
        expect(handleSearch).toHaveBeenCalledWith("pikachu");
    });

    it("calls onTypeChange when user selects a type", async () => {
        const user = userEvent.setup();
        const handleType = vi.fn();
        render(<SearchFilter onSearchChange={() => {}} onTypeChange={handleType} types={allTypes} />);

        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "grass");

        expect(handleType).toHaveBeenCalled();
        expect(handleType).toHaveBeenCalledTimes(1);
        expect(handleType).toHaveBeenCalledWith("grass");
    });

    it("calls onTypeChange with empty string when user selects 'All' option", async () => {
        const user = userEvent.setup();
        const handleType = vi.fn();
        render(<SearchFilter onSearchChange={() => {}} onTypeChange={handleType} types={allTypes} />);

        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "fire");
        await user.selectOptions(select, "");

        expect(handleType).toHaveBeenCalled();
        expect(handleType).toHaveBeenCalledWith("");
    });
});