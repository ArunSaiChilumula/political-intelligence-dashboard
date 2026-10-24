import constituencyData from "../data/constituency.json";

function Overview() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900">
          Constituency Overview
        </h3>

        <p className="text-slate-500 mt-2">
          Basic information about the Hyderabad Lok Sabha Constituency.
        </p>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Constituency</p>
          <p className="text-xl font-semibold text-slate-900 mt-2">
            {constituencyData.name}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Constituency Number</p>
          <p className="text-xl font-semibold text-slate-900 mt-2">
            {constituencyData.number}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">State</p>
          <p className="text-xl font-semibold text-slate-900 mt-2">
            {constituencyData.state}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Reference Year</p>
          <p className="text-xl font-semibold text-slate-900 mt-2">
            {constituencyData.referenceYear}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500">Total Electors</p>
          <p className="text-xl font-semibold text-slate-900 mt-2">
            {constituencyData.totalElectors?.toLocaleString() ??
              "Data unavailable"}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Reference year: {constituencyData.referenceYear}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500">Geographical Coverage</p>
          <p className="text-base font-semibold text-slate-900 mt-2">
            {constituencyData.geographicalCoverage ?? "Data unavailable"}
          </p>
        </div>
      </div>

      {/* Assembly Constituencies */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Assembly Constituencies
        </h3>

        <p className="text-sm text-slate-500 mt-1 mb-5">
          Seven Assembly Constituencies form the Hyderabad Lok Sabha
          Constituency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {constituencyData.assemblyConstituencies.map((assembly) => (
            <div
              key={assembly.number}
              className="border border-slate-200 rounded-lg p-4 bg-slate-50"
            >
              <span className="font-semibold text-teal-700">
                {assembly.number}
              </span>

              <span className="ml-3 text-slate-700">{assembly.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demographics */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Demographic Indicators
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Reference year: {constituencyData.referenceYear}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DemographicCard
            title="Population"
            value={constituencyData.demographics.population ?? "Data unavailable"}
          />

          <DemographicCard
            title="Gender Distribution"
            value={constituencyData.demographics.genderDistribution ?? "Data unavailable"}
          />

          <DemographicCard
            title="Rural / Urban"
            value={constituencyData.demographics.ruralUrban ?? "Data unavailable"}
          />

          <DemographicCard
            title="Literacy Rate"
            value={constituencyData.demographics.literacyRate ?? "Data unavailable"}
          />

          <DemographicCard
            title="SC Population"
            value={constituencyData.demographics.scPopulation ?? "Data unavailable"}
          />

          <DemographicCard
            title="ST Population"
            value={constituencyData.demographics.stPopulation ?? "Data unavailable"}
          />
        </div>

        <p className="text-xs text-slate-400 mt-5">
          Demographic figures are not included because verified constituency-
          level data has not yet been added to the dashboard dataset.
        </p>
      </div>
    </div>
  );
}

function DemographicCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border border-slate-200 rounded-lg p-5">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="text-lg font-semibold text-slate-700 mt-2">{value}</p>
    </div>
  );
}

export default Overview;
