//import { MAP_TIER } from "./mapping/map_tier";

export const getTier = (TierNumber) => {
  switch (TierNumber) {
    case 1: return "Challenger"
    case 2: return "Grand Master"
    case 3: return "Master"
    case 4: return "Diamond"
    case 5: return "Platinum"
    case 6: return "Gold"
    case 7: return "Silver"
    case 8: return "Bronze"
    case 9: return "Iron"
    default: return "Unranked"
  }
};

export const getRank = (RankNumber) => {
  switch (RankNumber) {
    case 1: return "- I"
    case 2: return "- II"
    case 3: return "- III"
    case 4: return "- IV"
    default: return ""
  }
};