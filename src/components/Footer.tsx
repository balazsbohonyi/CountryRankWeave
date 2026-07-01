/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { RankingDataset } from "../types";
import { getRankColor } from "../utils/colors";

interface FooterProps {
  dataset: RankingDataset;
  topN: number;
  periodBId?: string;
}

export default function Footer({ dataset, topN, periodBId }: FooterProps) {
  const { meta } = dataset;
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const activePeriodB = meta.periods.find((p) => p.id === periodBId) || meta.periods[1] || meta.periods[0];
  const periodBLabel = activePeriodB?.label || "Final Period";

  // Create steps for the color gradient legend
  const legendSteps = 6;
  const gradientColors = Array.from({ length: legendSteps }).map((_, i) => {
    // Map i to a fraction and calculate equivalent rank
    const fraction = i / (legendSteps - 1);
    const mockRank = Math.round(1 + fraction * (topN - 1));
    return getRankColor(mockRank, topN);
  });

  const gradientString = `linear-gradient(to right, ${gradientColors.join(", ")})`;

  useEffect(() => {
    if (!showPopover) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#info-popover-container") && !target.closest("#info-popover-trigger")) {
        setShowPopover(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showPopover]);

  return (
    <footer className="w-full max-w-4xl mx-auto mt-12 pb-16 px-4">
      {/* Signature branding strip mimicking the visual reference bottom bar */}
      <div className="pt-6 border-t border-border select-none flex flex-col gap-5 text-[10px] text-gray-500 font-mono tracking-wider relative">
        
        {/* Color legend on its own separate line */}
        <div className="flex justify-center items-center gap-6 relative">
          
          {/* Info Popover trigger button */}
          <button 
            id="info-popover-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setShowPopover(!showPopover);
            }}
            className={`p-1 rounded-full border transition-all duration-150 cursor-pointer focus:outline-none flex items-center justify-center shrink-0 ${
              showPopover 
                ? "bg-accent text-slate-950 border-accent font-bold" 
                : "bg-surface-elevated text-gray-400 border-border hover:text-white hover:border-gray-700"
            }`}
            title="How to Read the Ribbon Color Scale"
          >
            <Info size={14} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span>TOP standing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#fb923c]" />
            <span>MID tier</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f472b6]" />
            <span>LOWER tier</span>
          </div>

          {/* Popover container */}
          {showPopover && (
            <div 
              id="info-popover-container"
              ref={popoverRef}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[92vw] max-w-lg p-5 rounded-xl border border-border bg-surface flex flex-col gap-3 select-none shadow-[0_10px_40px_rgba(0,0,0,0.9)] z-50 text-left cursor-default animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-[10px] uppercase font-display font-black text-gray-500 tracking-wider text-center">
                How to Read the Ribbon Color Scale
              </h4>
              
              {/* Continuous Color Palette Bar */}
              <div className="relative w-full h-3 rounded-full overflow-hidden my-1" style={{ background: gradientString }} />

              {/* Legend labels */}
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                <span className="text-emerald-400 font-bold">Rank 1 (Best)</span>
                <span>Middle standing</span>
                <span className="text-rose-400 font-bold">Rank {topN} (Lowest)</span>
              </div>

              {/* Destination-rank explanation note */}
              <div className="text-[11px] text-slate-400 text-center leading-normal max-w-sm mx-auto font-sans mt-1 normal-case font-normal">
                📌 <span className="font-semibold text-slate-300">Destination-Rank Rule</span>: Ribbon color is determined strictly by a country's final standing in <strong className="text-accent">{periodBLabel}</strong>. 
                Its previous year's ribbon maintains this color to track its movement cleanly.
              </div>
            </div>
          )}
        </div>

        {/* Data Source centered line */}
        <div className="flex justify-center items-center gap-3 text-gray-600 text-center">
          <div>
            DATA SOURCE: {meta.sourceNote ? meta.sourceNote.toUpperCase() : "RANKING DATABASE"}
          </div>
        </div>
      </div>
    </footer>
  );
}
