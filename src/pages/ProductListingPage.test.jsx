import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ProductListingPage from "./ProductListingPage";

const renderPage = () =>
	render(
		<MemoryRouter>
			<ProductListingPage />
		</MemoryRouter>,
	);

describe("ProductListingPage", () => {
	it("renders the page heading", () => {
		renderPage();
		expect(
			screen.getByRole("heading", { name: /products page/i }),
		).toBeInTheDocument();
	});

	it("renders all 6 products initially", () => {
		renderPage();
		expect(screen.getAllByRole("listitem")).toHaveLength(6);
		expect(
			screen.getByRole("link", { name: /product 1/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /product 6/i }),
		).toBeInTheDocument();
	});

	it("renders all three search components", () => {
		renderPage();
		expect(screen.getByText(/^search:$/i)).toBeInTheDocument();
		expect(screen.getByText(/search with debounce:/i)).toBeInTheDocument();
		expect(screen.getByText(/search with debounce hook:/i)).toBeInTheDocument();
	});

	describe("filtering via Search component", () => {
		beforeEach(() => vi.useFakeTimers());
		afterEach(() => vi.useRealTimers());

		it("filters products after the debounce delay", () => {
			renderPage();
			const searchInput = screen.getAllByRole("textbox")[0];
			fireEvent.change(searchInput, { target: { value: "Product 1" } });
			act(() => vi.advanceTimersByTime(700));
			expect(screen.getAllByRole("listitem")).toHaveLength(1);
			expect(
				screen.getByRole("link", { name: /product 1/i }),
			).toBeInTheDocument();
		});

		it("restores all products when the search is cleared", () => {
			renderPage();
			const searchInput = screen.getAllByRole("textbox")[0];
			fireEvent.change(searchInput, { target: { value: "Product 1" } });
			act(() => vi.advanceTimersByTime(700));
			expect(screen.getAllByRole("listitem")).toHaveLength(1);

			fireEvent.change(searchInput, { target: { value: "" } });
			act(() => vi.advanceTimersByTime(700));
			expect(screen.getAllByRole("listitem")).toHaveLength(6);
		});

		it("shows no products when search matches nothing", () => {
			renderPage();
			const searchInput = screen.getAllByRole("textbox")[0];
			fireEvent.change(searchInput, { target: { value: "xyz" } });
			act(() => vi.advanceTimersByTime(700));
			expect(screen.queryAllByRole("listitem")).toHaveLength(0);
		});
	});
});
