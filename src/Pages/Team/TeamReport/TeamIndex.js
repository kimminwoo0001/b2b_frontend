import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { API } from "../../config";
import { useSelector } from "react-redux";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";


function TeamIndex() {
  //팀 존력 보고서 팀 지표 텝
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();

  // 리그 평균 상태값
  const [leagueStat, setLeagueStat] = useState();

  // 팀 평균 상태갓
  const [teamStats, setTeamStats] = useState();

  //선수 SBR 지표 상태값
  const [sbrAnalysis, setSbrAnalysis] = useState();

  // 갱킹 그래프 상태값들
  const [gankCount, setGankCount] = useState();
  const [gankCountX, setGankCountX] = useState();
  const [gankCountY, setGankCountY] = useState();
  //서포팅 그래프 상태값들
  const [supportTimeData, setSupportTimeData] = useState();
  const [supportTimeX, setSupportTimeX] = useState();
  const [supportTimeY, setSupportTimeY] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchingStatisticData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // 팀 전력 보고서 데이터 featch 함수
  const fetchingStatisticData = async () => {
    setLoading(true);
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/team/analysis`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        token: user.token,
        id: user.id
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });
    //팀 평균 데이터 fetch
    setTeamStats(result.data.teamStats);

    //리그 평균 데이터 fetch
    setLeagueStat(result.data.leagueStat);

    //SRB 데이터 fetch
    setSbrAnalysis(result.data.sbrAnalysis);

    //첫 갱 라인 데이터 fetch
    const gameX = [];
    const gameY = [];
    setGankCount(result.data.firstGank);
    result.data.firstGank.firstGankList.forEach((game) => {
      gameX.push(game.position);
      gameY.push(game.gankCount);
    });
    setGankCountX(gameX);
    setGankCountY(gameY);

    //라인별 서포팅 횟수 데이터 fetch

    const supportX = [];
    const supportY = [];
    setSupportTimeData(result.data.supportedTime);
    result.data.supportedTime.supportedTimeList.forEach((support) => {
      supportX.push(support.position);
      supportY.push(support.value);
    });

    setSupportTimeX(supportX);
    setSupportTimeY(supportY);
    setLoading(false);
  };

  //갱킹 그래프 옵션

  const firstGankTime = {
    labels: gankCountX,
    datasets: [
      {
        barThickness: 28,
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: gankCountY
      }
    ]
  };

  // 서포팅 그래프 옵션

  const averageSupport = {
    labels: supportTimeX,
    datasets: [
      {
        barThickness: 28,
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: supportTimeY
      }
    ]
  };
  if (loading) return <LoadingImg />;
  return (
    <TeamIndexWrapper>
      <IndexNav>
        <div className="UnderAvg">
          <img src="Images/ico-teamreport-num-up.png" alt="avgIcon"></img>
          {t("team.analysis.above")}
        </div>
        <div className="AboveAvg">
          <img src="Images/ico-teamreport-num-down.png" alt="avgIcon"></img>
          {t("team.analysis.below")}
        </div>
        <div className="LeagueAvg">
          <img src="Images/ico-teamreport-num-equal.png" alt="avgIcon"></img>
          {t("team.analysis.equal")}
        </div>
      </IndexNav>
      <DisplayWithIcon>
        <ContentsBox>
          <div className="FirstBox">
            <div className="avgKill">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-kill.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.kill")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.kill.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue changeColor={teamStats?.kill.result === false}>
                    {`${teamStats?.kill.value.toFixed(2)}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t(
                  "team.analysis.leagueAvg"
                )} ${leagueStat?.kill.toFixed(2)}`}</div>
              </DisplayInfo>
            </div>
            <div className="avgGameTime">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-gametime.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.playTime")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.playTime.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue changeColor={teamStats?.playTime.result === false}>
                    {`${teamStats?.playTime.minute}${t("team.analysis.min")} ${teamStats?.playTime.second
                      }${t("team.analysis.sec")}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t("team.analysis.leagueAvg")} ${leagueStat?.playTime.minute
                  }${t("team.analysis.min")} ${leagueStat?.playTime.second}${t(
                    "team.analysis.sec"
                  )}`}</div>
              </DisplayInfo>
            </div>
          </div>
          <div className="SecondBox">
            <div className="KillPerMin">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-killmin.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.kpm")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.km.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue changeColor={teamStats?.km.result === false}>
                    {`${teamStats?.km.value.toFixed(2)}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t(
                  "team.analysis.leagueAvg"
                )} ${leagueStat?.km.toFixed(2)}`}</div>
              </DisplayInfo>
            </div>
            <div className="AvgDragon">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-dragon.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.dragon")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.firstDragon.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue
                    changeColor={teamStats?.firstDragon.result === false}
                  >
                    {`${teamStats?.firstDragon.minute}${t(
                      "team.analysis.min"
                    )} ${teamStats?.firstDragon.second}${t(
                      "team.analysis.sec"
                    )}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t("team.analysis.leagueAvg")} ${leagueStat?.firstDragon.minute
                  }${t("team.analysis.min")} ${leagueStat?.firstDragon.second}${t(
                    "team.analysis.sec"
                  )}`}</div>
              </DisplayInfo>
            </div>
          </div>
        </ContentsBox>
        <TeamWinRateGraph>
          <TeamTotalStats>
            <div className="StatLabel">{t("team.analysis.statLabel")}</div>
            <div className="StatValue">{`${teamStats?.total}${t(
              "team.analysis.total"
            )} ${teamStats?.win}${t("team.analysis.win")} ${teamStats?.lose}${t(
              "team.analysis.lose"
            )}`}</div>
          </TeamTotalStats>
          <CircularProgressbarWithChildren
            value={teamStats?.winRate}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "24px",
              pathTransitionDuration: 0.5,

              // Colors
              pathColor: `rgb(240, 69, 69)`,
              textColor: "#ffffff",
              trailColor: "#2f2d38",
              backgroundColor: "#3e98c7"
            })}
            strokeWidth="12"
          >
            <div
              style={{
                fontSize: 12,
                color: "#84818e",
                fontFamily: "NotoSansKR, Apple SD Gothic Neo;"
              }}
            >
              {t("team.analysis.winRate")}
            </div>
            <div
              style={{
                marginTop: "10px"
              }}
            >
              <strong
                style={{
                  fontSize: 24,
                  fontFamily: "Poppins",
                  color: "#ffffff",
                  fontWeight: "bold",
                  marginRight: " 5px"
                }}
              >
                {teamStats?.winRate.toFixed(1)}
              </strong>
              <span
                style={{
                  fontSize: 15,
                  fontFamily: "NotoSansKR, Apple SD Gothic Neo;",
                  color: "#ffffff"
                }}
              >
                %
              </span>
            </div>
          </CircularProgressbarWithChildren>
        </TeamWinRateGraph>
        <ContentsBoxTwo>
          <div className="FirstBox">
            <div className="FirstHerald">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-herald.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.herald")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.firstHerald.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue
                    changeColor={teamStats?.firstHerald.result === false}
                  >
                    {`${teamStats?.firstHerald.minute}${t(
                      "team.analysis.min"
                    )} ${teamStats?.firstHerald.second}${t(
                      "team.analysis.sec"
                    )}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t("team.analysis.leagueAvg")} ${leagueStat?.firstHerald.minute
                  }${t("team.analysis.min")} ${leagueStat?.firstHerald.second}${t(
                    "team.analysis.sec"
                  )}`}</div>
              </DisplayInfo>
            </div>
            <div className="AvgFirstGank">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-gank.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.gank")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.timeOfFirstGank.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue
                    changeColor={teamStats?.timeOfFirstGank.result === false}
                  >
                    {`${teamStats?.timeOfFirstGank.minute}${t(
                      "team.analysis.min"
                    )} ${teamStats?.timeOfFirstGank.second}${t(
                      "team.analysis.sec"
                    )}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t("team.analysis.leagueAvg")} ${leagueStat?.timeOfFirstGank.minute
                  }${t("team.analysis.min")} ${leagueStat?.timeOfFirstGank.second
                  }${t("team.analysis.sec")}`}</div>
              </DisplayInfo>
            </div>
          </div>
          <div className="SecondBox">
            <div className="FirstBaron">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-nashor.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.baron")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.firstBaron.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue
                    changeColor={teamStats?.firstBaron.result === false}
                  >
                    {`${teamStats?.firstBaron.minute}${t(
                      "team.analysis.min"
                    )} ${teamStats?.firstBaron.second}${t(
                      "team.analysis.sec"
                    )}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t("team.analysis.leagueAvg")} ${leagueStat?.firstBaron.minute
                  }${t("team.analysis.min")} ${leagueStat?.firstBaron.second}${t(
                    "team.analysis.sec"
                  )}`}</div>
              </DisplayInfo>
            </div>
            <div className="AvgCombat">
              <img
                className="MainIcon"
                src="Images/ico-team-dash-fight.png"
                alt="Icon"
              ></img>
              <DisplayInfo>
                <div className="SubTitle">{t("team.analysis.teamfight")}</div>
                <div className="CalcData">
                  <img
                    src={
                      teamStats?.numberOfTeamFight.result === true
                        ? "Images/ico-teamreport-num-up.png"
                        : "Images/ico-teamreport-num-down.png"
                    }
                    alt="arrowIcon"
                    width="13px"
                    height="13px"
                  ></img>
                  <TeamValue
                    changeColor={teamStats?.numberOfTeamFight.result === false}
                  >
                    {`${teamStats?.numberOfTeamFight.winRate.toFixed(2)}`}
                  </TeamValue>
                </div>
                <div className="AvgData">{`${t(
                  "team.analysis.leagueAvg"
                )} ${leagueStat?.winRate.toFixed(2)}`}</div>
              </DisplayInfo>
            </div>
          </div>
        </ContentsBoxTwo>
      </DisplayWithIcon>
      <TeamSBRTable>
        <TableTitle>
          <span>{t("team.analysis.sbrLabel")}</span>
        </TableTitle>
        <SBRTable>
          <thead>
            <tr>
              <th className="PositionNav">{t("team.analysis.position")}</th>
              <th className="SummonerNav">{t("team.analysis.player")}</th>
              <th className="PlayerNav">{t("team.analysis.name")}</th>
              <th className="AttendNav">{t("team.analysis.gamePlayed")}</th>
              <th className="WinCountNav">{t("team.analysis.winCount")}</th>
              <th className="KDANAV">{t("team.analysis.kda")}</th>
              <th className="SBRNAV">{t("team.analysis.sbr")}</th>
              <th className="LeagueAvgNav">{t("team.analysis.leagueAvg")}</th>
            </tr>
          </thead>
          <tbody>
            {sbrAnalysis?.map((sbr, idx) => {
              return (
                <TableContents key={idx} changeColor={sbr.focus === true}>
                  <td>
                    <img
                      className="PositionInfo"
                      src={`Images/ico-position-${sbr.position}.png`}
                      alt="posIcon"
                    ></img>
                  </td>
                  <td className="SummonerInfo">{sbr.player}</td>
                  <td className="PlayerInfo">
                    {lang === "kr" ? sbr.NativeName : sbr.name}
                  </td>
                  <td className="AttendInfo">{sbr.gamesPlayed}</td>
                  <td className="WinCountInfo">{sbr.win}</td>
                  <td className="KDAInfo">
                    <span className="Kill">{sbr.kill}</span>
                    <span className="Slash">/</span>
                    <span className="Kill">{sbr.death}</span>
                    <span className="Slash">/</span>
                    <span className="Kill">{sbr.assist}</span>
                    <span className="Kda"> {`${sbr.kda.toFixed(2)}:1`}</span>
                  </td>
                  <td className="SBR">
                    <SBR sbr={sbr.sbr > sbr.leagueSbr}>
                      {sbr.sbr.toFixed(1)}
                    </SBR>
                  </td>
                  <td className="LeagueAvgInfo">{sbr.leagueSbr.toFixed(1)}</td>
                </TableContents>
              );
            })}
          </tbody>
        </SBRTable>
      </TeamSBRTable>
      <GraphContainer>
        <FirstGankLine>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("team.analysis.firstGank")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("team.analysis.lane")}</p>
              <p className="Y">Y {t("team.analysis.gankCount")}</p>
            </div>
          </NavBar>
          <GameTimeCharts>
            <Bar
              data={firstGankTime}
              options={{
                tooltips: {
                  intersect: false
                },
                legend: {
                  display: false
                },
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        fontColor: "#84818e",
                        fontSize: 14
                      },
                      gridLines: { color: "rgb(47, 45, 56)" }
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        stepSize: gankCount?.firstGankRow,
                        fontColor: "#84818e",
                        fontSize: 14,
                        min: gankCount?.firstGankMin,
                        max: gankCount?.firstGankMax
                      },
                      gridLines: {
                        color: "rgb(58, 55, 69)"
                      }
                    }
                  ]
                }
              }}
            />
          </GameTimeCharts>
        </FirstGankLine>
        <AvgSupportTime>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("team.analysis.supportTime")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("team.analysis.lane")}</p>
              <p className="Y">Y {t("team.analysis.ySupportTime")}</p>
            </div>
          </NavBar>
          <GameTimeCharts>
            <Bar
              data={averageSupport}
              options={{
                tooltips: {
                  intersect: false
                },
                legend: {
                  display: false
                },
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        fontColor: "#84818e",
                        fontSize: 14
                      },
                      gridLines: { color: "rgb(47, 45, 56)" }
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        stepSize: supportTimeData?.supportingTimeRow,
                        fontColor: "#84818e",
                        fontSize: 14,
                        min: supportTimeData?.supportingTimeMin,
                        max: supportTimeData?.supportingTimeMax
                      },
                      gridLines: {
                        color: "rgb(58, 55, 69)"
                      }
                    }
                  ]
                }
              }}
            />
          </GameTimeCharts>
        </AvgSupportTime>
      </GraphContainer>
    </TeamIndexWrapper>
  );
}

export default TeamIndex;

const TeamTotalStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansKR;
  font-size: 12px;
  line-height: 21px;
  letter-spacing: -0.6px;
  text-align: left;
  color: rgb(132, 129, 142);
  margin: 7px 0 15px 0;
  > .StatValue {
    font-size: 16px;
    font-weight: bold;
  }
`;

