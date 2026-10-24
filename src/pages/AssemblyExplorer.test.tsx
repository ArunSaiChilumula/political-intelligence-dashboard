import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AssemblyExplorer from "./AssemblyExplorer";

describe("AssemblyExplorer", () => {
  it("shows the default constituency and updates when another is selected", async () => {
    const user = userEvent.setup();
    render(<AssemblyExplorer />);

    expect(screen.getByRole("combobox", { name: "Assembly Constituency" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Malakpet" })).toBeInTheDocument();
    expect(screen.getAllByText("Ahmed Bin Abdullah Balala")).toHaveLength(2);
    expect(within(screen.getByRole("table")).getByText("Shaik Akbar")).toBeInTheDocument();

    await user.click(screen.getByRole("combobox", { name: "Assembly Constituency" }));
    await user.click(screen.getByRole("option", { name: "64 - Karwan" }));

    expect(screen.getByRole("heading", { name: "Karwan" })).toBeInTheDocument();
    expect(screen.getAllByText("Kausar Mohiuddin")).toHaveLength(2);
    expect(within(screen.getByRole("table")).getByText("Amar Singh")).toBeInTheDocument();
  });
});