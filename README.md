# CountryRankWeave

> Where country rankings come alive. An interactive, data-driven take on the classic "before vs. after" infographic.

**CountryRankWeave** transforms static ranking charts into explorable, interactive visualizations. Inspired by Visual Capitalist's ["Countries With the Best Reputations in 2025"](https://www.visualcapitalist.com/ranked-countries-with-the-best-reputations-in-2025/), the app recreates the editorial look of the original infographic — then goes further by letting you select countries, filter the leaderboard, swap metrics, and compare any two time periods side by side.

Each visualization is built around a bold **alluvial slope chart**: two ranked columns connected by colored ribbons that reveal how positions shift between a start period and an end period. The color of every ribbon encodes the country's final standing, so you can spot winners, losers, and steady performers at a glance.

<div class="center">
  <img src="./docs/images/demo.gif" alt="Countries with the best reputations in 2025" />
</div>

---

## What It Renders

The app produces full-screen, editorial-style infographics with:

- **Dual ranked columns** for the selected start and end periods.
- **Curved ribbons** that trace each country's rise or fall in the rankings.
- **Country flags**, **rank badges**, and **change indicators** (`+3`, `-5`, unchanged).
- A **destination-rank color scale**: emerald green for #1, shifting through lime, yellow, orange, and red to magenta for the last rank.
- A **spotlight footer** that appears when you select a country, showing its exact values and rank movement.
- A **searchable country finder** in the chart header.
- A **slide-out customization panel** to change datasets, periods, top-N filtering, and missing-data policy.

---

## Datasets Included

The same flexible data structure powers every chart. The app ships with four datasets:

| Dataset | Periods | What It Shows |
|---|---|---|
| **Global Reputation Rankings** | 2024 vs 2025 | Reputation Lab's ranking of 60 leading economies. The original inspiration for the app. |
| **Income Inequality (Gini Index)** | 2014 vs 2024 | Countries with the highest Gini index scores, sourced from the World Bank. |
| **Nobel Laureates by Birth Country** | 1901–1970 vs 1901–2020 | Cumulative Nobel Prize winners grouped by modern birth country. |
| **Life Expectancy at Birth** | 2000, 2010, 2020, 2024 | World Bank life expectancy data across four snapshots. |

Adding more datasets is intentionally straightforward — the engine is data-driven and the schema is documented in `docs/dataset-prompt.md` and inside `src/App.tsx`.

---

## Interactive Features

- **Switch datasets** from the slide-out sidebar to explore different global metrics.
- **Select any country** by clicking its row or ribbon — the rest of the chart dims and a detail panel slides in.
- **Search** for a country by name to jump straight to its position.
- **Filter Top N** with a slider to focus on the top 5, 10, 30, or the full leaderboard.
- **Pick comparison periods** (where a dataset has more than two) using the dropdowns in the sidebar.
- **Control missing data**: show faded entries for countries that enter or exit the ranking, or hide them entirely.
- **Export** the active dataset as JSON directly from the sidebar.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev and build
- **Tailwind CSS v4** for styling
- **Lucide React** for iconography
- **FlagCDN** for dynamic flag images
- Pure SVG math for the ribbon geometry (no charting library)

---

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the URL printed in your terminal (defaults to `http://localhost:3000`).

Other useful scripts:

- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — TypeScript type check

---

## Credits

- Original chart concept and data source: [Visual Capitalist / Reputation Lab](https://www.visualcapitalist.com/ranked-countries-with-the-best-reputations-in-2025/)
- Dataset research prompt and schema: `docs/dataset-prompt.md`

---

## License

This project is licensed under the [MIT License](LICENSE).
