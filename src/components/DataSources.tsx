function DataSources() {
  return (
    <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Data Sources & Methodology
      </h3>

      <p className="text-sm text-slate-500 mt-1 mb-5">
        Sources, calculation methods, and data limitations used in this
        dashboard.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3">
            Data Sources
          </h4>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              • Parliamentary election results: Election Commission of India
              (ECI)
            </li>

            <li>
              • Registered electors and turnout: Election Commission of India
              (ECI)
            </li>

            <li>
              • Assembly election results: Telangana Legislative Assembly
              Election 2023 / ECI
            </li>

            <li>
              • Constituency and Assembly Constituency mapping: Election
              Commission of India
            </li>

            <li>
              • Demographic indicators: Census / government sources where
              constituency-level data is available
            </li>
          </ul>
        </div>

        {/* Methodology */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3">
            Calculation Methodology
          </h4>

          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">
                Vote Share:
              </span>{" "}
              Candidate Votes ÷ Total Valid Votes × 100
            </p>

            <p>
              <span className="font-medium text-slate-800">
                Winning Margin:
              </span>{" "}
              Winner Votes − Runner-up Votes
            </p>

            <p>
              <span className="font-medium text-slate-800">
                Margin Percentage:
              </span>{" "}
              Winning Margin ÷ Total Valid Votes × 100
            </p>

            <p>
              <span className="font-medium text-slate-800">
                Turnout:
              </span>{" "}
              Total Votes Polled ÷ Registered Electors × 100
            </p>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className="mt-6 pt-5 border-t border-slate-200">
        <h4 className="font-semibold text-slate-800 mb-2">
          Data Limitations
        </h4>

        <p className="text-sm text-slate-600">
          Constituency-level demographic indicators such as population,
          gender distribution, rural/urban population, literacy, SC and ST
          population are currently marked as unavailable where a verified
          constituency-level source was not available. No demographic values
          have been fabricated or estimated.
        </p>
      </div>
    </section>
  );
}

export default DataSources;