const TeamIndexWrapper = styled.div``;

const IndexNav = styled.div`
  margin-top: 27px;
  display: flex;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  color: #84818e;
  img {
    margin: 0 4px 0 14px;
  }
`;

const DisplayWithIcon = styled.div`
  display: flex;
  margin-top: 14px;
`;

const TeamSBRTable = styled.div`
  width: auto;
  height: 351px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-top: 22px;
`;

const GraphContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 23.5px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-wrap: nowrap; */
  width: auto;
  height: 198px;
  .FirstBox {
    display: flex;
    margin-bottom: 22px;
  }
  .SecondBox {
    display: flex;
  }
  .avgKill {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    margin-right: 22px;
    .MainIcon {
      margin-right: 18px;
    }
  }
  .avgGameTime {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    margin-right: 59px;
    .MainIcon {
      margin-right: 18px;
    }
  }
  .KillPerMin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    margin-right: 22px;
    .MainIcon {
      margin-right: 18px;
    }
  }
  .AvgDragon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    margin-right: 59px;
    .MainIcon {
      margin-right: 18px;
    }
  }
`;

const DisplayInfo = styled.div`
  .SubTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    color: #84818e;
    margin-bottom: 6px;
  }
  .CalcData {
    display: flex;
    font-family: Poppins;
    font-size: 14px;
    font-weight: bold;
    color: #f04545;
    margin-bottom: 6px;
    img {
      margin-right: 8px;
    }
  }
  .AvgData {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    color: #ffffff;
  }
