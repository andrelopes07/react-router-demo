import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import SearchWithDebounceHook from "./SearchWithDebounceHook";

describe("SearchWithDebounceHook", () => {
	let onSearchChange;

	beforeEach(() => {
		onSearchChange = vi.fn();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders a labeled input", () => {
		render(<SearchWithDebounceHook onSearchChange={onSearchChange} />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByText(/search with debounce hook:/i)).toBeInTheDocument();
	});

	it("calls onSearchChange with the search term after 700ms", () => {
		render(<SearchWithDebounceHook onSearchChange={onSearchChange} />);
		onSearchChange.mockClear(); // flush the initial "" call on mount

		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).toHaveBeenLastCalledWith("react");
	});

	it("does not call onSearchChange with the typed value before 700ms", () => {
		render(<SearchWithDebounceHook onSearchChange={onSearchChange} />);
		onSearchChange.mockClear();

		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		act(() => vi.advanceTimersByTime(500));
		expect(onSearchChange).not.toHaveBeenCalledWith("react");
	});

	it("only calls with the last value when changed rapidly", () => {
		render(<SearchWithDebounceHook onSearchChange={onSearchChange} />);
		onSearchChange.mockClear();

		fireEvent.change(screen.getByRole("textbox"), { target: { value: "r" } });
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "re" } });
		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).toHaveBeenLastCalledWith("react");
		expect(onSearchChange).not.toHaveBeenCalledWith("r");
		expect(onSearchChange).not.toHaveBeenCalledWith("re");
	});
});
