import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("TypeBadge", () => {
    it("renders the type name", () => {
        render(<TypeBadge type="fire" />);
        expect(screen.getByText("fire")).toBeInTheDocument();
    });

    it("renders as a span element",  () => {
        render(<TypeBadge type="fire" />);
        const badge = screen.getByText("fire");
        expect(badge.tagName).toBe("SPAN");
    });

    it("applies a distinct style for different types", () => {
        const { rerender } = render(<TypeBadge type="fire" />);
        const fireBadge = screen.getByText("fire");
        const fireClass = fireBadge.className;

        rerender(<TypeBadge type="water" />);
        const waterBadge = screen.getByText("water");
        const waterClass = waterBadge.className;

        expect(fireClass).not.toBe(waterClass);
    });

    it("capitalizes the type name for display", () => {
        render(<TypeBadge type="grass" />);
        expect(screen.getByText("grass")).toBeInTheDocument();
    })
});