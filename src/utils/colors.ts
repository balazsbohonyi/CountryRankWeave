/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

function parseRGB(rgbStr: string): RGB {
  const match = rgbStr.match(/\d+/g);
  if (!match || match.length < 3) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(match[0], 10),
    g: parseInt(match[1], 10),
    b: parseInt(match[2], 10)
  };
}

export function interpolateColor(c1: number[], c2: number[], factor: number): number[] {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * factor),
    Math.round(c1[1] + (c2[1] - c1[1]) * factor),
    Math.round(c1[2] + (c2[2] - c1[2]) * factor),
  ];
}

/**
 * Maps a rank from 1 to totalRanks to a continuous ordered color palette:
 * Green -> Yellow-Green -> Yellow -> Orange -> Red-Orange -> Pink/Magenta
 */
export function getRankColor(rank: number, totalRanks: number): string {
  if (totalRanks <= 1) return "rgb(46, 213, 115)"; // Default green
  
  // Normalize rank to 0-1
  const t = (rank - 1) / (totalRanks - 1);
  
  // Custom premium color stops tuned for a dark slate background:
  const stops = [
    [46, 213, 115],   // Minty emerald green (#2ed573) - Rank 1
    [164, 224, 45],   // Vibrant lime/yellow-green (#a4e02d)
    [255, 217, 0],    // Warm sunny yellow (#ffd900)
    [255, 136, 0],    // Rich orange (#ff8800)
    [255, 61, 0],     // Deep red-orange (#ff3d00)
    [224, 30, 137]    // Royal pink-magenta (#e01e89) - Rank N
  ];
  
  const section = t * (stops.length - 1);
  const index = Math.floor(section);
  const factor = section - index;
  
  if (index >= stops.length - 1) {
    const c = stops[stops.length - 1];
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  }
  
  const c1 = stops[index];
  const c2 = stops[index + 1];
  const rgb = interpolateColor(c1, c2, factor);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/**
 * Returns a semi-transparent version of an RGB color or dims it for unhovered items
 */
export function dimColor(rgbStr: string, opacity: number): string {
  const rgb = parseRGB(rgbStr);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}
