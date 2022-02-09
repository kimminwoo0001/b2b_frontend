import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import qs from "qs";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../config";
import axios from "axios";
import Tippy from "@tippy.js/react";
import StatsTooltip from "./StatsTooltip";
import { useTranslation } from "react-i18next";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import {
  Champion,
  Champion_Eng,
  Opp_Champion,
  Opp_Champion_Eng,
  ResetChampion,
  ResetChampion2,
  ResetOppChampion,
  Loading,
} from "../../../redux/modules/filtervalue";
import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

function Stats() {
  //능력치 탭
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const [lineStat, setLineStat] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState();
  const [statData, setStatData] = useState();
  const [champFilter, setChampFilter] = useState();
  const [champEng, setChampEng] = useState();
  const [oppFilter, setOppFilter] = useState();
  const [oppEng, setOppEng] = useState();
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [oppData, setOppData] = useState();

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const [isActiveOpp, setIsActiveOpp] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  const [isAllFetchDone, setIsAllFetchDone] = useState(false);


  useEffect(() => {
    if (filters.oppplayer === "") {
      return;
    }
    GetComparisonStat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.oppplayer,
    filters.player,
    filters.patch,
    filters.resetchamp,
    lang,
  ]);

  //팀 필터 fetch 함수
  const GetComparisonStat = () => {
    // setLoading(true);
    dispatch(Loading(true));
    console.log("시작", loading);
    const url = `${API}/lolapi/player/comparisonStat`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      player: filters.player,
      oppteam: filters.oppteam,
      oppplayer: filters.oppplayer,
      champion: filters.champion_eng,
      oppchampion: filters.oppchampion_eng,
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setData(e?.player);
        setOppData(e?.oppPlayer);
        //라인전 능력치 비교 그래프 데이터 가공
        const playerFilteredData = e?.player.LineStat?.filter((line) =>
          line.value !== "NULL"
        )
        const lineData = playerFilteredData.map((line) => {
          return {
            x1: line.percent.toFixed(1),
            y: lang === "ko" ? line.name : line.eng,
            value1: line.value.toFixed(1),
            league: line.avg.toFixed(1),
          };
        });

        const oppplayerFilteredData = e?.oppPlayer.LineStat?.filter((line) =>
          line.value !== "NULL"
        )
        const lineData2 = oppplayerFilteredData.map((line) => {
          return {
            x2: line.percent.toFixed(1),
            y: lang === "ko" ? line.name : line.eng,
            value2: line.value.toFixed(1),
            league: line.avg.toFixed(1),
          };
        });
        for (let i = 0; i < lineData.length; i++) {
          Object.assign(lineData[i], lineData2[i]);

          setLineStat(lineData);
        }
        console.log(Object.values(lineData));
        //교전 능력치 비교 그래프 데이터 가공

        const playerMatchData = e?.player.MatchStat?.filter((match) => match.value !== "NULL");
        const matchData = playerMatchData.map((match) => {
          return {
            x1: match.percent.toFixed(1),
            y: lang === "ko" ? match.name : match.eng,
            value1: match.value.toFixed(1),
            league: match.avg.toFixed(1),
          };
        });

        const oppplayerMatchData = e?.oppPlayer.MatchStat?.filter((match) => match.value !== "NULL");
        const matchData2 = oppplayerMatchData.map(
          (match) => {
            return {
              x2: match.percent.toFixed(1),
              y: lang === "ko" ? match.name : match.eng,
              value2: match.value.toFixed(1),
              league: match.avg.toFixed(1),
            };
          }
        );
        for (let i = 0; i < matchData.length; i++) {
          Object.assign(matchData[i], matchData2[i]);
          setMatch(matchData);
        }

        if (e === null || e === undefined) {
          return 0;
        } else {
          // setLineStat(Object.values(response?.data.player.LineStat));
          // setOppLineStat(Object.values(response?.data.oppPlayer.LineStat));
          // setMatch(Object.values(response?.data.player.MatchStat));
          // setOppMatch(Object.values(response?.data.oppPlayer.MatchStat));
          setStatData(Object.values(e?.tendencyStat));
        }
        // setLoading(false);
        dispatch(Loading(false));
        setIsAllFetchDone(true);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  //챔피언 필터
  const GetChampionFilter = () => {
    const url = `${API}/lolapi/filter/champion2`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      player: filters.player,
      oppplayer: filters.oppplayer,
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setChampFilter(e.champion);
        setChampEng(e.championEng);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  //상대 챔피언 필터
  const GetOppFilter = () => {
    const url = `${API}/lolapi/filter/oppchampion2`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      year: filters.year,
      patch: filters.patch,
      champion: filters.champion_eng,
      player: filters.player,
      oppplayer: filters.oppplayer,
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setOppFilter(e.champion);
        setOppEng(e.championEng);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  const renderColorfulLegendText = (value: string, entry: any) => {
    return <span style={{ color: "white", fontSize: "12px" }}>{value}</span>;
  };

  const GetTooltipLeague = (label) => {
    for (let i = 0; i < lineStat.length; i++) {
      if (label === lineStat[i].y) {
        return lineStat[i].league;
      }
    }
    for (let j = 0; j < match.length; j++) {
      if (label === match[j].y) {
        return match[j].league;
      }
    }
    return "";
  };

  const GetTooltipValue1 = (label) => {
    for (let i = 0; i < lineStat.length; i++) {
      if (label === lineStat[i].y) {
        return lineStat[i].value1;
      }
    }
    for (let j = 0; j < match.length; j++) {
      if (label === match[j].y) {
        return match[j].value1;
      }
    }
    return "";
  };

  const GetTooltipValue2 = (label) => {
    for (let i = 0; i < lineStat.length; i++) {
      if (label === lineStat[i].y) {
        return lineStat[i].value2;
      }
    }
    for (let j = 0; j < match.length; j++) {
      if (label === match[j].y) {
        return match[j].value2;
      }
    }
    return "";
  };

  //능력치 그래프 툴팁 커스텀
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTool className="custom-tooltip">
          <div className="title">{label}</div>
          <div className="player">
            <div className="player1">{`${payload[0].name} : `}</div>
            <div className="value">{GetTooltipValue1(label)}</div>
          </div>
          <div className="player">
            <div className="player2">{`${payload[1].name} : `}</div>
            <div className="value">{GetTooltipValue2(label)}</div>
          </div>
          <div className="league">
            <div className="league1">{`${t(
              "solo.comparison.toolLeague"
            )} :`}</div>
            <div className="value">{GetTooltipLeague(label)}</div>
          </div>
        </CustomTool>
      );
    }

    return null;
  };

  if (!isAllFetchDone) return <></>;

  return (
    <StatWrapper>
      <PlayerCompareWrapper>
        <div className="RedSidePlayer">
          <img
            src={
              data?.playerInfo.Image
                ? `https://am-a.akamaihd.net/image?resize=90:&f=${data?.playerInfo.Image}`
                : "Images/player_error_image.png"
            }
            width="94px"
            height="74px"
            alt="PlayerIcon"
            onError={(e) => {
              e.target.src = "Images/player_error_image.png";
            }}
          />
        </div>
        <img
          className="PositionIcon"
          src={`Images/ico-position-${filters.position}.png`}
          width="28.6px"
          height="28.6px"
          alt="PositionIcon"
        />
        <div className="NameContainer">
          <span className="NickName">
            {lang === "ko"
              ? data?.playerInfo.NativeName.replace("&amp;nbsp;", " ")
              : data?.playerInfo.Name}
          </span>
          <span className="RealName">{data?.playerInfo.ID}</span>
        </div>
        <div className="AverageBox">
          <div className="PerformanceTitle">
            {t("solo.comparison.avgScore")}
          </div>
          <PerformanceValueAvg color={data?.sbrAvg < oppData?.sbrAvg}>
            {data?.sbrAvg.toFixed(1)}
          </PerformanceValueAvg>
        </div>
        <div className="AverageBoxTwo">
          <div className="PerformanceTitle">
            {t("solo.comparison.bestScore")}
          </div>
          <PerformanceValueMax>{data?.sbrMax.toFixed(1)}</PerformanceValueMax>
        </div>
        <div className="Vs">VS</div>
        <div className="AverageBox">
          <div className="PerformanceTitle">
            {t("solo.comparison.avgScore")}
          </div>
          <PerformanceValueAvg color={data?.sbrAvg > oppData?.sbrAvg}>
            {oppData?.sbrAvg.toFixed(1)}
          </PerformanceValueAvg>
        </div>
        <div className="AverageBoxTwo">
          <div className="PerformanceTitle">
            {t("solo.comparison.bestScore")}
          </div>
          <PerformanceValueMax>
            {oppData?.sbrMax.toFixed(1)}
          </PerformanceValueMax>
        </div>
        <div className="NameContainerBlue">
          <span className="NickName">
            {lang === "ko"
              ? oppData?.playerInfo.NativeName.replace("&amp;nbsp;", " ")
              : oppData?.playerInfo.Name}
          </span>
          <span className="RealName">{oppData?.playerInfo.ID}</span>
        </div>
        <img
          className="PositionIcon"
          src={`Images/ico-position-${filters.position}.png`}
          alt="PositionIcon"
          width="28.6px"
          height="28.6px"
        />
        <div className="BlueSidePlayer">
          <img
            src={
              oppData?.playerInfo.Image
                ? `https://am-a.akamaihd.net/image?resize=90:&f=${oppData?.playerInfo.Image}`
                : "Images/player_error_image.png"
            }
            width="94px"
            height="74px"
            alt="PlayerIcon"
            onError={(e) => {
              e.target.src = "Images/player_error_image.png";
            }}
          />
        </div>
      </PlayerCompareWrapper>
      <PlayerStatWrapper>
        <div className="records red">{`${data?.total}${t(
          "solo.comparison.total"
        )} ${data?.win}${t("solo.comparison.win")} ${data?.lose}${t(
          "solo.comparison.lose"
        )}`}</div>
        <span className="leftGradient"></span>
        <div className="soloRecord">{t("solo.comparison.statLabel")}</div>
        <span className="rightGradient"></span>
        <div className="records blue">{`${oppData?.total}${t(
          "solo.comparison.total"
        )} ${oppData?.win}${t("solo.comparison.win")} ${oppData?.lose}${t(
          "solo.comparison.lose"
        )}`}</div>
      </PlayerStatWrapper>
      <StatCompare>
        {/* <ChampionSettingNav>
          <SettingTitle>
            <span className="Title">{t("solo.comparison.champSetting")}</span>
            <img
              src="Images/ico-notice-gy.png"
              width="14px"
              height="14px"
              alt="noticeIcon"
            />
            <span className="Alert">{t("solo.comparison.settingLabel")}</span>
          </SettingTitle>
          <DropDownContainer>
            <div className="DropDown">
              <DropDown className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActive(!isActive);
                      GetChampionFilter();
                      dispatch(ResetOppChampion());
                    }}
                    className="menu-trigger"
                  >
                    <img
                      className="ChampIconImg"
                      src="Images/ico-champion-select.png"
                      alt="champIcon"
                    />
                    <span className="Label">
                      {t("solo.comparison.filtersLabel")}
                    </span>
                    <span className="SelectedLabel">
                      {filters.champion
                        ? filters.champion
                        : t("filters.allChampLabel")}
                    </span>
                    <img
                      className="ArrowIcon"
                      src="Images/ico-filter-arrow.png"
                      alt="arrowIcon"
                    />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      {(lang === "ko" ? champFilter : champEng)?.map(
                        (champion, idx) => {
                          return (
                            <li
                              onClick={() => {
                                dispatch(Champion(champion));
                                dispatch(Champion_Eng(champEng[idx]));
                              }}
                              key={idx}
                            >
                              {champion}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </nav>
                </div>
              </DropDown>
            </div>
            <div className="Vs">VS</div>
            <div className="DropDown">
              <DropDown className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActiveOpp(!isActiveOpp);
                      GetOppFilter();
                    }}
                    className="menu-trigger"
                  >
                    <img
                      className="ChampIconImg"
                      src="Images/ico-champion-select.png"
                      alt="champIcon"
                    />
                    <span className="Label">
                      {t("solo.comparison.filtersLabel2")}
                    </span>
                    <span className="SelectedLabel">
                      {filters.oppchampion
                        ? filters.oppchampion
                        : t("filters.allChampLabel")}
                    </span>
                    <img
                      className="ArrowIcon"
                      src="Images/ico-filter-arrow.png"
                      alt="arrowIcon"
                    />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActiveOpp ? "active" : "inactive"}`}
                  >
                    <ul>
                      {(lang === "ko" ? oppFilter : oppEng)?.map(
                        (champion, idx) => {
                          return (
                            <li
                              onClick={() => {
                                dispatch(Opp_Champion(champion));
                                dispatch(Opp_Champion_Eng(oppEng[idx]));
                                setIsActiveOpp(!isActiveOpp);
                              }}
                              key={idx}
                            >
                              {champion}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </nav>
                </div>
              </DropDown>
            </div>
            <button
              className="Select"
              onClick={() => {
                GetComparisonStat();
                dispatch(ResetChampion2(""));
              }}
            >
              {t("solo.comparison.apply")}
            </button>
            <button
              className="Reset"
              onClick={() => {
                dispatch(ResetChampion("reset"));
              }}
            >
              <img
                src="Images/ico-team-video-return-off.png"
                width="10px"
                height="10px"
                alt="resetICon"
              />
              <p>{t("solo.comparison.reset")}</p>
            </button>
          </DropDownContainer>
        </ChampionSettingNav> */}
        <CompareByStat>
          <SimpleCompare>
            {statData?.map((stat, idx) => {
              if (statData.length <= 3) {
                return (
                  <SimpleBox key={idx}>
                    <div className="SimpleTitle">
                      {lang === "ko" ? stat?.name : stat?.eng}
                    </div>
                    <div className="SimpleValues">
                      {stat?.data0 === "NULL" && stat?.data1 === "NULL" ?
                        <NoData>{t("league.leagueStat.noData2")}</NoData>
                        :
                        <>
                          <RedPlayer
                            changeColor={stat?.data1 < stat?.data0}
                          >{`${stat?.data0.toFixed(1)}`}</RedPlayer>
                          <img
                            src={
                              stat?.data1 > stat?.data0
                                ? "Images/ico-compare-right-arrow.png"
                                : "Images/ico-compare-left-arrow.png"
                            }
                            alt="arrowIcon"
                          />
                          <BluePlayer
                            changeColor={stat?.data1 > stat?.data0}
                          >{`${stat?.data1.toFixed(1)}`}</BluePlayer>
                        </>
                      }
                    </div>
                  </SimpleBox>
                );
              } else if (statData.length === 4) {
                return (
                  <SimpleBox4 key={idx}>
                    <div className="SimpleTitle">
                      {lang === "ko" ? stat?.name : stat?.eng}
                    </div>
                    <div className="SimpleValues">
                      {stat?.data0 === "NULL" && stat?.data1 === "NULL" ?
                        <NoData>{t("league.leagueStat.noData2")}</NoData>
                        :
                        <>
                      <RedPlayer
                        changeColor={stat?.data1 < stat?.data0}
                      >{`${stat?.data0.toFixed(1)}`}</RedPlayer>
                      <img
                        src={
                          stat?.data1 > stat?.data0
                            ? "Images/ico-compare-right-arrow.png"
                            : "Images/ico-compare-left-arrow.png"
                        }
                        alt="arrowIcon"
                      />
                      <BluePlayer
                        changeColor={stat?.data1 > stat?.data0}
                      >{`${stat?.data1.toFixed(1)}`}</BluePlayer>
                        </>
                      }
                    </div>
                  </SimpleBox4>
                );
              } else if (statData.length === 5) {
                return (
                  <SimpleBox5 key={idx}>
                    <div className="SimpleTitle">
                      {lang === "ko" ? stat?.name : stat?.eng}
                    </div>
                    <div className="SimpleValues">
                      {stat?.data0 === "NULL" && stat?.data1 === "NULL" ?
                        <NoData>{t("league.leagueStat.noData2")}</NoData>
                        :
                        <>
                      <RedPlayer
                        changeColor={stat?.data1 < stat?.data0}
                      >{`${stat?.data0.toFixed(1)}`}</RedPlayer>
                      <img
                        src={
                          stat?.data1 > stat?.data0
                            ? "Images/ico-compare-right-arrow.png"
                            : "Images/ico-compare-left-arrow.png"
                        }
                        alt="arrowIcon"
                      />
                      <BluePlayer
                        changeColor={stat?.data1 > stat?.data0}
                      >{`${stat?.data1.toFixed(1)}`}</BluePlayer>
                        </>
                      }
                    </div>
                  </SimpleBox5>
                );
              } else if (statData.length === 6) {
                return (
                  <SimpleBox6 key={idx}>
                    <div className="SimpleTitle">
                      {lang === "ko" ? stat?.name : stat?.eng}
                    </div>
                    <div className="SimpleValues">
                      {stat?.data0 === "NULL" && stat?.data1 === "NULL" ?
                        <NoData>{t("league.leagueStat.noData2")}</NoData>
                        :
                        <>
                      <RedPlayer
                        changeColor={stat?.data1 < stat?.data0}
                      >{`${stat?.data0.toFixed(1)}`}</RedPlayer>
                      <img
                        src={
                          stat?.data1 > stat?.data0
                            ? "Images/ico-compare-right-arrow.png"
                            : "Images/ico-compare-left-arrow.png"
                        }
                        alt="arrowIcon"
                      />
                      <BluePlayer
                        changeColor={stat?.data1 > stat?.data0}
                      >{`${stat?.data1.toFixed(1)}`}</BluePlayer>
                        </>
                      }
                    </div>
                  </SimpleBox6>
                );
              }
              return "";
            })}
          </SimpleCompare>
          <ComplexCompare>
            <ComplexBox>
              <ComplexTitle>
                <div className="title">{t("solo.comparison.laneGraph")}</div>
                <div className="legends">
                  <div className="redColorBox"></div>
                  <div className="playerName">{filters.player}</div>
                  <div className="blueColorBox"></div>
                  <div className="playerName">{filters.oppplayer}</div>
                </div>
                {/* <Tippy // options
                  duration={0}
                  delay={[300, 0]}
                  content={<StatsTooltip lineStat={lineStat} />}
                  placement="top"
                >
                  <img src="Images/ico-question-mark.png" alt="icon" />
                </Tippy> */}
              </ComplexTitle>
              <CompareByProgressBar>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout={"vertical"}
                    width={500}
                    height={300}
                    data={lineStat ? Object.values(lineStat) : 0}
                    margin={{
                      top: 25,
                      right: 21,
                      left: 60,
                      bottom: 23,
                    }}
                    backgroundColor={"red"}
                  >
                    <CartesianGrid
                      // strokeDasharray="4 4"
                      horizontal={false}
                      vertical={false}
                    // horizontalPoints={[40, 80, 120, 160, 200, 240]}
                    />
                    <XAxis
                      type={"number"}
                      orientation={"bottom"}
                      stroke="#4e4c5c"
                      domain={[-100, 100]}
                      tick={{ fill: "#84818e" }}
                      style={{
                        fontSize: "15px",
                      }}
                      unit={"%"}
                    />
                    <YAxis
                      dataKey="y"
                      type={"category"}
                      orientation={"left"}
                      stroke="#4e4c5c"
                      tick={{
                        fill: "#84818e",
                        fontSize: 15,
                        width: 105,
                      }}
                    />
                    <Tooltip
                      cursor={{ fill: "#23212a" }}
                      content={<CustomTooltip dataKey="value" />}
                      animationDuration={100}
                    />
                    {/* <Legend formatter={renderColorfulLegendText} /> */}
                    <ReferenceLine x={0} stroke="#4e4c5c" />
                    <Bar
                      dataKey="x1"
                      name={filters.player}
                      fill="#f04545"
                      barSize={8}
                    />
                    <Bar
                      dataKey="x2"
                      name={filters.oppplayer}
                      fill="#005489"
                      barSize={8}
                    >
                      <LabelList dataKey="name" position="left" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CompareByProgressBar>
            </ComplexBox>
            <ComplexBox>
              <ComplexTitle>
                <div className="title">{t("solo.comparison.teamGraph")}</div>
                <div className="legends">
                  <div className="redColorBox"></div>
                  <div className="playerName">{filters.player}</div>
                  <div className="blueColorBox"></div>
                  <div className="playerName">{filters.oppplayer}</div>
                </div>
                {/* <Tippy // options
                  duration={0}
                  delay={[300, 0]}
                  content={<StatsTooltip match={match} />}
                  placement="top"
                >
                  <img src="Images/ico-question-mark.png" alt="icon" />
                </Tippy> */}
              </ComplexTitle>

              <CompareByProgressBar>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout={"vertical"}
                    width={500}
                    height={300}
                    data={match ? Object.values(match) : 0}
                    margin={{
                      top: 25,
                      right: 21,
                      left: 60,
                      bottom: 23,
                    }}
                    backgroundColor={"red"}
                  >
                    <CartesianGrid
                      // strokeDasharray="4 4"
                      horizontal={false}
                      vertical={false}
                    // horizontalPoints={[25, 75, 125, 175, 225]}
                    />
                    <XAxis
                      domain={[0, 100]}
                      type={"number"}
                      orientation={"bottom"}
                      stroke="#4e4c5c"
                      tick={{ fill: "#84818e" }}
                      style={{
                        fontSize: "15px",
                      }}
                      unit={"%"}
                    />
                    <YAxis
                      dataKey="y"
                      type={"category"}
                      orientation={"left"}
                      stroke="#4e4c5c"
                      tick={{
                        fill: "#84818e",
                        fontSize: 15,
                        width: 105,
                      }}
                    />
                    <Tooltip
                      cursor={{ fill: "#23212a" }}
                      content={<CustomTooltip />}
                      animationDuration={100}
                    />
                    {/* <Legend formatter={renderColorfulLegendText} /> */}
                    <ReferenceLine x={0} stroke="#4e4c5c" />
                    <Bar
                      dataKey="x1"
                      name={filters.player}
                      fill="#f04545"
                      barSize={8}
                    />
                    <Bar
                      dataKey="x2"
                      name={filters.oppplayer}
                      fill="#005489"
                      barSize={8}
                    >
                      <LabelList dataKey="name" position="left" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CompareByProgressBar>
            </ComplexBox>
          </ComplexCompare>
        </CompareByStat>
      </StatCompare>
    </StatWrapper>
  );
}

