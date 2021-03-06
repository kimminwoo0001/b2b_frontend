import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  HandleTab, Loading, MenuNum, Reset_Map
} from "../../redux/modules/filtervalue";
import {
  setLeagueFilter,
  setPatchFilter,
  setPlayerFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../redux/modules/selectorvalue";
import {
  CopyYear as Year,
  CopyPatch as Patch,
  CopyOppTeam as OppTeam,
  CopyGetOppTeam as GetOppTeam,
  CopySetLeague as SetLeague,
  CopySeason as Season,
  CopySetTeam as SetTeam,
  CopySetModalOppTeam as SetModalOppTeam,
  CopySetYear as SetYear,
  InitalCopy,
  CopySetSeason as SetSeason,
  CopyResetSeason as ResetSeason,
  CopyResetTeam as ResetTeam,
  CopySetPatch as SetPatch,
  CopyGetOppPlayer as GetOppPlayer,
  CopyOppPlayer as OppPlayer,
  CopySetPlayer as SetPlayer,
  CopyPosition as Position,
  CompareModal
} from "../../redux/modules/copyvalue";

import { API } from "../../Pages/config";
import { useDetectOutsideClick } from "../../Pages/PlayerCompare/useDetectOustsideClick";
import axiosRequest from "../../lib/axios/axiosRequest";
import { SetModalInfo, SetDesc, SetIsOpen } from "../../redux/modules/modalvalue";
import { goPlayerCompare, goPlayerReport } from "../../lib/pagePath";

function PlayerFilterModal() {
  // sidebar 선수 비교 눌렀을때 뜨는 모달창
  const filters = useSelector((state) => state.CopyReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const user = useSelector((state) => state.UserReducer);
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pagePath = document.location.pathname;

  const dropdownRef = useRef(null);
  //필터 상태값
  const [league, setLeague] = useState(filters.league);
  const [year, setYear] = useState(filters.year);
  const [season, setSeason] = useState(filters.season);
  const [prevTeam, setPrevTeam] = useState("");
  const [prevPlayer, setPrevPlayer] = useState("");
  const [oppTeamFilter, setOppTeamFilter] = useState();
  const [oppPlayerFilter, setOppPlayerFilter] = useState();

  const [isActiveLeague, setIsActiveLeague] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  let history = useHistory();

  useEffect(() => {
    // fetchYearFilter();
    setOppTeamFilter([]);
    setOppPlayerFilter([]);
    dispatch(OppPlayer(""));
    dispatch(OppTeam([]));
  }, []);


  useEffect(() => {
    if (filters.openFilterModal === goPlayerCompare && selector.yearFilter.length === 0) {
      fetchYearFilter();
    }
  }, [selector.yearFilter]);


  useEffect(() => {
    if (JSON.stringify(year) !== JSON.stringify(filters.year)) {
      if (filters.openFilterModal === goPlayerCompare) {
        dispatch(SetLeague([]));
        dispatch(SetSeason([]));
        fetchLeagueFilter();
        setYear(filters.year);
      } else {
        // fetchLeagueFilter();
        fetchSeasonFilter();
        setYear(filters.year)
      }
    } else {
      fetchSeasonFilter();
    }
  }, [filters.year])


  useEffect(() => {
    if (JSON.stringify(league) !== JSON.stringify(filters.league)) {
      fetchSeasonFilter();
      setLeague(filters.league);
    }
  }, [filters.league])

  useEffect(() => {
    if (JSON.stringify(season) !== JSON.stringify(filters.season)) {
      if (filters.year.length > 0) {
        fetchingTeamFilter();
        fetchingPatchFilter();
        setSeason(filters.season);
      }
    }
  }, [filters.season])


  useEffect(() => {
    if (filters.team.length > 0 && prevTeam !== filters.team) {
      setPrevTeam(filters.team);
      fetchingPlayerFilter();
    }
  }, [filters.team]);

  useEffect(() => {
    if (filters.player.length > 0) {
      setPrevPlayer(filters.player);
      fetchingOppTeamFilter();
    }
  }, [filters.player]);

  useEffect(() => {
    if (filters.oppteam.length > 0) {
      //fetchingOppPlayerFilter();
    }
  }, [filters.oppteam]);



  useEffect(() => {
    if (filters.openFilterModal !== goPlayerCompare) {
      fetchingOppTeamFilter();
      fetchingOppPlayerFilter();
    }
    setOppTeamFilter();
    setOppPlayerFilter();
  }, [filters.patch])



  // 리그가 바뀌면 연도, 시즌 필터 호출
  // useEffect(() => {
  //   if (JSON.stringify(league) !== JSON.stringify(filters.league)) {
  //     fetchYearFilter();
  //     // fetchSeasonFilter();
  //     setLeague(filters.league);
  //   }
  // }, [filters.league])


  // 시즌이 바뀌면 패치 필터 호출
  useEffect(() => {
    if (JSON.stringify(season) !== JSON.stringify(filters.season)) {
      if (filters.year.length > 0) {
        fetchingTeamFilter();
        fetchingPatchFilter();
        setSeason(filters.season);
      }
    } else {
      fetchingTeamFilter();
    }
  }, [filters.season])



  const fetchLeagueFilter = () => {
    let leagueList = [];
    leagueList = Object.keys(staticvalue.filterObjects).map(
      (key) =>
        filters.year.filter(x => Object.keys(staticvalue.filterObjects[key]).includes(
          x)) && key
    ).filter((key) => key !== "LPL");

    if (filters.year[0] === "2022") {
      leagueList = Object.keys(staticvalue.filterObjects).filter(
        (key) => key !== "MSI" && key !== "WC" && key !== "LPL"
      );
    }
    dispatch(setLeagueFilter(leagueList.sort()));
  };


  // const fetchYearFilter = () => {
  //   let yearList = [];
  //   // if (filters.league.length === 0) {
  //   //   dispatch(ResetYear());
  //   // }
  //   if (filters.league.length > 0) {
  //     for (let league of filters.league) {
  //       const ObjectKeys = Object.keys(staticvalue.filterObjects[league]);
  //       // const ObjectKeys = ["2021"];
  //       // yearList = yearList.concat(ObjectKeys);
  //       yearList = ObjectKeys;

  //     }
  //     // yearList = yearList
  //     //   .filter((item, pos) => yearList.indexOf(item) === pos)
  //     //   .sort()
  //     //   .reverse();
  //     dispatch(SetYear([yearList[0]])); // 리그 선택 시, 가장 최근 Year, Season을 자동 선택
  //   }
  //   // yearList.map(data => { console.log("yeartLiost", data) })

  //   dispatch(setYearFilter(yearList));

  // };



  const fetchYearFilter = () => {
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
      // console.log("sortedSeasonList", seasonList);

      let updateSeason = [];
      for (const season of filters.season) {
        if (seasonList.includes(season)) {
          updateSeason.push(season);
        }
        else {
          updateSeason = [seasonList[0]];
        }
      }
      dispatch(SetSeason(updateSeason));

      if (filters.season.length === 0) {
        dispatch(Season(seasonList[0])); // 리그 선택 시, 가장 최근 Year, Season을 자동 선택
      }
    } else {
      dispatch(ResetSeason());
    }
    dispatch(setSeasonFilter(seasonList));
    dispatch(SetSeason(seasonList));
  };

  const fetchingPatchFilter = () => {
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
  };

  const fetchingTeamFilter = () => {
    let teamList = [];
    if (filters.season.length !== 0) {
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

  // opp 팀 필터 fetch 함수
  const fetchingOppTeamFilter = () => {
    dispatch(Loading(true))
    let url = `${API}/lolapi/filter/oppteam`;
    let params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setOppTeamFilter(e);
        dispatch(Loading(false))
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false))
      }
    );
  };

  //플레이어 필터 fetch 함수
  const fetchingPlayerFilter = () => {
    dispatch(Loading(true))
    let url = `${API}/lolapi/filter/player`;
    let params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        dispatch(setPlayerFilter(e));
        dispatch(Loading(false))
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false))
      }
    );
  };

  //상대 선수 필터 fetch 함수
  const fetchingOppPlayerFilter = (team) => {
    dispatch(Loading(true))
    let url = `${API}/lolapi/filter/oppplayer`;
    let params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      // team: filters.oppteam,
      team: team,
      position: filters.position,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setOppPlayerFilter(e);
        dispatch(Loading(false))
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false))
      }
    );
  };

  // 확인하기 버튼 조건
  const handleConfirm = () => {
    if (filters.oppplayer) {
      history.push(filters.openFilterModal)
      dispatch(Reset_Map(filters))
      dispatch(InitalCopy())
      dispatch(GetOppPlayer(filters.oppplayer));
      dispatch(MenuNum(8))
      dispatch(HandleTab(1));
      dispatch(CompareModal(false));
      dispatch(OppTeam(filters.oppteam))
      dispatch(OppPlayer(filters.oppplayer))
      dispatch(SetDesc(""));
      dispatch(SetIsOpen(false));
    } else {
      alert(t("filters.noPlayer"));
    }
  };


  const reFetchingFilter = (name) => {
    if (name === "player") {
      if (filters.player === prevPlayer) {
        fetchingOppTeamFilter();
      }
    }
  };

  return (
    <>
      <BackScreen
        playerModal={filters.compareModal}
      // onClick={() => setPlayerModal(false)}
      ></BackScreen>
      <PlayerModalWrapper playerModal={filters.compareModal}>
        <ModalNav>
          <label>{t("filters.chooseOptionLabel")}</label>
          <img
            src="Images/ic_close_bk_30.png"
            alt="closeBtn"
            className="Close"
            onClick={() => {
              // dispatch(InitailizeState());
              // dispatch(MenuNum(4));
              dispatch(CompareModal(false));
              dispatch(InitalCopy());
              dispatch(SetDesc(""));
              dispatch(SetIsOpen(false));
            }}
          />
        </ModalNav>
        <FilterContainer>
          <FilterWrapper>
            <FilterHeader>
              <label>{t("filters.setFilter")}</label>
            </FilterHeader>
            {filters.openFilterModal !== goPlayerCompare &&
              <>
                <LeagueFilter>
                  <label>{t("filters.setLeague")}</label>
                  <DropDownToggle>
                    <div className="menu-container">
                      <button
                        onClick={() => {
                          if (filters.openFilterModal === goPlayerCompare) {
                            setIsActiveLeague(!isActiveLeague)
                            fetchLeagueFilter()
                          }
                        }}
                        disabled={filters.openFilterModal === goPlayerReport}
                        className="menu-trigger"
                      >
                        <div className="wrapper">
                          {/* <img
                        className="ChampIconImg"
                        width="14px"
                        height="14px"
                        src={
                          filters.league.length === 1
                            ? `Images/ico-league-${filters.league[0].toLowerCase()}.png`
                            : "Images/ico-filter-none.png"
                        }
                        alt="champIcon"
                      /> */}
                          <span className="Label">
                            {filters.league.length === 1
                              ? filters.league
                              : t("filters.leagueLabel")}
                          </span>
                        </div>
                        <ArrowIcon page={filters.openFilterModal}
                          className="ArrowIcon"
                          src="Images/ico-filter-arrow.png"
                          alt="arrowIcon"
                        />
                      </button>
                      <nav
                        ref={dropdownRef}
                        className={`menu ${isActiveLeague ? "active" : "inactive"}`}
                      >
                        <ul>
                          {selector.leagueFilter?.map((league, idx) => {
                            return (
                              <div className="Wrapper" key={idx}>
                                <img
                                  className="ChampIconImg"
                                  width="14px"
                                  height="14px"
                                  src={`Images/ico-league-${league.toLowerCase()}.png`}
                                  alt="champIcon"
                                />
                                <li
                                  onClick={() => {
                                    dispatch(SetLeague([league]));
                                    setIsActiveLeague(!isActiveLeague);
                                    //dispatch(ResetFilter(league));
                                    //fetchingPatchFilter(league);
                                    league !== filters.league[0] &&
                                      dispatch(setTeamFilter([]));
                                    league !== filters.league[0] &&
                                      setOppTeamFilter([]);
                                    dispatch(setPlayerFilter([]));
                                    setOppPlayerFilter([]);
                                  }}
                                  key={idx}
                                >
                                  {league}
                                </li>
                              </div>
                            );
                          })}
                        </ul>
                      </nav>
                    </div>
                  </DropDownToggle>
                </LeagueFilter>
                {filters.openFilterModal !== goPlayerCompare ? "" :
                  <YearFilter>
                    <label>{t("filters.setYear")}</label>
                    {!selector.yearFilter ? (
                      <PatchLabels>
                        <img
                          className="ChampIconImg"
                          width="14px"
                          height="14px"
                          src={
                            filters.year !== ""
                              ? `Images/ico-filter-version.png`
                              : "Images/ico-filter-none.png"
                          }
                          alt="champIcon"
                        />
                        <span className="Label">{t("filters.patchLabel")}</span>
                      </PatchLabels>
                    ) : (
                      selector.yearFilter?.map((year, idx) => {
                        return (
                          <SelectedYear
                            radioBtn={true}
                            key={idx}
                            // draggable="true"
                            // onDragStart={(event) => {
                            //   handleMouseEvent(event);
                            // }}
                            // onMouseUp={(event) => {
                            //   handleMouseEvent(event);
                            // }}
                            isChecked={filters.year.includes(year) ? true : false}
                            onClick={() => {
                              // dispatch(Patch(patch));
                              // dispatch(Year(year))
                              dispatch(SetYear([year]));
                              //fetchingTeamFilter(patch);
                            }}
                          >
                            <input
                              id={idx}
                              checked={filters.year.includes(year) ? true : false}
                              type="checkbox"
                              readOnly
                            ></input>
                            <div className="Version">
                              {/* {patch === "11.6" ? "11.6 (P.O)" : patch} */}
                              {year}
                            </div>
                          </SelectedYear>
                        );
                      })
                    )
                    }
                  </YearFilter>
                }
              </>
            }
            {filters.openFilterModal === goPlayerCompare &&

              <>
                <ModalYearFilter>
                  <label>{t("filters.setYear")}</label>
                  {!selector.yearFilter ? (
                    <PatchLabels>
                      <img
                        className="ChampIconImg"
                        width="14px"
                        height="14px"
                        src={
                          filters.year !== ""
                            ? `Images/ico-filter-version.png`
                            : "Images/ico-filter-none.png"
                        }
                        alt="champIcon"
                      />
                      <span className="Label">{t("filters.patchLabel")}</span>
                    </PatchLabels>
                  ) : (
                    selector.yearFilter?.map((year, idx) => {
                      return (
                        <SelectedYear
                          radioBtn={true}
                          key={idx}
                          // draggable="true"
                          // onDragStart={(event) => {
                          //   handleMouseEvent(event);
                          // }}
                          // onMouseUp={(event) => {
                          //   handleMouseEvent(event);
                          // }}
                          isChecked={filters.year.includes(year) ? true : false}
                          onClick={() => {
                            // dispatch(Patch(patch));
                            // dispatch(Year(year))
                            dispatch(SetYear([year]));
                            //fetchingTeamFilter(patch);
                          }}
                        >
                          <input
                            id={idx}
                            checked={filters.year.includes(year) ? true : false}
                            type="checkbox"
                            readOnly
                          ></input>
                          <div className="Version">
                            {/* {patch === "11.6" ? "11.6 (P.O)" : patch} */}
                            {year}
                          </div>
                        </SelectedYear>
                      );
                    })
                  )
                  }
                </ModalYearFilter>
                <ModalLeagueFilter>
                  <label>{t("filters.setLeague")}</label>
                  <DropDownToggle>
                    <div className="menu-container">
                      <button
                        onClick={() => {
                          if (filters.openFilterModal === goPlayerCompare) {
                            setIsActiveLeague(!isActiveLeague)
                            fetchLeagueFilter()
                          }
                        }}
                        disabled={filters.openFilterModal === goPlayerReport}
                        className="menu-trigger"
                      >
                        <div className="wrapper">
                          {/* <img
                        className="ChampIconImg"
                        width="14px"
                        height="14px"
                        src={
                          filters.league.length === 1
                            ? `Images/ico-league-${filters.league[0].toLowerCase()}.png`
                            : "Images/ico-filter-none.png"
                        }
                        alt="champIcon"
                      /> */}
                          <span className="Label">
                            {filters.league.length === 1
                              ? filters.league
                              : t("filters.leagueLabel")}
                          </span>
                        </div>
                        <ArrowIcon page={filters.openFilterModal}
                          className="ArrowIcon"
                          src="Images/ico-filter-arrow.png"
                          alt="arrowIcon"
                        />
                      </button>
                      <nav
                        ref={dropdownRef}
                        className={`menu ${isActiveLeague ? "active" : "inactive"}`}
                      >
                        <ul>
                          {selector.leagueFilter?.map((league, idx) => {
                            return (
                              <div className="Wrapper" key={idx}>
                                <img
                                  className="ChampIconImg"
                                  width="14px"
                                  height="14px"
                                  src={`Images/ico-league-${league.toLowerCase()}.png`}
                                  alt="champIcon"
                                />
                                <li
                                  onClick={() => {
                                    dispatch(SetLeague([league]));
                                    setIsActiveLeague(!isActiveLeague);
                                    //dispatch(ResetFilter(league));
                                    //fetchingPatchFilter(league);
                                    league !== filters.league[0] &&
                                      dispatch(setTeamFilter([]));
                                    league !== filters.league[0] &&
                                      setOppTeamFilter([]);
                                    dispatch(setPlayerFilter([]));
                                    setOppPlayerFilter([]);
                                  }}
                                  key={idx}
                                >
                                  {league}
                                </li>
                              </div>
                            );
                          })}
                        </ul>
                      </nav>
                    </div>
                  </DropDownToggle>
                </ModalLeagueFilter>

              </>
            }
            <PatchFilter path={filters.openFilterModal}>
              <label>{t("filters.setSeason")}</label>
              {
                <>
                  {selector.seasonFilter?.map((season, idx) => {
                    return (
                      <SelectedPatchReal
                        key={idx}
                        isChecked={filters.season.includes(season) ? true : false}
                        onClick={() => {
                          dispatch(Season(season));
                        }}
                      >
                        <input
                          id={idx}
                          checked={filters.season.includes(season) ? true : false}
                          type="checkbox"
                          readOnly
                        ></input>
                        <div className="Version">{season}</div>
                      </SelectedPatchReal>
                    );
                  })}
                </>
              }
            </PatchFilter>
            <PatchFilter path={filters.openFilterModal}>
              <label>{t("filters.setPatchVersion")}</label>
              {!selector.patchFilter ? (
                <PatchLabels>
                  <img
                    className="ChampIconImg"
                    width="14px"
                    height="14px"
                    src={
                      filters.patch !== ""
                        ? `Images/ico-filter-version.png`
                        : "Images/ico-filter-none.png"
                    }
                    alt="champIcon"
                  />
                  <span className="Label">{t("filters.patchLabel")}</span>
                </PatchLabels>
              ) : (
                selector.patchFilter?.map((patch, idx) => {
                  return (
                    <SelectedPatchReal
                      key={idx}
                      isChecked={filters.patch.includes(patch) ? true : false}
                      onClick={() => {
                        dispatch(Patch(patch));
                        //fetchingTeamFilter(patch);
                      }}
                    >
                      <input
                        id={idx}
                        checked={filters.patch.includes(patch) ? true : false}
                        type="checkbox"
                        readOnly
                      ></input>
                      <div className="Version">
                        {patch === "11.6" ? "11.6 (P.O)" : patch}
                      </div>
                    </SelectedPatchReal>
                  );
                })
              )}
            </PatchFilter>
          </FilterWrapper>
          <TeamBox>
            <TeamFilterBox>
              <SelectTeam isFilterSelected={filters.league.length > 0}>
                <div className="SelectTitle">
                  {filters.openFilterModal === goPlayerReport ?
                    t("filters.playerCompareLabel1") :
                    t("filters.playerCompareLabel")
                  }
                </div>
                <GetFilterData>
                  <MyTeamBox isFilterSelected={filters.league.length > 0}>
                    <div className="Nav">{t("filters.team")}</div>
                    {filters.openFilterModal === goPlayerReport ?
                      <MapTeams>
                        <img
                          src={
                            filters.team.slice(-2) === ".C"
                              ? `Images/LCK_CL_LOGO/${filters.team}.png`
                              : `Images/TeamLogo/${filters.team}.png`
                          }
                          alt="TeamLogo"
                        ></img>
                        <div className="TeamName">{filters.team}</div>
                      </MapTeams> :
                      <>
                        {selector.teamFilter?.map((team, index) => {
                          return (
                            <MapTeams
                              key={index}
                              onClick={() => {
                                dispatch(SetTeam(team));
                                dispatch(OppTeam([]));
                                dispatch(OppPlayer(""));
                                setOppTeamFilter([]);
                                setOppPlayerFilter([]);
                              }}
                              currentTeam={filters.team === team}
                            >
                              <img
                                src={
                                  team.slice(-2) === ".C"
                                    ? `Images/LCK_CL_LOGO/${team}.png`
                                    : `Images/TeamLogo/${team}.png`
                                }
                                alt="TeamLogo"
                              ></img>
                              <div className="TeamName">{team}</div>
                            </MapTeams>
                          );
                        })}
                      </>
                    }
                  </MyTeamBox>
                  <MyPlayerBox
                    isMyTeamSelected={filters.team !== ""}
                    isFilterSelected={filters.league.length > 0}
                  >
                    <div className="Nav2">{t("filters.player")}</div>
                    {filters.openFilterModal === goPlayerReport ?
                      <MapTeams>
                        <img
                          src={`Images/ico-position-${filters.position}.png`}
                          alt="TeamLogo"
                        ></img>
                        <div className="TeamName">{filters.player}</div>
                      </MapTeams>
                      :

                      <>
                        {selector.playerFilter?.map((player, index) => {
                          return (
                            <MapTeams
                              key={index}
                              onClick={() => {
                                dispatch(SetPlayer(player.name));
                                dispatch(Position(player.position));
                                dispatch(OppPlayer(""));
                                dispatch(OppTeam([]));
                                //fetchingOppPlayerFilter(player);
                                //reFetchingFilter("player");
                                setOppPlayerFilter([]);
                              }}
                              currentTeam={filters.player === player.name}
                            >
                              <img
                                src={`Images/ico-position-${player.position}.png`}
                                alt="TeamLogo"
                              ></img>
                              <div className="TeamName">{player.name}</div>
                            </MapTeams>
                          );
                        })}
                      </>
                    }
                  </MyPlayerBox>
                </GetFilterData>
              </SelectTeam>
              <SelectOppTeam
                isFilterSelected={filters.league.length > 0}
                isMyPlayerSelected={filters.player !== ""}
              >
                <div className="SelectTitle">
                  {t("filters.playerCompareLabel2")}
                </div>
                <GetFilterData>
                  <OppTeamBox
                    isMyPlayerSelected={filters.player !== ""}
                    isFilterSelected={filters.league.length > 0}
                  >
                    <div className="Nav">{t("filters.team")}</div>
                    {oppTeamFilter?.map((team, index) => {
                      return (
                        <MapTeams
                          key={index}
                          onClick={() => {
                            dispatch(OppTeam(team));
                            dispatch(OppPlayer(""));
                            fetchingOppPlayerFilter(team);
                          }}
                          currentTeam={filters.oppteam === team}

                        >
                          <img
                            src={
                              team.slice(-2) === ".C"
                                ? `Images/LCK_CL_LOGO/${team}.png`
                                : `Images/TeamLogo/${team}.png`
                            }
                            alt="TeamLogo"
                          ></img>
                          <div className="TeamName">{team}</div>
                        </MapTeams>
                      );
                    })}
                  </OppTeamBox>
                  <OppPlayerBox
                    isOppTeamSelected={(filters.oppteam.length > 0) && filters.player !== ""}
                    isFilterSelected={filters.league.length > 0}
                  >
                    <div className="Nav2">{t("filters.player")}</div>
                    {oppPlayerFilter?.map((player, index) => {
                      return (
                        <MapTeams
                          key={index}
                          onClick={() =>
                            dispatch(OppPlayer(player.name))
                            //dispatch(SetModalOppplayer(player.name))
                          }
                          // currentTeam={filters.oppplayer === player.name}
                          currentTeam={filters.oppplayer === player.name}
                        >
                          <img
                            src={`Images/ico-position-${player.position}.png`}
                            alt="TeamLogo"
                          ></img>
                          <div className="TeamName">{player.name}</div>
                        </MapTeams>
                      );
                    })}
                  </OppPlayerBox>
                </GetFilterData>
              </SelectOppTeam>
            </TeamFilterBox>
          </TeamBox>
        </FilterContainer>
        <ButtonBox isOppPlayerSelected={filters.oppplayer !== ""}>
          <button
            className="Selected"
            onClick={() => {
              handleConfirm();
            }}
          >
            {t("filters.confirm")}
          </button>
        </ButtonBox>
      </PlayerModalWrapper>
    </>
  );
}

