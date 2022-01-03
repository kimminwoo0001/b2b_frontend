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
import { useDispatch } from "react-redux";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

function LeagueStatistics() {
  //리그 통합 지수 텝
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
  }, [filters.patch, lang]);

  // 리그통합지수 데이터 featch 함수
  const fetchingStatisticData = () => {
    setLoading(true);
    const url = `${API}/lolapi/league/totalinfo`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        // 그래프 min, max, row 설정하기 위한 상태값
        setGameLengthData(e.avgGamelength);
        setSupportTimeData(e.avgSupportingTime);
        setFirstGankData(e.avgFirstGang);
        setTotalMatchData(e.avgMatchTotal);

        // 그래프에 들어갈 데이터 변환
        const gameX = [];
        const gameY = [];

        const supportX = [];
        const supportY = [];

        const GankX = [];
        const GankY = [];

        const TotalX = [];
        const TotalY = [];
        e.avgGamelength.data.forEach((game) => {
          gameX.push(game.patch);
          gameY.push(game.gamelength.toFixed(1));
        });
        e.avgSupportedTime.data.forEach((support) => {
          supportX.push(support.position);
          supportY.push(support.supported_time.toFixed(1));
        });
        e.avgFirstGang.data.forEach((gank) => {
          GankX.push(gank.patch);
          GankY.push(gank.first_gang_time.toFixed(1));
        });
        e.avgMatchTotal.data.forEach((match) => {
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
        // console.log(supportX);

        setLoading(false);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
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
        backgroundColor: "#f04545",
        borderColor: "#f04545",
        borderWidth: 2,
        data: gameLengthY,
      },
    ],
  };

  const averageGameTimeOptions = {
    tooltips: {
      mode: "index",
      intersect: false,
      backgroundColor: "#1d1d1d",
      titleFontSize: 12,
      bodyFontSize: 10,
      displayColors: true,
    },

    hover: {
      animationDuration: 100,
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
          gridLines: {
            color: "rgb(47, 45, 56)",
            offsetGridLines: true,
            drawOnChartArea: true,
          },
          offset: true,
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: gameLengthData?.row,
            fontColor: "#84818e",
            fontSize: 15,
            min: gameLengthData?.min,
            max: gameLengthData?.max,
          },
          gridLines: {
            color: "rgb(58, 55, 69)",
          },
        },
      ],
    },
  };

  //라인 별 서포팅 시간 그래프 세팅
  const averageSupport = {
    labels: supportTimeX,
    datasets: [
      {
        barThickness: 28,
        fill: false,
        lineTension: 0,
        backgroundColor: "#f04545",
        borderColor: "#f04545",
        borderWidth: 2,
        data: supportTimeY,
        bodySpacing: 5,
      },
    ],
  };

  //평균 교전시간 그래프 세팅
  const firstFight = {
    labels: totalMatchX,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f04545",
        borderColor: "#f04545",
        borderWidth: 2,
        data: totalMatchY,
      },
    ],
  };

  //첫 갱 시간 그래프 세팅
  const averageGank = {
    labels: firstGankX,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#f04545",
        borderColor: "#f04545",
        borderWidth: 2,
        data: firstGankY,
      },
    ],
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
            <Line data={averageGameTime} options={averageGameTimeOptions} />
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
                  intersect: false,
                  backgroundColor: "#1d1d1d",
                  titleFontSize: 12,
                  bodyFontSize: 10,
                  displayColors: true,
                  boxWidth: 2,
                  boxHeight: 2,
                  cornerRadius: 10,
                },
                hover: {
                  animationDuration: 100,
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
                        stepSize: supportTimeData?.row,
                        fontColor: "#84818e",
                        fontSize: 15,
                        // min: supportTimeData?.min,
                        min: 0,
                        max: supportTimeData?.max,
                      },
                      gridLines: {
                        color: "rgb(58, 55, 69)",
                      },
                    },
                  ],
                },
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
                  intersect: false,
                  backgroundColor: "#1d1d1d",
                  titleFontSize: 12,
                  bodyFontSize: 10,
                  displayColors: true,
                  boxWidth: 2,
                  boxHeight: 2,
                  cornerRadius: 10,
                },
                legend: {
                  display: false,
                },
                hover: {
                  animationDuration: 100,
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
                        stepSize: totalMatchData?.row,
                        fontColor: "#84818e",
                        fontSize: 15,
                        min: totalMatchData?.min,
                        max: totalMatchData?.max,
                      },
                      gridLines: {
                        color: "rgb(58, 55, 69)",
                      },
                    },
                  ],
                },
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
                  intersect: false,
                  backgroundColor: "#1d1d1d",
                  titleFontSize: 12,
                  bodyFontSize: 10,
                  displayColors: true,
                  boxWidth: 2,
                  boxHeight: 2,
                  cornerRadius: 10,
                },
                legend: {
                  display: false,
                },
                hover: {
                  animationDuration: 100,
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
                        stepSize: 0.5,
                        fontColor: "#84818e",
                        fontSize: 15,
                        min: firstGankData?.min,
                        max: firstGankData?.max,
                      },
                      gridLines: {
                        color: "rgb(58, 55, 69)",
                      },
                    },
                  ],
                },
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
  border-radius: 20px;
  margin-right: 22px;
  padding: 200;
`;

const SupportCounts = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
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
  border-radius: 20px;
`;

const FirstGank = styled.div`
  width: 538px;
  height: 270px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 51px;
  border-bottom: 1px solid rgb(35, 33, 42);
  .AverageTime {
    width: 61px;

    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    margin-left: 20px;
  }
  .X {
    width: auto;

    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    text-align: left;
    color: #84818e;
    margin-right: 15px;
    ::first-letter {
      color: #f14444;
    }
  }
  .Y {
    width: auto;

    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    text-align: left;
    color: #84818e;
    margin-right: 16px;
    ::first-letter {
      color: #f14444;
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
