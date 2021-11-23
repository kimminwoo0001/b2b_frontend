import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import qs from "qs";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { Line } from "react-chartjs-2";
import Tippy from "@tippy.js/react";
import BoardToolTip from "./BoardToolTip";
import { useTranslation } from "react-i18next";
import { API } from "../../config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import {
  Champion,
  Champion_Eng,
  Opp_Champion,
  Opp_Champion_Eng,
  ResetChampion,
  ResetChampion2,
  ResetOppChampion,
} from "../../../redux/modules/filtervalue";
import axiosRequest from "../../../lib/axiosRequest";
import ExcelExport from "../../../Components/UtilityComponent/ExcelExport";

function PlayerBoard() {
  //선수 보고서 => 선수 상황판
  const filters = useSelector((state) => state.FilterReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [info, setInfo] = useState();
  const [carrer, setCarrer] = useState();
  const [summary, setSummary] = useState();
  const [champRecord, setChampRecord] = useState();
  const [leaguePlayerInfo, setLeaguePlayerInfo] = useState();
  const [leaguePlayerTotal, setLeaguePlayerTotal] = useState();
  const [userPlayerTotal, setUserPlayerTotal] = useState();
  const [sbr, setSbr] = useState();
  const [match, setMatch] = useState();
  const [season, setSeason] = useState();
  const [line, setLine] = useState();
  const [engage, setEngage] = useState();
  const [matchInfo, setMatchInfo] = useState();
  const [personality, setPersonality] = useState();
  const [graphDomain, setGraphDomain] = useState();
  const [champFilter, setChampFilter] = useState();
  const [champEng, setChampEng] = useState();
  const [oppFilter, setOppFilter] = useState();
  const [oppEng, setOppEng] = useState();
  const [isActiveOpp, setIsActiveOpp] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  useEffect(() => {
    GetPlayerBoardData();
    //GetPlayerSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.player, filters.resetchamp, filters.patch, lang]);

  //팀 필터 fetch 함수
  const GetPlayerBoardData = () => {
    setLoading(true);
    const url = `${API}/api/player/playerboard`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      player: filters.player,
      champion: filters.champion_eng,
      oppchampion: filters.oppchampion_eng,
      token: user.token,
      id: user.id,
    };

    axiosRequest(url, params, function (e) {
      const data = e.data;
      // var arrNumber = [0, 0, 0, 0, 0, 0, 0];

      // for (var i = 0; i < 7; i++) {
      //   arrNumber[i] = data.stats.lineStats[`val${i}`];
      // }

      setInfo(data.info);
      setCarrer(data.records.careerrecords);
      setChampRecord(Object.values(data.records.championrecords));
      // setLeaguePlayerInfo(Object.values(data.soloInfo.leaguePlayerInfo));
      // setLeaguePlayerTotal(Object.values(data.soloInfo.leaguePlayerTotal));
      // setUserPlayerTotal(Object.values(data.soloInfo.userPlayerTotal));
      setSbr(data.stats.sbrStats);
      setLine(Object.values(data.stats.lineStats));
      setEngage(Object.values(data.stats.engagementStats));
      setPersonality(Object.values(data.stats.personalityStats));
      setGraphDomain(data.trends);
      setMatchInfo(data.stats.matchStats);
      //match graph data conversion
      const matchX = [];
      const matchY = [];
      data.trends.matchtrends.forEach((match) => {
        matchX.push(match.sum);
        matchY.push(match.sbr.toFixed(1));
      });
      setMatch({ x: matchX, y: matchY });

      //SeasonTrends graph data
      const seasonX = [];
      const seasonY = [];
      data.trends.seasontrends.forEach((season) => {
        seasonX.push(season.season);
        seasonY.push(season.sbr.toFixed(1));
      });
      setSeason({ x: seasonX, y: seasonY });
      setLoading(false);
    });
  };

  //챔피언 필터
  const GetChampionFilter = () => {
    const url = `${API}/api/filter/champion`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      player: filters.player,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      const champArray = e.data.map((data) => `${data.kor}(${data.total}경기)`);
      const champArrayEng = e.data.map((data) => data.eng);

      // setChampFilter(e.data.champion);
      // setChampEng(e.data.championEng);
      setChampFilter(champArray);
      setChampEng(champArrayEng);
    });
  };

  //상대 챔피언 필터
  const GetOppFilter = () => {
    const url = `${API}/api/filter/oppchampion`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: filters.position,
      champion: filters.champion_eng,
      player: filters.player,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      const champArray = e.data.map((data) => `${data.kor}(${data.total}경기)`);
      const champArrayEng = e.data.map((data) => data.eng);

      setOppFilter(champArray);
      setOppEng(champArrayEng);
    });
  };

  // 그래프 세팅 값
  const MatchChart = {
    labels: match?.x,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: match?.y,
      },
    ],
  };

  const SeasonChart = {
    labels: season?.x,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: season?.y,
      },
    ],
  };
  // if (loading) return <LoadingImg />;

  return (
    <PlayerBoardWrapper>
      <PlayerInfoSection>
        <PlayerOverView>
          <img
            src={info?.Image}
            width="94px"
            height="74px"
            alt="PlayerIcon"
            onError={(e) => {
              e.target.src = "Images/player_error_image.png";
            }}
          />
          <img
            className="PositionIcon"
            src={`Images/ico-position-${info?.Role?.toLowerCase()}.png`}
            alt="PositionIcon"
          />
          <div className="NameContainer">
            <span className="NickName">
              {lang === "kr" ? info?.NativeName : info?.Name}
            </span>
            <span className="RealName">{info?.ID}</span>
          </div>
          <div className="DetailInfo">
            <div className="NationalityInfo">
              <span className="Title">{t("solo.playerboard.country")}</span>
              <span className="Country">{info?.Country}</span>
            </div>
            <div className="AgeInfo">
              <span className="Title">{t("solo.playerboard.age")}</span>
              <span className="AgeValue">
                <p className="Num">{`${info?.Age}${t(
                  "solo.playerboard.ageLabel"
                )}`}</p>
                <p className="FullNum">{`(${info?.Birthdate})`}</p>
              </span>
            </div>
          </div>
          <div className="AttendBox">
            <span className="Title2">{t("solo.playerboard.record")}</span>
            <div className="AttendValue">
              <span className="Wins">{`${matchInfo?.match}${t(
                "solo.playerboard.games"
              )} ${matchInfo?.win}${t("solo.playerboard.win")} ${matchInfo?.loss
                }${t("solo.playerboard.lose")}`}</span>
              <span className="WinRate">{`${matchInfo?.winrate.toFixed(
                1
              )}%`}</span>
            </div>
          </div>
          <div className="AverageBox">
            <div className="PerformanceTitle">
              {t("solo.playerboard.avgScore")}
            </div>

            <div className="PerformanceValue">
              {sbr?.sbrAvg.toFixed(1)} /{" "}
              {sbr?.price > 0 ? sbr?.price + "위" : "출전 경기 부족"}
            </div>
          </div>
          <div className="AverageBoxTwo">
            <div className="PerformanceTitle">
              {t("solo.playerboard.bestScore")}
            </div>
            <div className="PerformanceValueBest">{sbr?.maxAvg.toFixed(1)}</div>
          </div>
        </PlayerOverView>
      </PlayerInfoSection>
      <AbilitySection>
        <InfoNavBar>
          <LeftInfo>
            <span className="InfoTitle">{t("solo.playerboard.summary")}</span>
            <img src="Images/ico-notice-gy.png" alt="NoticeIcon" />
            <span className="NavContents">
              {t("solo.playerboard.summaryLabel")}
            </span>
          </LeftInfo>
          <FilterBox>
            <div className="DropDown">
              <DropDownContainer className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActive(!isActive);
                      GetChampionFilter();
                      dispatch(ResetOppChampion());
                    }}
                    className="menu-trigger"
                  >
                    <span>
                      {filters.champion
                        ? filters.champion
                        : t("filters.champLabel")}
                    </span>
                    <img src="Images/ico-filter-arrow.png" alt="arrowIcon" />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      {(lang === "kr" ? champFilter : champEng)?.map(
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
              </DropDownContainer>
            </div>
            <div className="Vs">VS</div>
            <div className="DropDown">
              <DropDownContainer className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActiveOpp(!isActiveOpp);
                      GetOppFilter();
                    }}
                    className="menu-trigger"
                  >
                    <span>
                      {filters.oppchampion
                        ? filters.oppchampion
                        : t("filters.oppChampLabel")}
                    </span>
                    <img src="Images/ico-filter-arrow.png" alt="arrowIcon" />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActiveOpp ? "active" : "inactive"}`}
                  >
                    <ul>
                      {(lang === "kr" ? oppFilter : oppEng)?.map(
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
              </DropDownContainer>
            </div>
            <button
              className="Select"
              onClick={() => {
                dispatch(ResetChampion2(""));
                GetPlayerBoardData();
              }}
            >
              {t("solo.playerboard.apply")}
            </button>
            <button
              className="Reset"
              onClick={() => {
                dispatch(ResetChampion("reset"));
              }}
            >
              <img
                src="Images/ico_reset.png"
                width="10px"
                height="10px"
                alt="resetICon"
              />
              <p>{t("solo.playerboard.reset")}</p>
            </button>
          </FilterBox>
        </InfoNavBar>
        {loading ? (
          <LoadingImage>
            <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
          </LoadingImage>
        ) : (
          <AbilityContents>
            <TopBox>
              <StatBox>
                <thead>
                  <StatNav>
                    <th className="StatTitle">
                      {t("solo.playerboard.laneStat")}
                    </th>
                    <th className="LeagueAvg">
                      {t("solo.playerboard.avgLeague")}
                    </th>
                    <th className="Icon"></th>
                    <th className="PlayerScore">
                      {t("solo.playerboard.playerStat")}
                    </th>
                  </StatNav>
                </thead>
                <tbody>
                  {line?.map((title, idx) => {
                    return (
                      <MapStat key={idx}>
                        <Tippy // options
                          duration={0}
                          delay={[300, 0]}
                          content={
                            <BoardToolTip
                              title={lang === "kr" ? title.name : title.eng}
                            />
                          }
                          placement="top"
                        >
                          <td className="StatNum">
                            {lang === "kr" ? title.name : title.eng}
                          </td>
                        </Tippy>
                        <LeagueValue>{title.leaguedata.toFixed(1)}</LeagueValue>
                        <td className="Icon">
                          <img
                            src={
                              title.leaguedata <= title.data
                                ? "Images/ico-point-high.png"
                                : "Images/ico-point-low-blue.png"
                            }
                            width="17px"
                            height="11px"
                            alt="pointIcon"
                          ></img>
                        </td>
                        <PlayerValue
                          changeColor={title.leaguedata > title.data}
                        >
                          {title.data.toFixed(1)}
                        </PlayerValue>
                      </MapStat>
                    );
                  })}
                </tbody>
              </StatBox>
              <StatBox>
                <thead>
                  <StatNav>
                    <th className="StatTitle">
                      {t("solo.playerboard.teamFight")}
                    </th>
                    <th className="LeagueAvg">
                      {t("solo.playerboard.avgLeague")}
                    </th>
                    <th className="Icon"></th>
                    <th className="PlayerScore">
                      {t("solo.playerboard.playerStat")}
                    </th>
                  </StatNav>
                </thead>
                <tbody>
                  {engage?.map((title, idx) => {
                    return (
                      <MapStat key={idx}>
                        <Tippy // options
                          duration={0}
                          delay={[300, 0]}
                          content={
                            <BoardToolTip
                              title={lang === "kr" ? title.name : title.eng}
                            />
                          }
                          placement="top"
                        >
                          <td className="StatNum">
                            {lang === "kr" ? title.name : title.eng}
                          </td>
                        </Tippy>
                        <LeagueValue>{title.leaguedata.toFixed(1)}</LeagueValue>
                        <td className="Icon">
                          <img
                            src={
                              title.leaguedata <= title.data
                                ? "Images/ico-point-high.png"
                                : "Images/ico-point-low-blue.png"
                            }
                            width="17px"
                            height="11px"
                            alt="pointIcon"
                          ></img>
                        </td>
                        <PlayerValue
                          changeColor={title.leaguedata > title.data}
                        >
                          {title.data.toFixed(1)}
                        </PlayerValue>
                      </MapStat>
                    );
                  })}
                </tbody>
              </StatBox>
              <StatBox>
                <thead>
                  <StatNav>
                    <th className="StatTitle">
                      {t("solo.playerboard.tendency")}
                    </th>
                    <th className="LeagueAvg">
                      {t("solo.playerboard.avgLeague")}
                    </th>
                    <th className="Icon"></th>
                    <th className="PlayerScore">
                      {t("solo.playerboard.playerStat")}
                    </th>
                  </StatNav>
                </thead>
                <tbody>
                  {personality?.map((title, idx) => {
                    return (
                      <MapStat key={idx}>
                        <Tippy // options
                          duration={0}
                          delay={[300, 0]}
                          content={
                            <BoardToolTip
                              title={lang === "kr" ? title.name : title.eng}
                            />
                          }
                          placement="top"
                        >
                          <td className="StatNum">
                            {lang === "kr" ? title.name : title.eng}
                          </td>
                        </Tippy>

                        <LeagueValue>{title.leaguedata.toFixed(1)}</LeagueValue>
                        <td className="Icon">
                          <img
                            src={
                              title.leaguedata <= title.data
                                ? "Images/ico-point-high.png"
                                : "Images/ico-point-low-blue.png"
                            }
                            width="17px"
                            height="11px"
                            alt="pointIcon"
                          ></img>
                        </td>
                        <PlayerValue
                          changeColor={title.leaguedata > title.data}
                        >
                          {title.data.toFixed(1)}
                        </PlayerValue>
                      </MapStat>
                    );
                  })}
                </tbody>
              </StatBox>
            </TopBox>
          </AbilityContents>
        )}
      </AbilitySection>
      <AbilitySection>
        <InfoNavBar>
          <LeftInfo>
            <span className="InfoTitle">
              {t("solo.playerboard.soloranksummary")}
            </span>
            <img src="Images/ico-notice-gy.png" alt="NoticeIcon" />
            <span className="NavContents">
              {t("solo.playerboard.soloranksummaryLabel")}
            </span>
          </LeftInfo>
        </InfoNavBar>
        <AbilityContents>
          <TopBox>
            <SolorankRecord>
              <TableNav>
                <div className="StatTitle">
                  {t("solo.playerboard.leaguePlayerInfo")}
                </div>
              </TableNav>
              <CompetitionTable>
                <SoloTableTitle>
                  <tr>
                    <th className="Champion">
                      {t("solo.playerboard.champion")}
                    </th>
                    <th className="Picks">{t("solo.playerboard.picks")}</th>
                    <th className="Win">{t("solo.playerboard.win")}</th>
                    <th className="Lose">{t("solo.playerboard.lose")}</th>
                    <th className="Winrate">{t("solo.playerboard.winrate")}</th>
                  </tr>
                </SoloTableTitle>
                <tbody>
                  {leaguePlayerInfo?.map((data, idx) => {
                    return (
                      <MapCompetition key={idx}>
                        <td>
                          <div className="ChampName">
                            <img
                              src={`Images/champion/${data.champion}.png`}
                              alt="ChampImage"
                            />
                            <div>
                              {lang === "kr"
                                ? data?.championKor
                                : data.champion}
                            </div>
                          </div>
                        </td>
                        <td className="PickValue">{data?.total_pick}</td>
                        <td className="WinValue">{data?.win.toFixed(0)}</td>
                        <td className="LoseValue">{data?.lose.toFixed(0)}</td>
                        <td className="WinRateValue">
                          <WinRateValue changeColor={data?.win_rate >= 49.5}>
                            {data?.win_rate.toFixed(1)}%
                          </WinRateValue>
                        </td>
                      </MapCompetition>
                    );
                  })}
                </tbody>
              </CompetitionTable>
              {leaguePlayerInfo?.length <= 0 ? (
                <NoData>
                  <img src="Images/img-no-contents.png" alt="no-game" />
                  <div> {t("solo.playerboard.nodata")}</div>
                </NoData>
              ) : (
                <div></div>
              )}
            </SolorankRecord>
            <SolorankRecord>
              <TableNav>
                <div className="StatTitle">
                  {t("solo.playerboard.leaguePlayerTotal")}
                </div>
              </TableNav>
              <CompetitionTable>
                <SoloTableTitle>
                  <tr>
                    <th className="Champion">
                      {t("solo.playerboard.champion")}
                    </th>
                    <th className="Picks">{t("solo.playerboard.picks")}</th>
                    <th className="Win">{t("solo.playerboard.win")}</th>
                    <th className="Lose">{t("solo.playerboard.lose")}</th>
                    <th className="Banrate">{t("solo.playerboard.banrate")}</th>
                    <th className="Winrate">{t("solo.playerboard.winrate")}</th>
                  </tr>
                </SoloTableTitle>
                <tbody>
                  {leaguePlayerTotal?.map((data, idx) => {
                    return (
                      <MapCompetition key={idx}>
                        <td>
                          <div className="ChampName">
                            <img
                              src={`Images/champion/${data.champion}.png`}
                              alt="ChampImage"
                            />
                            <div>
                              {lang === "kr"
                                ? data?.championKor
                                : data.champion}
                            </div>
                          </div>
                        </td>
                        <td className="PickValue">{data?.total_pick} </td>
                        <td className="WinValue">{data?.win.toFixed(0)} </td>
                        <td className="LoseValue">{data?.lose.toFixed(0)}</td>
                        <td className="BanRateValue">
                          {data?.banrate.toFixed(0)}%
                        </td>
                        <td className="WinRateValue">
                          <WinRateValue changeColor={data?.win_rate >= 49.5}>
                            {data?.win_rate.toFixed(1)}%
                          </WinRateValue>
                        </td>
                      </MapCompetition>
                    );
                  })}
                </tbody>
              </CompetitionTable>
            </SolorankRecord>
            <SolorankRecord>
              <TableNav>
                <div className="StatTitle">
                  {t("solo.playerboard.userPlayerTotal")}
                </div>
              </TableNav>
              <CompetitionTable>
                <SoloTableTitle>
                  <tr>
                    <th className="Champion">
                      {t("solo.playerboard.champion")}
                    </th>
                    <th className="PickRate">
                      {t("solo.playerboard.pickrate")}
                    </th>
                    <th className="BanRate">{t("solo.playerboard.banrate")}</th>
                    <th className="WinRate">{t("solo.playerboard.winrate")}</th>
                    <th className="Tier">{t("solo.playerboard.tier")}</th>
                  </tr>
                </SoloTableTitle>
                <tbody>
                  {userPlayerTotal?.map((data, idx) => {
                    return (
                      <MapCompetition key={idx}>
                        <td>
                          <div className="ChampName">
                            <img
                              src={`Images/champion/${data.champion}.png`}
                              alt="ChampImage"
                            />
                            <div>
                              {lang === "kr"
                                ? data?.championKor
                                : data.champion}
                            </div>
                          </div>
                        </td>
                        <td className="PicRatekValue">
                          {data?.pickRate.toFixed(0)}%
                        </td>
                        <td className="BanRateValue">
                          {data?.banRate.toFixed(0)}%
                        </td>

                        <td className="WinRateValue">
                          <WinRateValue changeColor={data?.winRate > 49.5}>
                            {data?.winRate.toFixed(1)}%
                          </WinRateValue>
                        </td>
                        <td className="TierValue">{data?.tier.toFixed(0)}</td>
                      </MapCompetition>
                    );
                  })}
                </tbody>
              </CompetitionTable>
            </SolorankRecord>
          </TopBox>
        </AbilityContents>
      </AbilitySection>
      <RecordWrapper>
        <RecordSection>
          <CompetitionRecord>
            <TableNav>
              <span className="StatTitle">
                {t("solo.playerboard.champStat")}
              </span>
              <ExcelExport
                filename={t("solo.playerboard.champStat")}
                tableid="competition-table"
              />
            </TableNav>
            <CompetitionTable id="competition-table">
              <TableTitle>
                <tr>
                  <th className="Champion">{t("solo.playerboard.champion")}</th>
                  <th className="PickCount">{t("solo.playerboard.picks")}</th>
                  <th className="WinRate">{t("solo.playerboard.winrate")}</th>
                  <th className="SBR">{t("solo.playerboard.sbr")}</th>
                </tr>
              </TableTitle>
              <tbody>
                {champRecord?.map((data, idx) => {
                  return (
                    <MapCompetition key={idx}>
                      <td>
                        <div className="ChampName">
                          <img
                            src={`Images/champion/${data.championEn}.png`}
                            alt="ChampImage"
                          />
                          <div>
                            {lang === "kr" ? data?.champion : data.championEn}
                          </div>
                        </div>
                      </td>
                      <td className="PickValue">{data?.total}</td>
                      <td className="WinValue">{`${data?.sum.toFixed(
                        0
                      )} %`}</td>
                      <td className="SbrValue">{data?.sbr.toFixed(1)}</td>
                    </MapCompetition>
                  );
                })}
              </tbody>
            </CompetitionTable>
          </CompetitionRecord>
          {/* 그래프 시작 */}
          <Player>
            <NavBar>
              <div className="Title">
                <span className="AverageTime">
                  {t("solo.playerboard.performanceScore")}
                </span>
              </div>
              <div className="Legend">
                <p className="X">X {t("solo.playerboard.recentGame")}</p>
                <p className="Y">Y {t("solo.playerboard.sbr")}</p>
              </div>
            </NavBar>
            <PlayerCharts>
              <Line
                data={MatchChart}
                options={{
                  tooltips: {
                    intersect: false,
                  },
                  legend: {
                    display: false,
                  },
                  maintainAspectRatio: false,
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          fontColor: "#84818e",
                          fontSize: 15,
                        },
                        gridLines: { color: "rgb(47, 45, 56)" },
                        offset: true,
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          stepSize: graphDomain?.matchGraph["row"],
                          fontColor: "#84818e",
                          fontSize: 15,
                          min: graphDomain?.matchGraph["min"],
                          max: graphDomain?.matchGraph["max"],
                        },
                        gridLines: {
                          color: "rgb(58, 55, 69)",
                        },
                      },
                    ],
                  },
                }}
              />
            </PlayerCharts>
          </Player>
        </RecordSection>
        <GraphSection>
          <TotalRecord>
            <TableNav>
              <span className="StatTitle">{t("solo.playerboard.carrer")}</span>
              <ExcelExport
                filename={t("solo.playerboard.carrer")}
                tableid="record-table"
              />
            </TableNav>
            <RecordTable id="record-table">
              <thead>
                <tr>
                  <th className="Team">{t("solo.playerboard.team")}</th>
                  <th className="PickCount">
                    {t("solo.playerboard.gamePlayed")}
                  </th>
                  <th className="WinRate">{t("solo.playerboard.winrate")}</th>
                  <th className="KDA">{t("solo.playerboard.kda")}</th>
                </tr>
              </thead>
              <tbody>
                {carrer?.map((career, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="TeamName">{career.team}</td>
                      <td className="PickValue">{career.total}</td>
                      <td className="WinValue">{`${career.winning.toFixed(
                        1
                      )}%`}</td>
                      <td className="KDA">
                        <div className="KDAValue">
                          <span className="Kills">{career.kill}</span>
                          <p className="Slash">/</p>
                          <span className="Deaths">{career.death}</span>
                          <p className="Slash">/</p>
                          <span className="Support">{career.assists}</span>
                          <span className="Rate">
                            &nbsp;{`${career.kda.toFixed(2)}:1`}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </RecordTable>
          </TotalRecord>
          {/* 그래프 시작 */}
          <Player>
            <NavBar>
              <div className="Title">
                <span className="AverageTime">
                  {t("solo.playerboard.seasonStat")}
                </span>
              </div>
              <div className="Legend">
                <p className="X">X {t("solo.playerboard.season")}</p>
                <p className="Y">Y {t("solo.playerboard.sbr")}</p>
              </div>
            </NavBar>
            <PlayerCharts>
              <Line
                data={SeasonChart}
                options={{
                  tooltips: {
                    intersect: false,
                  },
                  legend: {
                    display: false,
                  },
                  maintainAspectRatio: false,
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          fontColor: "#84818e",
                          fontSize: 15,
                        },
                        gridLines: { color: "rgb(47, 45, 56)" },
                        offset: true,
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          stepSize: graphDomain?.seasonGraph["row"],
                          fontColor: "#84818e",
                          fontSize: 15,
                          min: graphDomain?.seasonGraph["min"],
                          max: graphDomain?.seasonGraph["max"],
                        },
                        gridLines: {
                          color: "rgb(58, 55, 69)",
                        },
                      },
                    ],
                  },
                }}
              />
            </PlayerCharts>
          </Player>
        </GraphSection>
      </RecordWrapper>
    </PlayerBoardWrapper>
  );
}

export default PlayerBoard;

const LeftInfo = styled.div`
  display: flex;
  align-items: center;
  .InfoTitle {
    font-family: "Spoqa Han Sans";
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.6px;
    color: rgb(255, 255, 255);
    margin-right: 15px;
  }
  .NavContents {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    letter-spacing: -0.6px;
    color: rgb(132, 129, 142);
  }
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  .Vs {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    color: rgb(132, 129, 142);
    margin: 0 15px;
  }
  .Select {
    width: 48px;
    height: 34px;
    border-radius: 10px;
    background-color: #5942ba;
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.6px;
    color: #fff;
    margin: 0 5px;
  }
  .Reset {
    display: flex;
    align-items: center;
    width: 64px;
    height: 34px;
    border-radius: 10px;
    border: solid 1px #474554;
    color: #fff;
    background-color: #484655;
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    letter-spacing: -0.55px;
    p {
      margin-left: 2px;
    }
  }
