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

export const getRank = (RankNumber, TierNumber) => {
  if ([1, 2].includes(TierNumber)) {
    return `${getTier(TierNumber)} -`
  } else if (TierNumber <= 0) {
    return `${getTier(TierNumber)}`
  }
  else {
    switch (RankNumber) {
      case 1: return `${getTier(TierNumber)} I - `
      case 2: return `${getTier(TierNumber)} II - `
      case 3: return `${getTier(TierNumber)} III - `
      case 4: return `${getTier(TierNumber)} IV - `
      default: return ""
    }
  }
};