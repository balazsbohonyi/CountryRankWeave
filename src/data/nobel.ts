import { RankingDataset } from "../types";

export const nobelDataset: RankingDataset = {
  meta: {
    title: "Nobel Laureates by Country",
    subtitle: "Top 30 birth countries by cumulative Nobel Prizes",
    metric: "Nobel Laureates (birth country)",
    unit: "laureates",
    periods: [
      { id: "1901-1970", label: "1901–1970" },
      { id: "1901-2020", label: "1901–2020" }
    ],
    topN: 30,
    sortDirection: "desc",
    missingPolicy: "show-faded",
    ribbonMode: "constant",
    sourceNote: "Source: Nobel laureates table 1901–2020 (birth_country aggregation)",
    datasetId: "nobel-laureates",
    datasetLabel: "Nobel Laureates by Birth Country"
  },
  countries: [
    {
      id: "usa",
      name: "United States",
      code: "US",
      values: { "1901-1970": 80, "1901-2020": 281 }
    },
    {
      id: "gbr",
      name: "United Kingdom",
      code: "GB",
      values: { "1901-1970": 42, "1901-2020": 88 }
    },
    {
      id: "deu",
      name: "Germany",
      code: "DE",
      values: { "1901-1970": 50, "1901-2020": 83 }
    },
    {
      id: "fra",
      name: "France",
      code: "FR",
      values: { "1901-1970": 40, "1901-2020": 57 }
    },
    {
      id: "swe",
      name: "Sweden",
      code: "SE",
      values: { "1901-1970": 17, "1901-2020": 29 }
    },
    {
      id: "pol",
      name: "Poland",
      code: "PL",
      values: { "1901-1970": 18, "1901-2020": 28 }
    },
    {
      id: "jpn",
      name: "Japan",
      code: "JP",
      values: { "1901-1970": 3, "1901-2020": 27 }
    },
    {
      id: "rus",
      name: "Russia",
      code: "RU",
      values: { "1901-1970": 14, "1901-2020": 26 }
    },
    {
      id: "can",
      name: "Canada",
      code: "CA",
      values: { "1901-1970": 4, "1901-2020": 20 }
    },
    {
      id: "ita",
      name: "Italy",
      code: "IT",
      values: { "1901-1970": 11, "1901-2020": 19 }
    },
    {
      id: "che",
      name: "Switzerland",
      code: "CH",
      values: { "1901-1970": 10, "1901-2020": 19 }
    },
    {
      id: "nld",
      name: "the Netherlands",
      code: "NL",
      values: { "1901-1970": 10, "1901-2020": 18 }
    },
    {
      id: "aut",
      name: "Austria",
      code: "AT",
      values: { "1901-1970": 10, "1901-2020": 18 }
    },
    {
      id: "chn",
      name: "China",
      code: "CN",
      values: { "1901-1970": 3, "1901-2020": 12 }
    },
    {
      id: "nor",
      name: "Norway",
      code: "NO",
      values: { "1901-1970": 7, "1901-2020": 12 }
    },
    {
      id: "dnk",
      name: "Denmark",
      code: "DK",
      values: { "1901-1970": 9, "1901-2020": 11 }
    },
    {
      id: "sco",
      name: "Scotland",
      code: "GB-SCT",
      values: { "1901-1970": 7, "1901-2020": 11 }
    },
    {
      id: "aus",
      name: "Australia",
      code: "AU",
      values: { "1901-1970": 5, "1901-2020": 10 }
    },
    {
      id: "hun",
      name: "Hungary",
      code: "HU",
      values: { "1901-1970": 4, "1901-2020": 9 }
    },
    {
      id: "bel",
      name: "Belgium",
      code: "BE",
      values: { "1901-1970": 6, "1901-2020": 9 }
    },
    {
      id: "ind",
      name: "India",
      code: "IN",
      values: { "1901-1970": 5, "1901-2020": 9 }
    },
    {
      id: "zaf",
      name: "South Africa",
      code: "ZA",
      values: { "1901-1970": 1, "1901-2020": 9 }
    },
    {
      id: "esp",
      name: "Spain",
      code: "ES",
      values: { "1901-1970": 5, "1901-2020": 7 }
    },
    {
      id: "cze",
      name: "Czech Republic",
      code: "CZ",
      values: { "1901-1970": 4, "1901-2020": 6 }
    },
    {
      id: "egy",
      name: "Egypt",
      code: "EG",
      values: { "1901-1970": 1, "1901-2020": 6 }
    },
    {
      id: "isr",
      name: "Israel",
      code: "IL",
      values: { "1901-1970": 0, "1901-2020": 6 }
    },
    {
      id: "nir",
      name: "Northern Ireland",
      code: "GB-NIR",
      values: { "1901-1970": 0, "1901-2020": 5 }
    },
    {
      id: "fin",
      name: "Finland",
      code: "FI",
      values: { "1901-1970": 3, "1901-2020": 5 }
    },
    {
      id: "irl",
      name: "Ireland",
      code: "IE",
      values: { "1901-1970": 4, "1901-2020": 5 }
    },
    {
      id: "ukr",
      name: "Ukraine",
      code: "UA",
      values: { "1901-1970": 3, "1901-2020": 5 }
    }
  ]
};
