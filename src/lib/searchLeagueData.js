import { API } from "../Pages/config";
import { store } from "../index";
import axios from "axios";

// 1. () => 리그데이터에서 연도선택값 가져오기
export const findYearData = (leagueData) => () => {
  let yearList = [];
  for (let key in leagueData) {
    yearList = Object.keys(leagueData[key]).concat(yearList);
  }
  return [...new Set(yearList)].sort();
};
// 2. (연도) => 리그데이터에서 리그선택값 가져오기
export const findLegueData = (leagueData) => (yearsArray) => {
  let leagueList = [];

  yearsArray.forEach((year) => {
    for (let key in leagueData) {
      if (leagueData[key].hasOwnProperty(year)) {
        leagueList.push(key);
      }
    }
  });

  return [...new Set(leagueList)].sort();
};

// 3. (연도,리그) => 리그데이터에서 시즌선택값 가져오기
export const findSeasonData = (leagueData) => (yearsArray, leagueArray) => {
  if (!yearsArray || !leagueArray) return;
  let seasonList = [];

  for (let year of yearsArray) {
    for (let league of leagueArray) {
      const seasonKeys = Object.keys(leagueData[league][year]);
      seasonList = seasonList.concat(seasonKeys);
    }
  }

  return [...new Set(seasonList)];
};
// 4. (연도,리그,시즌) 로 리그데이터에서 팀선택값 가져오기
export const findTeamData =
  (leagueData) => (yearsArray, leagueArray, seasonArray) => {
    if (!yearsArray || !leagueArray || !seasonArray) return;
    if (
      !Array.isArray(yearsArray) ||
      !Array.isArray(leagueArray) ||
      !Array.isArray(seasonArray)
    )
      return;
    let teamList = [];
    for (let year of yearsArray) {
      for (let league of leagueArray) {
        for (let season of seasonArray) {
          const teamData = leagueData[league][year][season];
          if (teamData) {
            const teamKeys = Object.keys(teamData);
            teamList = teamList.concat(teamKeys);
          }
        }
      }
    }
    return [...new Set(teamList)];
  };
// 5. (연도,리그,시즌) 리그데이터에서 패치선택값 받아오기
export const getPatchData = async (yearsArray, leagueArray, seasonArray) => {
  if (!yearsArray || !leagueArray || !seasonArray) return;
  if (
    !Array.isArray(yearsArray) ||
    !Array.isArray(leagueArray) ||
    !Array.isArray(seasonArray)
  )
    return;
  const url = `${API}/lolapi/filter/patch`;
  const params = {
    league: leagueArray,
    year: yearsArray,
    season: seasonArray,
    token: store.getState().UserReducer.token,
    id: store.getState().UserReducer.id,
  };

  try {
    const result = axios({
      method: "POST",
      url,
      data: params,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
