import { describe, expect, it } from "vitest";
import assemblyData from "./assemblyElections.json";
import parliamentaryData from "./parliamentaryElections.json";

describe("parliamentary election data", () => {
  it("includes complete records for 2014, 2019, and 2024", () => {
    expect(parliamentaryData.map((election) => election.year)).toEqual([
      2014,
      2019,
      2024,
    ]);

    for (const election of parliamentaryData) {
      expect(election.winner).toBeTruthy();
      expect(election.candidates.find((candidate) => candidate.winner)?.votes).toEqual(
        expect.any(Number),
      );
      expect(election.totalValidVotes).toEqual(expect.any(Number));
      expect(election.registeredElectors).toEqual(expect.any(Number));
      expect(election.turnout).toEqual(expect.any(Number));
    }
  });

  it("preserves historical TRS/BRS party names", () => {
    const partyByYear = Object.fromEntries(
      parliamentaryData.map((election) => [
        election.year,
        election.candidates.find((candidate) => candidate.party === "TRS" || candidate.party === "BRS")?.party,
      ]),
    );

    expect(partyByYear).toEqual({ 2014: "TRS", 2019: "TRS", 2024: "BRS" });
  });
});

describe("assembly election data", () => {
  it("contains a complete Malakpet record with a consistent winning margin", () => {
    const election = assemblyData.find((record) => record.assemblyNumber === 58);

    expect(election).toBeDefined();
    expect(election?.assemblyNumber).toBeTruthy();
    expect(election?.assemblyName).toBeTruthy();
    expect(election?.winner.candidate).toBeTruthy();
    expect(election?.winner.votes).toEqual(expect.any(Number));
    expect(election?.runnerUp.candidate).toBeTruthy();
    expect(election?.winningMargin).toEqual(expect.any(Number));
    expect(election?.turnout).toEqual(expect.any(Number));
    expect(election?.winningMargin).toBe(
      (election?.winner.votes ?? 0) - (election?.runnerUp.votes ?? 0),
    );
  });
});