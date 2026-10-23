import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import parliamentaryData from "../data/parliamentaryElections.json";

function ElectoralTrends() {
  const trendData = parliamentaryData.map((election) => ({
    year: election.year,
    winnerVoteShare:
      (election.candidates.find((candidate) => candidate.winner)?.votes ?? 0) /
      election.totalValidVotes *
      100,
    turnout: election.registeredElectors > 0
      ? (election.totalVotesPolled / election.registeredElectors) * 100
      : 0,
    winningMargin: election.winningMargin,
  }));

  return (
    <div className="page-content">
      <h1>Electoral Trends & Summary Indicators</h1>

      <p className="page-description">
        Historical electoral trends for Hyderabad Lok Sabha Constituency.
      </p>

      {/* Summary cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Election Years</span>
          <strong className="kpi-value">
            {parliamentaryData.length}
          </strong>
          <span className="kpi-subtext">
            Historical elections available
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Latest Turnout</span>
          <strong className="kpi-value">
            {trendData[trendData.length - 1].turnout.toFixed(2)}%
          </strong>
          <span className="kpi-subtext">
            {trendData[trendData.length - 1].year}
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Latest Winner</span>
          <strong className="kpi-value">
            {parliamentaryData[parliamentaryData.length - 1].winner}
          </strong>
          <span className="kpi-subtext">
            {parliamentaryData[parliamentaryData.length - 1].winnerParty}
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Latest Winning Margin</span>
          <strong className="kpi-value">
            {parliamentaryData[
              parliamentaryData.length - 1
            ].winningMargin.toLocaleString()}
          </strong>
          <span className="kpi-subtext">
            votes
          </span>
        </div>
      </div>

      <div className="trends-chart-grid">
      {/* Winner Vote Share */}
      <div className="section trends-chart-card">
        <h2>Winner Vote Share Trend</h2>

        <p className="chart-description">
          Winner's vote share across Parliamentary elections.
        </p>

        <div className="trends-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value) =>
                  `${Number(value).toFixed(2)}%`
                }
              />

              <Line
                type="monotone"
                dataKey="winnerVoteShare"
                name="Winner Vote Share"
                stroke="#0f766e"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Turnout */}
      <div className="section trends-chart-card">
        <h2>Voter Turnout Trend</h2>

        <p className="chart-description">
          Percentage of registered electors who voted in each election.
        </p>

        <div className="trends-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value) =>
                  `${Number(value).toFixed(2)}%`
                }
              />

              <Line
                type="monotone"
                dataKey="turnout"
                name="Turnout"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Winning Margin */}
      <div className="section trends-chart-card">
        <h2>Winning Margin Trend</h2>

        <p className="chart-description">
          Winning margin in votes across Parliamentary elections.
        </p>

        <div className="trends-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `${Number(value).toLocaleString()} votes`
                }
              />

              <Line
                type="monotone"
                dataKey="winningMargin"
                name="Winning Margin"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>

      {/* Methodology */}
      <div className="section methodology">
        <h2>Calculation Methodology</h2>

        <p>
          <strong>Vote Share:</strong> Candidate votes ÷ total valid
          votes × 100
        </p>

        <p>
          <strong>Winning Margin:</strong> Winner votes − runner-up
          votes
        </p>

        <p>
          <strong>Turnout:</strong> Votes polled ÷ registered electors
          × 100
        </p>

        <p className="chart-description">
          Figures are based on the election data available in the
          dashboard dataset. Where official data is unavailable, it is
          not inferred.
        </p>
      </div>
    </div>
  );
}

export default ElectoralTrends;