import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  League,
  Year,
  Season,
  Team,
  Player,
  Patch,
  ResetYear,
  ResetSeason,
  ResetTeam,
  ResetPlayer,
  Position,
  ResetChampion,
  HandleTab,
  ResetFilter2,
  PatchFull,
  SetSeason,
  SetYear,
  SetPatch,
  SetLeague,
  OppTeam,
  Loading,
} from "../../redux/modules/filtervalue";
import {
  setLeagueFilter,
  setPatchFilter,
  setPlayerFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../redux/modules/selectorvalue";

import { SetIsOpen, SetDesc } from "../../redux/modules/modalvalue";
import AlertModal from '../UtilityComponent/AlertModal';

import styled, { css } from "styled-components";
import { API } from "../../Pages/config";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
import FilterHeader from "./FilterHeader";

import MultiSelectCb from "./MultiSelectCb";
import SelectedFilter from "./Selected/SelectedFilter";
import { gsap } from "gsap"; // 애니메이션 추가
import FilterItem from "./FilterItem";
import TeamFilterModal from "./TeamFilterModal";
import PlayerFilterModal from "./PlayerFilterModal";
import axiosRequest from "../../lib/axiosRequest";
import CloseFilter from './CloseFilter';

const Filter = memo(() => {
  const filters = useSelector((state) => state.FilterReducer);
  const copyvalue = useSelector((state) => state.CopyReducer);
  const user = useSelector((state) => state.UserReducer);
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);

  const [league, setLeague] = useState(filters.league);
  const [year, setYear] = useState(filters.year);
  const [season, setSeason] = useState(filters.season);
  const [team, setTeam] = useState(filters.team);
  const [player, setPlayer] = useState(filters.player);
  const [patch, setPatch] = useState(filters.patch);
  const { t } = useTranslation();

  const nameLeague = "/league";
  const nameTeam = "/team";
  const nameSolo = "/solo";
  const nameVideo = "/video";
  const nameGameReport = "/gameReport";
  const nameTeamCompare = "/teamCompare";
  const namePlayerCompare = "/playerCompare";
  const pagePath = document.location.pathname;
  const isComparePage =
    [nameTeamCompare, namePlayerCompare].includes(pagePath) ||
    (nameTeam === pagePath && filters.tab === 2) || // 팀보고서에서 팀 비교 창
    (nameSolo === pagePath && filters.tab === 1); // 선수보고서에서 선수 비교

  const isBanOrTeamIndex = (nameTeam === pagePath && filters.tab === 0) || (nameTeam === pagePath && filters.tab === 1);
  const isNeedTeam = [nameSolo, nameTeam, nameVideo, nameGameReport].includes(
    pagePath
  );
  const pagesWithLimitedLeagues = [
    nameVideo,
    nameGameReport,
    nameSolo,
  ].includes(pagePath);

  const dropdownRef = useRef(null);
  const [isActiveLeague, setIsActiveLeague] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const [isActiveTeam, setIsActiveTeam] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const [isActivePlayer, setIsActivePlayer] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  // 페이지 오픈 시, 리그 데이터를 받아오도록 추가.
  useEffect(() => {
    if (isComparePage === false) {
      fetchYearFilter();
      // fetchLeagueFilter();
    }
  }, []);

  useEffect(() => {
    if (isComparePage === false && selector.yearFilter.length === 0) {
      fetchYearFilter();
    }
  }, [selector.yearFilter]);


  useEffect(() => {
    if (JSON.stringify(league) !== JSON.stringify(filters.league)) {
      if (isComparePage) {
        fetchSeasonFilter();
      } else {
        // fetchYearFilter();
        fetchSeasonFilter();
        fetchingPatchFilter();
        fetchActiveFilter();
      }
      setLeague(filters.league);
    } else {
      fetchSeasonFilter();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.league]);

  useEffect(() => {
    if (JSON.stringify(year) !== JSON.stringify(filters.year)) {
      if (isComparePage) {
        // fetchLeagueFilter();
      } else {
        dispatch(SetLeague([]));
        dispatch(SetSeason([]));
        fetchLeagueFilter();
        setYear(filters.year);
      }
    }
  }, [filters.year]);

  useEffect(() => {
    if (JSON.stringify(season) !== JSON.stringify(filters.season)) {
      if (filters.year.length > 0) {
        fetchingPatchFilter();

        if ([nameLeague].includes(pagePath)) {
          dispatch(HandleTab(1));
        } else {
          fetchingTeamFilter();
        }
      }
      if (isComparePage === false) {
        dispatch(ResetTeam());
        setSeason(filters.season);
      }
    } else {
      fetchingPatchFilter();
    }
  }, [filters.season]);

  useEffect(() => {
    if (JSON.stringify(team) !== JSON.stringify(filters.team)) {
      if ([nameTeam, nameVideo].includes(pagePath)) {
        // if (filters.team.length !== 0 && isComparePage === false) {
        if (filters.team.length !== 0 && filters.tab === "") {
          dispatch(HandleTab(0));
        }
        if (pagePath === nameTeam && filters.tab === 2) {
          dispatch(SetDesc(t("filters.mainTeamChanged")));
          dispatch(SetIsOpen(true));
        }
        if (pagePath === nameSolo && filters.tab === 1) {
          dispatch(SetDesc(t("filters.comparison.mainPlayerChanged")));
          dispatch(SetIsOpen(true));
        }
      } else {
        fetchingPlayerFilter();
      }
      setTeam(filters.team);
    }
  }, [filters.team]);

  useEffect(() => {
    console.log(filters.player);
  }, [filters.player]);

  useEffect(() => {
    if (JSON.stringify(patch) !== JSON.stringify(filters.patch)) {
      if (isComparePage === false) {
        fetchingTeamFilter();
      }
      setPatch(filters.patch);
    }
  }, [filters.patch]);

  // 최초 선택된 리그의 시즌이 없는 리그일 경우 팝업 적용
  useEffect(() => {

    if (pagePath === "/league" || pagePath === "/video") {
      if (filters.season.length !== 0) {
        if (filters.year.length !== 0) {
          for (let league of filters.league) {
            for (let year of filters.year) {
              const ObjectKeys = Object.keys(
                staticvalue.filterObjects[league][year]
              );
              if (filters.season[0] && !ObjectKeys.includes(filters.season[0])) {
                dispatch(SetDesc(t("filters.NoCommonSeasons")));
                dispatch(SetIsOpen(true));
              }
            }
          }
        }

      }

    }
  }, [filters.league])

  useEffect(() => {
    if (isComparePage) {
      fetchYearFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyvalue.compareModal]);

  // 팀이 이미 선택된 경우에 리그를 재선택하게될 때 팀 리셋하여 빈 데이터가 나오지 않게 함
  useEffect(() => {
    if ([nameSolo, nameTeam].includes(pagePath) && filters.team.length > 0) {
      dispatch(ResetTeam());
    }
  }, [filters.league])

  const fetchActiveFilter = () => {
    // if (selector.leagueFilter?.length > 0) fetchLeagueFilter();
    // if (selector.yearFilter?.length > 0) fetchYearFilter();
    if (selector.seasonFilter?.length > 0) fetchSeasonFilter();
    if (selector.teamFilter?.length > 0) fetchingTeamFilter();
    if (selector.playerFilter?.length > 0) fetchingPlayerFilter();
    // if (filters?.patchFilter > 0) fetchingPatchFilter();
  };

  // 리그 필터 fetch 해오는 함수
  const fetchLeagueFilter = () => {
    let leagueList = [];
    if (isComparePage) {
      leagueList = Object.keys(staticvalue.filterObjects).map(
        (key) =>
          // Number(Object.keys(staticvalue.filterObjects[key])) ===
          //   Number(filters.year) && key
          filters.year.filter(x => Object.keys(staticvalue.filterObjects[key]).includes(
            x)) && key
      );
      // 선수보고서, 영상보고서, 게임보고서일 경우 LPL,LCK CL 리그 제외
    } else {
      //  연도가 설정되지 않으면 호출되지않음
      if (filters.year.length === 0) {
        return;
      }
      // 모든 리그에서 LPL 리그 제외
      leagueList = Object.keys(staticvalue.filterObjects).filter(
        (key) => key !== "LPL"
      )
    }

    if (filters.year[0] === "2022") {
      leagueList = Object.keys(staticvalue.filterObjects).filter(
        (key) => key !== "MSI" && key !== "WC" && key !== "LPL"
      );
    }
    if (pagesWithLimitedLeagues) {
      leagueList = Object.keys(staticvalue.filterObjects).filter(
        (key) => key !== "LPL" && key !== "LCK CL"
      );
    }
    if (pagesWithLimitedLeagues && filters.year[0] === "2022") {
      leagueList = Object.keys(staticvalue.filterObjects).filter(
        (key) => key !== "LPL" && key !== "LCK CL" && key !== "MSI" && key !== "WC"
      );
    }

    leagueList.sort();
    if ([nameTeam, nameSolo].includes(pagePath)) {
      dispatch(SetLeague([leagueList[0]]))
    } else {
      dispatch(League(leagueList[0]))
    }

    dispatch(setLeagueFilter(leagueList.sort()));
  };

  const fetchYearFilter = () => {
    if (isComparePage) {
      return;
    } else {
      let yearList = [];
      // if (filters.league.length === 0) {
      //   dispatch(ResetYear());
      // } else if (filters.league.length > 0) {
        let count = 0;
        for (let league of filters.league) {
          const ObjectKeys = Object.keys(staticvalue.filterObjects[league]);
          // const ObjectKeys = ["2021"];
          // yearList = yearList.concat(ObjectKeys);
          if (ObjectKeys.length === 1) {
            count++;
          }
        }
        if (count >= 1) {
          yearList = ["2021"];
        } else {
          yearList = ["2021", "2022"];
        }

      yearList = yearList
        .filter((item, pos) => yearList.indexOf(item) === pos)
        .sort()
        .reverse();
      if (filters.year.length !== 0) {
        dispatch(Year(yearList[0])); // 리그 선택 시, 가장 최근 Year, Season을 자동 선택
      }
      // }
      // yearList.map(data => { console.log("yeartLiost", data) })

      dispatch(setYearFilter(yearList));
    }
  };

  const fetchSeasonFilter = () => {
    let seasonList = [];
    if (filters.year.length !== 0) {
      for (let year of filters.year) {
        for (let league of filters.league) {
          const ObjectKeys = Object.keys(
            staticvalue.filterObjects[league][year]
          );
          seasonList = seasonList.concat(ObjectKeys);
        }
      }
      seasonList = seasonList.filter(
        (item, pos) => seasonList.indexOf(item) === pos
      );
      console.log("sortedSeasonList", seasonList);

      let updateSeason = [];
      for (const season of filters.season) {
        // if (seasonList.includes(season)) {
        //   updateSeason.push(season);
        // }
        // else {
        updateSeason = [seasonList[0]];
        // }
      }
      dispatch(SetSeason(updateSeason));

      if (filters.season.length === 0) {
        dispatch(Season(seasonList[0])); // 리그 선택 시, 가장 최근 Year, Season을 자동 선택
      }
    } else {
      dispatch(ResetSeason());
    }
    dispatch(setSeasonFilter(seasonList));

    if (isComparePage) {
      dispatch(SetSeason(seasonList));
      fetchingTeamFilter();
    }
  };

  const fetchingTeamFilter = () => {
    let teamList = [];
    if (filters.season.length !== 0 && (isNeedTeam || isComparePage)) {
      for (let league of filters.league) {
        for (let year of filters.year) {
          for (let season of filters.season) {
            const seasonData = staticvalue.filterObjects[league][year][season];
            if (seasonData) {
              const ObjectKeys = Object.keys(seasonData);
              teamList = teamList.concat(ObjectKeys);
            }
          }
        }
      }
      teamList = teamList.filter((item, pos) => teamList.indexOf(item) === pos);
    } else {
      dispatch(ResetTeam());
    }
    dispatch(setTeamFilter(teamList));
  };

  //플레이어 필터 fetch 함수
  const fetchingPlayerFilter = () => {
    let players = [];
    if (isComparePage === false) {


      if (filters.team.length !== 0 && isNeedTeam) {
        let playerList = [];
        for (let league of filters.league) {
          for (let year of filters.year) {
            for (let season of filters.season) {
              const seasonData = staticvalue.filterObjects[league][year][season];
              if (seasonData) {
                if (seasonData[filters.team]) {
                  const ObjectKeys = Object.values(seasonData[filters.team]);
                  console.log("ObjectKeys", ObjectKeys);
                  playerList = playerList.concat(ObjectKeys);
                }
              }
            }
          }
        }
        playerList = playerList
          .filter((item, pos) => playerList.indexOf(item) === pos)
          .sort();

        for (let i = 0; i < playerList.length; i++) {
          const name = playerList[i].split("#")[1];
          const position = playerList[i].split("#")[0];
          if (position === "1") {
            players[i] = {
              position: "top",
              name: name,
            };
          } else if (position === "2") {
            players[i] = {
              position: "jng",
              name: name,
            };
          } else if (position === "3") {
            players[i] = {
              position: "mid",
              name: name,
            };
          } else if (position === "4") {
            players[i] = {
              position: "bot",
              name: name,
            };
          } else if (position === "5") {
            players[i] = {
              position: "sup",
              name: name,
            };
          }
        }
      } else {
        dispatch(ResetPlayer());
      }
      dispatch(setPlayerFilter(players));
    }
  };

  // 패치 필터 fetch 함수
  const fetchingPatchFilter = () => {
    if (filters.season.length > 0) {
      dispatch(Loading(true))
      const url = `${API}/lolapi/filter/patch`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        token: user.token,
        id: user.id,
      };
      axiosRequest(undefined, url, params, function (e) {
        const patchResponse = e ?? [];
        dispatch(setPatchFilter(patchResponse));
        dispatch(SetPatch(patchResponse));
        dispatch(Loading(false));
      }, function (e) {
        dispatch(Loading(false));
      });
    }
  };

  return (

    <>
      <AlertModal />
      {[nameTeamCompare, nameTeam].includes(copyvalue.openFilterModal) && <TeamFilterModal />}
      {[nameSolo, namePlayerCompare].includes(copyvalue.openFilterModal) && <PlayerFilterModal />}
      {!filters.filterMenuState ? <CloseFilter /> :
        <FilterWrapper>
          <FilterHeader />
          {filters.filterMenuState && (
            <>
              {Number(filters.tab) >= 0 && filters.tab !== "" && (
                <SelectedFilter
                  pagePath={pagePath}
                  nameSolo={nameSolo}
                  nameTeam={nameTeam}
                  nameVideo={nameVideo}
                  nameTeamCompare={nameTeamCompare}
                  namePlayerCompare={namePlayerCompare}
                />
              )}
              <FilterGroup>
                <FilterItem
                  title={t("label.year")}
                  isHaveFilter={selector.yearFilter.length > 0 ? true : false}
                  multiFilter={selector.yearFilter?.map((year, idx) => {
                    return (
                      <MultiSelectCb
                        idx={idx}
                        filterData={filters.year}
                        mapData={year}
                        radioBtn={true}
                        clickEvent={() => {
                          // dispatch(Year(year));
                          dispatch(SetYear([year]));
                        }}
                      />
                    );
                  })}
                />
                <FilterItem
              title={t("label.league")}
              isHaveFilter={selector.leagueFilter.length > 0 ? true : false}
              multiFilter={selector.leagueFilter?.map((league, idx) => {
                return (
                  <MultiSelectCb
                    idx={idx}
                    filterData={filters.league}
                    mapData={league}
                    radioBtn={[nameTeam, nameSolo].includes(pagePath)}
                    pngPath={`ico-league-${league.toLowerCase()}`}
                    clickEvent={() => {
                      [nameTeam, nameSolo].includes(pagePath)
                        ? dispatch(SetLeague([league]))
                        : dispatch(League(league));

                    }}
                  />
                );
              })}
                />
            <FilterItem
              title={t("label.season")}
              isHaveFilter={selector.seasonFilter.length > 0 ? true : false}
              multiFilter={selector.seasonFilter?.map((season, idx) => {
                return (
                  <MultiSelectCb
                    idx={idx}
                    filterData={filters.season}
                    mapData={season}
                    clickEvent={() => {
                      dispatch(Season(season));
                    }}
                  />
                );
              })}
                />
            {isNeedTeam && (
              <FilterItem
                title={t("label.team")}
                isHaveFilter={selector.teamFilter.length > 0 ? true : false}
                multiFilter={selector.teamFilter?.map((team, idx) => {
                  return (
                    <MultiSelectCb
                      idx={idx}
                      filterData={filters.team}
                      mapData={team}
                      pngPath={`TeamLogo/${team}`}
                      radioBtn={true}
                      clickEvent={() => {
                        dispatch(Team(team));
                        if (pagePath === nameSolo) {
                          dispatch(HandleTab(0));
                        }
                      }}
                    />
                  );
                })}
              />
            )}
            {pagePath === nameSolo && (
              <FilterItem
                title={t("label.player")}
                isHaveFilter={selector.playerFilter.length > 0 ? true : false}
                multiFilter={selector.playerFilter?.map((player, idx) => {
                  return (
                    <MultiSelectCb
                      idx={idx}
                      filterData={filters.player}
                      mapData={player.name}
                      pngPath={`ico-position-${player.position}`}
                      radioBtn={true}
                      clickEvent={() => {
                        dispatch(Player(player.name));
                        dispatch(Position(player.position));
                        dispatch(ResetChampion());
                        dispatch(ResetFilter2());
                        setIsActivePlayer(!isActivePlayer);
                        dispatch(HandleTab(0));
                      }}
                    />
                  );
                })}
              />
            )}
            <FilterItem
              title={t("label.patchVersion")}
              isHaveFilter={selector.patchFilter.length > 0 ? true : false}
              multiFilter={selector.patchFilter?.map((patch, idx) => {
                return (
                  <MultiSelectCb
                    idx={idx}
                    filterData={filters.patch}
                    mapData={patch}
                    clickEvent={() => {
                      dispatch(Patch(patch));
                    }}
                  />
                );
              })}
            />
          </FilterGroup>
        </>
      )}
        </FilterWrapper>
      }

    </>
  );
});

export default Filter;

const FilterWrapper = styled.div`
  background-color: #23212a;
  width: 294px;
  height: 100%;
  max-height: 2000px;
  padding: 28px 0 0;
  margin-left: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  .Selected {
    width: 250px;
    height: 42px;
    margin: 20px 0 0;
    padding: 11px;
    border-radius: 16px;
    background-color: #5942ba;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
`;

const FilterGroup = styled.div`
  width: 250px;
  margin: 30px 1px 0 20px;
`;
