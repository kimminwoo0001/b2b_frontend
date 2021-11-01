import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  Patch,
  InitailizeState,
  League,
  Team,
  OppTeam,
  ConvertedLeague,
  Player,
  OppPlayer,
  GetOppPlayer,
  HandleTab,
  Position,
  ResetFilter,
  PatchFull,
  MenuNum,
  SetLeague,
  Season,
  CompareModal
} from "../../redux/modules/filtervalue";
import { API } from "../../Pages/config";

import { useDetectOutsideClick } from "../../Pages/PlayerCompare/useDetectOustsideClick";


function PlayerFilterModal({ playerModal, setPlayerModal,
  fetchLeagueFilter, leagueFilter, seasonFilter,
  teamFilter, setTeamFilter, playerFilter, setPlayerFilter }) {
  // sidebar 선수 비교 눌렀을때 뜨는 모달창
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  //필터 상태값
  const [oppTeamFilter, setOppTeamFilter] = useState();
  const [oppPlayerFilter, setOppPlayerFilter] = useState();

  const [isActiveLeague, setIsActiveLeague] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  let history = useHistory();

  useEffect(() => {
    setOppTeamFilter();
    setOppPlayerFilter();
  }, [])

  useEffect(() => {
    if (filters.compareModal === false) {
      setOppTeamFilter();
      setOppPlayerFilter();
    }
  }, [filters.compareModal])

  // 확인하기 버튼 조건
  const handleConfirm = () => {
    if (filters.oppplayer) {
      //history.push("/playerCompare");
      dispatch(GetOppPlayer(filters.oppplayer));
      dispatch(HandleTab(1));
      dispatch(CompareModal(false));
    } else {
      alert(t("filters.noPlayer"));
    }
  };

  // opp 팀 필터 fetch 함수
  const fetchingOppTeamFilter = async (team) => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/oppteam`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: team,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });
    setOppTeamFilter(result.data.oppteam);
  };

  //플레이어 필터 fetch 함수
  const fetchingPlayerFilter = async (team) => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/player`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: team,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });
    setPlayerFilter(result.data);
  };

  //상대 선수 필터 fetch 함수
  const fetchingOppPlayerFilter = async (team) => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/oppplayer`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: team,
        position: filters.position,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });

    setOppPlayerFilter(result.data);
  };

  return (
    <>
      <BackScreen
        playerModal={playerModal}
      // onClick={() => setPlayerModal(false)}
      ></BackScreen>
      <PlayerModalWrapper playerModal={playerModal}>
        <FilterContainer>
          <FilterWrapper>
            <FilterHeader>
              <img src="Images/ico-filter.png" alt="filterIcon"></img>
              <label>Filter</label>
            </FilterHeader>
            <LeagueFilter>
              <label>League</label>
              <DropDownToggle className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActiveLeague(!isActiveLeague);
                      fetchLeagueFilter();
                    }}
                    className="menu-trigger"
                  >
                    <img
                      className="ChampIconImg"
                      width="14px"
                      height="14px"
                      src={
                        filters.league.length === 1
                          ? `Images/ico-league-${filters.league[0].toLowerCase()}.png`
                          : "Images/ico-filter-none.png"
                      }
                      alt="champIcon"
                    />
                    <span className="Label">
                      {filters.league.length === 1
                        ? filters.league
                        : t("filters.leagueLabel")}
                    </span>
                    <img
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
                      {leagueFilter?.map((league, idx) => {
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
                                setTeamFilter([]);
                                setOppTeamFilter([]);
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
            <PatchFilter>
              <label>Season</label>
              {seasonFilter.length === 0 ? (
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
                seasonFilter?.map((season, idx) => {
                  return (
                    <SelectedPatch
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
                      <div className="Version">
                        {season}
                      </div>
                    </SelectedPatch>
                  );
                })
              )}
            </PatchFilter>
            <PatchFilter>
              <label>Patch Version</label>
              {!filters.patchfilter ? (
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
                filters.patchfilter?.map((patch, idx) => {
                  return (
                    <SelectedPatch
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
                    </SelectedPatch>
                  );
                })
              )}
            </PatchFilter>
          </FilterWrapper>
          <TeamBox>
            <TeamFilterBox>
              <SelectTeam>
                <div className="SelectTitle">
                  {t("filters.playerCompareLabel1")}
                </div>
                <GetFilterData>
                  <ContentBox>
                    <div className="Nav">Team</div>
                    {teamFilter?.map((team, index) => {
                      return (
                        <MapTeams
                          key={index}
                          onClick={() => {
                            dispatch(Team(team));
                            dispatch(OppPlayer(""));
                            fetchingPlayerFilter(team);
                            setOppTeamFilter([]);
                            setOppPlayerFilter([]);
                          }}
                          currentTeam={filters.team === team}
                        >
                          <img
                            src={`Images/TeamLogo/${team}.png`}
                            alt="TeamLogo"
                          ></img>
                          <div className="TeamName">{team}</div>
                        </MapTeams>
                      );
                    })}
                  </ContentBox>
                  <ContentBox2>
                    <div className="Nav2">Player</div>
                    {playerFilter?.map((player, index) => {
                      return (
                        <MapTeams
                          key={index}
                          onClick={() => {
                            dispatch(OppPlayer(""));
                            dispatch(Player(player.name));
                            dispatch(Position(player.position));
                            dispatch(OppTeam([]));
                            //fetchingOppPlayerFilter(player);
                            fetchingOppTeamFilter(filters.team);
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
                  </ContentBox2>
                </GetFilterData>
              </SelectTeam>
              <SelectTeam>
                <div className="SelectTitle">
                  {t("filters.playerCompareLabel2")}
                </div>
                <GetFilterData>
                  <ContentBox>
                    <div className="Nav">Team</div>
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
                            src={`Images/TeamLogo/${team}.png`}
                            alt="TeamLogo"
                          ></img>
                          <div className="TeamName">{team}</div>
                        </MapTeams>
                      );
                    })}
                  </ContentBox>
                  <ContentBox2>
                    <div className="Nav2">Player</div>
                    {oppPlayerFilter?.map((player, index) => {
                      return (
                        <MapTeams
                          key={index}
                          onClick={() => dispatch(OppPlayer(player.name))}
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
                  </ContentBox2>
                </GetFilterData>
              </SelectTeam>
            </TeamFilterBox>
            <ButtonBox>
              <button
                className="Selected"
                onClick={() => {
                  handleConfirm();
                }}
              >
                {t("filters.confirm")}
              </button>
              <button
                className="Close"
                onClick={() => {
                  dispatch(InitailizeState());
                  dispatch(MenuNum(4));
                  dispatch(CompareModal(false));
                  history.push("/solo");
                  setTeamFilter([]);
                  setPlayerFilter([]);
                  setOppPlayerFilter([]);
                  setOppTeamFilter([]);
                }}
              >
                {t("filters.close")}
              </button>
            </ButtonBox>
          </TeamBox>
        </FilterContainer>
      </PlayerModalWrapper>
    </>
  );
}

export default PlayerFilterModal;

const FilterContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #484655;
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
  opacity: 1;
`;

