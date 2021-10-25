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
} from "../../redux/modules/filtervalue";
import axios from "axios";
import styled, { css } from "styled-components";
import { API } from "../../Pages/config";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
import qs from "qs";
import FilterHeader from "./FilterHeader";
import checkSeason from "../../lib/checkSeason";
import MultiSelectCb from "./MultiSelectCb";
import SelectedFilter from "./Selected/SelectedFilter";
import { gsap } from "gsap"; // 애니메이션 추가
import FilterItem from "./FilterItem";

const Filter = memo(() => {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const staticvalue = useSelector((state) => state.StaticValueReducer);

  const dispatch = useDispatch();
  const [leagueFilter, setLeagueFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [seasonFilter, setSeasonFilter] = useState([]);
  const [teamFilter, setTeamFilter] = useState([]);
  const [playerFilter, setPlayerFilter] = useState([]);
  const { t } = useTranslation();

  const nameLeague = '/league';
  const nameTeam = '/team';
  const nameSolo = '/solo';
  const nameVideo = '/video';
  const pagePath = document.location.pathname;

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
    fetchLeagueFilter();
  }, []);

  useEffect(() => {
    fetchYearFilter();
    fetchActiveFilter();
  }, [filters.league]);

  useEffect(() => {
    fetchSeasonFilter();
  }, [filters.year]);


  useEffect(() => {
    if (filters.year.length > 0) {
      if ([nameLeague].includes(pagePath)) {
        dispatch(HandleTab(1))
      } else {
        fetchingTeamFilter();
      }
      fetchingPatchFilter();
    }
    dispatch(ResetTeam())
  }, [filters.season]);

  useEffect(() => {
    if ([nameTeam, nameVideo].includes(pagePath)) {
      if (filters.team.length !== 0)
        dispatch(HandleTab(0));
    } else {
      fetchingPlayerFilter();
    }
  }, [filters.team]);

  useEffect(() => {
    console.log(filters.player);
  }, [filters.player]);


  useEffect(() => {
    console.log(filters.patch);
  }, [filters.patchfilter]);

  const fetchActiveFilter = () => {
    if (leagueFilter?.length > 0)
      fetchLeagueFilter();
    if (yearFilter?.length > 0)
      fetchYearFilter();
    if (seasonFilter?.length > 0)
      fetchSeasonFilter();
    if (teamFilter?.length > 0)
      fetchingTeamFilter();
    if (playerFilter?.length > 0)
      fetchingPlayerFilter();
    if (filters?.patchfilter > 0)
      fetchingPatchFilter();
  }

  // 리그 필터 fetch 해오는 함수
  const fetchLeagueFilter = () => {
    const leagueList = Object.keys(staticvalue.filterObjects);
    setLeagueFilter(leagueList.sort());
  };

  const fetchYearFilter = () => {
    let yearList = []
    if (filters.league.length === 0) {
      dispatch(ResetYear())
    } else if (filters.league.length > 0) {
      for (let league of filters.league) {
        const ObjectKeys = Object.keys(staticvalue.filterObjects[league]);
        yearList = yearList.concat(ObjectKeys);
      }
      yearList = yearList.filter((item, pos) => yearList.indexOf(item) === pos).sort().reverse();
      dispatch(Year(yearList[0]));
    }
    setYearFilter(yearList);
  };

  const fetchSeasonFilter = () => {
    let seasonList = []
    if (filters.year.length !== 0) {
      for (let league of filters.league) {
        for (let year of filters.year) {
          const ObjectKeys = Object.keys(staticvalue.filterObjects[league][year]);
          seasonList = seasonList.concat(ObjectKeys);
        }
      }
      seasonList = seasonList.filter((item, pos) => seasonList.indexOf(item) === pos).sort();
      if (filters.season.length === 0) {
        dispatch(Season(seasonList[0]));
      };
    } else {
      dispatch(ResetSeason())
    }
    setSeasonFilter(seasonList);
  };

  const fetchingTeamFilter = () => {
    let teamList = []
    if (filters.season.length !== 0 && [nameSolo, nameTeam, nameVideo].includes(pagePath)) {
      for (let league of filters.league) {
        for (let year of filters.year) {
          for (let season of filters.season) {
            if (staticvalue.filterObjects[league][year][season]) {
              const ObjectKeys = Object.keys(staticvalue.filterObjects[league][year][season]);
              teamList = teamList.concat(ObjectKeys);
            }
          }
        }
      }
      teamList = teamList.filter((item, pos) => teamList.indexOf(item) === pos).sort();
    } else {
      dispatch(ResetTeam())
    }
    setTeamFilter(teamList);
  };

  //플레이어 필터 fetch 함수
  const fetchingPlayerFilter = async () => {
    let players = [];
    if (filters.team.length !== 0 && [nameSolo, nameTeam, nameVideo].includes(pagePath)) {
      let playerList = []
      for (let league of filters.league) {
        for (let year of filters.year) {
          for (let season of filters.season) {
            if (staticvalue.filterObjects[league][year][season][filters.team]) {
              const ObjectKeys = Object.values(staticvalue.filterObjects[league][year][season][filters.team]);
              console.log("ObjectKeys", ObjectKeys);
              playerList = playerList.concat(ObjectKeys);
            }
          }
        }
      }
      playerList = playerList.filter((item, pos) => playerList.indexOf(item) === pos).sort();

      for (let i = 0; i < playerList.length; i++) {
        const name = playerList[i].split('#')[1];
        const position = playerList[i].split('#')[0];
        if (position === "1") {
          players[i] = {
            position: 'top',
            name: name
          };
        } else if (position === "2") {
          players[i] = {
            position: 'jng',
            name: name
          };
        } else if (position === "3") {
          players[i] = {
            position: 'mid',
            name: name
          };
        } else if (position === "4") {
          players[i] = {
            position: 'bot',
            name: name
          };
        } else if (position === "5") {
          players[i] = {
            position: 'sup',
            name: name
          };
        }
      }
    } else {
      dispatch(ResetPlayer())
    }
    setPlayerFilter(players);
  };

  // 패치 필터 fetch 함수
  const fetchingPatchFilter = async () => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/patch`,
      params: {
        league: filters.league,
        year: filters.year,
        season: checkSeason(filters) ? filters.season?.map(season => season.substring(5)) : "",
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    const patchResponse = result.data.patch;

    dispatch(PatchFull(patchResponse));
  };

  //팀 필터 fetch 함수
  return (
    <FilterWrapper className={filters.filterMenuState ? "" : "filter-close"}>
      <FilterHeader />
      {filters.filterMenuState && <>
        <SelectedFilter
          pagePath={pagePath} nameSolo={nameSolo}
          nameTeam={nameTeam} nameVideo={nameVideo}
        />
        <FilterGroup>
          <FilterItem
            title={t("label.league")}
            isHaveFilter={leagueFilter.length > 0 ? true : false}
            multiFilter={leagueFilter?.map((league, idx) => {
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
          <FilterItem title={t("label.year")}
            isHaveFilter={yearFilter.length > 0 ? true : false}
            multiFilter={yearFilter?.map((year, idx) => {
              return (
                <MultiSelectCb
                  idx={idx}
                  filterData={filters.year}
                  mapData={year}
                  clickEvent={() => {
                    dispatch(Year(year))
                  }}
                />
              );
            })}
          />

          <FilterItem title={t("label.season")}
            isHaveFilter={seasonFilter.length > 0 ? true : false}
            multiFilter={seasonFilter?.map((season, idx) => {
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

          {
            [nameSolo, nameTeam, nameVideo].includes(pagePath) &&
            <FilterItem title={t("label.team")}
              isHaveFilter={teamFilter.length > 0 ? true : false}
              multiFilter={teamFilter?.map((team, idx) => {
                return (
                  <MultiSelectCb
                    idx={idx}
                    filterData={filters.team}
                    mapData={team}
                    pngPath={`TeamLogo/${team}`}
                    clickEvent={() => {
                      dispatch(Team(team))
                    }}
                  />
                );
              })}
            />
          }
          {
            pagePath === nameSolo &&
            <FilterItem title={t("label.player")}
              isHaveFilter={playerFilter.length > 0 ? true : false}
              multiFilter={playerFilter?.map((player, idx) => {
                return (
                  <MultiSelectCb
                    idx={idx}
                    filterData={filters.player}
                    mapData={player.name}
                    pngPath={`ico-position-${player.position}`}
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
          }
          <FilterItem title={t("label.patchVersion")}
            isHaveFilter={filters.patchfilter.length > 0 ? true : false}
            multiFilter={filters.patchfilter?.map((patch, idx) => {
              return (
                <MultiSelectCb
                  idx={idx}
                  filterData={filters.patch}
                  mapData={patch}
                  clickEvent={() => {
                    dispatch(Patch(patch))
                  }}
                />
              );
            })}
          />
        </FilterGroup>
      </>}
    </FilterWrapper >
  );
})

export default Filter;


const FilterWrapper = styled.div`
  padding: 29px 24px 0px 6px;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  background-color: #23212a;

  .filter-close {
    display: none;
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

const Filters = styled.div`
  width: 250px;
  margin: 0 0 10px;
  padding: 20px;
  border-radius: 35px;
  background-color: #2f2d38;
`;

const PatchLabels = styled.div`
  display: flex;
  align-items: center;
  color: #84818e;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.55px;
  text-align: left;
  width: 100%;
  > img {
    margin: 0 8px 0 10px;
  }
`;