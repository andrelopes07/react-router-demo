import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Search from "./Search";

describe("Search", () => {
	let onSearchChange;
	let user;

	beforeEach(() => {
		onSearchChange = vi.fn();
		vi.useFakeTimers({ shouldAdvanceTime: true });
		user = userEvent.setup({ delay: null });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders a labeled input", () => {
		render(<Search onSearchChange={onSearchChange} />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByText(/search:/i)).toBeInTheDocument();
	});

	it("does not call onSearchChange before the debounce delay", async () => {
		render(<Search onSearchChange={onSearchChange} />);
		await user.type(screen.getByRole("textbox"), "react");
		act(() => vi.advanceTimersByTime(500));
		expect(onSearchChange).not.toHaveBeenCalledWith("react");
	});

	it("calls onSearchChange with the search term after 700ms", async () => {
		render(<Search onSearchChange={onSearchChange} />);
		await user.type(screen.getByRole("textbox"), "react");
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).toHaveBeenCalledWith("react");
	});

	it("debounces rapid changes and only calls with the latest value", async () => {
		render(<Search onSearchChange={onSearchChange} />);
		await user.type(screen.getByRole("textbox"), "react");
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).toHaveBeenLastCalledWith("react");
		expect(onSearchChange).not.toHaveBeenCalledWith("r");
		expect(onSearchChange).not.toHaveBeenCalledWith("re");
	});
});
