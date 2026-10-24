import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App navigation", () => {
  it("shows the main navigation and opens a selected section", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("navigation")).toHaveTextContent("Overview");
    expect(screen.getByRole("navigation")).toHaveTextContent("Parliamentary Elections");
    expect(screen.getByRole("navigation")).toHaveTextContent("Assembly Explorer");
    expect(screen.getByRole("navigation")).toHaveTextContent("Electoral Trends");

    await user.click(screen.getByRole("button", { name: "Electoral Trends" }));

    expect(screen.getByRole("heading", { name: "Electoral Trends & Summary Indicators" })).toBeInTheDocument();
  });
});