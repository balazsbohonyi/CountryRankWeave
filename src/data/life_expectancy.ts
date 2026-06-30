import { RankingDataset } from "../types";

export const lifeExpectancyDataset: RankingDataset = {
  "meta": {
    "title": "Life expectancy at birth by country",
    "subtitle": "Average number of years a newborn is expected to live, selected years",
    "metric": "Life expectancy at birth, total",
    "unit": "years",
    "periods": [
      {
        "id": "2000",
        "label": "2000"
      },
      {
        "id": "2010",
        "label": "2010"
      },
      {
        "id": "2020",
        "label": "2020"
      },
      {
        "id": "2024",
        "label": "2024"
      }
    ],
    "topN": 60,
    "sortDirection": "desc",
    "missingPolicy": "show-faded",
    "ribbonMode": "varying",
    "sourceNote": "World Bank, World Development Indicators (indicator SP.DYN.LE00.IN): Life expectancy at birth, total (years).",
    "datasetId": "wb_wdi_sp_dyn_le00_in",
    "datasetLabel": "World Bank WDI – Life expectancy at birth, total (years)"
  },
  "countries": [
    {
      "id": "mco",
      "name": "Monaco",
      "code": "MC",
      "values": {
        "2000": 82.12,
        "2010": 84.64,
        "2020": 86.09,
        "2024": 86.5
      }
    },
    {
      "id": "smr",
      "name": "San Marino",
      "code": "SM",
      "values": {
        "2000": 80.5,
        "2010": 83.46,
        "2020": 82.65,
        "2024": 85.82
      }
    },
    {
      "id": "hkg",
      "name": "Hong Kong SAR, China",
      "code": "HK",
      "values": {
        "2000": 80.87,
        "2010": 82.96,
        "2020": 85.5,
        "2024": 85.39
      }
    },
    {
      "id": "kwt",
      "name": "Kuwait",
      "code": "KW",
      "values": {
        "2000": 76.23,
        "2010": 77.73,
        "2020": 78.76,
        "2024": 84.58
      }
    },
    {
      "id": "che",
      "name": "Switzerland",
      "code": "CH",
      "values": {
        "2000": 79.68,
        "2010": 82.25,
        "2020": 83.0,
        "2024": 84.41
      }
    },
    {
      "id": "lie",
      "name": "Liechtenstein",
      "code": "LI",
      "values": {
        "2000": 76.83,
        "2010": 81.84,
        "2020": 81.66,
        "2024": 84.2
      }
    },
    {
      "id": "pyf",
      "name": "French Polynesia",
      "code": "PF",
      "values": {
        "2000": 79.0,
        "2010": 81.14,
        "2020": 82.46,
        "2024": 84.19
      }
    },
    {
      "id": "and",
      "name": "Andorra",
      "code": "AD",
      "values": {
        "2000": 81.86,
        "2010": 84.2,
        "2020": 79.42,
        "2024": 84.19
      }
    },
    {
      "id": "swe",
      "name": "Sweden",
      "code": "SE",
      "values": {
        "2000": 79.64,
        "2010": 81.45,
        "2020": 82.36,
        "2024": 84.06
      }
    },
    {
      "id": "jpn",
      "name": "Japan",
      "code": "JP",
      "values": {
        "2000": 81.08,
        "2010": 82.84,
        "2020": 84.56,
        "2024": 84.04
      }
    },
    {
      "id": "ita",
      "name": "Italy",
      "code": "IT",
      "values": {
        "2000": 79.78,
        "2010": 82.04,
        "2020": 82.2,
        "2024": 83.95
      }
    },
    {
      "id": "esp",
      "name": "Spain",
      "code": "ES",
      "values": {
        "2000": 78.97,
        "2010": 81.63,
        "2020": 82.23,
        "2024": 83.89
      }
    },
    {
      "id": "gib",
      "name": "Gibraltar",
      "code": "GI",
      "values": {
        "2000": 80.14,
        "2010": 82.08,
        "2020": 83.07,
        "2024": 83.63
      }
    },
    {
      "id": "kor",
      "name": "Korea, Rep.",
      "code": "KR",
      "values": {
        "2000": 75.91,
        "2010": 80.12,
        "2020": 83.43,
        "2024": 83.63
      }
    },
    {
      "id": "sgp",
      "name": "Singapore",
      "code": "SG",
      "values": {
        "2000": 77.95,
        "2010": 81.54,
        "2020": 83.54,
        "2024": 83.35
      }
    },
    {
      "id": "mac",
      "name": "Macao SAR, China",
      "code": "MO",
      "values": {
        "2000": 80.18,
        "2010": 82.27,
        "2020": 84.13,
        "2024": 83.33
      }
    },
    {
      "id": "isr",
      "name": "Israel",
      "code": "IL",
      "values": {
        "2000": 78.95,
        "2010": 81.6,
        "2020": 82.65,
        "2024": 83.2
      }
    },
    {
      "id": "lux",
      "name": "Luxembourg",
      "code": "LU",
      "values": {
        "2000": 77.87,
        "2010": 80.63,
        "2020": 82.14,
        "2024": 83.2
      }
    },
    {
      "id": "nor",
      "name": "Norway",
      "code": "NO",
      "values": {
        "2000": 78.63,
        "2010": 81.0,
        "2020": 83.21,
        "2024": 83.16
      }
    },
    {
      "id": "fro",
      "name": "Faroe Islands",
      "code": "FO",
      "values": {
        "2000": 78.41,
        "2010": 80.6,
        "2020": 82.53,
        "2024": 83.08
      }
    },
    {
      "id": "are",
      "name": "United Arab Emirates",
      "code": "AE",
      "values": {
        "2000": 76.35,
        "2010": 81.89,
        "2020": 81.94,
        "2024": 83.07
      }
    },
    {
      "id": "aus",
      "name": "Australia",
      "code": "AU",
      "values": {
        "2000": 79.23,
        "2010": 81.7,
        "2020": 83.2,
        "2024": 83.05
      }
    },
    {
      "id": "irl",
      "name": "Ireland",
      "code": "IE",
      "values": {
        "2000": 76.54,
        "2010": 80.74,
        "2020": 82.46,
        "2024": 83.01
      }
    },
    {
      "id": "fra",
      "name": "France",
      "code": "FR",
      "values": {
        "2000": 79.06,
        "2010": 81.66,
        "2020": 82.18,
        "2024": 82.98
      }
    },
    {
      "id": "mlt",
      "name": "Malta",
      "code": "MT",
      "values": {
        "2000": 78.35,
        "2010": 81.4,
        "2020": 82.1,
        "2024": 82.96
      }
    },
    {
      "id": "isl",
      "name": "Iceland",
      "code": "IS",
      "values": {
        "2000": 79.65,
        "2010": 81.9,
        "2020": 83.06,
        "2024": 82.81
      }
    },
    {
      "id": "qat",
      "name": "Qatar",
      "code": "QA",
      "values": {
        "2000": 75.25,
        "2010": 79.44,
        "2020": 80.41,
        "2024": 82.52
      }
    },
    {
      "id": "bmu",
      "name": "Bermuda",
      "code": "BM",
      "values": {
        "2000": 78.25,
        "2010": 79.41,
        "2020": 81.46,
        "2024": 82.49
      }
    },
    {
      "id": "prt",
      "name": "Portugal",
      "code": "PT",
      "values": {
        "2000": 76.31,
        "2010": 79.03,
        "2020": 81.33,
        "2024": 82.38
      }
    },
    {
      "id": "emu",
      "name": "Euro area",
      "code": "EU",
      "values": {
        "2000": 78.2,
        "2010": 80.7,
        "2020": 81.49,
        "2024": 82.37
      }
    },
    {
      "id": "fin",
      "name": "Finland",
      "code": "FI",
      "values": {
        "2000": 77.47,
        "2010": 79.87,
        "2020": 81.93,
        "2024": 82.34
      }
    },
    {
      "id": "bel",
      "name": "Belgium",
      "code": "BE",
      "values": {
        "2000": 77.72,
        "2010": 80.18,
        "2020": 80.7,
        "2024": 82.3
      }
    },
    {
      "id": "svn",
      "name": "Slovenia",
      "code": "SI",
      "values": {
        "2000": 75.41,
        "2010": 79.42,
        "2020": 80.53,
        "2024": 82.29
      }
    },
    {
      "id": "dnk",
      "name": "Denmark",
      "code": "DK",
      "values": {
        "2000": 76.59,
        "2010": 79.1,
        "2020": 81.6,
        "2024": 82.25
      }
    },
    {
      "id": "can",
      "name": "Canada",
      "code": "CA",
      "values": {
        "2000": 79.17,
        "2010": 81.32,
        "2020": 81.53,
        "2024": 82.11
      }
    },
    {
      "id": "nzl",
      "name": "New Zealand",
      "code": "NZ",
      "values": {
        "2000": 78.64,
        "2010": 80.9,
        "2020": 82.26,
        "2024": 82.01
      }
    },
    {
      "id": "aut",
      "name": "Austria",
      "code": "AT",
      "values": {
        "2000": 78.13,
        "2010": 80.58,
        "2020": 81.19,
        "2024": 82.0
      }
    },
    {
      "id": "nld",
      "name": "Netherlands",
      "code": "NL",
      "values": {
        "2000": 77.99,
        "2010": 80.7,
        "2020": 81.36,
        "2024": 81.97
      }
    },
    {
      "id": "pri",
      "name": "Puerto Rico (US)",
      "code": "PR",
      "values": {
        "2000": 75.51,
        "2010": 78.72,
        "2020": 80.01,
        "2024": 81.9
      }
    },
    {
      "id": "grc",
      "name": "Greece",
      "code": "GR",
      "values": {
        "2000": 77.89,
        "2010": 80.39,
        "2020": 81.29,
        "2024": 81.84
      }
    },
    {
      "id": "cyp",
      "name": "Cyprus",
      "code": "CY",
      "values": {
        "2000": 77.9,
        "2010": 80.63,
        "2020": 81.23,
        "2024": 81.82
      }
    },
    {
      "id": "euu",
      "name": "European Union",
      "code": "EU",
      "values": {
        "2000": 77.08,
        "2010": 79.64,
        "2020": 80.44,
        "2024": 81.56
      }
    },
    {
      "id": "bhr",
      "name": "Bahrain",
      "code": "BH",
      "values": {
        "2000": 74.67,
        "2010": 78.59,
        "2020": 78.68,
        "2024": 81.42
      }
    },
    {
      "id": "gbr",
      "name": "United Kingdom",
      "code": "GB",
      "values": {
        "2000": 77.74,
        "2010": 80.4,
        "2020": 80.33,
        "2024": 81.39
      }
    },
    {
      "id": "chl",
      "name": "Chile",
      "code": "CL",
      "values": {
        "2000": 77.13,
        "2010": 79.09,
        "2020": 79.35,
        "2024": 81.36
      }
    },
    {
      "id": "mdv",
      "name": "Maldives",
      "code": "MV",
      "values": {
        "2000": 70.89,
        "2010": 76.76,
        "2020": 78.71,
        "2024": 81.28
      }
    },
    {
      "id": "chi",
      "name": "Channel Islands",
      "code": "JG",
      "values": {
        "2000": 78.8,
        "2010": 81.2,
        "2020": 80.9,
        "2024": 81.2
      }
    },
    {
      "id": "pst",
      "name": "Post-demographic dividend",
      "code": "V4",
      "values": {
        "2000": 77.35,
        "2010": 79.68,
        "2020": 80.07,
        "2024": 81.11
      }
    },
    {
      "id": "imn",
      "name": "Isle of Man",
      "code": "IM",
      "values": {
        "2000": 74.84,
        "2010": 79.61,
        "2020": 80.59,
        "2024": 81.09
      }
    },
    {
      "id": "cri",
      "name": "Costa Rica",
      "code": "CR",
      "values": {
        "2000": 77.32,
        "2010": 79.35,
        "2020": 79.72,
        "2024": 81.0
      }
    },
    {
      "id": "deu",
      "name": "Germany",
      "code": "DE",
      "values": {
        "2000": 77.93,
        "2010": 79.99,
        "2020": 81.04,
        "2024": 80.79
      }
    },
    {
      "id": "vir",
      "name": "Virgin Islands (U.S.)",
      "code": "VI",
      "values": {
        "2000": 76.62,
        "2010": 77.87,
        "2020": 79.82,
        "2024": 80.77
      }
    },
    {
      "id": "cym",
      "name": "Cayman Islands",
      "code": "KY",
      "values": {
        "2000": 74.38,
        "2010": 76.07,
        "2020": 79.23,
        "2024": 80.54
      }
    },
    {
      "id": "maf",
      "name": "St. Martin (French part)",
      "code": "MF",
      "values": {
        "2000": 76.79,
        "2010": 78.75,
        "2020": 80.08,
        "2024": 80.44
      }
    },
    {
      "id": "oed",
      "name": "OECD members",
      "code": "OE",
      "values": {
        "2000": 76.82,
        "2010": 79.05,
        "2020": 78.96,
        "2024": 80.4
      }
    },
    {
      "id": "omn",
      "name": "Oman",
      "code": "OM",
      "values": {
        "2000": 73.64,
        "2010": 77.18,
        "2020": 77.76,
        "2024": 80.25
      }
    },
    {
      "id": "cze",
      "name": "Czechia",
      "code": "CZ",
      "values": {
        "2000": 74.97,
        "2010": 77.42,
        "2020": 78.23,
        "2024": 79.98
      }
    },
    {
      "id": "alb",
      "name": "Albania",
      "code": "AL",
      "values": {
        "2000": 74.83,
        "2010": 78.41,
        "2020": 77.82,
        "2024": 79.78
      }
    },
    {
      "id": "pan",
      "name": "Panama",
      "code": "PA",
      "values": {
        "2000": 73.44,
        "2010": 76.42,
        "2020": 76.33,
        "2024": 79.78
      }
    },
    {
      "id": "est",
      "name": "Estonia",
      "code": "EE",
      "values": {
        "2000": 70.42,
        "2010": 75.43,
        "2020": 78.6,
        "2024": 79.3
      }
    }
  ]
};