export default PlayerFilterModal;

const FilterContainer = styled.div`
  display: flex;
  padding-top: 20px;
  padding-left: 15px;
`;

const BackScreen = styled.div`
  display: ${(props) => (props.playerModal ? "block" : "none")};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 3;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.9;
`;

const PlayerModalWrapper = styled.div`
  display: ${(props) => (props.playerModal ? "block" : "none")};
  width: 706px;
  min-height: 720px;
  background-color: #23212a;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 3;
  position: fixed;
  z-index: 3;
  border-radius: 20px;
`;

const ModalNav = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 5px 0 10px;
  border-bottom: 1px solid #433f4e;
  label {
    text-align: center;
    width: 100%;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
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

const FilterWrapper = styled.div`
  width: 260px;
  background-color: #23212a;
  padding-top: 15px;
`;

const FilterHeader = styled.div`
  /* margin-left: 10px; */
  label {
    /* width: 24px; */
    height: 15px;
    margin: 0 0 0px 6px;
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    line-height: 1.36;
    text-align: left;
    color: #fff;
  }
`;

const SelectedPatch = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 4.5px 12px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
      /* background-color: rgb(35, 34, 43); */
    `}
  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.55px;
    text-align: left;
  }

  > .Version1 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.55px;
    text-align: left;
    color: #fff;
    margin-bottom: 5px;

  
  }
  > input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 15px;
    height: 15px;
    background-clip: content-box;
    border: 1.5px solid rgb(72, 70, 85);
    border-radius: 2px;
    background-color: transparent;
    margin-right: 8px;

    &:checked {
      background-color: #f04545;
      border: #f04545;
      border-radius: 2px;
      /* background: url("/Images/check.svg") #f04545 no-repeat 2.5px 4px/5.5px
        4.5px; */
      background: url("/Images/btn_check_on.png") no-repeat;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
`;

const SelectedPatchReal = styled.div`
display: flex;
  align-items: center;
  padding: 4.5px 6px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
    `}
  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.55px;
    text-align: left;
  }


  > input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 15px;
    height: 15px;
    background-clip: content-box;
    border: 1.5px solid rgb(72, 70, 85);
    border-radius: 2px;
    background-color: transparent;
    margin-right: 8px;

    &:checked {
      background-color: #5942ba;
      border: #5942ba;
      border-radius: 2px;
      /* background: url("/Images/btn_check_on.svg") #f04545 no-repeat 2.5px 4px/5.5px
        4.5px; */
      background: url("/Images/btn_check_on.png") no-repeat;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
`


const LeagueFilter = styled.div`
  width: 240px;
  height: 67px;
  margin: 15px 15px 10px 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #2f2d38;

  label {
    /* width: 35px; */
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 14px;
    line-height: 1.36;
    text-align: left;
    color: #fff;
  }
`;

const ModalLeagueFilter = styled.div`
  width: 240px;
  height: 67px;
  margin: 0 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #2f2d38;

  label {
    /* width: 35px; */
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 14px;
    line-height: 1.36;
    text-align: left;
    color: #fff;
  }
`;


const PatchFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #2f2d38;
  border-radius: 10px;
  margin: 10px 5px;
  padding: 5px 10px;
  max-height:  ${props => props.path === goPlayerReport ? "240px" : "155px"};
  width: 240px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }

  label {
    /* width: 120px; */
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 14px;
    line-height: 1.36;
    text-align: left;
    color: #fff;
  }
`;


const YearFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #2f2d38;
  border-radius: 10px;
  margin: 0 5px;
  padding: 5px 10px;
  max-height: 112px;
  width: 240px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }

  label {
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7px 0 5px 7px;
    font-size: 14px;
    line-height: 1.36;
    text-align: left;
    color: #fff;
  }
