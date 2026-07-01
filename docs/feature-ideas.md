# Feature Ideas for CountryRankWeave

A living document of potential enhancements, new datasets, and UX improvements.

---

## General Feature Ideas

### Data & Datasets
- Allow users to upload their own CSV/JSON datasets
- Show raw values alongside ranks in tooltips
- Add data source citations and last-updated timestamps

### Visualization
- Animate the ribbons when switching periods or datasets
- Toggle between rank view and raw value view
- Add a "tied rank" indicator when countries have identical values
- Zoom or pan for large datasets (60+ countries get cramped)
- Optional: replace ribbons with straight lines or stepped lines

### Interactivity
- Multi-select countries to compare a specific set
- Keyboard navigation (arrow keys to move between countries)
- Deep-link to a specific country + dataset + periods (shareable URL)
- Bookmark/favorite datasets or country comparisons

### Export & Sharing
- Export the chart as a PNG/SVG image
- Generate an embeddable iframe snippet
- Share on social with an auto-generated OG image

### UI Polish
- Dark/light theme toggle
- Mobile-specific layout (the current sidebar could become a bottom sheet)
- Loading skeleton when swapping datasets
- Smooth transitions between dataset switches

### Analytics
- Highlight the biggest movers (largest rank changes)
- Show average movement per region
- Add a "trend" indicator if more than two periods exist

---

## Dataset Ideas

The core value of CountryRankWeave is exploring how country rankings shift over time. Below are **dataset concepts** that fit the existing two-period, ranked-country model, together with notes on why they work well and where to source them.

### Existing Datasets (Shipped with the App)

| # | Dataset | Periods | What It Shows |
|---|---|---|---|
| 1 | **Global Reputation Rankings** | 2024 vs 2025 | Reputation Lab's ranking of 60 leading economies. The original inspiration for the app. |
| 2 | **Income Inequality (Gini Index)** | 2014 vs 2024 | Countries with the highest Gini index scores, sourced from the World Bank. |
| 3 | **Nobel Laureates by Birth Country** | 1901–1970 vs 1901–2020 | Cumulative Nobel Prize winners grouped by modern birth country. |
| 4 | **Life Expectancy at Birth** | 2000, 2010, 2020, 2024 | World Bank life expectancy data across four snapshots. |

### Proposed New Datasets

