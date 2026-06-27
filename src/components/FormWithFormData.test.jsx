import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import FormWithFormData from "./FormWithFormData";

describe("FormWithFormData", () => {
	it("renders all form fields and a submit button", () => {
		render(<FormWithFormData />);
		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
	});

	it("shows a name error when name is too short", async () => {
		const user = userEvent.setup();
		render(<FormWithFormData />);
		await user.type(screen.getByLabelText(/name/i), "Jo");
		await user.click(screen.getByRole("button", { name: /submit/i }));
		expect(
			screen.getByText(/name must be at least 2 chars/i),
		).toBeInTheDocument();
	});

	it("shows an email error for an invalid email", async () => {
		const user = userEvent.setup();
		render(<FormWithFormData />);
		// "test@test" passes HTML5 email validation but fails our custom check (no dot)
		await user.type(screen.getByLabelText(/email/i), "test@test");
		await user.click(screen.getByRole("button", { name: /submit/i }));
		expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
	});

	it("shows a password error for a weak password", async () => {
		const user = userEvent.setup();
		render(<FormWithFormData />);
		await user.type(screen.getByLabelText(/^password$/i), "weakpass");
		await user.click(screen.getByRole("button", { name: /submit/i }));
		expect(screen.getByText(/must have at least 8 chars/i)).toBeInTheDocument();
	});

	it("shows a confirm password error when passwords do not match", async () => {
		const user = userEvent.setup();
		render(<FormWithFormData />);
		await user.type(screen.getByLabelText(/^password$/i), "Password1");
		await user.type(screen.getByLabelText(/confirm password/i), "Password2");
		await user.click(screen.getByRole("button", { name: /submit/i }));
		expect(screen.getByText(/don't match/i)).toBeInTheDocument();
	});

	it("disables the submit button while loading and resets the form after success", async () => {
		vi.useFakeTimers();
		render(<FormWithFormData />);

		fireEvent.change(screen.getByLabelText(/name/i), {
			target: { value: "Jane Doe" },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: "jane@example.com" },
		});
		fireEvent.change(screen.getByLabelText(/^password$/i), {
			target: { value: "Password1" },
		});
		fireEvent.change(screen.getByLabelText(/confirm password/i), {
			target: { value: "Password1" },
		});

		const submitForm = screen
			.getByRole("button", { name: /submit/i })
			.closest("form");
		fireEvent.submit(submitForm);

		expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();

		await act(async () => vi.advanceTimersByTime(1100));

		expect(screen.getByRole("button", { name: /submit/i })).not.toBeDisabled();

		vi.useRealTimers();
	});
});