`;



const ModalYearFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #2f2d38;
  border-radius: 10px;
  margin: 15px 15px 10px 5px;
  padding: 5px 10px;
  max-height: 112px;
  width: 240px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }

  label {
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7px 0 5px 7px;
    font-size: 14px;
    line-height: 1.36;
    text-align: left;
    color: #fff;
  }
`;

const SelectedYear = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 6px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
    `}
  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.55px;
    text-align: left;
  }


  > input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 24px;
    height: 24px;
    /* background-clip: content-box;
    border: 1.5px solid rgb(72, 70, 85);
    border-radius: 2px;
    background-color: transparent;
    margin-right: 8px; */

    
    background-clip: content-box;
    background: ${(props) =>
    props.radioBtn
      ? `url("/Images/btn_radio_off.svg")`
      : `url("/Images/btn_check_off.svg")`}
      no-repeat;
    margin-right: 8px;

    &:checked {
      background-color: #5942ba;
      border: #5942ba;
      border-radius: 2px;
      background: ${(props) =>
    props.radioBtn
      ? `url("/Images/btn_radio_on.svg")`
      : `url("/Images/btn_check_on.svg")`}
        no-repeat;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
`

const TeamFilterBox = styled.div`
  display: flex;
`;

const SelectTeam = styled.div`
  width: 203px;
  height: 100%;
  margin: 0 5px;

  .SelectTitle {
    display: flex;
    align-items: center;
    height: 48px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    width: 100%;
    letter-spacing: -0.6px;
    text-align: left;
    color: #fff;
    opacity: ${(props) => (props.isFilterSelected ? "1" : "0.3")};
  }
  .Nav {
    color: #ffffff;
    margin-bottom: 5px;
  }
  .Nav2 {
    color: #ffffff;
    margin-bottom: 5px;
  }
`;