`;

const PlayerBoardWrapper = styled.div`
  display: flex;
  /* height: calc(100vh - 500px); */
  /* overflow: auto; */
  flex-direction: column;
`;

const KeywordsContents = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* margin-top: 10px; */
  /* height: 160px; */
  overflow-y: auto;
`;

const KeywordContent = styled.div`
  /* width: auto; */
  padding: 4px 8px;
  /* padding: 4px 100px; */
  margin-bottom: 4px;
  margin-right: 10px;
  margin-top: 10px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: rgb(240, 69, 69);
  font-family: "Spoqa Han Sans";
  font-size: 12px;
  letter-spacing: -0.6px;
  text-align: center;
  color: rgb(255, 255, 255);
`;

const PlayerInfoSection = styled.section`
  display: flex;
`;

const AbilitySection = styled.div`
  margin-top: 22px;
  width: 100%;
  min-height: 300px;
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const RecordSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const GraphSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayerOverView = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 79px;
  margin: 22.5px 0px 0 0;
  border-radius: 20px;
  /* border: solid 1px #3a3745; */
  background-color: #2f2d38;
  background-image: url("Images/left-red-gradient.png");
  background-repeat: no-repeat;

  .DetailInfo {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 250px;
  }
  .NameContainer {
    display: flex;
  }
  .NationalityInfo {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .AgeInfo {
    display: flex;
    align-items: center;
  }
  .AttendBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    flex-direction: column;
    margin-right: 59px;
  }

  .PositionIcon {
    margin: 0 9.4px 0 17.1px;
    width: 29px;
    height: 29px;
  }
  .NameContainer {
    width: 140px;
    display: flex;
    flex-direction: column;
  }
  .NickName {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    color: rgb(132, 129, 142);
    margin-bottom: 6px;
  }
  .RealName {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: rgb(255, 255, 255);
  }
  .Title {
    /* min-width: 50px; */
    margin-right: 11px;
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
  }
  .Title2 {
    min-width: 50px;
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-bottom: 10px;
  }
  .Country {
    /* width: 245px; */
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
  .Num {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    color: rgb(255, 255, 255);
  }
  .FullNum {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
  .Wins {
    width: 119px;
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin-right: 10px;
  }
  .WinRate {
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(240, 69, 69);
  }
  .AgeValue {
    display: flex;
    align-items: center;
    /* width: 235px; */
  }
  .AttendValue {
    font-family: "Spoqa Han Sans";
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
  }
  .PerformanceTitle {
    /* width: 80px; */
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-bottom: 10px;
  }
  .PerformanceValue {
    width: 170px;
  }
  .PerformanceValue,
  .PerformanceValueBest {
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: rgb(240, 69, 69);
  }
  .AverageBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 55px;
    width: 80px;
  }
`;

const InfoNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 11px 23px 11px 23px; */
  padding: 20px 23px 20px 23px;
  border-bottom: 1px solid rgb(67, 63, 78);
  height: 65px;
`;

const AbilityContents = styled.div`
  width: 100%;
  min-height: 260px;
  background-color: #23212a;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px;
`;

const TopBox = styled.div`
  display: flex;
`;

const BottomBox = styled.div`
  width: 1052px;
  height: 211px;
  padding: 9px 15px;
  background-color: rgb(47, 45, 56);
  font-family: "Spoqa Han Sans";
  font-size: 12px;
  font-weight: bold;
  line-height: 2.08;
  letter-spacing: -0.6px;
  color: rgb(132, 129, 142);
`;

const StatBox = styled.table`
  width: 336px;
  height: 100%;
  background-color: rgb(47, 45, 56);
  margin-right: 22px;
  border-radius: 20px;

  :nth-child(3) {
    margin-right: 0px;
  }
`;

const StatNav = styled.tr`
  width: 100%;
  height: 42.5px;
  border-bottom: 1px solid rgb(35, 33, 42);

  > .StatTitle {
    text-align: left;
    padding-left: 10px;
    width: 178px;
  }
  > .Icon {
    width: 17px;
  }
  > th {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.6px;
    color: rgb(132, 129, 142);
    text-align: center;
    vertical-align: middle;
  }
