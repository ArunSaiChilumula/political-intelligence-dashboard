import { useState } from "react";
import parliamentaryData from "../data/parliamentaryElections.json";
import ParliamentaryCharts from "../charts/ParliamentaryCharts";
import DataSources from "./DataSources";
import CustomDropdown from "./CustomDropdown";

function ParliamentarySection() {
  const [selectedYear, setSelectedYear] = useState(2024);

  const election = parliamentaryData.find((item) => item.year === selectedYear);

  if (!election) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <p>No election data available.</p>
      </div>
    );
  }

  const winner = election.candidates.find((candidate) => candidate.winner);

  const runnerUp = election.candidates
    .filter((candidate) => !candidate.winner)
    .sort((a, b) => b.votes - a.votes)[0];

  const calculatedMargin =
    winner && runnerUp ? winner.votes - runnerUp.votes : 0;

  const winnerVoteShare = winner
    ? (winner.votes / election.totalValidVotes) * 100
    : 0;

  const winningMarginPercentage =
    election.totalValidVotes > 0
      ? (calculatedMargin / election.totalValidVotes) * 100
      : 0;
  const turnout = election.registeredElectors > 0
    ? (election.totalVotesPolled / election.registeredElectors) * 100
    : 0;

  return (
    <section>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            Parliamentary Election Analysis
          </h3>

          <p className="text-slate-500 mt-1">
            Historical Lok Sabha election results for Hyderabad.
          </p>
        </div>

        {/* Year Filter */}
        <div className="w-full min-w-0 md:w-48">
          <CustomDropdown
            id="parliamentary-year"
            label="Year"
            value={selectedYear}
            options={parliamentaryData.map((item) => ({
              value: item.year,
              label: String(item.year),
            }))}
            onChange={setSelectedYear}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Winner</p>
          <p className="text-xl font-bold mt-2">{election.winner}</p>
          <p className="text-sm text-teal-600 mt-1">{election.winnerParty}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Winner Votes</p>
          <p className="text-2xl font-bold mt-2">
            {winner?.votes.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {winnerVoteShare.toFixed(2)}% vote share
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Valid Votes</p>
          <p className="text-2xl font-bold mt-2">
            {election.totalValidVotes.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Winning Margin</p>
          <p className="text-2xl font-bold mt-2">
            {calculatedMargin.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            votes ({winningMarginPercentage.toFixed(2)}%)
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Turnout</p>
          <p className="text-2xl font-bold mt-2">{turnout.toFixed(2)}%</p>
        </div>
      </div>

      <ParliamentaryCharts />
      {/* Candidate Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h4 className="text-lg font-semibold">
            Candidate Results — {selectedYear}
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Candidate</th>
                <th className="px-6 py-4 text-sm font-semibold">Party</th>
                <th className="px-6 py-4 text-sm font-semibold">Votes</th>
                <th className="px-6 py-4 text-sm font-semibold">Vote Share</th>
                <th className="px-6 py-4 text-sm font-semibold">Result</th>
              </tr>
            </thead>

            <tbody>
              {election.candidates.map((candidate) => (
                <tr
                  key={`${candidate.candidate}-${candidate.party}`}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-4 font-medium">
                    {candidate.candidate}
                  </td>

                  <td className="px-6 py-4">{candidate.party}</td>

                  <td className="px-6 py-4">
                    {candidate.votes.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {(
                      (candidate.votes / election.totalValidVotes) *
                      100
                    ).toFixed(2)}
                    %
                  </td>

                  <td className="px-6 py-4">
                    {candidate.winner ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                        Winner
                      </span>
                    ) : (
                      <span className="text-slate-500 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DataSources />
    </section>
  );
}

export default ParliamentarySection;
