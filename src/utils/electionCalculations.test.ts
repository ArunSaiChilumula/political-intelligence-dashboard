import { describe, expect, it } from "vitest";
import {
  calculateTurnout,
  calculateVoteShare,
  calculateWinningMargin,
  calculateWinningMarginPercentage,
} from "./electionCalculations";

describe("election calculations", () => {
  it("calculates candidate vote share", () => {
    expect(calculateVoteShare(250, 1000)).toBe(25);
  });

  it("calculates winning margin in votes and as a percentage", () => {
    const margin = calculateWinningMargin(600, 400);

    expect(margin).toBe(200);
    expect(calculateWinningMarginPercentage(margin, 1000)).toBe(20);
  });

  it("calculates turnout", () => {
    expect(calculateTurnout(750, 1000)).toBe(75);
  });

  it("returns zero for zero denominators", () => {
    expect(calculateVoteShare(100, 0)).toBe(0);
    expect(calculateWinningMarginPercentage(100, 0)).toBe(0);
    expect(calculateTurnout(100, 0)).toBe(0);
  });
});