import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ElectoralTrends from "./ElectoralTrends";

describe("ElectoralTrends", () => {
  it("renders election summary and latest indicators", () => {
    render(<ElectoralTrends />);

    expect(screen.getByRole("heading", { name: "Electoral Trends & Summary Indicators" })).toBeInTheDocument();
    expect(screen.getByText("Historical elections available").previousElementSibling).toHaveTextContent("3");
    expect(screen.getByText("Latest Turnout").parentElement).toHaveTextContent("48.79%");
    expect(screen.getByText("Latest Winner").parentElement).toHaveTextContent("Asaduddin Owaisi");
    expect(screen.getByText("Latest Winning Margin").parentElement).toHaveTextContent("3,38,087");
    expect(screen.getByRole("heading", { name: "Winning Margin Trend" })).toBeInTheDocument();
  });
});