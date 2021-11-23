import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { API } from "../../config";
import { useSelector } from "react-redux";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import qs from "qs";
import checkRequestBase from "../../../lib/checkRequestBase";
import axiosRequest from "../../../lib/axiosRequest";

function LeagueStatistics() {
  //리그 통합 지수 텝
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);
  const [loading, setLoading] = useState(false);

  //평균 게임시간
  const [gameLengthData, setGameLengthData] = useState();
  const [gameLengthX, setGameLengthX] = useState();
  const [gameLengthY, setGameLengthY] = useState();

  //라인별 서포팅 시간
  const [supportTimeData, setSupportTimeData] = useState();
  const [supportTimeX, setSupportTimeX] = useState();
  const [supportTimeY, setSupportTimeY] = useState();

  //첫 갱 시간
  const [firstGankData, setFirstGankData] = useState();
  const [firstGankX, setFirstGankX] = useState();
  const [firstGankY, setFirstGankY] = useState();

  //평균 교전
  const [totalMatchData, setTotalMatchData] = useState();
  const [totalMatchX, setTotalMatchX] = useState();
  const [totalMatchY, setTotalMatchY] = useState();

  // const [chart, setChart] = useState();

  useEffect(() => {
    if (checkRequestBase(filters)) {
      fetchingStatisticData();
    }
    // colorChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, lang]);

  // 리그통합지수 데이터 featch 함수
  const fetchingStatisticData = () => {
    setLoading(true);
    const url = `${API}/api/league/totalinfo`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      token: user.token,
      id: user.id,
    }

    axiosRequest(url, params, function (e) {
      // 그래프 min, max, row 설정하기 위한 상태값
      setGameLengthData(e.data.avgGamelength);
      setSupportTimeData(e.data.avgSupportingTime);
      setFirstGankData(e.data.avgFirstGang);
      setTotalMatchData(e.data.avgMatchTotal);

      // 그래프에 들어갈 데이터 변환
      const gameX = [];
      const gameY = [];

      const supportX = [];
      const supportY = [];

      const GankX = [];
      const GankY = [];

      const TotalX = [];
      const TotalY = [];
      e.data.avgGamelength.data.forEach((game) => {
        gameX.push(game.patch);
        gameY.push(game.gamelength.toFixed(1));
      });
      e.data.avgSupportedTime.data.forEach((support) => {
        supportX.push(support.position);
        supportY.push(support.supported_time.toFixed(1));
      });
      e.data.avgFirstGang.data.forEach((gank) => {
        GankX.push(gank.patch);
        GankY.push(gank.first_gang_time.toFixed(1));
      });
      e.data.avgMatchTotal.data.forEach((match) => {
        TotalX.push(match.patch);
        TotalY.push(match.match_total.toFixed(1));
      });
      setGameLengthX(gameX);
      setGameLengthY(gameY);
      setSupportTimeX(supportX);
      setSupportTimeY(supportY);
      setFirstGankX(GankX);
      setFirstGankY(GankY);
      setTotalMatchX(TotalX);
      setTotalMatchY(TotalY);

      setLoading(false);
    })


  };
  //현재 패치버전 색 교체
  // const colorChange = () => {
  //   const newData = gameLengthX?.map((el, idx) => {
  //     return {
  //       el,
  //       borderColor: el === filters.patch ? "black" : "blue"
  //     };
  //   });
  // };

  //평균 게임시간 그래프 세팅
  const averageGameTime = {
    labels: gameLengthX,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: gameLengthY
      }
    ]
  };

  //라인 별 서포팅 시간 그래프 세팅
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

  //평균 교전시간 그래프 세팅
  const firstFight = {
    labels: totalMatchX,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: totalMatchY
      }
    ]
  };

  //첫 갱 시간 그래프 세팅
  const averageGank = {
    labels: firstGankX,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f14444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: firstGankY
      }
    ]
  };

  if (loading) return <LoadingImg />;
  return (
    <StatisticsWrapper>
      <TopBox>
        <GameTime>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("league.leagueStat.gameLength")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("league.leagueStat.patch")}</p>
              <p className="Y">Y {t("league.leagueStat.avgLength")}</p>
            </div>
          </NavBar>
          <GameTimeCharts>
            <Line
              data={averageGameTime}
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
                      gridLines: {
                        color: "rgb(47, 45, 56)",
                        offsetGridLines: true,
                        drawOnChartArea: true
                      },
                      offset: true
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        stepSize: gameLengthData?.row,
                        fontColor: "#84818e",
                        fontSize: 14,
                        min: gameLengthData?.min,
                        max: gameLengthData?.max
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
        </GameTime>
        <SupportCounts>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("league.leagueStat.pressure")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("league.leagueStat.lane")}</p>
              <p className="Y">Y {t("league.leagueStat.yPressure")}</p>
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
                      gridLines: { color: "rgb(47, 45, 56)" },
                      offset: true
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        stepSize: supportTimeData?.row,
                        fontColor: "#84818e",
                        fontSize: 14,
                        min: supportTimeData?.min,
                        max: supportTimeData?.max
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
        </SupportCounts>
      </TopBox>
      <BottomBox>
        <FirstEncounter>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("league.leagueStat.teamFight")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("league.leagueStat.patch")}</p>
              <p className="Y">Y {t("league.leagueStat.teamFight")}</p>
            </div>
          </NavBar>
          <GameTimeCharts>
            {console.log("firstFight:", firstFight)}
            {console.log("totalMatchData:", totalMatchData)}
            <Line
              data={firstFight}
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
                      gridLines: { color: "rgb(47, 45, 56)" },
                      offset: true
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        stepSize: totalMatchData?.row,
                        fontColor: "#84818e",
                        fontSize: 14,
                        min: totalMatchData?.min,
                        max: totalMatchData?.max
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
        </FirstEncounter>
        <FirstGank>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">{t("league.leagueStat.gank")}</span>
            </div>
            <div className="Legend">
              <p className="X">X {t("league.leagueStat.patch")}</p>
              <p className="Y">Y {t("league.leagueStat.time")}</p>
            </div>
          </NavBar>
          <GameTimeCharts>
            <Line
              data={averageGank}
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
                      gridLines: { color: "rgb(47, 45, 56)" },
                      offset: true
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        stepSize: 0.5,
                        fontColor: "#84818e",
                        fontSize: 14,
                        min: firstGankData?.min,
                        max: firstGankData?.max
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
        </FirstGank>
      </BottomBox>
    </StatisticsWrapper>
  );
}

export default LeagueStatistics;

const StatisticsWrapper = styled.div`
  height: calc(100vh - 153px);
`;

const TopBox = styled.div`
  display: flex;
  margin-top: 22.5px;
`;

const GameTime = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-right: 22px;
  padding: 200;
`;

const SupportCounts = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const BottomBox = styled.div`
  display: flex;
  margin-top: 22px;
`;

const FirstEncounter = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-right: 22px;
`;

const FirstGank = styled.div`
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

    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    line-height: 2.08;
    color: rgb(132, 129, 142);
    margin-left: 15px;
  }
  .X {
    width: auto;

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