export default Stats;

const CustomTool = styled.div`
  background-color: #1d1d1d;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  color: white;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  > div {
    margin-bottom: 6px;
    :last-child {
      margin-bottom: 0;
    }
  }

  > .title {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  > .player {
    font-size: 10px;

    display: flex;
    > .player1 {
      color: #f04545;
    }
    > .player2 {
      color: #009cff;
    }
    > .value {
      margin-left: 3px;
    }
  }
  > .league {
    font-size: 10px;

    display: flex;
    color: #84818e;
    > .value {
      margin-left: 3px;
      color: white;
    }
  }
`;

const PlayerStatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  background-color: #23212a;
  margin: 20px 0;
  border-radius: 16px;
  > .leftGradient {
    width: 49px;
    height: 26px;
    margin-left: 170px;
    /* background-image: linear-gradient(
      to left,
      rgb(38, 35, 45),
      rgb(22, 21, 26)
    ); */
  }
  > .rightGradient {
    width: 49px;
    height: 26px;
    margin-right: 170px;
    /* background-image: linear-gradient(
      to right,
      rgb(38, 35, 45),
      rgb(22, 21, 26)
    ); */
  }
  > .soloRecord {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 26px;
    background-color: rgb(38, 35, 45);
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.65px;
    color: #fff;
  }
  > .records {
    font-family: "Spoqa Han Sans";
    font-size: 16px;
    line-height: 32px;
    background-color: #23212a;
    /* font-weight: bold; */
    color: #fff;
  }

  /* > .red {
    color: #f04545;
  }

  > .blue {
    color: #0075bf;
  } */
