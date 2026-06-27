import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import useDebounce from "./useDebounce";

describe("useDebounce", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns the initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("hello", 300));
		expect(result.current).toBe("hello");
	});

	it("does not update the value before the delay elapses", () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: "initial" },
			},
		);
		rerender({ value: "updated" });
		act(() => vi.advanceTimersByTime(200));
		expect(result.current).toBe("initial");
	});

	it("updates the value after the delay elapses", () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: "initial" },
			},
		);
		rerender({ value: "updated" });
		act(() => vi.advanceTimersByTime(300));
		expect(result.current).toBe("updated");
	});

	it("only settles on the last value when changed rapidly", () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: "a" },
			},
		);
		rerender({ value: "b" });
		rerender({ value: "c" });
		rerender({ value: "d" });
		act(() => vi.advanceTimersByTime(300));
		expect(result.current).toBe("d");
	});

	it("clears the timer on unmount", () => {
		const { result, rerender, unmount } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: "initial" },
			},
		);
		rerender({ value: "updated" });
		unmount();
		act(() => vi.advanceTimersByTime(300));
		expect(result.current).toBe("initial");
	});
});
