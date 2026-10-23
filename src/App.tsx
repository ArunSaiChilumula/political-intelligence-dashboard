import { useState } from "react";
import constituencyData from "./data/constituency.json";
import ParliamentarySection from "./components/ParliamentarySection";
import AssemblyExplorer from "./pages/AssemblyExplorer";
import ElectoralTrends from "./pages/ElectoralTrends";
import Overview from "./pages/Overview";

type Section = "overview" | "parliamentary" | "assembly" | "trends";

function App() {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:min-h-screen bg-slate-900 text-white p-4 md:p-6 shrink-0">
        <h1 className="text-xl font-bold mb-8">Political Intelligence</h1>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection("overview")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeSection === "overview"
                ? "bg-teal-600"
                : "hover:bg-slate-800"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveSection("parliamentary")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeSection === "parliamentary"
                ? "bg-teal-600"
                : "hover:bg-slate-800"
            }`}
          >
            Parliamentary Elections
          </button>

          <button
            onClick={() => setActiveSection("assembly")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeSection === "assembly"
                ? "bg-teal-600"
                : "hover:bg-slate-800"
            }`}
          >
            Assembly Explorer
          </button>

          <button
            onClick={() => setActiveSection("trends")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeSection === "trends" ? "bg-teal-600" : "hover:bg-slate-800"
            }`}
          >
            Electoral Trends
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full flex-1 min-w-0 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-slate-500">
            Political Intelligence Dashboard
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            {constituencyData.name} Lok Sabha Constituency
          </h2>

          <p className="text-slate-500 mt-2">
            Constituency No. {constituencyData.number} •{" "}
            {constituencyData.state}
          </p>
        </div>

        {/* Overview */}
        {activeSection === "overview" && <Overview />}

        {/* Parliamentary */}
        {activeSection === "parliamentary" && <ParliamentarySection />}

        {/* Assembly */}
        {activeSection === "assembly" && <AssemblyExplorer />}

        {/* Trends */}
        {activeSection === "trends" && <ElectoralTrends />}
      </main>
    </div>
  );
}

export default App;