const SelectOppTeam = styled.div`
  width: 203px;
  height: 100%;
  margin: 0 5px;

  .SelectTitle {
    display: flex;
    align-items: center;
    height: 48px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    width: 100%;
    letter-spacing: -0.6px;
    text-align: left;
    color: #fff;
    opacity: ${(props) =>
    props.isFilterSelected && props.isMyPlayerSelected ? "1" : "0.3"};
  }
  .Nav {
    color: #ffffff;
    margin-bottom: 5px;
  }
  .Nav2 {
    color: #ffffff;
    margin-bottom: 5px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 83px;
  width:696px;
  position: absolute;
  bottom: 10px;
  left:5px;
  .Selected {
    width: 100%;
    height: 60px;
    border-radius: 20px;
    background-color: ${(props) =>
    props.isOppPlayerSelected ? "#5942ba" : "#484655"};
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #ffffff;
    margin: 0 20px;
  }
  .Close {
    width: 122px;
    height: 36px;
    border-radius: 3px;
    background-color: #6b6979;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #ffffff;
  }
`;

const MapTeams = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0 10px 0 7px;
  }
  .TeamName {
    width: 100%;
    font-family: Poppins;
    font-size: 15px;
    text-align: left;
    color: #fff;
    ${(props) =>
    props.currentTeam &&
    css`
        color: #ffffff;
      `}
  }
  ${(props) =>
    props.currentTeam &&
    css`
      background-color: #16151c;
      border-radius: 20px;
    `}