| # | Dataset | Suggested Periods | Why It Works | Suggested Source |
|---|---|---|---|---|
| 5 | **GDP per Capita (PPP)** | 2014 vs 2024 | Classic economic indicator; reveals which economies are catching up or pulling ahead. | World Bank / IMF |
| 6 | **World Happiness Report** | 2015 vs 2025 | Well-known annual index; social and emotional shifts are compelling to visualize. | Sustainable Development Solutions Network |
| 7 | **Corruption Perceptions Index** | 2014 vs 2024 | Transparency International's flagship score; public governance trends attract strong interest. | Transparency International |
| 8 | **Military Spending (% of GDP)** | 2014 vs 2024 | Geopolitical tension indicator; dramatic changes in specific regions are easy to spot. | SIPRI |
| 9 | **Internet Penetration Rate** | 2014 vs 2024 | Digital divide story; many developing nations show rapid climbs. | ITU / World Bank |
| 10 | **Human Development Index (HDI)** | 2014 vs 2024 | Composite of health, education, and income; the UN's headline development metric. | UNDP |
| 11 | **CO2 Emissions per Capita** | 2014 vs 2024 | Climate accountability lens; reveals decoupling of growth from emissions. | Global Carbon Project / World Bank |
| 12 | **Renewable Energy Share** | 2014 vs 2024 | Energy transition narrative; some countries leapfrog dramatically. | IRENA / Ember |
| 13 | **Education Index / Literacy Rate** | 2014 vs 2024 | Foundational development metric; near-universal convergence at the top. | UNESCO / UNDP |
| 14 | **Unemployment Rate** | 2014 vs 2024 | Labor-market health; post-pandemic and post-2008 recovery stories differ by region. | ILO / World Bank |
| 15 | **Poverty Rate (< $2.15/day)** | 2014 vs 2024 | Extreme poverty headcount; powerful visual of global progress or regression. | World Bank PovcalNet |
| 16 | **Healthcare Expenditure per Capita** | 2014 vs 2024 | Post-pandemic spending spikes and systemic investment disparities. | WHO / World Bank |
| 17 | **Infant Mortality Rate** | 2014 vs 2024 | Hard health-system outcome; steady improvement in most places makes movers stand out. | UN IGME / World Bank |
| 18 | **Safety / Crime Index** | 2014 vs 2024 | Quality-of-life concern; data sparser but highly engaging for users. | Numbeo / UNODC |
| 19 | **International Tourism Arrivals** | 2014 vs 2024 | Travel-industry recovery story; 2024 vs pre-pandemic baseline is especially interesting. | UNWTO |
| 20 | **Global Innovation Index** | 2014 vs 2024 | R&D and startup ecosystem proxy; highlights emerging tech hubs. | WIPO / Cornell / INSEAD |
| 21 | **Ease of Doing Business** | 2014 vs 2020 | Regulatory reform narrative; note: World Bank discontinued the index, so 2020 is the practical end period. | World Bank (archived) |
| 22 | **Gender Equality Index** | 2014 vs 2024 | Composite score for gaps in work, health, politics, and education. | WEF Global Gender Gap Report |
| 23 | **Average Working Hours per Week** | 2014 vs 2024 | Work-life balance debate; reveals cultural and legislative shifts. | OECD / ILO |
| 24 | **Smartphone Penetration** | 2014 vs 2024 | Mobile-first economy proxy; some countries skipped desktop entirely. | GSMA / Pew Research |
| 25 | **Food Security Index** | 2014 vs 2024 | Resilience and hunger lens; climate and conflict shocks create visible volatility. | Economist Impact / FAO |
| 26 | **Press Freedom Index** | 2014 vs 2024 | Democratic health signal; sharp deteriorations in specific regions are visually striking. | Reporters Without Borders |
| 27 | **Suicide Rate** | 2014 vs 2024 | Mental-health and social-cohesion indicator; stable in some places, alarming rises in others. | WHO |
| 28 | **Obesity Rate (Adults)** | 2014 vs 2024 | Public-health transition; rising fast nearly everywhere, but ranking shifts still occur. | WHO / World Obesity Federation |
| 29 | **Access to Clean Water** | 2014 vs 2024 | Basic infrastructure metric; many low-income countries still climbing. | WHO/UNICEF JMP / World Bank |
| 30 | **Electric Vehicle Market Share** | 2019 vs 2024 | Future-facing transport transition; early data only from ~2019, but changes are dramatic. | IEA / EV-Volumes |
| 31 | **Space Launches / Active Satellites** | 2014 vs 2024 | Emerging-space-race narrative; a small club, but explosive change at the top. | UCS Satellite Database / Space Launch Statistics |
| 32 | **Average Years of Schooling** | 2014 vs 2024 | Educational attainment; slow-moving but decisive for long-term development comparisons. | Barro-Lee / UNDP |
| 33 | **Foreign Direct Investment (FDI) Inflows** | 2014 vs 2024 | Economic confidence barometer; reveals which markets are winning global capital. | UNCTAD |
| 34 | **Youth Unemployment Rate** | 2014 vs 2024 | Generational economic outlook; often diverges sharply from overall unemployment. | ILO / OECD |
| 35 | **Social Progress Index** | 2014 vs 2024 | Broad well-being beyond GDP; captures inclusion, sustainability, and opportunity. | Social Progress Imperative |
| 36 | **Air Quality (PM2.5 Exposure)** | 2014 vs 2024 | Environmental health; improvement in some industrialized nations, worsening elsewhere. | IQAir / State of Global Air |
| 37 | **Government Debt (% of GDP)** | 2014 vs 2024 | Fiscal sustainability lens; post-pandemic debt spikes are highly visible. | IMF / World Bank |
| 38 | **Research & Development Spending (% of GDP)** | 2014 vs 2024 | Long-term competitiveness; slow shifts but clear leaders and fast followers. | UNESCO / World Bank |
| 39 | **Refugee Population by Origin** | 2014 vs 2024 | Humanitarian and geopolitical indicator; volatile and deeply meaningful. | UNHCR |
| 40 | **Rule of Law Index** | 2015 vs 2024 | Governance and institutional strength; gradual erosion or improvement is impactful. | World Justice Project |

---

## Notes on Adding Datasets

- Every dataset must conform to the `RankingDataset` schema documented in `docs/dataset-prompt.md` and inside `src/App.tsx`.
- The app auto-sorts, ranks, and colors ribbons based on the `sortDirection` flag (`asc` or `desc`), so metrics where *lower* is better (e.g., infant mortality, CO2) work just as well as metrics where *higher* is better.
- Periods do not have to be exactly 10 years apart; the engine only requires two valid period IDs present in each country's `values` map.
- If data is missing for a country in one period, the `missingPolicy` setting (`hide` or `show-faded`) controls how the UI handles the gap.

