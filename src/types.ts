/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SortDirection = "asc" | "desc";
export type MissingPolicy = "hide" | "show-faded";
export type RibbonMode = "constant" | "value-based" | "varying";

export interface Period {
  id: string;
  label: string;
}

export interface DatasetMeta {
  title: string;
  subtitle: string;
  metric: string;
  unit: string;
  periods: Period[];
  topN: number;
  sortDirection: SortDirection;
  missingPolicy: MissingPolicy;
  ribbonMode: RibbonMode;
  sourceNote: string;
  datasetId: string;
  datasetLabel: string;
}

export interface CountryData {
  id: string;
  name: string;
  code: string;
  values: Record<string, number | null>;
}

export interface RankingDataset {
  meta: DatasetMeta;
  countries: CountryData[];
}

export interface RenderedRow {
  id: string;
  name: string;
  code: string;
  rawVal: number | null;
  rank: number; // 1-indexed calculated rank
  isFaded?: boolean;
}
