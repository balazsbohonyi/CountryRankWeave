/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sliders, Download, ChevronRight, ChevronLeft, Settings } from "lucide-react";
import { RankingDataset } from "../types";
import { SIDEBAR_WIDTH, SIDEBAR_TOGGLE_WIDTH } from "../config";

interface SidebarProps {
  dataset: RankingDataset;
  availableDatasets: Array<{ id: string; label: string }>;
  activeDatasetId: string;
  onDatasetChange: (id: string) => void;
  topN: number;
  onTopNChange: (topN: number) => void;
  maxTopN: number;
  missingPolicy: "hide" | "show-faded";
  onMissingPolicyChange: (policy: "hide" | "show-faded") => void;
  periodAId: string;
  periodBId: string;
  onPeriodAChange: (id: string) => void;
  onPeriodBChange: (id: string) => void;
}

export default function Sidebar({
  dataset,
  availableDatasets,
  activeDatasetId,
  onDatasetChange,
  topN,
  onTopNChange,
  maxTopN,
  missingPolicy,
  onMissingPolicyChange,
  periodAId,
  periodBId,
  onPeriodAChange,
  onPeriodBChange
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${dataset.meta.datasetId}-ranking-data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      {/* Sidebar Container - 30-35% wider (from w-80 (320px) to w-[420px]) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed left-0 top-0 h-full max-w-[90vw] bg-surface/95 border-r border-border backdrop-blur-md z-50 text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: SIDEBAR_WIDTH }}
      >
        {/* Toggle Control Button attached to the right edge - Width reduced by ~27% (from w-11 (44px) to w-8 (32px)) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-24 bg-surface border-y border-r border-border hover:border-gray-700 text-accent rounded-r-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-surface-hover shadow-[4px_0_15px_rgba(0,0,0,0.5)] focus:outline-none"
          style={{ right: -SIDEBAR_TOGGLE_WIDTH }}
          title={isOpen ? "Close Customization Menu" : "Open Customization Menu"}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 animate-pulse" />
          ) : (
            <ChevronRight className="w-4 h-4 animate-pulse" />
          )}
          <span className="text-[8px] font-mono font-bold tracking-widest uppercase select-none [writing-mode:vertical-lr] rotate-180">
            Customize
          </span>
        </button>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 select-none">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sliders className="text-accent w-4 h-4" />
              <h3 className="font-display font-black tracking-wider uppercase text-xs text-white">
                Infographic Engine
              </h3>
            </div>
            
            {/* Dedicated Settings Icon Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded-md transition-all border cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                showSettings 
                  ? "bg-accent text-slate-950 border-accent font-bold" 
                  : "bg-surface-elevated text-gray-400 border-border hover:text-white hover:border-gray-700"
              }`}
              title="Toggle Advanced Settings"
            >
              <Settings className={`w-3.5 h-3.5 ${showSettings ? "rotate-45" : ""} transition-transform duration-300`} />
              <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-0.5">
                Settings
              </span>
            </button>
          </div>

          {/* Collapsible Settings Panel: Appears only when user clicks dedicated settings icon button */}
          {showSettings && (
            <div className="bg-surface-elevated p-4 rounded-xl border border-border flex flex-col gap-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-accent">
                  Control Console
                </span>
                <span className="text-[8px] text-gray-500 font-mono uppercase">
                  Configuration
                </span>
              </div>

              {/* Slider Section - step set to 1 so the handle always reaches the exact end of the slider */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase flex justify-between">
                  <span>Filter Top Countries</span>
                  <span className="text-accent font-black">Top {topN}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max={maxTopN}
                    step="1"
                    value={topN}
                    onChange={(e) => onTopNChange(parseInt(e.target.value, 10))}
                    className="w-full accent-accent bg-gray-800 h-1.5 rounded-full cursor-pointer"
                  />
                </div>
                <span className="text-xs text-gray-400 leading-relaxed">
                  Reduces list size and rebuilds color palette dynamically.
                </span>
              </div>

              {/* Non-Overlap Section */}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                  Non-Overlap Policy
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onMissingPolicyChange("show-faded")}
                    className={`py-1.5 px-2 rounded text-[9px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                      missingPolicy === "show-faded"
                        ? "bg-accent text-slate-950 border-accent"
                        : "bg-black text-gray-400 border-border hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    Show Faded
                  </button>
                  <button
                    type="button"
                    onClick={() => onMissingPolicyChange("hide")}
                    className={`py-1.5 px-2 rounded text-[9px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                      missingPolicy === "hide"
                        ? "bg-accent text-slate-950 border-accent"
                        : "bg-black text-gray-400 border-border hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    Hide Missing
                  </button>
                </div>
                <span className="text-xs text-gray-400 leading-relaxed">
                  Controls whether countries that enter or exit the Top N are displayed as faded or hidden entirely.
                </span>
              </div>
            </div>
          )}

          {/* Section: Comparison Periods */}
          {dataset.meta.periods.length > 2 && (
            <div className="flex flex-col gap-3 pb-5 border-b border-border">
              <label className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
                Comparison Periods
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Start Year</span>
                  <select
                    value={periodAId}
                    onChange={(e) => onPeriodAChange(e.target.value)}
                    className="w-full bg-black/50 border border-border hover:border-gray-700 text-xs text-white rounded-lg px-2 py-1.5 focus:outline-none focus:border-accent cursor-pointer"
                  >
                    {dataset.meta.periods.map((p) => (
                      <option key={p.id} value={p.id} className="bg-surface text-white">
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">End Year</span>
                  <select
                    value={periodBId}
                    onChange={(e) => onPeriodBChange(e.target.value)}
                    className="w-full bg-black/50 border border-border hover:border-gray-700 text-xs text-white rounded-lg px-2 py-1.5 focus:outline-none focus:border-accent cursor-pointer"
                  >
                    {dataset.meta.periods.map((p) => (
                      <option key={p.id} value={p.id} className="bg-surface text-white">
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Choose Ranking Metric - REPLACED with plain text list items (plain text, no buttons/boxiness) */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
              Ranking Metrics
            </label>
            <ul className="flex flex-col gap-3 pl-1">
              {availableDatasets.map((d) => {
                const isActive = d.id === activeDatasetId;
                return (
                  <li key={d.id} className="group">
                    <button
                      onClick={() => onDatasetChange(d.id)}
                      className={`w-full text-left text-xs transition-colors cursor-pointer flex items-start gap-2.5 py-1 focus:outline-none ${
                        isActive
                          ? "text-accent font-bold"
                          : "text-gray-400 hover:text-white font-medium"
                      }`}
                    >
                      {/* Interactive indicator bullet */}
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-transform ${
                        isActive ? "bg-accent scale-125" : "bg-gray-600 group-hover:bg-gray-300"
                      }`} />
                      <span className={isActive ? "underline decoration-accent/30 underline-offset-4" : ""}>
                        {d.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Export Action Button */}
          <div className="mt-auto pt-6 border-t border-border">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold bg-surface-elevated border border-border hover:border-gray-700 text-gray-200 transition-all active:scale-95 hover:bg-white/5 cursor-pointer"
            >
              <Download size={14} />
              <span>Export Active Dataset (JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Semi-transparent Backdrop when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 transition-opacity duration-300"
        />
      )}
    </>
  );
}