const PlayerModalWrapper = styled.div`
  display: ${(props) => (props.playerModal ? "block" : "none")};
  width: 774px;
  min-height: 517px;
  background-color: #2f2d38;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 3;
  position: fixed;
  z-index: 3;
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
  width: 130px;

  background-color: #2f2d38;
  border-right: 1px solid #484655;
`;

const FilterHeader = styled.div`
  height: 49px;
  border-bottom: 1px solid #484655;
  img {
    margin-left: 9px;
    margin-top: 17px;
  }
  label {
    width: 24px;
    height: 15px;
    margin: 0 0 0px 6px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    line-height: 1.36;
    text-align: left;
    color: #84818e;
  }
`;

const SelectedPatch = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 12px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
      background-color: rgb(35, 34, 43);
    `}
  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
  }
  > input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 12px;
    height: 12px;

    background-clip: content-box;
    border: 1.5px solid rgb(72, 70, 85);
    border-radius: 2px;
    background-color: transparent;

    margin-right: 8px;

    &:checked {
      background-color: #f04545;
      border: #f04545;
      border-radius: 2px;
      background: url("/Images/check.svg") #f04545 no-repeat 2.5px 4px/5.5px
        4.5px;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
`;



const LeagueFilter = styled.div`
  height: 61px;
  border-bottom: 1px solid #484655;
  label {
    width: 35px;
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 11px;
    line-height: 1.36;
    text-align: left;
    color: #84818e;
  }
`;

const PatchFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 61px;
  border-bottom: 1px solid #484655;
  label {
    width: 120px;
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 11px;
    line-height: 1.36;
    text-align: left;
    color: #84818e;
  }
`;

const TeamFilterBox = styled.div`
  display: flex;
  min-height: 433px;
  border-bottom: 1px solid #484655;
`;

const SelectTeam = styled.div`
  width: 322px;
  height: 100%;
  :nth-child(1) {
    border-right: 1px solid #484655;
  }

  .SelectTitle {
    display: flex;
    align-items: center;
    padding: 0px 0 0 15px;
    height: 48px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    letter-spacing: -0.6px;
    text-align: left;
    color: #817e90;
  }
  .Nav {
    display: flex;
    align-items: center;
    height: 34px;
    width: 141px;
    padding: 0px 0 0px 15px;
    background-color: #23212a;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: #ffffff;
  }
  .Nav2 {
    display: flex;
    align-items: center;
    height: 34px;
    width: 179px;
    padding: 0px 0 0px 15px;
    background-color: #23212a;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: #ffffff;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 83px;
  .Selected {
    width: 122px;
    height: 36px;
    border-radius: 3px;
    background-color: #f04545;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #ffffff;
    margin-right: 20px;
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
    margin: 0 10px 0 15px;
  }
  .TeamName {
    width: 100%;
    font-family: Poppins;
    font-size: 12px;
    text-align: left;
    color: #84818e;
  }
  ${(props) =>
    props.currentTeam &&
    css`
      color: #ffffff;
      background-color: rgb(58, 55, 69);
    `}
`;

const GetFilterData = styled.div`
  display: flex;
`;

const ContentBox = styled.div`
  min-height: 385px;
  border-right: 1px solid #3a3745;
`;

const ContentBox2 = styled.div`
  min-height: 385px;
  border-right: 1px solid #3a3745;
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
    height: 25px;
    background-color: #2f2d38;
    font-size: 11px;
    width: 128px;
    color: white;
    outline: none;
    border: none;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
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
    font-size: 12px;
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
    right: 0;
    width: 128px;
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