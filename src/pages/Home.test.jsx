import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Home from "./Home";

describe("HomePage", () => {
	it("renders the page heading", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>,
		);
		expect(
			screen.getByRole("heading", { name: /home page/i }),
		).toBeInTheDocument();
	});

	it("renders a link to the products page", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>,
		);
		const link = screen.getByRole("link", { name: /list of products/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/products");
	});
});