`;

const MapStat = styled.tr`
  width: 100%;
  height: 28px;
  background-color: rgb(58, 55, 69);

  :nth-child(2n) {
    background-color: rgb(47, 45, 56);
  }

  > .Icon {
    width: 17px;
  }
  > .StatNum {
    text-align: left;
    padding-left: 10px;
    width: 178px;
    font-family: "Spoqa Han Sans";
    /* font-size: 12px; */
    letter-spacing: -0.6px;
    color: rgb(255, 255, 255);
    margin: 0 0px 0 14px;
  }
  > td {
    vertical-align: middle;
    text-align: center;
    font-size: 15px;
  }
`;

const LeagueValue = styled.td`
  font-family: "Spoqa Han Sans";
  font-size: 12px;
  text-align: center;
  color: rgb(255, 255, 255);
`;

const PlayerValue = styled.td`
  font-family: "Spoqa Han Sans";
  font-size: 12px;
  text-align: center;
  color: rgb(240, 69, 69);

  ${(props) =>
    props.changeColor &&
    css`
      color: #0075bf;
    `}
`;

const SolorankRecord = styled.div`
  position: relative;
  width: 380px;
  background-color: rgb(47, 45, 56);
  margin-right: 22px;
  border: 1px solid rgb(35, 33, 42);
  border-radius: 20px;

  :nth-child(3) {
    margin-right: 0px;
  }
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 366px;
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
`;
const CompetitionRecord = styled.div`
  width: 538px;
  min-height: 211px;
  margin-top: 22px;
  /* border: solid 1px rgb(58, 55, 69); */
  background-color: #23212a;
  border-radius: 20px;
