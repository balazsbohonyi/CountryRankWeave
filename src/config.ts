/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// Layout Geometry Constants
// ============================================================================

/** Vertical spacing of each country row in pixels (maps to Tailwind h-11, but we use px for SVG math) */
export const ROW_HEIGHT = 44;

/** SVG stroke width for ribbons in pixels */
export const RIBBON_THICKNESS = 32;

/** Column flag height in pixels (Tailwind h-8) */
export const FLAG_HEIGHT = 32;

/** Spotlight footer flag height in pixels (Tailwind h-12) */
export const FLAG_HEIGHT_LARGE = 48;

/** Horizontal offset from column edge to flag center in pixels */
export const FLAG_OFFSET = 24;

/** Horizontal offset from column edge to rank label in pixels */
export const RANK_OFFSET = 72;

/** Spotlight footer height in pixels (Tailwind h-20) */
export const SPOTLIGHT_FOOTER_HEIGHT = 80;

/** Rank change badge width in pixels (Tailwind w-8) */
export const CHANGE_BADGE_WIDTH = 32;

/** Rank change badge height in pixels (Tailwind h-5) */
export const CHANGE_BADGE_HEIGHT = 20;

/** Sidebar width in pixels (Tailwind w-[420px]) */
export const SIDEBAR_WIDTH = 420;

/** Sidebar toggle button width in pixels (Tailwind w-8) */
export const SIDEBAR_TOGGLE_WIDTH = 32;

// ============================================================================
// Responsive Middle Spacer Widths
// ============================================================================

export interface MiddleWidthBreakpoint {
  minWidth: number;
  value: number;
}

export const MIDDLE_WIDTHS: MiddleWidthBreakpoint[] = [
  { minWidth: 1536, value: 980 },
  { minWidth: 1280, value: 840 },
  { minWidth: 1024, value: 680 },
  { minWidth: 768,  value: 520 },
  { minWidth: 640,  value: 420 },
  { minWidth: 0,    value: 320 }, // default
];

/** Get the middle spacer width for a given container width */
export function getMiddleWidth(containerWidth: number): number {
  for (const bp of MIDDLE_WIDTHS) {
    if (containerWidth >= bp.minWidth) {
      return bp.value;
    }
  }
  return MIDDLE_WIDTHS[MIDDLE_WIDTHS.length - 1].value;
}

// ============================================================================
// Ribbon Geometry Constants
// ============================================================================

/** Fraction of middle width used for flat ribbon ends */
export const FLAT_LENGTH_RATIO = 0.05;

/** Minimum guaranteed flat section length in pixels (prevents ribbons from curving immediately on narrow screens) */
export const MIN_FLAT_LENGTH = 50;

/** Bézier control point ratio for the first control point (ribbon leaving left column) */
export const CURVE_CONTROL_OFFSET_1 = 0.45;

/** Bézier control point ratio for the second control point (ribbon entering right column) */
export const CURVE_CONTROL_OFFSET_2 = 0.55;

// ============================================================================
// Color Tokens
// ============================================================================

/** Footer legend dot colors: top, mid, lower */
export const LEGEND_COLORS = {
  top: "#4ade80",
  mid: "#fb923c",
  lower: "#f472b6",
} as const;

/** Rank change badge colors for positive (up) moves */
export const POSITIVE_CHANGE = {
  bgOpaque: "rgba(16, 42, 29, 0.95)",
  bgTranslucent: "rgba(16, 42, 29, 0.40)",
  borderTranslucent: "rgba(27, 67, 47, 0.50)",
  text: "text-emerald-400",
} as const;

/** Rank change badge colors for negative (down) moves */
export const NEGATIVE_CHANGE = {
  bgOpaque: "rgba(59, 19, 28, 0.95)",
  bgTranslucent: "rgba(59, 19, 28, 0.40)",
  borderTranslucent: "rgba(92, 28, 40, 0.50)",
  text: "text-rose-400",
} as const;

/** Dropdown divider border color */
export const DROPDOWN_DIVIDER_COLOR = "#111111";
