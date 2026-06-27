import { act, render, screen } from "@testing-library/react";
import {
	createMemoryRouter,
	MemoryRouter,
	RouterProvider,
} from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ErrorPage from "./Error";

const renderPage = () =>
	render(
		<MemoryRouter>
			<ErrorPage />
		</MemoryRouter>,
	);

describe("ErrorPage", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it("renders the error heading and message", () => {
		renderPage();
		expect(
			screen.getByRole("heading", { name: /error occurred/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/could not find this page/i)).toBeInTheDocument();
	});

	it("shows the initial countdown of 3 seconds", () => {
		renderPage();
		expect(screen.getByText(/redirected in 3 seconds/i)).toBeInTheDocument();
	});

	it("decrements the countdown each second", () => {
		renderPage();
		act(() => vi.advanceTimersByTime(1000));
		expect(screen.getByText(/redirected in 2 seconds/i)).toBeInTheDocument();

		act(() => vi.advanceTimersByTime(1000));
		expect(screen.getByText(/redirected in 1 seconds/i)).toBeInTheDocument();
	});

	it("stops the countdown at 0", () => {
		renderPage();
		act(() => vi.advanceTimersByTime(3000));
		expect(screen.getByText(/redirected in 0 seconds/i)).toBeInTheDocument();
	});

	it("redirects to home after 3 seconds", async () => {
		const router = createMemoryRouter(
			[
				{ path: "/", element: <div>Home Page</div> },
				{ path: "/error", element: <ErrorPage /> },
			],
			{ initialEntries: ["/error"] },
		);
		render(<RouterProvider router={router} />);

		await act(async () => vi.advanceTimersByTime(3000));

		expect(screen.getByText("Home Page")).toBeInTheDocument();
	});
});