`;
const TableNav = styled.div`
  width: 100%;
  height: 50px;
  padding: 15px 0 0 15px;
  border-bottom: 1px solid rgb(35, 33, 42);

  font-family: "Spoqa Han Sans";
  color: #fff;
  font-size: 16px;
  font-weight: medium;
  > .StatTitle {
    font-weight: bold;
  }
`;

const TotalRecord = styled.div`
  margin-top: 22px;
  width: 538px;
  min-height: 211px;
  /* border: solid 1px rgb(58, 55, 69); */
  background-color: #23212a;
  border-radius: 20px;
`;

const NoData = styled.div`
  position: absolute;
  margin: auto;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  color: #84818e;
  > div {
    padding-top: 10px;
  }
`;

const CompetitionTable = styled.table`
  width: 100%;
`;
const TableTitle = styled.thead`
  > tr {
    width: 100%;
    height: 28px;
    background-color: rgb(58, 55, 69);
    > .Champion {
      width: 340px;
      text-align: left;
      padding-left: 15px;
    }
    > th {
      font-family: "Spoqa Han Sans";
      font-size: 15px;
      font-weight: bold;
      letter-spacing: -0.6px;
      color: rgb(129, 126, 144);
      text-align: center;
      vertical-align: middle;
    }
  }
`;
const SoloTableTitle = styled.thead`
  > tr {
    width: 100%;
    height: 28px;
    background-color: rgb(58, 55, 69);
    > .Champion {
      width: 150px;
      text-align: left;
      padding-left: 15px;
    }
    > th {
      font-family: "Spoqa Han Sans";
      font-size: 15px;
      font-weight: bold;
      letter-spacing: -0.6px;
      color: rgb(129, 126, 144);
      text-align: center;
      vertical-align: middle;
    }
  }
