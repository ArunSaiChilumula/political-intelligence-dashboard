import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ParliamentarySection from "./ParliamentarySection";

describe("ParliamentarySection", () => {
  it("shows 2024 by default and updates results for 2019", async () => {
    const user = userEvent.setup();
    render(<ParliamentarySection />);

    expect(screen.getByRole("combobox", { name: "Year" })).toHaveTextContent("2024");
    expect(within(screen.getByRole("table")).getByText("Asaduddin Owaisi")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Candidate Results — 2024" })).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getByText("Madhavi Latha Kompella")).toBeInTheDocument();

    await user.click(screen.getByRole("combobox", { name: "Year" }));
    await user.click(screen.getByRole("option", { name: "2019" }));

    expect(screen.getByRole("heading", { name: "Candidate Results — 2019" })).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getByText("Pusthe Srikanth")).toBeInTheDocument();
    expect(within(screen.getByRole("table")).queryByText("Madhavi Latha Kompella")).not.toBeInTheDocument();
  });
});