`;

const PerformanceValueAvg = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  color: ${(props) => (props.color ? "#fff" : "#f04545")};
`;

const PerformanceValueMax = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-top: 10px;
`;

const PlayerCompareWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  width: 100%;
  border-radius: 20px;
  background-color: #23212a;
  background-image: url("Images/full-gradient.png");
  background-repeat: no-repeat;
  .RedSidePlayer {
    width: 105px;
    height: 77px;
  }
  .BlueSidePlayer {
    display: flex;
    justify-content: flex-end;
    width: 105px;
    height: 77px;
  }

  .NameContainer {
    display: flex;
    width: 140px;
    flex-direction: column;
    margin-left: 9.4px;
  }
  .NameContainerBlue {
    display: flex;
    width: 140px;
    flex-direction: column;
    margin-right: 9.4px;
    text-align: right;
  }
  .NickName {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    color: rgb(132, 129, 142);
    margin-bottom: 3px;
  }
  .RealName {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: rgb(255, 255, 255);
  }
  .PerformanceTitle {
    width: 150px;
    font-family: "Spoqa Han Sans";
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-bottom: 4.7px;
  }

  .AverageBox {
    width: 80px;
    :nth-child(7) {
      margin-right: 35px;
    }
  }
  .AverageBoxTwo {
    width: 80px;

    :nth-of-type(4) {
      margin-left: 35px;
    }
  }
  .Vs {
    font-family: "Spoqa Han Sans";
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    color: rgb(107, 105, 121);
    margin: 0 55px;
  }
`;

