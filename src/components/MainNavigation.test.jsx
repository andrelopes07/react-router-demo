import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import MainNavigation from "./MainNavigation";

const renderWithRouter = (initialEntry = "/") =>
	render(
		<MemoryRouter initialEntries={[initialEntry]}>
			<MainNavigation />
		</MemoryRouter>,
	);

describe("MainNavigation", () => {
	it("renders all three navigation links", () => {
		renderWithRouter();
		expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /registration forms/i }),
		).toBeInTheDocument();
	});

	it("Home link points to /", () => {
		renderWithRouter();
		expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
			"href",
			"/",
		);
	});

	it("Products link points to /products", () => {
		renderWithRouter();
		expect(screen.getByRole("link", { name: /products/i })).toHaveAttribute(
			"href",
			"/products",
		);
	});

	it("Registration Forms link points to /registration", () => {
		renderWithRouter();
		expect(
			screen.getByRole("link", { name: /registration forms/i }),
		).toHaveAttribute("href", "/registration");
	});

	it("applies active class to the current route link", () => {
		renderWithRouter("/products");
		expect(screen.getByRole("link", { name: /products/i }).className).not.toBe(
			"",
		);
	});

	it("applies no class to inactive links", () => {
		renderWithRouter("/products");
		expect(screen.getByRole("link", { name: /home/i }).className).toBe("");
		expect(
			screen.getByRole("link", { name: /registration forms/i }).className,
		).toBe("");
	});

	it("applies active class to the Registration Forms link when on that route", () => {
		renderWithRouter("/registration");
		expect(
			screen.getByRole("link", { name: /registration forms/i }).className,
		).not.toBe("");
	});
});
