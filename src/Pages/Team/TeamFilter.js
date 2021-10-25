import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Patch,
  League,
  Team,
  ConvertedLeague,
  ResetFilter,
  HandleTab,
  PatchFull,
  ResetFilter2,
} from "../../redux/modules/filtervalue";
import axios from "axios";
import styled, { css } from "styled-components";
import { API } from "../config";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "./useDetectOustsideClick";
import qs from "qs";
import checkSeason from "../../lib/checkSeason";

function TeamFilter() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [leagueFilter, setLeagueFilter] = useState();

  const { t } = useTranslation();
  const [teamFilter, setTeamFilter] = useState();
  const LeagueLCK = "lck";
  const LeagueLEC = "lec";
  const LeagueLCS = "lcs";
  const LeagueLPL = "lpl";
  const Msi = "21msi";
  const dropdownRef = useRef(null);
  const [isActiveLeague, setIsActiveLeague] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  const [isActiveTeam, setIsActiveTeam] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  // 리그 필터 fetch 해오는 함수
  const fetchLeagueFilter = async () => {
    const parsedMatchData = await axios.get(`${API}/api/filter/league`, {
      params: {
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });

    const convertData = [];
    parsedMatchData?.data?.league?.forEach((el) => {
      if (el === LeagueLCS) {
        convertData.push("LCS");
      } else if (el === LeagueLEC) {
        convertData.push("LEC");
      } else if (el === LeagueLCK) {
        convertData.push("LCK");
      } else if (el === LeagueLPL) {
        convertData.push("LPL");
      } else if (el === Msi) {
        convertData.push("MSI");
      }
    });
    setLeagueFilter(convertData.sort());
  };

  useEffect(() => {
    if (filters.convertleague === "LCK") {
      dispatch(League(LeagueLCK));
    } else if (filters.convertleague === "LEC") {
      dispatch(League(LeagueLEC));
    } else if (filters.convertleague === "LCS") {
      dispatch(League(LeagueLCS));
    } else if (filters.convertleague === "LPL") {
      dispatch(League(LeagueLPL));
    } else if (filters.convertleague === "MSI") {
      dispatch(League(Msi));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.league]);

  // 패치 필터 fetch 함수
  const fetchingPatchFilter = async (league) => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/patch`,
      params: {
        league:
          league === "LCK"
            ? "lck"
            : league === "LEC"
              ? "lec"
              : league === "LCS"
                ? "lcs"
                : league === "LPL"
                  ? "lpl"
                  : "21msi",
        // patch: filters.patch,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    dispatch(PatchFull(result.data.patch));
  };

  //팀 필터 fetch 함수
  const fetchingTeamFilter = async () => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/team`,
      params: {
        league: filters.league,
        year: filters.year,
        season: checkSeason(filters) ? filters.season?.map(season => season.substring(5)) : "",
        patch: filters.patch,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    setTeamFilter(result.data.team);
  };

  return (
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
                  filters.convertleague !== ""
                    ? `Images/ico-league-${filters.convertleague.toLowerCase()}.png`
                    : "Images/ico-filter-none.png"
                }
                alt="champIcon"
              />
              <span className="Label">
                {filters.convertleague !== ""
                  ? filters.convertleague
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
                  let link = document.location.href.substring(
                    document.location.href.lastIndexOf("/") + 1,
                    document.location.href.length
                  );
                  console.log(link);
                  if (!(league === "LPL" && link === "video")) {
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
                            dispatch(League(league));
                            //dispatch(ConvertedLeague(league));
                            //dispatch(ResetFilter(league));
                            setIsActiveLeague(!isActiveLeague);
                            fetchingPatchFilter(league);
                          }}
                          key={idx}
                        >
                          {league}
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </nav>
          </div>
        </DropDownToggle>
      </LeagueFilter>
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
                onClick={() => dispatch(Patch(patch))}
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
      <FilterTeam>
        <label>Team</label>
        <DropDownToggle className="container">
          <div className="menu-container">
            <button
              onClick={() => {
                setIsActiveTeam(!isActiveTeam);
                fetchingTeamFilter();
              }}
              className="menu-trigger"
            >
              <img
                className="ChampIconImg"
                width="14px"
                height="14px"
                src={
                  filters.team.length !== 0
                    ? `Images/TeamLogo/${filters.team}.png`
                    : "Images/ico-filter-none.png"
                }
                alt="champIcon"
              />
              <span className="Label">
                {filters.team.length !== 0
                  ? filters.team
                  : t("filters.teamLabel")}
              </span>
              <img
                className="ArrowIcon"
                src="Images/ico-filter-arrow.png"
                alt="arrowIcon"
              />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActiveTeam ? "active" : "inactive"}`}
            >
              <ul>
                {teamFilter?.map((team, idx) => {
                  return (
                    <div className="Wrapper" key={idx}>
                      <img
                        className="ChampIconImg"
                        width="14px"
                        height="14px"
                        src={`Images/TeamLogo/${team}.png`}
                        alt="champIcon"
                      />
                      <li
                        onClick={() => {
                          dispatch(Team(team));
                          dispatch(HandleTab(0));
                          setIsActiveTeam(!isActiveTeam);
                          dispatch(ResetFilter2());
                        }}
                      >
                        {team}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </nav>
          </div>
        </DropDownToggle>
      </FilterTeam>
    </FilterWrapper>
  );
}

export default TeamFilter;

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
  position: sticky;
  top: 0;
  bottom: 0;
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
const FilterTeam = styled.div`
  height: 61px;
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
    z-index: 1;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    width: 128px;
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