const StatWrapper = styled.div`
  /* height: calc(100vh - 215px); */
  /* margin-bottom: 22px; */
`;

const StatCompare = styled.div`
  width: 100%;
  border-radius: 20px;
  background-color: rgb(47, 45, 56);
`;

const ChampionSettingNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 115px;
  border-bottom: solid 1px rgb(58, 55, 69);
`;

const CompareByStat = styled.div`
  height: 100%;
  /* border: solid 1px rgb(58, 55, 69); */
  border-radius: 20px;
  background-color: #23212a;
  padding-bottom: 10px;
`;

const SettingTitle = styled.div`
  display: flex;
  align-items: center;
  .Title {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.65px;
    color: rgb(255, 255, 255);
    margin: 0 15px 0 23px;
  }
  .Alert {
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    color: rgb(132, 129, 142);
    margin-left: 4px;
  }
`;

const SimpleCompare = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ComplexCompare = styled.div`
  display: flex;
  margin-top: 22px;
  margin-left: 22px;
  margin-bottom: 22px;
`;

const SimpleBox = styled.div`
  width: 336px;
  height: 96px;
  margin: 22px 0 0 22px;
  background-color: #2f2d38;
  border-radius: 20px;
  img {
    /* margin: 0 27.4px 0 27.4px; */
  }
  .SimpleTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 43.5px;
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: #fff;

    border-bottom: 1px solid rgb(58, 55, 69);
  }
  .SimpleValues {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 51.5px;
    width: 100%;
    position: relative;
  }
