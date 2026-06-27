import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";

import ProductDetailsPage from "./ProductDetailsPage";

const renderWithParams = (productId) => {
	const router = createMemoryRouter(
		[{ path: "/products/:productId", element: <ProductDetailsPage /> }],
		{ initialEntries: [`/products/${productId}`] },
	);
	return render(<RouterProvider router={router} />);
};

describe("ProductDetailsPage", () => {
	it("renders the page heading", () => {
		renderWithParams("p1");
		expect(
			screen.getByRole("heading", { name: /product details page/i }),
		).toBeInTheDocument();
	});

	it("displays the product ID from the route params", () => {
		renderWithParams("p42");
		expect(screen.getByText(/product id: p42/i)).toBeInTheDocument();
	});

	it("renders a link back to the product list", () => {
		renderWithParams("p1");
		expect(
			screen.getByRole("link", { name: /list of products/i }),
		).toBeInTheDocument();
	});
});