`;
const MapCompetition = styled.tr`
  width: 100%;
  height: 28px;
  border-bottom: 1px solid rgb(58, 55, 69);
  :last-child {
    border-bottom: none;
  }

  > td {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    letter-spacing: -0.6px;
    color: rgb(255, 255, 255);
    text-align: center;
    vertical-align: middle;

    > .ChampName {
      text-align: left;
      display: flex;
      align-items: center;
      vertical-align: middle;
      img {
        margin: 0 10px 0 15px;
        width: 19px;
        height: 19px;
        border-radius: 20px;
      }
    }
  }
  .WinValue {
    width: 40px;
  }
  .SbrValue {
    color: rgb(240, 69, 69);
  }
  .WinRateValue {
    color: #0075bf;
  }
`;

const WinRateValue = styled.div`
  font-family: "Spoqa Han Sans";
  font-size: 12px;
  text-align: center;
  color: #0075bf;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(240, 69, 69);
    `}
`;

const RecordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecordTable = styled.table`
  width: 100%;
  thead > tr {
    width: 100%;
    height: 28px;
    background-color: rgb(58, 55, 69);
    > .Team {
      width: 190px;
      text-align: left;
      padding-left: 15px;
    }

    > th {
      font-family: "Spoqa Han Sans";
      font-size: 15px;
      font-weight: bold;
      letter-spacing: -0.6px;
      color: rgb(129, 126, 144);
      vertical-align: middle;
      text-align: center;
    }
  }

  tbody > tr {
    border-bottom: 1px solid rgb(58, 55, 69);
    height: 28px;
    width: 100%;
    > .TeamName {
      width: 190px;
      text-align: left;
      padding-left: 15px;
    }
    > .KDA {
      width: 205px;
      > .KDAValue {
        display: flex;
        justify-content: center;

        .Slash {
          color: #817e90;
          margin: 0 4px 0 4px;
        }
        .Rate {
          font-family: "Spoqa Han Sans";
          font-size: 15px;
          text-align: center;
          color: rgb(240, 69, 69);
        }
      }
    }
    > td {
      width: 76px;
      font-family: "Spoqa Han Sans";
      font-size: 15px;
      color: rgb(255, 255, 255);
      vertical-align: middle;
      text-align: center;
    }
  }
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 42.5px;
  border-bottom: 1px solid rgb(35, 33, 42);
  background-color: #23212a;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .AverageTime {
    width: 61px;
    height: 17px;
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    line-height: 2.08;
    color: #fff;
    margin-left: 15px;
    font-weight: bold;
  }
  .X {
    width: auto;
    height: 17px;
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-right: 15px;
    ::first-letter {
      color: #f14444;
    }
  }
  .Y {
    width: auto;
    height: 17px;
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-right: 16px;
    ::first-letter {
      color: #f14444;
    }
  }
  .Legend {
    display: flex;
  }
`;

const PlayerCharts = styled.div`
  padding: 23px;
  height: 226.5px;
  background-color: #23212a;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Player = styled.div`
  margin-top: 22px;
  width: 538px;
  height: 270px;
  border-radius: 20px;
`;

const DropDownContainer = styled.div`
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
    width: 180px;
    height: 34px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #afadbe;
    border-radius: 10px;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .menu-trigger span {
    vertical-align: middle;
    width: 130px;
    margin: 0 10px;
  }

  .menu-trigger img {
  }

  .menu {
    background: rgb(35, 33, 42);
    position: absolute;
    top: 35px;
    right: 0;
    width: 180px;
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
    z-index: 1;
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

const LoadingImage = styled.div`
  display: flex;
  width: 100%;
  height: 260px;
  justify-content: center;
  align-items: center;
  background-color: #23212a;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  img {
    width: 50px;
    height: 50px;
  }
`;
