import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import RootLayout from "./Root";

describe("RootLayout", () => {
	it("renders the main navigation", () => {
		render(
			<MemoryRouter>
				<RootLayout />
			</MemoryRouter>,
		);
		expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /registration/i }),
		).toBeInTheDocument();
	});

	it("renders a main element for page content", () => {
		render(
			<MemoryRouter>
				<RootLayout />
			</MemoryRouter>,
		);
		expect(screen.getByRole("main")).toBeInTheDocument();
	});
});