`;
const RedPlayer = styled.div`
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: bold;
  color: rgb(132, 129, 142);
  width: 45%;
  text-align: center;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
    `}
`;

const BluePlayer = styled.div`
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: bold;
  color: rgb(132, 129, 142);
  text-align: center;
  width: 45%;
  ${(props) =>
    props.changeColor &&
    css`
      color: #0075bf;
    `}
`;

const SimpleBox4 = styled(SimpleBox)`
  width: 247px;
`;

const SimpleBox5 = styled(SimpleBox)`
  width: 193px;
`;

const SimpleBox6 = styled(SimpleBox)`
  width: 336px;
  flex-wrap: wrap;
`;

const ComplexBox = styled.div`
  width: 516px;
  margin-right: 22px;

  .ComplexHeader {
    height: 28px;
    display: flex;
    align-items: center;
    background-color: rgb(53, 50, 62);
  }
  .RedPlayer {
    width: 249px;
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: center;
    color: rgb(129, 126, 144);
    /* margin-left: 68px; */
  }
  .Vs {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    color: rgb(129, 126, 144);
    /* margin: 0 115px 0 115px; */
  }
  .BluePlayer {
    width: 249px;
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: center;
    color: rgb(129, 126, 144);
    /* margin-right: 68px; */
  }
`;

const ComplexTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(47, 45, 56);
  height: 42.5px;
  border-bottom: 1px solid rgb(58, 55, 69);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-family: "Spoqa Han Sans";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.6px;
  text-align: left;
  color: #fff;
  padding: 0px 15px;

  .legends {
    display: flex;
    align-items: center;
    width: auto;

    .redColorBox {
      width: 12px;
      height: 12px;
      background-color: #f04545;
      margin-right: 5px;
    }

    .playerName {
      margin-right: 5px;
      color: #817e90;
      font-size: 15px;
    }

    .blueColorBox {
      width: 12px;
      height: 12px;
      background-color: #0075bf;
      margin-right: 5px;
    }
  }
`;
const CompareByProgressBar = styled.div`
  width: 516px;
  height: 338px;
  background-color: #35323e;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
`;

// const PlayerData = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const OppData = styled.div`
//   display: flex;
//   margin-bottom: 24px;
//   :nth-child(1) {
//     margin-top: 7px;
//   }
// `;
// const WrapPlay = styled.div``;

// const ProgressBarContainer = styled.div`
//   display: flex;

//   .DisplayContent {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     width: 106px;
//     height: 22px;
//     background-color: rgb(47, 45, 56);
//     font-family: NotoSansKR, Apple SD Gothic Neo;;
//     font-size: 12px;
//     letter-spacing: -0.6px;
//     color: rgb(255, 255, 255);
//   }
// `;

const DropDownContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0 0 23px;

  .Vs {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    color: rgb(132, 129, 142);
    margin: 0 15px;
  }
  .Select {
    width: 84px;
    height: 40px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    color: rgb(255, 255, 255);
    margin: 0 10px;
  }
  .Reset {
    display: flex;
    align-items: center;
    width: 64px;
    height: 40px;
    border-radius: 3px;
    border: solid 1px #474554;
    background-color: #3a3745;
    font-family: "Spoqa Han Sans";
    font-size: 11px;
    letter-spacing: -0.55px;
    color: rgb(175, 173, 190);
    p {
      margin-left: 5px;
    }
  }
`;

const DropDown = styled.div`
  margin: 0;
  padding: 0;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Spoqa Han Sans";
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
    width: 421px;
    height: 40px;
    background-color: #23212a;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .SelectedLabel {
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 160px;
    margin-left: 20px;
  }

  .Label {
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin: 0 0px 0 11.4px;
    border-right: 1px solid rgb(72, 70, 85);
    width: 170px;
  }

  .ArrowIcon {
    /* position: fixed;
    margin-left: 390px; */
  }

  .ChampIconImg {
    /* position: fixed; */
    margin-left: 13.1px;
  }

  .menu {
    background: rgb(35, 33, 42);
    position: absolute;
    top: 40px;
    right: 0;
    width: 210px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    font-family: "Spoqa Han Sans";
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
const NoData = styled.div`
background-color: #2f2d38;
color: #fff;
width: auto;
white-space: nowrap;
font-size: 13px;
text-align: center;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);


`;