`;

const TeamWinRateGraph = styled.div`
  width: 130px;
  height: 130px;
`;

const ContentsBoxTwo = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-wrap: nowrap; */
  width: auto;
  height: 198px;
  .FirstBox {
    display: flex;
    margin-bottom: 22px;
  }
  .SecondBox {
    display: flex;
  }
  .FirstHerald {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    margin-right: 22px;
    margin-left: 59px;
    .MainIcon {
      margin-right: 18px;
    }
  }
  .AvgFirstGank {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    .MainIcon {
      margin-right: 18px;
    }
  }
  .FirstBaron {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    margin-right: 22px;
    margin-left: 59px;
    .MainIcon {
      margin-right: 18px;
    }
  }
  .AvgCombat {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 88px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;

    .MainIcon {
      margin-right: 18px;
    }
  }
`;

const TableTitle = styled.div`
  display: flex;
  align-items: center;
  height: 42.5px;
  border-bottom: 1px solid rgb(35, 33, 42);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  color: rgb(132, 129, 142);
  padding: 13px 0 12.5px 15px;
  span {
    margin-right: 10px;
  }
`;

const SBRTable = styled.table`
  width: 100%;
  thead > tr {
    width: 100%;
    height: 28px;
    background-color: rgb(58, 55, 69);
    > th {
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 12px;
      font-weight: bold;
      color: rgb(129, 126, 144);
      vertical-align: middle;
      text-align: center;
    }
  }
`;

