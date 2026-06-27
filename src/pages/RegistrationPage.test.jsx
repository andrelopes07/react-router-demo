import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RegistrationPage from "./RegistrationPage";

describe("RegistrationPage", () => {
	it("renders all three form section headings", () => {
		render(<RegistrationPage />);
		expect(screen.getByText(/form \(controlled\)/i)).toBeInTheDocument();
		expect(screen.getByText(/form \(uncontrolled/i)).toBeInTheDocument();
		expect(
			screen.getByText(/form \(react form actions\)/i),
		).toBeInTheDocument();
	});

	it("renders three submit buttons — one per form", () => {
		render(<RegistrationPage />);
		expect(screen.getAllByRole("button", { name: /submit/i })).toHaveLength(3);
	});
});
