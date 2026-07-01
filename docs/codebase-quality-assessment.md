# CountryRankWeave — Codebase Quality & Maintainability Assessment

> Assessment date: 2026-07-01
> Assessed by: Claude Code (Claude 5 Sonnet)
> Scope: Full source tree (`src/`, `docs/`, config files)

---

## 1. Architecture & Structure: Good

The project follows a clean, flat structure with clear separation of concerns.

| Layer | Files | Verdict |
|---|---|---|
| **Data** | `src/data/*.ts` | Static typed constants. Easy to add new datasets. |
| **Types** | `src/types.ts` | Single source of truth. Clean, minimal schema. |
| **Utils** | `src/utils/colors.ts` | Small, focused color interpolation module. |
| **Components** | `src/components/*.tsx` | Mostly well-scoped. |
| **Orchestration** | `src/App.tsx` | Owns state and dataset registry. Good inline documentation. |

**Strength:** Adding a dataset is genuinely just "create file → import → register in array." The engine is properly data-driven, and `App.tsx` syncs all dependent state (`topN`, `periodAId`, `periodBId`, etc.) automatically when the active dataset changes.

---

## 2. Component Design: Fair, With One Major Hotspot

| Component | Lines | Assessment |
|---|---|---|
| `Header.tsx` | 42 | Clean presentational component. |
| `Footer.tsx` | 126 | Good. Handles legend + info popover with click-outside logic. |
| `Sidebar.tsx` | 269 | Manageable. Internal state for open/close and settings visibility is well-encapsulated. |
| `Infographic.tsx` | **884** | **God component.** Does ranking math, SVG geometry, search, hover logic, spotlight footer, and flag rendering. |

`Infographic.tsx` is the single biggest maintainability risk. It computes:
- Period filtering and sorting for both columns
- Rank derivation
- SVG path geometry with Bézier curves
- ResizeObserver-driven responsive layout
- Search autocomplete with keyboard handling
- Click/hover interactions
- Spotlight footer rendering

**Recommendation:** Split into smaller units:
- `RankingEngine.ts` — pure functions for sorting, filtering, and rank mapping
- `RibbonLayer.tsx` — SVG `<g>` containing all Bézier paths
- `CountryColumn.tsx` — reusable left/right column renderer
- `SearchBar.tsx` — input + autocomplete dropdown
- `SpotlightFooter.tsx` — fixed bottom detail panel

---

## 3. Type Safety: Adequate But Not Strict

`src/types.ts` is well-designed:

```ts
sortDirection: "asc" | "desc";
missingPolicy: "hide" | "show-faded";
ribbonMode: "constant" | "value-based" | "varying";
```

However, `tsconfig.json` is **missing strict mode**. There is no `strict`, `noImplicitAny`, `strictNullChecks`, or `noUncheckedIndexedAccess`. The compiler will silently allow `any` in many places, which erodes the value of the interface definitions.

**Inconsistency spotted:** `docs/dataset-prompt.md` says `missingPolicy: "show-faded" | "skip"`, but `src/types.ts` and the renderer both use `"hide" | "show-faded"`. The word `"skip"` does not exist in the actual code.

---

## 4. Code Patterns & DRY: Mixed

**Good:**
- Consistent use of functional components + hooks
- `getRankColor` and `dimColor` are properly extracted to `utils/colors.ts`
- `handleImageError` pattern for FlagCDN failures is robust and gracefully degrades

**Not so good:**
- Flag rendering markup is **duplicated almost identically** for left and right columns in `Infographic.tsx` (lines 670–684 and 756–769). Only positioning (`right` vs `left`) differs.
- Hardcoded magic numbers scattered throughout: `rowHeight = 44`, `thickness = 32`, `middleWidth` breakpoints, color values like `#cfff3b` repeated across many JSX files.
- No shared constants file for layout geometry or theme tokens.

---

## 5. Performance: Unoptimized

There is **zero memoization** in the entire app. No `React.memo`, `useMemo`, or `useCallback` is used anywhere.

`Infographic.tsx` recomputes on every render:
- Sorting and ranking both columns from scratch
- SVG gradient definitions for every country
- Bézier path strings for every ribbon
- Search filter results

For 60 countries this is acceptable on a modern desktop, but it will stutter on mobile or if datasets grow to 150+ rows. The `ResizeObserver` (lines 92–103) is the only performance-conscious choice.

---

## 6. Styling: Consistent But Tightly Coupled

