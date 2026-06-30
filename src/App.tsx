/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect } from "react";
import { reputationDataset } from "./data/reputation";
import { giniDataset } from "./data/gini";
import { nobelDataset } from "./data/nobel";
import { lifeExpectancyDataset } from "./data/life_expectancy";
import Header from "./components/Header";
import Infographic from "./components/Infographic";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const AVAILABLE_DATASETS = [
  { id: "life-expectancy", label: "Life Expectancy at Birth (2000–2024)", data: lifeExpectancyDataset },
  { id: "reputation-rankings", label: "Global Reputation Rankings (2024 vs 2025)", data: reputationDataset },
  { id: "gini-index", label: "Income Inequality Gini Index (2014 vs 2024)", data: giniDataset },
  { id: "nobel-laureates", label: "Nobel Laureates (Birth Country, 1901–1970 vs 1901–2020)", data: nobelDataset }
];

export default function App() {
  const [activeDatasetId, setActiveDatasetId] = useState("reputation-rankings");
  const activeEntry = AVAILABLE_DATASETS.find((d) => d.id === activeDatasetId) || AVAILABLE_DATASETS[0];
  const dataset = activeEntry.data;

  // Configuration states
  const [topN, setTopN] = useState(dataset.meta.topN);
  const [missingPolicy, setMissingPolicy] = useState<"hide" | "show-faded">(
    dataset.meta.missingPolicy as "hide" | "show-faded"
  );
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [periodAId, setPeriodAId] = useState(dataset.meta.periods[0]?.id || "");
  const [periodBId, setPeriodBId] = useState(dataset.meta.periods[1]?.id || dataset.meta.periods[0]?.id || "");

  // Sync settings when dataset is swapped
  useEffect(() => {
    setTopN(dataset.meta.topN);
    setMissingPolicy(dataset.meta.missingPolicy as "hide" | "show-faded");
    setHoveredCountryId(null);
    setPeriodAId(dataset.meta.periods[0]?.id || "");
    setPeriodBId(dataset.meta.periods[1]?.id || dataset.meta.periods[0]?.id || "");
  }, [activeDatasetId, dataset]);

  // Determine the maximum bounds for topN filtering based on dataset metadata
  const maxTopN = dataset.meta.topN;

  return (
    <div 
      className={`min-h-screen bg-chalkboard text-slate-100 flex flex-col font-sans transition-colors duration-300 relative ${hoveredCountryId ? "pb-24" : ""}`}
      onClick={() => setHoveredCountryId(null)}
    >
      {/* Visual background gradient accents */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-amber-500/3 rounded-full blur-[90px]" />
        <div className="absolute top-40 right-1/3 w-[400px] h-[400px] bg-rose-500/3 rounded-full blur-[100px]" />
      </div>

      {/* Slide-out Sidebar Control Panel */}
      <Sidebar
        dataset={dataset}
        availableDatasets={AVAILABLE_DATASETS.map((d) => ({ id: d.id, label: d.label }))}
        activeDatasetId={activeDatasetId}
        onDatasetChange={setActiveDatasetId}
        topN={topN}
        onTopNChange={setTopN}
        maxTopN={maxTopN}
        missingPolicy={missingPolicy}
        onMissingPolicyChange={setMissingPolicy}
        periodAId={periodAId}
        periodBId={periodBId}
        onPeriodAChange={setPeriodAId}
        onPeriodBChange={setPeriodBId}
      />

      <div className="flex-1 relative z-10 w-full flex flex-col px-4 sm:px-6">
        {/* Editorial Header */}
        <Header dataset={dataset} topN={topN} periodBId={periodBId} />

        {/* Alluvial Infographic Chart Column Grid */}
        <main className="flex-1 w-full flex flex-col">
          <Infographic
            dataset={dataset}
            topN={topN}
            missingPolicy={missingPolicy}
            hoveredCountryId={hoveredCountryId}
            setHoveredCountryId={setHoveredCountryId}
            periodAId={periodAId}
            periodBId={periodBId}
            onPeriodAChange={setPeriodAId}
            onPeriodBChange={setPeriodBId}
          />
        </main>

        {/* Signature Footer */}
        <Footer dataset={dataset} topN={topN} periodBId={periodBId} />
      </div>

      <Analytics/>
    </div>
  );
}

/* ============================================================================
   HOW TO ADAPT AND REUSE THE DATA IN THIS INFOGRAPHIC APP
   ============================================================================

   This application is designed as a reusable foundation for any ranked list
   comprising countries over 2 periods. The presentation layout is entirely
   data-driven. Here is a guide on how to extend and customize the engine:

   1. HOW TO ADD COUNTRIES:
      Open `/src/data/reputation.ts` or `/src/data/gini.ts` and add a new country
      object into the `countries` array using the standard schema:
      ```javascript
      {
        "id": "new-country-id",
        "name": "Display Name",
        "code": "ISO-2-CODE",
        "values": {
          "period_A_id": 12.3,
          "period_B_id": 14.5
        }
      }
      ```
      The layout computes all positions mathematically; no styling adjustments are needed.

   2. HOW TO CHANGE PERIODS:
      In the dataset's `meta` object, edit the `periods` array. Specify the
      ids of the new periods (e.g., "q1-2025" and "q1-2026") and their headers:
      ```javascript
      "periods": [
        { "id": "2024", "label": "2024 Rank" },
        { "id": "2025", "label": "2025 Rank" }
      ]
      ```
      Ensure that the values inside the `countries` list match these keys:
      `values: { "2024": 12, "2025": 14 }`.

   3. HOW TO SWITCH ASCENDING/DESCENDING SORTING DIRECTION:
      Change the `sortDirection` value in the dataset's `meta` object:
      - "asc": Lower numbers represent BETTER positions (e.g. Rank 1, 2, 3... 60).
      - "desc": Higher numbers represent BETTER positions (e.g. GDP, Inequality Gini score, Happiness).
      The computation engine automatically sorts, calculates, and renders lists and ribbons correctly.

   4. HOW TO CHANGE THE METRIC TITLE, SUBTITLE AND UNIT:
      Modify the respective text properties inside `meta`:
      ```javascript
      "title": "Income Inequality by Country",
      "subtitle": "Top 15 countries by Gini index",
      "metric": "Gini Index",
      "unit": "index points"
      ```
      These properties are read dynamically by both `<Header />` and `<Infographic />`.

   5. HOW THE FLAG URL IS CONSTRUCTED:
      Country flags are fetched dynamically from the high-performance FlagCDN:
      `https://flagcdn.com/${country.code.toLowerCase()}.svg`
      Ensure your `code` property contains the correct lowercase ISO 3166-1 alpha-2 
      country code (e.g. "US" for United States, "GB" for UK, "CH" for Switzerland).

   6. HOW TO ADD A SECOND RANKING DATASET:
      - Create a new file under `/src/data/[your-filename].ts` and export a variable following
        the `RankingDataset` schema.
      - Import it at the top of `/src/App.tsx`.
      - Register the new dataset inside the `AVAILABLE_DATASETS` array:
        ```javascript
        const AVAILABLE_DATASETS = [
          { id: "reputation-rankings", label: "Global Reputation Rankings (2024 vs 2025)", data: reputationDataset },
          { id: "gini-index", label: "Income Inequality Gini Index (2014 vs 2024)", data: giniDataset },
          { id: "your-id", label: "My Custom Metric", data: myCustomDataset }
        ];
        ```
      The customization menu at the bottom will automatically show the new option, and selecting
      it will swap the entire infographic layout and ribbon colors instantly!

   7. HOW THE RENDERER CONSUMES SEPARATELY LOADED DATA:
      The orchestration engine decouples rendering entirely:
      - `App.tsx` handles state and registry.
      - `Header.tsx` generates color stops and legend labels relative to active data.
      - `Infographic.tsx` computes relative ranks on the fly and constructs curve coordinates 
        using a dynamic ResizeObserver for robust layout-adaptive rendering.
   ============================================================================ */
