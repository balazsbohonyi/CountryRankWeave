/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { RankingDataset, RenderedRow } from "../types";
import { getRankColor } from "../utils/colors";
import { ArrowUp, ArrowDown, Minus, HelpCircle, ChevronDown, Search, X } from "lucide-react";

interface InfographicProps {
  dataset: RankingDataset;
  topN: number;
  missingPolicy: "hide" | "show-faded";
  hoveredCountryId: string | null;
  setHoveredCountryId: (id: string | null) => void;
  periodAId?: string;
  periodBId?: string;
  onPeriodAChange?: (id: string) => void;
  onPeriodBChange?: (id: string) => void;
}

export default function Infographic({
  dataset,
  topN,
  missingPolicy,
  hoveredCountryId,
  setHoveredCountryId,
  periodAId,
  periodBId,
  onPeriodAChange,
  onPeriodBChange
}: InfographicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { meta, countries } = dataset;
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [activeDropdown, setActiveDropdown] = useState<"A" | "B" | null>(null);
  const [failedFlags, setFailedFlags] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Reset failed flags when the dataset changes
  useEffect(() => {
    setFailedFlags(new Set());
  }, [dataset]);

  // Clear search field when a country is selected (click or search), and when unselected
  useEffect(() => {
    if (hoveredCountryId === null) {
      setSearchTerm("");
    } else {
      setSearchTerm("");
    }
  }, [hoveredCountryId]);

  // Close active dropdown or search suggestions on clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setShowSuggestions(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleImageError = (code: string) => {
    setFailedFlags((prev) => {
      const next = new Set(prev);
      next.add(code);
      return next;
    });
  };

  // Close active dropdown on clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdown(null);
    };
    if (activeDropdown) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [activeDropdown]);
  
  // Measure the whole infographic container for accurate coordinate mapping
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const selectAndScrollCountry = (countryId: string) => {
    setHoveredCountryId(countryId);
    setTimeout(() => {
      const element = document.getElementById(`colA-${countryId}`) || document.getElementById(`colB-${countryId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const periodA = meta.periods.find((p) => p.id === periodAId) || meta.periods[0];
  const periodB = meta.periods.find((p) => p.id === periodBId) || meta.periods[1] || meta.periods[0];
  const sortDirection = meta.sortDirection;

  const hasMultiplePeriods = meta.periods.length > 2;
  const idxA = meta.periods.findIndex((p) => p.id === periodA.id);
  const idxB = meta.periods.findIndex((p) => p.id === periodB.id);
  const validPeriodsA = meta.periods.filter((p, index) => index < idxB);
  const validPeriodsB = meta.periods.filter((p, index) => index > idxA);

  // 1. Process and compute ranks for Period A
  let countriesA = countries.filter((c) => c.values[periodA.id] !== null);
  if (missingPolicy === "hide") {
    countriesA = countriesA.filter((c) => c.values[periodB.id] !== null);
  }
  const sortedA = [...countriesA].sort((a, b) => {
    const valA = a.values[periodA.id] as number;
    const valB = b.values[periodA.id] as number;
    if (valA !== valB) {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    return a.name.localeCompare(b.name);
  });
  const listA: RenderedRow[] = sortedA.map((c, idx) => ({
    id: c.id,
    name: c.name,
    code: c.code,
    rawVal: c.values[periodA.id],
    rank: idx + 1
  })).slice(0, topN);

  // 2. Process and compute ranks for Period B
  let countriesB = countries.filter((c) => c.values[periodB.id] !== null);
  if (missingPolicy === "hide") {
    countriesB = countriesB.filter((c) => c.values[periodA.id] !== null);
  }
  const sortedB = [...countriesB].sort((a, b) => {
    const valA = a.values[periodB.id] as number;
    const valB = b.values[periodB.id] as number;
    if (valA !== valB) {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    return a.name.localeCompare(b.name);
  });
  const listB: RenderedRow[] = sortedB.map((c, idx) => ({
    id: c.id,
    name: c.name,
    code: c.code,
    rawVal: c.values[periodB.id],
    rank: idx + 1
  })).slice(0, topN);

  // If policy is hide, filter list items properly
  let renderedListA = listA;
  let renderedListB = listB;
  
  if (missingPolicy === "hide") {
    const setA = new Set(listA.map(item => item.id));
    const setB = new Set(listB.map(item => item.id));
    renderedListA = listA.filter(item => setB.has(item.id));
    renderedListB = listB.filter(item => setA.has(item.id));
  }

  // Create combined list of unique searchable countries from both columns, sorted alphabetically
  const searchableCountries: RenderedRow[] = [];
  const seenIds = new Set<string>();

  renderedListA.forEach((item) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      searchableCountries.push(item);
    }
  });

  renderedListB.forEach((item) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      searchableCountries.push(item);
    }
  });

  searchableCountries.sort((a, b) => a.name.localeCompare(b.name));

  const filteredSuggestions = searchableCountries.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRows = Math.max(renderedListA.length, renderedListB.length);
  const rowHeight = 44; // taller rows for solid design
  const svgHeight = totalRows * rowHeight;

  // Index maps for geometry drawing
  const indexMapA = new Map(renderedListA.map((item, idx) => [item.id, idx]));
  const indexMapB = new Map(renderedListB.map((item, idx) => [item.id, idx]));

  // Fixed thickness independent of the number of countries to prevent visual discrepancy across datasets
  const thickness = 32;

  // Compute responsive middle spacer column width (increased by 50%+)
  let middleWidth = 320; // Default
  if (dimensions.width >= 1536) {
    middleWidth = 980; // 2xl (spacious elegant look)
  } else if (dimensions.width >= 1280) {
    middleWidth = 840; // xl (spacious elegant look)
  } else if (dimensions.width >= 1024) {
    middleWidth = 680; // lg (spacious elegant look)
  } else if (dimensions.width >= 768) {
    middleWidth = 520; // md
  } else if (dimensions.width >= 640) {
    middleWidth = 420; // sm
  }

  // Left column width matches remaining flex-1 space precisely
  const wA = (dimensions.width - middleWidth) / 2;
  const startX = wA;
  const endX = wA + middleWidth;
  const ribbonStartX = startX + 20;
  const ribbonEndX = endX - 20;
  const flatLength = Math.max(90, middleWidth * 0.10);
  const xStartCurve = startX + flatLength;
  const xEndCurve = endX - flatLength;
  const curveWidth = middleWidth - 2 * flatLength;
  const cp1x = xStartCurve + curveWidth * 0.45;
  const cp2x = xStartCurve + curveWidth * 0.55;

  // Unique list of countries featured in either Column A or Column B
  const rawFeaturedIds = Array.from(new Set([
    ...renderedListA.map((item) => item.id),
    ...renderedListB.map((item) => item.id)
  ]));

  // Sort featuredIds so that single-column (faded) countries are rendered first (at the bottom),
  // then double-column countries sorted by absolute rank change (ascending so larger changes are on top),
  // and finally the hovered/clicked country is rendered at the absolute end (on top of everything else).
  const featuredIds = [...rawFeaturedIds].sort((a, b) => {
    if (a === hoveredCountryId) return 1;
    if (b === hoveredCountryId) return -1;

    const idxA_a = indexMapA.get(a);
    const idxB_a = indexMapB.get(a);
    const idxA_b = indexMapA.get(b);
    const idxB_b = indexMapB.get(b);

    const isSingle_a = idxA_a === undefined || idxB_a === undefined;
    const isSingle_b = idxA_b === undefined || idxB_b === undefined;

    if (isSingle_a && !isSingle_b) return -1;
    if (!isSingle_a && isSingle_b) return 1;
    if (isSingle_a && isSingle_b) return 0;

    const rankA_a = idxA_a! + 1;
    const rankB_a = idxB_a! + 1;
    const rankA_b = idxA_b! + 1;
    const rankB_b = idxB_b! + 1;

    const abs_a = Math.abs(rankA_a - rankB_a);
    const abs_b = Math.abs(rankA_b - rankB_b);

    return abs_a - abs_b;
  });

  // Handle click trigger
  const handleRowClick = (e: React.MouseEvent, countryId: string) => {
    e.stopPropagation();
    if (hoveredCountryId === countryId) {
      setHoveredCountryId(null);
    } else {
      setHoveredCountryId(countryId);
    }
  };

  return (
    <div 
      className="relative w-full max-w-[1600px] mx-auto py-8 px-2 sm:px-4"
      onClick={() => {
        setHoveredCountryId(null);
      }}
    >
      {/* Shared Header row containing Period titles to align beautifully with lists below */}
      <div className="flex w-full select-none mb-4">
        {/* Left Period Title */}
        <div className="flex-1 text-right pr-[24px] border-b border-border pb-2 relative">
          <div 
            className={`inline-flex items-center gap-1.5 ${hasMultiplePeriods ? "cursor-pointer group" : ""}`}
            onClick={(e) => {
              if (hasMultiplePeriods) {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "A" ? null : "A");
              }
            }}
          >
            <h3 className="font-display font-black text-white tracking-wider text-xs sm:text-sm uppercase group-hover:text-accent transition-colors">
              {periodA.label}
            </h3>
            {hasMultiplePeriods && (
              <ChevronDown 
                className="w-4 h-4 text-gray-500 group-hover:text-white transition-transform duration-200 shrink-0" 
                style={{ transform: activeDropdown === "A" ? "rotate(180deg)" : "none" }} 
              />
            )}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 font-mono block mt-0.5 uppercase tracking-tight">
            Sorted {sortDirection === "asc" ? "Ascending" : "Descending"}
          </span>

          {/* Left Dropdown */}
          {activeDropdown === "A" && (
            <div 
              className="absolute right-[24px] top-full mt-2 bg-surface-popover border border-border shadow-[0_12px_40px_rgba(0,0,0,0.95)] rounded-lg py-1 z-50 min-w-[150px] flex flex-col overflow-hidden text-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 text-[9px] font-mono uppercase tracking-wider text-gray-500 border-b border-[#111] font-bold">
                START PERIOD
              </div>
              {validPeriodsA.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onPeriodAChange?.(p.id);
                    setActiveDropdown(null);
                  }}
                  className={`px-4 py-2.5 text-right text-xs uppercase font-mono font-bold tracking-wider hover:bg-accent hover:text-black transition-colors cursor-pointer ${
                    p.id === periodA.id ? "text-accent" : "text-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Spacer to perfectly preserve structural alignment with embedded Search bar */}
        <div 
          style={{ width: `${middleWidth}px` }} 
          className="shrink-0 flex items-center justify-center px-4 relative z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[340px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                setActiveSuggestionIndex(-1);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveSuggestionIndex((prev) =>
                    prev >= filteredSuggestions.length - 1 ? 0 : prev + 1
                  );
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveSuggestionIndex((prev) =>
                    prev <= 0 ? filteredSuggestions.length - 1 : prev - 1
                  );
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const match =
                    activeSuggestionIndex >= 0
                      ? filteredSuggestions[activeSuggestionIndex]
                      : filteredSuggestions[0];
                  if (match) {
                    selectAndScrollCountry(match.id);
                    setShowSuggestions(false);
                    setActiveSuggestionIndex(-1);
                  }
                }
              }}
              className="w-full bg-surface-elevated border border-border text-xs text-white rounded-lg pl-9 pr-8 py-1.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder-gray-500 transition-all font-mono uppercase tracking-wider animate-fade-in"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setHoveredCountryId(null);
                  setShowSuggestions(false);
                }}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && searchTerm && (
              <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-surface-popover border border-border shadow-[0_12px_40px_rgba(0,0,0,0.95)] rounded-lg py-1 z-50 flex flex-col text-left">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((row, idx) => (
                    <button
                      key={`search-suggest-${row.id}`}
                      type="button"
                      onClick={() => {
                        selectAndScrollCountry(row.id);
                        setShowSuggestions(false);
                        setActiveSuggestionIndex(-1);
                      }}
                      className={`px-3 py-2 text-left text-[11px] uppercase font-mono font-bold tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
                        idx === activeSuggestionIndex
                          ? "bg-accent text-black"
                          : "text-gray-300 hover:bg-accent hover:text-black"
                      }`}
                    >
                      {!failedFlags.has(row.code.toLowerCase()) && (
                        <img
                          src={`https://flagcdn.com/${row.code.toLowerCase()}.svg`}
                          alt={row.name}
                          className="w-4 h-2.5 object-cover border border-border"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="truncate">{row.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-[10px] text-gray-500 font-mono uppercase">
                    No matching countries
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Period Title */}
        <div className="flex-1 text-left pl-[24px] border-b border-border pb-2 relative">
          <div 
            className={`inline-flex items-center gap-1.5 ${hasMultiplePeriods ? "cursor-pointer group" : ""}`}
            onClick={(e) => {
              if (hasMultiplePeriods) {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "B" ? null : "B");
              }
            }}
          >
            <h3 className="font-display font-black text-white tracking-wider text-xs sm:text-sm uppercase group-hover:text-accent transition-colors">
              {periodB.label}
            </h3>
            {hasMultiplePeriods && (
              <ChevronDown 
                className="w-4 h-4 text-gray-500 group-hover:text-white transition-transform duration-200 shrink-0" 
                style={{ transform: activeDropdown === "B" ? "rotate(180deg)" : "none" }} 
              />
            )}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 font-mono block mt-0.5 uppercase tracking-tight">
            Sorted {sortDirection === "asc" ? "Ascending" : "Descending"}
          </span>

          {/* Right Dropdown */}
          {activeDropdown === "B" && (
            <div 
              className="absolute left-[24px] top-full mt-2 bg-surface-popover border border-border shadow-[0_12px_40px_rgba(0,0,0,0.95)] rounded-lg py-1 z-50 min-w-[150px] flex flex-col overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 text-[9px] font-mono uppercase tracking-wider text-gray-500 border-b border-[#111] font-bold">
                END PERIOD
              </div>
              {validPeriodsB.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onPeriodBChange?.(p.id);
                    setActiveDropdown(null);
                  }}
                  className={`px-4 py-2.5 text-left text-xs uppercase font-mono font-bold tracking-wider hover:bg-accent hover:text-black transition-colors cursor-pointer ${
                    p.id === periodB.id ? "text-accent" : "text-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Infographic lists + SVG area - PRISTINE PIXEL ALIGNMENT */}
      <div 
        ref={containerRef}
        className="flex w-full items-stretch select-none relative"
        style={{ height: `${svgHeight}px` }}
      >
        {/* SVG Ribbon Layer covering the entire height of the container */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 10 }}
        >
          {/* SVG Defs for linear gradients (entered/exited ribbon fade effects) */}
          <defs>
            {featuredIds.map((id) => {
              const country = countries.find((c) => c.id === id);
              if (!country) return null;
              const idxB = indexMapB.get(id);
              const idxA = indexMapA.get(id);
              const finalRank = idxB !== undefined ? idxB + 1 : (idxA !== undefined ? idxA + 1 : 1);
              const color = getRankColor(finalRank, totalRows);

              const hasFlag = !failedFlags.has(country.code.toLowerCase());
              const cRibbonStartX = hasFlag ? ribbonStartX : startX;
              const cRibbonEndX = hasFlag ? ribbonEndX : endX;

              return (
                <g key={`defs-${id}`}>
                  {/* Left exited fade out (runs from cRibbonStartX to startX + middleWidth * 0.5) */}
                  <linearGradient 
                    id={`exited-fade-${id}`} 
                    gradientUnits="userSpaceOnUse" 
                    x1={cRibbonStartX} 
                    y1="0" 
                    x2={startX + middleWidth * 0.5} 
                    y2="0"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="30%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="65%" stopColor={color} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>

                  {/* Right entered fade in (runs from startX + middleWidth * 0.5 to cRibbonEndX) */}
                  <linearGradient 
                    id={`entered-fade-${id}`} 
                    gradientUnits="userSpaceOnUse" 
                    x1={startX + middleWidth * 0.5} 
                    y1="0" 
                    x2={cRibbonEndX} 
                    y2="0"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0} />
                    <stop offset="35%" stopColor={color} stopOpacity={0.15} />
                    <stop offset="70%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                  </linearGradient>
                </g>
              );
            })}
          </defs>

          {/* Drawing connectors */}
          {featuredIds.map((id) => {
            const idxA = indexMapA.get(id);
            const idxB = indexMapB.get(id);

            const isHovered = hoveredCountryId === id;
            const isAnyHovered = hoveredCountryId !== null;
            const isDimmed = isAnyHovered && !isHovered;

            const yA = idxA !== undefined ? idxA * rowHeight + rowHeight / 2 : null;
            const yB = idxB !== undefined ? idxB * rowHeight + rowHeight / 2 : null;

            const finalRank = idxB !== undefined ? idxB + 1 : (idxA !== undefined ? idxA + 1 : 1);
            const color = getRankColor(finalRank, totalRows);

            const country = countries.find((c) => c.id === id);
            const hasFlag = country ? !failedFlags.has(country.code.toLowerCase()) : true;
            const cRibbonStartX = hasFlag ? ribbonStartX : startX;
            const cRibbonEndX = hasFlag ? ribbonEndX : endX;

            let d = "";
            let strokePaint = color;

            if (yA !== null && yB !== null) {
              // 1. Double connection (standard)
              d = `M ${cRibbonStartX},${yA} L ${xStartCurve},${yA} C ${cp1x},${yA} ${cp2x},${yB} ${xEndCurve},${yB} L ${cRibbonEndX},${yB}`;
            } else if (yA !== null && yB === null) {
              // 2. Exited country (left only)
              d = `M ${cRibbonStartX},${yA} L ${startX + middleWidth * 0.5},${yA}`;
              strokePaint = `url(#exited-fade-${id})`;
            } else if (yA === null && yB !== null) {
              // 3. Entered country (right only)
              d = `M ${startX + middleWidth * 0.5},${yB} L ${cRibbonEndX},${yB}`;
              strokePaint = `url(#entered-fade-${id})`;
            }

            if (!d) return null;

            return (
              <g 
                key={`ribbon-${id}`}
                className="transition-opacity duration-150 pointer-events-none"
                style={{ 
                  opacity: isDimmed ? 0.08 : 1.0,
                  zIndex: isHovered ? 50 : 10
                }}
              >
                {/* Underlay / Background Stroke (for pristine boundary separation) */}
                {!isDimmed && (
                  <path
                    d={d}
                    fill="none"
                    stroke={(yA === null || yB === null) ? "transparent" : "var(--color-surface)"}
                    strokeWidth={thickness + 2}
                    strokeLinecap="butt"
                  />
                )}

                {/* Foreground Ribbon Path with flat ends and fully solid colors */}
                <path
                  d={d}
                  fill="none"
                  stroke={strokePaint}
                  strokeWidth={thickness}
                  strokeLinecap="butt"
                />

                {/* Invisible Thick Click Target Path - eliminates jumpiness */}
                <path
                  d={d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={thickness + 24}
                  strokeLinecap="butt"
                  className="pointer-events-auto cursor-pointer"
                  onClick={(e) => handleRowClick(e, id)}
                />
              </g>
            );
          })}
        </svg>

        {/* Left Column (Period A) */}
        <div className="flex-1 relative h-full">
          {renderedListA.map((row, idx) => {
            const isHovered = hoveredCountryId === row.id;
            const isAnyHovered = hoveredCountryId !== null;
            const isDimmed = isAnyHovered && !isHovered;

            const idxA = indexMapA.get(row.id);
            const idxB = indexMapB.get(row.id);
            const finalRank = idxB !== undefined ? idxB + 1 : (idxA !== undefined ? idxA + 1 : 1);
            const ribbonColor = getRankColor(finalRank, totalRows);

            return (
              <div
                key={`colA-${row.id}`}
                id={`colA-${row.id}`}
                style={{
                  position: "absolute",
                  top: `${idx * rowHeight}px`,
                  height: `${rowHeight}px`,
                  right: 0,
                  width: "100%",
                  zIndex: isHovered ? 40 : 20
                }}
                className="flex items-center justify-end cursor-pointer"
                onClick={(e) => handleRowClick(e, row.id)}
              >
                <div 
                  className={`flex items-center justify-end w-full relative pr-[24px] h-8 rounded-l transition-all duration-200`}
                  style={{ 
                    backgroundColor: isHovered ? ribbonColor : undefined
                  }}
                >
                  <span className={`font-bold uppercase text-xs sm:text-sm tracking-wider truncate text-right mr-5 transition-all duration-200 ${
                    isHovered ? "text-black" : "text-gray-300"
                  }`}
                  style={{ opacity: isDimmed ? 0.25 : 1 }}
                  >
                    {row.name}
                  </span>

                  {/* Flag inside perfectly clipped rounded rectangle with 3:2 aspect ratio centered at startX */}
                  {!failedFlags.has(row.code.toLowerCase()) && (
                    <div 
                      className="h-8 aspect-[3/2] rounded overflow-hidden border border-border shadow-[2px_2px_5px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0 bg-surface absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none"
                      style={{ right: '-24px' }}
                    >
                      <img
                        src={`https://flagcdn.com/${row.code.toLowerCase()}.svg`}
                        alt={row.name}
                        className="w-full h-full object-cover transition-opacity duration-200"
                        style={{ opacity: isDimmed ? 0.25 : 1 }}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(row.code.toLowerCase())}
                      />
                    </div>
                  )}

                  {/* Rank text placed directly over the ribbon, centered at startX + 32px */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 z-30 font-bold text-xs sm:text-sm text-left text-surface w-8 pointer-events-none select-none transition-opacity duration-200"
                    style={{ 
                      right: '-72px',
                      opacity: isDimmed ? 0.3 : 1
                    }}
                  >
                    {row.rank}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Spacer Column - defines precise horizontal spacing */}
        <div 
          className="shrink-0 relative pointer-events-none"
          style={{ width: `${middleWidth}px` }}
        />

        {/* Right Column (Period B) */}
        <div className="flex-1 relative h-full">
          {renderedListB.map((row, idx) => {
            const isHovered = hoveredCountryId === row.id;
            const isAnyHovered = hoveredCountryId !== null;
            const isDimmed = isAnyHovered && !isHovered;

            const rowA = renderedListA.find((r) => r.id === row.id);
            const rankChange = rowA ? rowA.rank - row.rank : null;

            const idxA = indexMapA.get(row.id);
            const idxB = indexMapB.get(row.id);
            const finalRank = idxB !== undefined ? idxB + 1 : (idxA !== undefined ? idxA + 1 : 1);
            const ribbonColor = getRankColor(finalRank, totalRows);

            return (
              <div
                key={`colB-${row.id}`}
                id={`colB-${row.id}`}
                style={{
                  position: "absolute",
                  top: `${idx * rowHeight}px`,
                  height: `${rowHeight}px`,
                  left: 0,
                  width: "100%",
                  zIndex: isHovered ? 40 : 20
                }}
                className="flex items-center justify-start cursor-pointer"
                onClick={(e) => handleRowClick(e, row.id)}
              >
                <div 
                  className={`flex items-center justify-start w-full relative pl-[24px] h-8 rounded-r transition-all duration-200`}
                  style={{ 
                    backgroundColor: isHovered ? ribbonColor : undefined
                  }}
                >
                  {/* Rank text placed directly over the ribbon, centered at endX - 32px */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 z-30 font-bold text-xs sm:text-sm text-right text-surface w-8 pointer-events-none select-none transition-opacity duration-200"
                    style={{ 
                      left: '-72px',
                      opacity: isDimmed ? 0.3 : 1
                    }}
                  >
                    {row.rank}
                  </div>

                  {/* Flag inside perfectly clipped rounded rectangle with 3:2 aspect ratio centered at endX */}
                  {!failedFlags.has(row.code.toLowerCase()) && (
                    <div 
                      className="h-8 aspect-[3/2] rounded overflow-hidden border border-border shadow-[2px_2px_5px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0 bg-surface absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none"
                      style={{ left: '-24px' }}
                    >
                      <img
                        src={`https://flagcdn.com/${row.code.toLowerCase()}.svg`}
                        alt={row.name}
                        className="w-full h-full object-cover transition-opacity duration-200"
                        style={{ opacity: isDimmed ? 0.25 : 1 }}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(row.code.toLowerCase())}
                      />
                    </div>
                  )}

                  {/* Country Name along with Change Indicator Badge */}
                  <div 
                    className="flex items-center gap-2 ml-5 transition-opacity duration-200"
                    style={{ opacity: isDimmed ? 0.25 : 1 }}
                  >
                    <span className={`font-bold uppercase text-xs sm:text-sm tracking-wider truncate text-left transition-colors duration-200 ${
                      isHovered ? "text-black" : "text-gray-300"
                    }`}>
                      {row.name}
                    </span>
                    {rankChange !== null && rankChange !== 0 && (
                      <div className="flex items-center justify-center pointer-events-none select-none shrink-0">
                        {rankChange > 0 ? (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-center bg-[#102a1d]/95 border border-[#1b432f] rounded font-mono shrink-0 shadow-md w-8 h-5 text-center">
                            +{rankChange}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-400 flex items-center justify-center bg-[#3b131c]/95 border border-[#5c1c28] rounded font-mono shrink-0 shadow-md w-8 h-5 text-center">
                            -{Math.abs(rankChange)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Detail Spotlight Footer Panel - FIXED POSITIONING AT BOTTOM */}
      {hoveredCountryId && (
        <div 
          id="spotlight-footer"
          className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-border z-50 text-gray-300 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] animate-slide-up"
          onClick={(e) => e.stopPropagation()} // Stop propagation so clicking inside does not unselect
        >
          <div className="w-full max-w-xl mx-auto px-4 py-4 flex items-center justify-between h-20">
            {(() => {
              const country = countries.find((c) => c.id === hoveredCountryId);
              const rowA = renderedListA.find((r) => r.id === hoveredCountryId);
              const rowB = renderedListB.find((r) => r.id === hoveredCountryId);
              if (!country) return null;
              
              const rA = rowA ? rowA.rank : null;
              const rB = rowB ? rowB.rank : null;
              const change = rA !== null && rB !== null ? rA - rB : null;

              return (
                <div className="flex items-center w-full gap-4">
                  {/* Flag display inside rounded rectangle with 3:2 aspect ratio */}
                  {!failedFlags.has(country.code.toLowerCase()) && (
                    <div className="h-12 aspect-[3/2] rounded-md overflow-hidden border border-border shadow-[2px_2px_5px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0 bg-surface-hover">
                      <img 
                        src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                        alt={country.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(country.code.toLowerCase())}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-base leading-tight truncate uppercase tracking-wider">{country.name}</h4>
                    <div className="text-[11px] text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono">
                      <span>
                        {periodA.label}:{" "}
                        <strong className="text-gray-200">{rA !== null ? `#${rA}` : "N/A"}</strong>
                        {rowA && ` (${rowA.rawVal}${meta.unit === "rank" ? "" : " " + meta.unit})`}
                      </span>
                      <span>
                        {periodB.label}:{" "}
                        <strong className="text-gray-200">{rB !== null ? `#${rB}` : "N/A"}</strong>
                        {rowB && ` (${rowB.rawVal}${meta.unit === "rank" ? "" : " " + meta.unit})`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {change !== null ? (
                      change > 0 ? (
                        <div className="flex items-center text-emerald-400 font-bold bg-[#102a1d]/40 border border-[#1b432f]/50 py-1.5 px-3 rounded-lg text-xs gap-1">
                          <ArrowUp size={14} strokeWidth={2.5} />
                          <span>Up {change}</span>
                        </div>
                      ) : change < 0 ? (
                        <div className="flex items-center text-rose-400 font-bold bg-[#3b131c]/40 border border-[#5c1c28]/50 py-1.5 px-3 rounded-lg text-xs gap-1">
                          <ArrowDown size={14} strokeWidth={2.5} />
                          <span>Down {Math.abs(change)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-400 font-bold bg-surface-hover/40 border border-border py-1.5 px-3 rounded-lg text-xs gap-1">
                          <Minus size={14} />
                          <span>Unchanged</span>
                        </div>
                      )
                    ) : (
                      <span className="text-xs text-gray-500 font-mono italic">
                        {rowA ? "Exited top N" : "New entry"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}