const TableContents = styled.tr`
  width: 100%;
  height: 28px;
  border-bottom: 1px solid rgb(58, 55, 69);
  > .SummonerInfo {
    /* width: 300px; */
  }
  > .KDAInfo {
    width: 234px;
  }
  > .SBR {
    width: 85px;
  }
  > td {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: center;
    color: rgb(255, 255, 255);
    vertical-align: middle;
    text-align: center;
    img {
      width: 10.8px;
      height: 10.8px;
    }
    .Kill {
      color: #ffffff;
      width: 30px;
    }
    .Slash {
      color: #817e90;
      margin: 0 4px 0 4px;
    }
    .Kda {
      color: #f04545;
      margin-left: 7px;
    }
  }
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #4b2b2f;
    `}
`;

const SBR = styled.div`
  color: #6b6979;
  ${(props) =>
    props.sbr &&
    css`
      color: #f04545;
    `}
`;

const FirstGankLine = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const AvgSupportTime = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 42.5px;
  border-bottom: 1px solid rgb(35, 33, 42);
  .AverageTime {
    width: 61px;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    line-height: 2.08;
    color: rgb(132, 129, 142);
    margin-left: 15px;
  }
  .X {
    width: auto;
    /* height: 17px; */
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-right: 15px;
    ::first-letter {
      color: #dbdbdb;
    }
  }
  .Y {
    width: auto;
    /* height: 17px; */
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-right: 16px;
    ::first-letter {
      color: #dbdbdb;
    }
  }
  .Legend {
    display: flex;
  }
`;

const GameTimeCharts = styled.div`
  padding: 23px;
  height: 226.5px;
`;

const TeamValue = styled.div`
  ${(props) =>
    props.changeColor &&
    css`
      color: #0084d8;
    `}
`;
