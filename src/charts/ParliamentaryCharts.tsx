import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import parliamentaryData from "../data/parliamentaryElections.json";

type PartyPerformanceDatum = {
  year: number;
  AIMIM: number;
  BJP: number;
  INC: number;
  "TRS / BRS": number;
};

function ParliamentaryCharts() {
  const trendData = parliamentaryData.map((election) => {
    const winner = election.candidates.find((candidate) => candidate.winner);
    const runnerUp = election.candidates
      .filter((candidate) => !candidate.winner)
      .sort((a, b) => b.votes - a.votes)[0];

    const winnerVoteShare = winner
      ? (winner.votes / election.totalValidVotes) * 100
      : 0;

    return {
      year: election.year,
      turnout: election.registeredElectors > 0
        ? (election.totalVotesPolled / election.registeredElectors) * 100
        : 0,
      voteShare: winnerVoteShare,
      margin: winner && runnerUp ? winner.votes - runnerUp.votes : 0,
    };
  });

  const partyPerformanceData: PartyPerformanceDatum[] = parliamentaryData.map(
    (election) => {
      const partyVotes = election.candidates.reduce<Record<string, number>>(
        (totals, candidate) => {
          const party = candidate.party === "TRS" || candidate.party === "BRS"
            ? "TRS / BRS"
            : candidate.party;
          totals[party] = (totals[party] ?? 0) + candidate.votes;
          return totals;
        },
        {},
      );

      const result: PartyPerformanceDatum = {
        year: election.year,
        AIMIM: 0,
        BJP: 0,
        INC: 0,
        "TRS / BRS": 0,
      };

      for (const party of ["AIMIM", "BJP", "INC", "TRS / BRS"] as const) {
        result[party] = election.totalValidVotes > 0
          ? ((partyVotes[party] ?? 0) / election.totalValidVotes) * 100
          : 0;
      }

      return result;
    },
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Vote Share Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-900">
          Winner Vote Share Trend
        </h4>

        <p className="text-sm text-slate-500 mb-4">
          Winning candidate vote share across elections
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />

              <Tooltip formatter={(value) => `${value}%`} />

              <Line
                type="monotone"
                dataKey="voteShare"
                name="Vote Share"
                stroke="#0f766e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Turnout Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-900">
          Voter Turnout Trend
        </h4>

        <p className="text-sm text-slate-500 mb-4">
          Percentage of registered electors who voted
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />

              <Tooltip formatter={(value) => `${value}%`} />

              <Bar dataKey="turnout" name="Turnout" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Winning Margin Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-900">
          Winning Margin Trend
        </h4>

        <p className="text-sm text-slate-500 mb-4">
          Difference between winner and runner-up votes
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis tickFormatter={(value) => value.toLocaleString()} />

              <Tooltip formatter={(value) => Number(value).toLocaleString()} />

              <Bar dataKey="margin" name="Winning Margin" fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Party Performance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-900">
          Party Performance Across Years
        </h4>

        <p className="text-sm text-slate-500 mb-4">
          Vote share of major parties across Lok Sabha elections
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={partyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis domain={[0, 70]} tickFormatter={(value) => `${value}%`} />

              <Tooltip
                formatter={(value) =>
                  typeof value === "number" ? `${value.toFixed(2)}%` : value
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="AIMIM"
                stroke="#0f766e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="BJP"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="INC"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="TRS / BRS"
                name="TRS / BRS"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ParliamentaryCharts;