- Tailwind CSS v4 with custom `@theme` tokens for fonts (`--font-serif`, `--font-sans`, `--font-mono`, `--font-display`).
- The editorial "chalkboard" aesthetic (`#0c0c0c` background, `#cfff3b` lime accent) is cohesive and well-executed.
- Inline `style` attributes are used appropriately for dynamic SVG positioning.
- **Issue:** Accent color `#cfff3b` and background `#0c0c0c` are hardcoded in ~15+ places across components. Changing the theme would require find-and-replace across at least 4 files. No CSS custom properties or Tailwind theme extension is used for these values.

---

## 7. Dependencies: Bloated

`package.json` includes dependencies that are **not used** in the current client-only rendering path:

| Dependency | Claimed Use | Actual Use |
|---|---|---|
| `express` | Server | No server code exists |
| `@google/genai` | AI SDK | Installed but unused in current renderer |
| `dotenv` | Environment variables | No `.env` usage visible |
| `motion` | Animation library | Installed but not imported in any component |

**Also:** The `clean` script uses `rm -rf`, which does not work on Windows. A cross-platform alternative like `rimraf` or a Node script would be safer.

---

## 8. Documentation: Excellent

This is a standout strength of the project.

- **`README.md`** — User-facing, clear, includes a demo GIF and full feature list.
- **`AGENTS.md`** — Comprehensive agent-facing guide covering architecture, data model, gotchas, and extension ideas.
- **`docs/dataset-prompt.md`** — Ready-to-use LLM prompt for researching and shaping new datasets. Includes real examples and strict output rules.
- **`src/App.tsx` comment block** — A massive, helpful inline guide explaining exactly how to add countries, change periods, switch sorting direction, and register new datasets.

---

## 9. Testing: None

No test files, no test runner, no test scripts. The only quality gate is `npm run lint` (`tsc --noEmit`).

There are no unit tests for:
- `getRankColor` / `interpolateColor`
- Sorting and rank derivation logic
- The `missingPolicy` filter behavior
- SVG path generation math

---

## 10. Specific Issues Found

| Issue | Location | Severity | Notes |
|---|---|---|---|
| Wrong HTML title | `index.html:6` | Low | Still says "My Google AI Studio App" |
| `missingPolicy` schema mismatch | `docs/dataset-prompt.md` vs `src/types.ts` | Low | Prompt says `"skip"`, code says `"hide"` |
| Unused dependencies | `package.json` | Medium | `express`, `@google/genai`, `dotenv`, `motion` |
| Unix-only clean script | `package.json` | Low | `rm -rf` fails on Windows |
| No strict TypeScript | `tsconfig.json` | Medium | Missing `strict`, `noImplicitAny`, etc. |
| No error boundaries | Anywhere | Medium | A dataset parse error would crash the whole app |
| `ribbonMode` type has 3 values but only 1 is implemented | `src/types.ts` | Low | `"value-based"` and `"varying"` exist in type but renderer treats all as `"constant"` |
| No shared constants file | `src/` | Low | Layout geometry and colors duplicated |

---

## Overall Verdict

| Dimension | Score | Notes |
|---|---|---|
| **Architecture** | B+ | Clean separation, data-driven design |
| **Code Quality** | B | Readable but one god component, some duplication |
| **Type Safety** | B- | Good interfaces, but no strict mode |
| **Performance** | C+ | Functional but unmemoized |
| **Maintainability** | B | Good docs offset complexity in `Infographic.tsx` |
| **Testing** | F | No tests at all |
| **Documentation** | A | README, AGENTS.md, dataset-prompt.md are all excellent |

The codebase is in **good shape for a prototype / side project**, but `Infographic.tsx` is the one thing that will slow down every future feature you add. Address that monolith first, and the rest is polish.

---

## Priority Recommendations

1. **Split `Infographic.tsx`** into smaller, focused components and pure utility functions. This is the highest-impact change.
2. **Enable TypeScript strict mode** in `tsconfig.json` (`"strict": true`).
3. **Add `useMemo`** for rank computation and SVG path generation inside the chart component.
4. **Extract layout constants** (`rowHeight`, `thickness`, color palette, breakpoints) into a shared `src/config.ts` or theme object.
5. **Remove unused dependencies** (`express`, `@google/genai`, `dotenv`, `motion`) to reduce install size and supply-chain surface.
6. **Fix `index.html` title** to match the project name.
7. **Add at least snapshot or unit tests** for `colors.ts` and the ranking sort logic.
8. **Align `docs/dataset-prompt.md`** with the actual `missingPolicy` values used in code.
