/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FLAG_HEIGHT, FLAG_HEIGHT_LARGE } from "../config";

interface CountryFlagProps {
  code: string;
  name: string;
  failedFlags: Set<string>;
  onError: (code: string) => void;
  size?: "column" | "spotlight";
  dimmed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountryFlag({
  code,
  name,
  failedFlags,
  onError,
  size = "column",
  dimmed = false,
  className = "",
  style,
}: CountryFlagProps) {
  const lowerCode = code.toLowerCase();
  if (failedFlags.has(lowerCode)) return null;

  const heightPx = size === "spotlight" ? FLAG_HEIGHT_LARGE : FLAG_HEIGHT;
  const heightClass = size === "spotlight" ? "h-12" : "h-8";
  const roundedClass = size === "spotlight" ? "rounded-md" : "rounded";
  const bgClass = size === "spotlight" ? "bg-surface-hover" : "bg-surface";

  return (
    <div
      className={`${heightClass} aspect-[3/2] ${roundedClass} overflow-hidden border border-border shadow-[2px_2px_5px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0 ${bgClass} ${className}`}
      style={{ height: `${heightPx}px`, ...style }}
    >
      <img
        src={`https://flagcdn.com/${lowerCode}.svg`}
        alt={name}
        className="w-full h-full object-cover transition-opacity duration-200"
        style={{ opacity: dimmed ? 0.25 : 1 }}
        referrerPolicy="no-referrer"
        onError={() => onError(lowerCode)}
      />
    </div>
  );
}
