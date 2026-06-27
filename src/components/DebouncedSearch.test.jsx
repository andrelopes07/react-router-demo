import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import DebouncedSearch from "./DebouncedSearch";

describe("DebouncedSearch", () => {
	let onSearchChange;

	beforeEach(() => {
		onSearchChange = vi.fn();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders a labeled input", () => {
		render(<DebouncedSearch onSearchChange={onSearchChange} />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByText(/search with debounce:/i)).toBeInTheDocument();
	});

	it("does not call onSearchChange before the debounce delay", () => {
		render(<DebouncedSearch onSearchChange={onSearchChange} />);
		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		expect(onSearchChange).not.toHaveBeenCalled();
	});

	it("calls onSearchChange with the search term after 700ms", () => {
		render(<DebouncedSearch onSearchChange={onSearchChange} />);
		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).toHaveBeenCalledWith("react");
	});

	it("cancels the previous timer when input changes rapidly", () => {
		render(<DebouncedSearch onSearchChange={onSearchChange} />);
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "r" } });
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "re" } });
		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).toHaveBeenCalledTimes(1);
		expect(onSearchChange).toHaveBeenCalledWith("react");
	});

	it("clears the pending timer on unmount", () => {
		const { unmount } = render(
			<DebouncedSearch onSearchChange={onSearchChange} />,
		);
		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "react" },
		});
		unmount();
		act(() => vi.advanceTimersByTime(700));
		expect(onSearchChange).not.toHaveBeenCalled();
	});
});
