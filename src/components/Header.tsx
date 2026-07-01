/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RankingDataset } from "../types";
import { getRankColor } from "../utils/colors";

interface HeaderProps {
  dataset: RankingDataset;
  topN: number;
  periodBId?: string;
}

export default function Header({ dataset, topN, periodBId }: HeaderProps) {
  const { meta } = dataset;
  const activePeriodB = meta.periods.find((p) => p.id === periodBId) ?? meta.periods[1] ?? meta.periods[0];
  const periodBLabel = activePeriodB?.label ?? "Final Period";

  return (
    <header className="w-full max-w-4xl mx-auto text-center px-4 pt-10 pb-6 flex flex-col items-center">
      {/* Editorial Slogan Tag */}
      <span className="font-display tracking-[0.25em] text-accent font-black text-xs sm:text-sm uppercase mb-1 drop-shadow-sm select-none">
        {meta.datasetLabel ? meta.datasetLabel.toUpperCase() : "COMPARATIVE VISUALIZATION"}
      </span>

      {/* Massive Visual Capitalist Style Title */}
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-white italic tracking-tight leading-none drop-shadow-md select-none border-b border-border pb-4 px-12">
        {meta.title}
      </h1>

      {/* Title Suffix / Date indicator */}
      <div className="font-display tracking-widest font-bold text-gray-500 text-xs sm:text-sm uppercase mt-4 select-none">
        COMPARING RANKINGS ACROSS THE YEARS • FINAL STANDING IN {periodBLabel.toUpperCase()}
      </div>

      {/* Custom Subtitle editorial-styled paragraph */}
      <p className="font-sans text-gray-400 font-normal text-xs sm:text-sm uppercase tracking-widest max-w-2xl text-center my-6 font-medium leading-relaxed select-text">
        {meta.subtitle}
      </p>
    </header>
  );
}
