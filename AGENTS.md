# AGENTS.md — CountryRankWeave

Agent-facing guide for understanding, running, and extending the CountryRankWeave interactive ranking infographic app.

---

## Project Overview

CountryRankWeave is a React + TypeScript single-page app that renders editorial-style **alluvial slope charts** comparing country rankings across two time periods. It was originally built to recreate [Visual Capitalist](https://www.visualcapitalist.com/ranked-countries-with-the-best-reputations-in-2025/)'s "Countries With the Best Reputations" infographic as an interactive experience, then generalized so additional ranked country datasets can be dropped in with minimal code changes.

The chart engine is fully data-driven: the same `RankingDataset` schema controls the header, columns, ribbons, color scale, and interactions for every dataset.

---

## Tech Stack

- **Framework:** React 19 (function components + hooks)
- **Language:** TypeScript 5.8
- **Build tool:** Vite 6
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Icons:** `lucide-react`
- **Flags:** Loaded dynamically from `https://flagcdn.com/{code}.svg`
- **Animation:** `motion` (installed, used sparingly)
- **AI SDK:** `@google/genai` (installed but not used in the current renderer)

---

## Key Files and Structure

```
D:\develop\projects\CountryRankWeave
├── index.html                 # Vite entry HTML (title currently "My Google AI Studio App")
├── vite.config.ts             # Vite + React + Tailwind config; DISABLE_HMR env handling
├── tsconfig.json              # ES2022, bundler module resolution, jsx: react-jsx
├── package.json               # Scripts: dev, build, preview, lint, clean
├── README.md                  # User-facing project description
├── AGENTS.md                  # This file
├── docs/
│   ├── Countries-With-the-Best-Reputations.png  # Original reference image
│   └── dataset-prompt.md      # Prompt/schema used to research and shape new datasets
└── src/
    ├── main.tsx               # React root render
    ├── App.tsx                # App shell, dataset registry, state orchestration
    ├── index.css              # Tailwind import, custom fonts, chalkboard background
    ├── types.ts               # Core TypeScript interfaces
    ├── utils/colors.ts        # Rank-to-color interpolation and dim helper
    ├── data/
    │   ├── reputation.ts      # 2024–2025 Reputation Lab rankings
    │   ├── gini.ts            # 2014 vs 2024 Gini index
    │   ├── nobel.ts           # Nobel laureates by birth country
    │   └── life_expectancy.ts # World Bank life expectancy
    └── components/
        ├── Header.tsx         # Editorial title, subtitle, period label
        ├── Infographic.tsx    # Main chart: lists, SVG ribbons, search, spotlight footer
        ├── Sidebar.tsx        # Slide-out dataset/settings/export panel
        └── Footer.tsx         # Color legend, source note, info popover
```

---

## Data Model

Everything flows from `src/types.ts`:

```ts
interface RankingDataset {
  meta: DatasetMeta;
  countries: CountryData[];
}

interface DatasetMeta {
  title: string;
  subtitle: string;
  metric: string;
  unit: string;
  periods: Period[];          // e.g. [{id:"2024", label:"2024 Rank"}, ...]
  topN: number;               // max rows to render (also max for slider)
  sortDirection: "asc" | "desc";
  missingPolicy: "hide" | "show-faded";
  ribbonMode: "constant" | "value-based" | "varying";
  sourceNote: string;
  datasetId: string;
  datasetLabel: string;
}

interface CountryData {
  id: string;
  name: string;
  code: string;               // ISO-3166-1 alpha-2 (uppercase)
  values: Record<string, number | null>;
}
```

Key semantics:

- `sortDirection`: determines whether lower values (`asc`, e.g. rank 1 is best) or higher values (`desc`, e.g. Gini or life expectancy) sort to the top.
- `missingPolicy`: `"show-faded"` renders entering/exiting countries faded at the bottom; `"hide"` removes any country missing data in either selected period.
- `ribbonMode`: currently a rendering hint stored in meta; the renderer mostly treats ribbons as constant-thickness connectors.
- `code`: used for flag lookup via FlagCDN. Non-standard codes (e.g. `GB-SCT`, `EU`) may fail gracefully — the renderer tracks failed flags and hides them.

---

## Common Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server on http://localhost:3000
npm run build        # Production build into dist/
npm run preview      # Preview production build
npm run lint         # tsc --noEmit (type check only)
npm run clean        # Remove dist and server.js
```

The dev server binds to `0.0.0.0` by default. Vite's HMR can be disabled via the `DISABLE_HMR=true` environment variable.

---

## How to Add a New Dataset

The app is designed to accept a new dataset with one import and one registry entry.

1. Create `src/data/{your-dataset}.ts` exporting a `RankingDataset` constant.
2. Import it in `src/App.tsx`.
3. Add an entry to the `AVAILABLE_DATASETS` array.

The sidebar will automatically show the new option, and selecting it swaps the entire layout.

For the exact schema, source requirements, and ranking/sorting rules, see `docs/dataset-prompt.md`. For a code-level recipe (how to change periods, sorting direction, units, etc.), see the long comment block at the bottom of `src/App.tsx`.

---

## Component Responsibilities

- **App.tsx:** Owns `activeDatasetId`, `topN`, `missingPolicy`, `periodAId`, `periodBId`, and `hoveredCountryId`. Syncs all settings when the dataset changes.
- **Sidebar.tsx:** Provides dataset selection, Top-N slider, missing-policy toggle, period dropdowns (when >2 periods), and JSON export. Uses internal state for open/closed and settings visibility.
- **Header.tsx:** Renders the editorial title, dataset label, subtitle, and active final-period indicator.
- **Infographic.tsx:** The heaviest component. Computes ranks for both selected periods, positions rows, draws SVG ribbons with Bézier curves, handles hover/click/search, and renders the fixed spotlight footer.
- **Footer.tsx:** Renders the color-legend strip, source note, and the info popover explaining the destination-rank color rule.
- **colors.ts:** Maps a rank (1 to N) to a continuous palette (emerald → lime → yellow → orange → red → magenta).

---

## Important Patterns and Gotchas

- **Destination-rank color rule:** Ribbon color is always determined by the country's rank in the **end period** (`periodBId`), even when the ribbon starts from the left column. This keeps movement tracking visually consistent.
- **Rank computation happens in Infographic.tsx:** Ranks are not stored in the dataset; they are derived by sorting the selected period's values according to `sortDirection` and truncating to `topN`.
- **Two rendering paths for missing data:**
  - `"show-faded"`: a country present in only one column is shown faded and its ribbon fades into/out of the center.
  - `"hide"`: both columns are filtered to only countries with data in both selected periods.
- **SVG geometry is ResizeObserver-driven:** `Infographic.tsx` measures its container and recalculates middle spacing and Bézier control points responsively.
- **Flags are loaded from FlagCDN:** A failed flag URL is tracked in local state and the image is hidden. Non-standard codes may fail; this is expected and graceful.
- **Click-outside behavior:** Clicking the page background clears the active country selection. The sidebar and spotlight footer stop propagation.

---

## Styling Notes

- Tailwind CSS v4 is imported in `src/index.css` with `@import "tailwindcss";`.
- Custom theme tokens (`--font-serif`, `--font-sans`, `--font-mono`, `--font-display`) are declared in `@theme`.
- The dark "chalkboard" aesthetic uses the `.bg-chalkboard` utility defined in `index.css`.
- Accent color is `#cfff3b` (lime-green) used for active states, highlights, and the chart's top-rank end of the scale.

---

## Build and Deployment

- Vite builds to `dist/`.
- No backend is required for the chart renderer. `express` and `@google/genai` are installed in `package.json` but are not part of the current client-only rendering path.
- The `clean` script uses `rm -rf` and is intended for Unix-like shells; on Windows it may need adjustment if used.

---

## Extension Ideas

- Add a third or fourth period to any dataset — the UI already supports period dropdowns when `periods.length > 2`.
- Implement `ribbonMode: "value-based"` to vary ribbon thickness by metric magnitude.
- Add shareable URL state by serializing `activeDatasetId`, `topN`, `periodAId`, `periodBId`, and `hoveredCountryId` into query params.
- Replace static JSON datasets with fetched API data, as long as the response is mapped to `RankingDataset`.
