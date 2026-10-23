import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import assemblyData from "../data/assemblyElections.json";
import CustomDropdown from "../components/CustomDropdown";

function AssemblyExplorer() {
  const [selectedAssembly, setSelectedAssembly] = useState(58);
  const [selectedYear, setSelectedYear] = useState(2023);

  const filteredData = assemblyData.find(
    (item) =>
      item.assemblyNumber === selectedAssembly && item.year === selectedYear,
  );

  if (!filteredData) {
    return <p>No election data available.</p>;
  }

  const winningMargin = filteredData.winner.votes - filteredData.runnerUp.votes;
  const marginPercentage = filteredData.totalValidVotes > 0
    ? (winningMargin / filteredData.totalValidVotes) * 100
    : 0;

  const assemblyComparisonData = assemblyData.map((assembly) => ({
    name: assembly.assemblyName,
    margin: assembly.winner.votes - assembly.runnerUp.votes,
  }));

  return (
    <div className="page-content">
      <h1>Assembly Constituency Explorer</h1>

      <p className="page-description">
        Explore the 7 Assembly Constituencies within Hyderabad.
      </p>

      {/* Filters */}
      <div className="filters" aria-label="Election filters">
        <div className="filter-group">
          <label id="assembly-constituency-label" htmlFor="assembly-constituency">Assembly Constituency</label>
          <CustomDropdown
            id="assembly-constituency"
            label="Assembly Constituency"
            value={selectedAssembly}
            options={assemblyData.map((assembly) => ({
              value: assembly.assemblyNumber,
              label: `${assembly.assemblyNumber} - ${assembly.assemblyName}`,
            }))}
            onChange={setSelectedAssembly}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="assembly-year">Year</label>

          <CustomDropdown
            id="assembly-year"
            label="Year"
            value={selectedYear}
            options={[{ value: 2023, label: "2023" }]}
            onChange={setSelectedYear}
          />
        </div>
      </div>

      {/* Assembly heading */}
      <div className="section-header">
        <div>
          <h2>{filteredData.assemblyName}</h2>

          <p>
            Assembly Constituency No. {filteredData.assemblyNumber} ·{" "}
            {filteredData.year}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Winner</span>

          <strong className="kpi-value">{filteredData.winner.candidate}</strong>

          <span className="kpi-subtext">{filteredData.winner.party}</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Winner Votes</span>

          <strong className="kpi-value">
            {filteredData.winner.votes.toLocaleString()}
          </strong>

          <span className="kpi-subtext">
            {filteredData.totalValidVotes > 0
              ? ((filteredData.winner.votes / filteredData.totalValidVotes) * 100).toFixed(2)
              : "0.00"}% vote share
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Winning Margin</span>

          <strong className="kpi-value">
            {winningMargin.toLocaleString()}
          </strong>

          <span className="kpi-subtext">
            {marginPercentage.toFixed(2)} percentage points
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Turnout</span>

          <strong className="kpi-value">{filteredData.turnout}%</strong>

          <span className="kpi-subtext">
            {filteredData.registeredElectors.toLocaleString()} registered
          </span>
        </div>
      </div>

      {/* Candidate Results */}
      <div className="section">
        <h2>Candidate Results</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th>Votes</th>
                <th>Vote Share</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.candidates.map((candidate) => (
                <tr key={candidate.candidate}>
                  <td>{candidate.candidate}</td>

                  <td>{candidate.party}</td>

                  <td>{candidate.votes.toLocaleString()}</td>

                  <td>
                    {filteredData.totalValidVotes > 0
                      ? ((candidate.votes / filteredData.totalValidVotes) * 100).toFixed(2)
                      : "0.00"}%
                  </td>

                  <td>
                    {candidate.winner ? (
                      <span className="winner-badge">Winner</span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section chart-section">
        <h2>Winning Margin by Assembly Constituency</h2>

        <p className="chart-description">
          Comparison of winning margins across the 7 Assembly Constituencies in
          2023.
        </p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={assemblyComparisonData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />

              <YAxis />

              <Tooltip
                formatter={(value) => `${Number(value).toLocaleString()} votes`}
              />

              <Bar
                dataKey="margin"
                name="Winning Margin"
                fill="#0f766e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
            
          </ResponsiveContainer>
        </div>
      </div>
      <div className="section chart-section">
  <h2>Candidate Vote Share</h2>

  <p className="chart-description">
    Vote share of candidates in the selected Assembly Constituency.
  </p>

  <div
    className="chart-container candidate-vote-share-chart"
    style={{ height: Math.max(350, filteredData.candidates.length * 58 + 36) }}
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={filteredData.candidates}
        layout="vertical"
        margin={{
          top: 12,
          right: 20,
          left: 8,
          bottom: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />

        <YAxis
          type="category"
          dataKey="candidate"
          width={150}
          interval={0}
          tick={({ x = 0, y = 0, payload }) => {
            const words = String(payload?.value ?? "").split(/\s+/);
            const lines: string[] = [];
            let line = "";

            words.forEach((word) => {
              const nextLine = line ? `${line} ${word}` : word;
              if (nextLine.length > 17 && line) {
                lines.push(line);
                line = word;
              } else {
                line = nextLine;
              }
            });
            if (line) lines.push(line);

            return (
              <text
                x={x}
                y={y}
                textAnchor="end"
                dominantBaseline="central"
                fill="#475569"
                fontSize={12}
              >
                {lines.map((textLine, index) => (
                  <tspan
                    key={`${textLine}-${index}`}
                    x={x}
                    dy={index === 0 ? `${-((lines.length - 1) * 7)}px` : "14px"}
                  >
                    {textLine}
                  </tspan>
                ))}
              </text>
            );
          }}
        />

        <Tooltip
          formatter={(value) => `${Number(value).toFixed(2)}%`}
        />

        <Bar
          dataKey="voteShare"
          name="Vote Share"
          fill="#0f766e"
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>      
    </div>
  );
}

export default AssemblyExplorer;
