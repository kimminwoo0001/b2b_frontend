import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Patch,
  League,
  Team,
  ConvertedLeague,
  Player,
  ResetFilter,
  Position,
  ResetPlayer,
  ResetChampion,
  HandleTab,
  ResetFilter2,
  PatchFull,
  Season,
  Year,
} from "../../redux/modules/filtervalue";
import axios from "axios";
import styled, { css } from "styled-components";
import { API } from "../../Pages/config";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
import qs from "qs";

function Filter() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const [leagueFilter, setLeagueFilter] = useState();
  const [teamFilter, setTeamFilter] = useState();
  const [playerFilter, setPlayerFilter] = useState();
  const { t } = useTranslation();

  const LeagueLCK = "lck";
  const LeagueLEC = "lec";
  const LeagueLCS = "lcs";
  const LeagueLPL = "lpl";
  const Msi = "21msi";
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
      if (el === Msi) {
        convertData.push("MSI");
      } else if (el === LeagueLCS) {
        convertData.push("LCS");
      } else if (el === LeagueLEC) {
        convertData.push("LEC");
      } else if (el === LeagueLCK) {
        convertData.push("LCK");
      } else if (el === LeagueLPL && pagePath.includes(nameLeague, nameTeam)) {
        convertData.push("LPL");
      }
    });
    setLeagueFilter(convertData.sort());
  };

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
                : "21msi",
        // patch: filters.patch,
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
  const fetchingTeamFilter = async () => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/team`,
      params: {
        league: filters.league,
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

  //플레이어 필터 fetch 함수
  const fetchingPlayerFilter = async () => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/player`,
      params: {
        league: filters.league,
        patch: filters.patch,
        team: filters.team,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });

    setPlayerFilter(Object.values(result.data));
  };

  const handlePlayer = () => {
    if (filters.team !== "팀 선택하기") {
    }
  };

  const deleteFilter = (data, action, filename = "none") => {
    filename += ".csv";
    var BOM = "\uFEFF";
    var csvString = BOM;
    var table = document.getElementById("pickTable");

    for (var rowCnt = 0; rowCnt < table.rows.length; rowCnt++) {
      var rowData = table.rows[rowCnt].cells;
      for (var colCnt = 0; colCnt < rowData.length; colCnt++) {
        var columnData = rowData[colCnt].innerText;
        if (columnData == null || columnData.length === 0) {
          columnData = "".replace(/"/g, '""');
        }
        else {
          columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
        }
        csvString = csvString + '"' + columnData + '",';
      }
      csvString = csvString.substring(0, csvString.length - 1);
      csvString = csvString + "\r\n";
    }
    csvString = csvString.substring(0, csvString.length - 1);

    // IE 10, 11, Edge Run
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {

      var blob = new Blob([decodeURIComponent(csvString)], {
        type: 'text/csv;charset=utf8'
      });

      window.navigator.msSaveOrOpenBlob(blob, filename);

    } else if (window.Blob && window.URL) {
      // HTML5 Blob
      var blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
      var csvUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      a.setAttribute('href', csvUrl);
      a.setAttribute('download', filename);
      document.body.appendChild(a);

      a.click()
      a.remove();
    } else {
      // Data URI
      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
      var blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
      var csvUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', csvData);
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click()
      a.remove();
    }
  }

  const menus = [
    {
      name: t("sidebar.part1"),
      path: "/",
      image: "/Images/sidebar_newLogo/ico-home.png",
    },
    {
      name: t("sidebar.part2"),
      path: "/league",
      image: "/Images/sidebar_newLogo/ico-league.png",
    },
    {
      name: t("sidebar.part3"),
      path: "/team",
      image: "/Images/sidebar_newLogo/ico-team.png",
    },
    {
      name: t("sidebar.part4"),
      path: "/metaAnalysis",
      image: "/Images/sidebar_newLogo/ico-meta.png",
    },
    {
      name: t("sidebar.part5"),
      path: "/solo",
      image: "/Images/sidebar_newLogo/ico-player.png",
    },
    {
      name: t("sidebar.part6"),
      path: "/video",
      image: "/Images/sidebar_newLogo/ico-movie.png",
    },
    {
      name: t("sidebar.part7"),
      path: "/matchAnalysis",
      image: "/Images/sidebar_newLogo/ico-match.png",
    },
    {
      name: t("sidebar.part8"),
      path: "/teamCompare",
      image: "/Images/sidebar_newLogo/ico-teamcom.png",
    },
    {
      name: t("sidebar.part9"),
      path: "/playerCompare",
      image: "/Images/sidebar_newLogo/ico-playercom.png",
    },
    {
      name: t("sidebar.part10"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png",
    },
    {
      name: t("sidebar.part11"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png",
    },
  ];

  // 페이지 오픈 시, 리그 데이터를 받아오도록 추가.
  useEffect(() => {
    fetchLeagueFilter();
  }, []);

  useEffect(() => {
    fetchingTeamFilter();
  }, [filters.patch]);

  useEffect(() => {
    fetchingPlayerFilter();
  }, [filters.team]);

  useEffect(() => {
    if (filters.convertleague === "LCK") {
      dispatch(League(LeagueLCK));
    } else if (filters.convertleague === "LEC") {
      dispatch(League(LeagueLEC));
    } else if (filters.convertleague === "LCS") {
      dispatch(League(LeagueLCS));
    } else if (filters.convertleague === "MSI") {
      dispatch(League(Msi));
    } else if (filters.convertleague === "LPL") {
      dispatch(League(LeagueLPL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.league]);




  return (
    <FilterWrapper>
      <FilterHeader>
        {/*<img src="Images/ico-filter.png" alt="filterIcon"></img>*/}
        <div className="header">
          {lang === 'kr' ? <label>{menus[filters.menu_num].name}</label>
            : <label style={{ fontSize: '33px' }}>{menus[filters.menu_num].name}</label>}
        </div>
        <div className="description">
          {t("filters.description")}
        </div>
      </FilterHeader>
      <SelectedFilter>
        <SelectedArea>
          <header><label>{t("label.league")}</label></header>
          <section>
            {filters.league.length > 0 && filters.league?.map((data, idx) => {
              return <SelectedData key={idx}>
                <img
                  className="deleteIcon"
                  width="18px"
                  height="18px"
                  src={`Images/ic_close_wh_18.png`}
                  alt="delete icon"
                  onClick={() =>
                    deleteFilter(data, "linkedIn_" + idx)
                  }
                />
                <span id={"linkedIn_" + idx}>
                  &nbsp;{data}
                </span>

              </SelectedData>
            })}
          </section>
        </SelectedArea>
        <SelectedArea>
          <header><label>{t("label.year")}</label></header>
          <section>
            {filters.year.length > 0 && filters.year?.map((data, idx) => {
              return <SelectedData key={idx}>{data}</SelectedData>
            })}
          </section>
        </SelectedArea>
        <SelectedArea>
          <header><label>{t("label.season")}</label></header>
          <section>
            {filters.season.length > 0 && filters.season?.map((data, idx) => {
              return <SelectedData key={idx}>{data}</SelectedData>
            })}
          </section>
        </SelectedArea>
        {[nameSolo, nameTeam, nameVideo].includes(pagePath) && <SelectedArea>
          <header><label>{t("label.team")}</label></header>
          <section>
            {filters.patch.length > 0 && filters.team?.map((data, idx) => {
              return <SelectedData key={idx}>{data}</SelectedData>
            })}
          </section>
        </SelectedArea>}
        {pagePath === nameSolo && <SelectedArea>
          <header><label>{t("label.player")}</label></header>
          <section>
            {filters.player.length > 0 && <SelectedData>{filters.player}</SelectedData>}
          </section>
        </SelectedArea>}
        <SelectedArea>
          <header><label>{t("label.patchVersion")}</label></header>
          <section>
            {console.log(filters.patch)}
            {filters.patch.length > 0 && filters.patch?.map((data, idx) => {
              return <SelectedData key={idx}>{data}</SelectedData>
            })}
          </section>
        </SelectedArea>
      </SelectedFilter>
      <Filters>
        {/* 리그 dropdown */}
        <label>{t("label.league")}</label>
        <DropDownToggle className="container">
          <div className="menu-container">
            <ul>
              {leagueFilter?.map((league, idx) => {
                return (
                  <Selected
                    key={idx}
                    isChecked={
                      filters.league?.includes(league) ? true : false
                    }
                    onClick={() => {
                      dispatch(League(league));
                      //dispatch(ConvertedLeague(league));
                      //dispatch(ResetFilter(league));
                      setIsActiveLeague(!isActiveLeague);
                      fetchingPatchFilter(league);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        filters.league?.includes(league) ? true : false
                      }
                      readOnly
                    />
                    <img
                      className="ChampIconImg"
                      width="14px"
                      height="14px"
                      src={`Images/ico-league-${league.toLowerCase()}.png`}
                      alt="champIcon"
                    />
                    &nbsp;{league}
                  </Selected>
                );
              })}
            </ul>
          </div>
        </DropDownToggle>
      </Filters>
      <Filters>
        <label>{t("label.year")}</label>
        {filters.year?.map((year, idx) => {
          return (
            // 리그가 선택되었을때 보여주는 체크박스와 패치 리스트
            <Selected
              key={idx}
              isChecked={filters.patch.includes(year) ? true : false}
              onClick={() => dispatch(Year(year))}
            >
              <input
                checked={filters.patch.includes(year) ? true : false}
                type="checkbox"
                readOnly
              ></input>
              <div className="Version">{year}</div>
            </Selected>
          );
        })}
      </Filters>
      <Filters>
        <label>{t("label.season")}</label>
        {filters.season?.map((season, idx) => {
          return (
            // 리그가 선택되었을때 보여주는 체크박스와 패치 리스트
            <Selected
              key={idx}
              isChecked={filters.patch.includes(season) ? true : false}
              onClick={() => dispatch(Season(season))}
            >
              <input
                checked={filters.patch.includes(season) ? true : false}
                type="checkbox"
                readOnly
              ></input>
              <div className="Version">{season}</div>
            </Selected>
          );
        })}
      </Filters>
      {[nameSolo, nameTeam, nameVideo].includes(pagePath) &&
        <Filters>
          <label>Team</label>
          <div className="menu-container">
            <ul>
              {teamFilter?.map((team, idx) => {
                return (
                  <Selected
                    key={idx}
                    isChecked={
                      filters.team?.includes(team) ? true : false
                    }
                    onClick={() => {
                      handlePlayer();
                      dispatch(Team(team));
                      setIsActiveTeam(!isActiveTeam);
                      dispatch(ResetPlayer());
                      [nameTeam, nameVideo].includes(pagePath) && dispatch(HandleTab(0));
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        filters.team?.includes(team) ? true : false
                      }
                      readOnly
                    />
                    <img
                      className="ChampIconImg"
                      width="14px"
                      height="14px"
                      src={`Images/TeamLogo/${team}.png`}
                      alt="champIcon"
                    />
                    &nbsp; {team}
                  </Selected>
                );
              })}
            </ul>
          </div>
        </Filters>
      }
      {pagePath === nameSolo &&
        <Filters>
          <label>Player</label>
          <DropDownToggle className="container">
            <div className="menu-container">
              <ul>
                {playerFilter?.map((player, idx) => {
                  return (
                    <div className="Wrapper" key={idx}>
                      <img
                        className="ChampIconImg"
                        width="14px"
                        height="14px"
                        src={`Images/ico-position-${player.position}.png`}
                        alt="champIcon"
                      />
                      <li
                        className={filters.player === player.name ? "selected" : "nonSelected"}
                        onClick={() => {
                          dispatch(Player(player.name));
                          dispatch(Position(player.position));
                          dispatch(ResetChampion());
                          dispatch(ResetFilter2());
                          setIsActivePlayer(!isActivePlayer);
                          dispatch(HandleTab(0));
                        }}
                      >
                        {player.name}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </DropDownToggle>
        </Filters>
      }
      <Filters>
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
              <Selected
                key={idx}
                isChecked={filters.patch.includes(patch) ? true : false}
                onClick={() => {
                  //callbackFunc(patch);
                  dispatch(Patch(patch));
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
              </Selected>
            );
          })
        )}
      </Filters>
    </FilterWrapper >
  );
}

export default Filter;

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
  width: 331px;
  position: sticky;
  top: 0;
  bottom: 0;
  padding: 50px 41px 61px 40px;
  background-color: #23212A;
  // border-right: 1px solid #484655;
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
/*
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
`;*/

const FilterHeader = styled.div`
  width: 250px;
  font-family: NotoSansKR;
  color: #fff;
  .header {
    height: 70px;
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.88;
    letter-spacing: normal;
    text-align: left;
  }
  .description {
    // height: 47px;
    //margin: 20px 0 0;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
`;

const SelectedFilter = styled.div`
  width: 271px;
  margin: 0 0 41px;
  padding: 0 0 47px;
`;

const SelectedArea = styled.div`
width: 271px;
margin: 10px 0;
header label {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}
`;

const SelectedData = styled.div`
  display: inline-block;
  height: 42px;
  margin: 5px 10px 0 0;
  padding: 11px 20px;
  border-radius: 16px;
  background-color: #5942ba;
  color: #fff;
  img {
    cursor: pointer;
    object-fit: contain;
  }
`;

const FilterBody = styled.div`
  width: 250px;
  margin: 20px 0 20px;
  padding: 20px 7px 20px 30px;
  border-radius: 33px;
  background-color: #2f2d38;
  align-items: center;
  justify-content: center;

 

`;


const LeagueFilter = styled.div`
  //height: 61px;
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
  //align-items: center;
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

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
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

const Selected = styled.div`
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
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4.5px 12px;
  width: 110px;
  height: 25px;
  border-radius: 30px;
  background-color: rgb(72, 70, 85);
  margin-bottom: 6px;

  > img  {
    cursor: pointer;
    :hover {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -ms-transform: scale(1.1);
      -o-transform: scale(1.1);
    }
  } */
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
    //justify-content: center;
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
    color: rgb(255, 255, 255);
    :hover, .selected {
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
