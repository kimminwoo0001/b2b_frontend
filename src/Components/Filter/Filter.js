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
} from "../../redux/modules/filtervalue";
import {
  setLeagueFilter,
  setPatchFilter,
  setPlayerFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../redux/modules/selectorvalue";

import styled, { css } from "styled-components";
import { API } from "../../Pages/config";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
import qs from "qs";
import FilterHeader from "./FilterHeader";

import MultiSelectCb from "./MultiSelectCb";
import SelectedFilter from "./Selected/SelectedFilter";
import { gsap } from "gsap"; // 애니메이션 추가
import FilterItem from "./FilterItem";
import TeamFilterModal from "./TeamFilterModal";
import PlayerFilterModal from "./PlayerFilterModal";
import axiosRequest from "../../lib/axiosRequest";

const Filter = memo(() => {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const selector = useSelector((state) => state.SelectorReducer);

  const dispatch = useDispatch();

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
  const isComparePage = [nameTeamCompare, namePlayerCompare].includes(pagePath);
  const isNeedTeam = [nameSolo, nameTeam, nameVideo, nameGameReport].includes(
    pagePath
  );
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
      fetchLeagueFilter();
    }
  }, []);

  useEffect(() => {
    if (isComparePage === false && selector.leagueFilter.length === 0) {
      fetchLeagueFilter();
    }
  }, [selector.leagueFilter]);

  useEffect(() => {
    if (JSON.stringify(league) !== JSON.stringify(filters.league)) {
      if (isComparePage) {
        fetchSeasonFilter();
      } else {
        fetchYearFilter();
        fetchActiveFilter();
      }
      setLeague(filters.league);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.league]);

  useEffect(() => {
    if (JSON.stringify(year) !== JSON.stringify(filters.year)) {
      if (isComparePage) {
        fetchLeagueFilter();
      } else {
        fetchSeasonFilter();
        setYear(filters.year);
      }
    }
  }, [filters.year]);

  useEffect(() => {
    if (JSON.stringify(season) !== JSON.stringify(filters.season)) {
      if (filters.year.length > 0) {
        if ([nameLeague].includes(pagePath)) {
          dispatch(HandleTab(1));
        } else {
          fetchingTeamFilter();
        }
        fetchingPatchFilter();
      }
      dispatch(ResetTeam());
      setSeason(filters.season);
    }
  }, [filters.season]);

  useEffect(() => {
    if (JSON.stringify(team) !== JSON.stringify(filters.team)) {
      if ([nameTeam, nameVideo].includes(pagePath)) {
        if (filters.team.length !== 0) {
          dispatch(HandleTab(0));
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

  useEffect(() => {
    if (isComparePage) {
      fetchYearFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.compareModal]);

  const fetchActiveFilter = () => {
    if (selector.leagueFilter?.length > 0) fetchLeagueFilter();
    if (selector.yearFilter?.length > 0) fetchYearFilter();
    if (selector.seasonFilter?.length > 0) fetchSeasonFilter();
    if (selector.teamFilter?.length > 0) fetchingTeamFilter();
    if (selector.playerFilter?.length > 0) fetchingPlayerFilter();
    if (filters?.patchFilter > 0) fetchingPatchFilter();
  };

  // 리그 필터 fetch 해오는 함수
  const fetchLeagueFilter = () => {
    let leagueList = [];
    if (isComparePage) {
      leagueList = Object.keys(staticvalue.filterObjects).map(
        (key) =>
          Number(Object.keys(staticvalue.filterObjects[key])) ===
            Number(filters.year) && key
      );
    } else {
      leagueList = Object.keys(staticvalue.filterObjects);
    }
    dispatch(setLeagueFilter(leagueList.sort()));
  };

  const fetchYearFilter = () => {
    let yearList = [];
    if (isComparePage) {
      let yearList = [];
      for (
        let i = 0;
        i < Object.values(staticvalue.filterObjects).length;
        i++
      ) {
        yearList.push(
          Object.keys(Object.values(staticvalue.filterObjects)[i])[0]
        );
      }
      const recentYear = yearList
        .filter((item, pos) => yearList.indexOf(item) === pos)
        .sort()
        .reverse();
      dispatch(SetYear([recentYear[0]]));
      dispatch(setYearFilter(recentYear));
    } else {
      if (filters.league.length === 0) {
        dispatch(ResetYear());
      } else if (filters.league.length > 0) {
        for (let league of filters.league) {
          const ObjectKeys = Object.keys(staticvalue.filterObjects[league]);
          yearList = yearList.concat(ObjectKeys);
        }
        yearList = yearList
          .filter((item, pos) => yearList.indexOf(item) === pos)
          .sort()
          .reverse();
        dispatch(Year(yearList[0])); // 리그 선택 시, 가장 최근 Year, Season을 자동 선택
      }
      dispatch(setYearFilter(yearList));
    }
  };

  const fetchSeasonFilter = () => {
    let seasonList = [];
    if (filters.year.length !== 0) {
      for (let league of filters.league) {
        for (let year of filters.year) {
          const ObjectKeys = Object.keys(
            staticvalue.filterObjects[league][year]
          );
          seasonList = seasonList.concat(ObjectKeys);
        }
      }
      seasonList = seasonList.filter(
        (item, pos) => seasonList.indexOf(item) === pos
      );
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
  };

  // 패치 필터 fetch 함수
  const fetchingPatchFilter = () => {
    const url = `${API}/api/filter/patch`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      token: user.token,
      id: user.id,
    };

    axiosRequest(url, params, function (e) {
      const patchResponse = e.data.patch ?? [];
      dispatch(setPatchFilter(patchResponse));
      dispatch(SetPatch(patchResponse));
    });
  };

  return (
    <>
      {pagePath === nameTeamCompare && (
        <TeamFilterModal
          teamModal={filters.compareModal}
          fetchLeagueFilter={fetchLeagueFilter}
          leagueFilter={selector.leagueFilter}
          seasonFilter={selector.seasonFilter}
          teamFilter={selector.teamFilter}
          setTeamFilter={setTeamFilter}
        />
      )}
      {pagePath === namePlayerCompare && (
        <PlayerFilterModal
          playerModal={filters.compareModal}
          fetchLeagueFilter={fetchLeagueFilter}
          leagueFilter={selector.leagueFilter}
          seasonFilter={selector.seasonFilter}
          teamFilter={selector.teamFilter}
          setTeamFilter={setTeamFilter}
          playerFilter={selector.playerFilter}
          setPlayerFilter={setPlayerFilter}
        />
      )}
      <FilterWrapper>
        <FilterHeader />
        {filters.filterMenuState && (
          <>
            {Number(filters.tab) >= 0 && (
              <SelectedFilter
                pagePath={pagePath}
                nameSolo={nameSolo}
                nameTeam={nameTeam}
                nameVideo={nameVideo}
              />
            )}
            <FilterGroup>
              <FilterItem
                title={t("label.league")}
                isHaveFilter={selector.leagueFilter.length > 0 ? true : false}
                multiFilter={selector.leagueFilter?.map((league, idx) => {
                  return (
                    <MultiSelectCb
                      idx={idx}
                      filterData={filters.league}
                      mapData={league}
                      pngPath={`ico-league-${league.toLowerCase()}`}
                      clickEvent={() => {
                        dispatch(League(league));
                      }}
                    />
                  );
                })}
              />
              <FilterItem
                title={t("label.year")}
                isHaveFilter={selector.yearFilter.length > 0 ? true : false}
                multiFilter={selector.yearFilter?.map((year, idx) => {
                  return (
                    <MultiSelectCb
                      idx={idx}
                      filterData={filters.year}
                      mapData={year}
                      clickEvent={() => {
                        dispatch(Year(year));
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