`;

const GetFilterData = styled.div`
  /* display: flex; */
`;

const MyTeamBox = styled.div`
  width: 193px;
  height: 245px;
  background-color: #2f2d38;
  margin-right: 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 15px;
  font-size: 14px;
  opacity: ${(props) => (props.isFilterSelected ? "1" : "0.3")};

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }
`;

const MyPlayerBox = styled.div`
  width: 193px;
  height: 245px;
  /* max-height: 218px; */
  /* border-right: 1px solid #3a3745; */
  background-color: #2f2d38;
  margin-right: 15px;
  border-radius: 20px;
  padding: 15px;
  font-size: 14px;
  opacity: ${(props) =>
    props.isFilterSelected && props.isMyTeamSelected ? "1" : "0.3"};

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }
`;

const OppTeamBox = styled.div`
  width: 193px;
  height: 245px;
  background-color: #2f2d38;
  margin-right: 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 15px;
  font-size: 14px;
  opacity: ${(props) =>
    props.isFilterSelected && props.isMyPlayerSelected ? "1" : "0.3"};

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }
`;

const OppPlayerBox = styled.div`
  width: 193px;
  height: 245px;
  background-color: #2f2d38;
  margin-right: 15px;
  border-radius: 20px;
  padding: 15px;
  font-size: 14px;
  opacity: ${(props) =>
    props.isFilterSelected && props.isOppTeamSelected ? "1" : "0.3"};

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }
`;









const DropDownToggle = styled.div`
  margin: 0;
  padding: 0;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  .menu-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    background-color: #2f2d38;
    font-size: 13px;
    width: 240px;
    color: white;
    outline: none;
    border: none;


    .wrapper {
      display: flex;
    }
  }

  .SelectedLabel {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 180px;
    margin-left: 20px;
  }

  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 80px;
  }

  .Wrapper {
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    :hover {
      background-color: rgb(60, 58, 72);
    }
    img {
      margin: 0 5px 0 15px;
    }
  }

  .ChampIconImg {
    margin: 0 8px 0 4px;
  }

  .menu {
    background: rgb(47, 45, 56);
    position: absolute;
    top: 28px;
    left: 0;
    width: 230px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    z-index: 10;
  }

  .menu.active {
    opacity: 1;

    visibility: visible;
    transform: translateY(0);
    z-index: 10;
    overflow-y: auto;
    max-height: 300px;
    &::-webkit-scrollbar {
      width: 4px;
      height: 10px;

      border-radius: 3px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(67, 63, 78);
      border-radius: 3px;
    }
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 10;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    width: 128px;
    display: block;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: rgb(255, 255, 255);
    cursor: pointer;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }
`;

const ArrowIcon = styled.img`
      visibility: ${(props) => props.page === goPlayerReport ? "hidden" : "visible"}

`

