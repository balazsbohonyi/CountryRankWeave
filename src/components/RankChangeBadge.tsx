/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { POSITIVE_CHANGE, NEGATIVE_CHANGE, CHANGE_BADGE_WIDTH, CHANGE_BADGE_HEIGHT } from "../config";

interface RankChangeBadgeProps {
  change: number | null;
  variant?: "inline" | "spotlight";
  exitedLabel?: string;
}

export default function RankChangeBadge({
  change,
  variant = "inline",
  exitedLabel,
}: RankChangeBadgeProps) {
  if (change === null) {
    return (
      <span className="text-xs text-gray-500 font-mono italic">
        {exitedLabel || "New entry"}
      </span>
    );
  }

  if (change === 0) {
    return (
      <div className="flex items-center text-gray-400 font-bold bg-surface-hover/40 border border-border py-1.5 px-3 rounded-lg text-xs gap-1">
        <Minus size={14} />
        <span>Unchanged</span>
      </div>
    );
  }

  const isPositive = change > 0;
  const absChange = Math.abs(change);

  if (variant === "spotlight") {
    return isPositive ? (
      <div
        className="flex items-center text-emerald-400 font-bold py-1.5 px-3 rounded-lg text-xs gap-1"
        style={{
          backgroundColor: POSITIVE_CHANGE.bgTranslucent,
          borderColor: POSITIVE_CHANGE.borderTranslucent,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <ArrowUp size={14} strokeWidth={2.5} />
        <span>Up {absChange}</span>
      </div>
    ) : (
      <div
        className="flex items-center text-rose-400 font-bold py-1.5 px-3 rounded-lg text-xs gap-1"
        style={{
          backgroundColor: NEGATIVE_CHANGE.bgTranslucent,
          borderColor: NEGATIVE_CHANGE.borderTranslucent,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <ArrowDown size={14} strokeWidth={2.5} />
        <span>Down {absChange}</span>
      </div>
    );
  }

  // Inline variant (right column)
  return (
    <div className="flex items-center justify-center pointer-events-none select-none shrink-0">
      {isPositive ? (
        <span
          className="text-[10px] font-bold text-emerald-400 flex items-center justify-center border rounded font-mono shrink-0 shadow-md text-center"
          style={{
            width: `${CHANGE_BADGE_WIDTH}px`,
            height: `${CHANGE_BADGE_HEIGHT}px`,
            backgroundColor: POSITIVE_CHANGE.bgOpaque,
            borderColor: "rgba(27, 67, 47, 0.50)",
          }}
        >
          +{absChange}
        </span>
      ) : (
        <span
          className="text-[10px] font-bold text-rose-400 flex items-center justify-center border rounded font-mono shrink-0 shadow-md text-center"
          style={{
            width: `${CHANGE_BADGE_WIDTH}px`,
            height: `${CHANGE_BADGE_HEIGHT}px`,
            backgroundColor: NEGATIVE_CHANGE.bgOpaque,
            borderColor: "rgba(92, 28, 40, 0.50)",
          }}
        >
          -{absChange}
        </span>
      )}
    </div>
  );
}
