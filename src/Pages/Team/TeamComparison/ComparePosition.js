import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { API } from "../../config";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import axiosRequest from "../../../lib/axiosRequest";
import { useDispatch } from "react-redux";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import { Loading, HandleTab } from '../../../redux/modules/filtervalue';


function mycomparator(a, b) {
  var num1 = 0;
  if (Math.floor(a) - Math.floor(b) > 0) {
    num1 = 1;
  } else if (Math.floor(a) - Math.floor(b) < 0) {
    console.log(Math.floor(a) + "," + Math.floor(b));
    num1 = -1;
  } else {
    num1 = 0;
  }
  if (num1 === 0) {
    num1 =
      parseInt(a.substr(a.indexOf(".") + 1, a.length)) -
      parseInt(b.substr(b.indexOf(".") + 1, b.length));
  }
  return num1;
}

function ComparePosition() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState();
  const { t } = useTranslation();
  const [top, setTop] = useState([]);
  const [mid, setMid] = useState([]);
  const [jng, setJng] = useState([]);
  const [bot, setBot] = useState([]);
  const [sup, setSup] = useState([]);
  const sortedPatch = filters.patch.sort(mycomparator);
  const dispatch = useDispatch();
  const pagePath = document.location.pathname;
  const isInitialMount = useRef(true);
  const [isActive, setIsActive] = useState(false);



  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (pagePath === "/team") {
        dispatch(HandleTab(0));
      }
    }
  }, [filters.team])


  useEffect(() => {
    GetPositionGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.tab]);

  //그래프 컬러 값
  const color = [
    "#f04545",
    "rgb(0, 196, 255)",
    "rgb(255, 196, 0)",
    "rgb(130, 172, 35)",
    "#ba00ff",
    "#95532a",
  ];

  //포지션 그래프 fetch 함수
  const GetPositionGraphData = () => {
    // setLoading(true);
    dispatch(Loading(true));
    const url = `${API}/lolapi/team/comparison`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      oppteam: filters.oppteam,
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setTeamName({
          team: e.teamName,
          oppteam: e.oppteamName,
        });

        //top데이터 받아와서 그래프에 넣기 위해 가공하는 과정
        const topData = [];
        const topArray = [];
        Object.values(e?.["top"]).forEach(
          (patch) => {
            const topValues = [];
            for (let i = 0; i < sortedPatch.length; i++) {
              if (Object.keys(patch).includes(sortedPatch[i])) {
                for (let j = 0; j < sortedPatch.length; j++) {
                  if (sortedPatch[i] === Object.keys(patch)[j]) {
                    topValues.push(Object.values(patch)[j]);
                  }
                }
              } else {
                topValues.push(null);
              }
            }
            topData.push(topValues);
          }
          // ,
          // function (objStore) {
          //   dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          // }
        );

        for (let i = 0; i < topData.length; i++) {
          topArray.push({
            player: Object.keys(e["top"])[i],
            data: topData[i].map((data) => data?.toFixed(2)),
          });
        }
        setTop(topArray);

        //정글데이터 받아와서 그래프에 넣기 위해 가공하는 과정
        const jngData = [];
        const jngArray = [];
        Object.values(e?.["jng"]).forEach((patch) => {
          const jngValues = [];
          for (let i = 0; i < sortedPatch.length; i++) {
            if (Object.keys(patch).includes(sortedPatch[i])) {
              for (let j = 0; j < sortedPatch.length; j++) {
                if (sortedPatch[i] === Object.keys(patch)[j]) {
                  jngValues.push(Object.values(patch)[j]);
                }
              }
            } else {
              jngValues.push(null);
            }
          }

          jngData.push(jngValues);
        });
        for (let i = 0; i < jngData.length; i++) {
          jngArray.push({
            player: Object.keys(e["jng"])[i],
            data: jngData[i].map((data) => data?.toFixed(2)),
          });
        }
        setJng(jngArray);

        //미드 데이터 받아와서 그래프에 넣기 위해 가공하는 과정
        const midData = [];
        const midArray = [];
        Object.values(e?.["mid"]).forEach((patch) => {
          const midValues = [];
          for (let i = 0; i < sortedPatch.length; i++) {
            if (Object.keys(patch).includes(sortedPatch[i])) {
              for (let j = 0; j < sortedPatch.length; j++) {
                if (sortedPatch[i] === Object.keys(patch)[j]) {
                  midValues.push(Object.values(patch)[j]);
                }
              }
            } else {
              midValues.push(null);
            }
          }

          midData.push(midValues);
        });
        for (let i = 0; i < midData.length; i++) {
          midArray.push({
            player: Object.keys(e["mid"])[i],
            data: midData[i].map((data) => data?.toFixed(2)),
          });
        }
        setMid(midArray);

        //원딜 데이터 받아와서 그래프에 넣기 위해 가공하는 과정
        const botData = [];
        const botArray = [];
        Object.values(e?.["bot"]).forEach((patch) => {
          const botValues = [];
          for (let i = 0; i < sortedPatch.length; i++) {
            if (Object.keys(patch).includes(sortedPatch[i])) {
              for (let j = 0; j < sortedPatch.length; j++) {
                if (sortedPatch[i] === Object.keys(patch)[j]) {
                  botValues.push(Object.values(patch)[j]);
                }
              }
            } else {
              botValues.push(null);
            }
          }

          botData.push(botValues);
        });
        for (let i = 0; i < botData.length; i++) {
          botArray.push({
            player: Object.keys(e["bot"])[i],
            data: botData[i].map((data) => data?.toFixed(2)),
          });
        }
        setBot(botArray);

        //서포터 데이터 받아와서 그래프에 넣기 위해 가공하는 과정
        const supData = [];
        const supArray = [];
        Object.values(e?.["sup"]).forEach((patch) => {
          const supValues = [];
          for (let i = 0; i < sortedPatch.length; i++) {
            if (Object.keys(patch).includes(sortedPatch[i])) {
              for (let j = 0; j < sortedPatch.length; j++) {
                if (sortedPatch[i] === Object.keys(patch)[j]) {
                  supValues.push(Object.values(patch)[j]);
                }
              }
            } else {
              supValues.push(null);
            }
          }

          supData.push(supValues);
        });
        for (let i = 0; i < supData.length; i++) {
          supArray.push({
            player: Object.keys(e["sup"])[i],
            data: supData[i].map((data) => data?.toFixed(2)),
          });
        }
        setSup(supArray);
        dispatch(Loading(false));
        setIsActive(true);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  //그래프 세팅
  const topData = {
    labels: sortedPatch,
    //위에 fetch함수에서 가공된 데이터를 map method를 통해 뿌려줌
    datasets: top?.map((data, idx) => {
      return {
        label: data.player,
        fill: false,
        lineTension: 0,
        backgroundColor: color[idx],
        borderColor: color[idx],
        borderWidth: 1,
        data: data.data,
        pointHitRadius: 10, // hover 범위 넓혀 줌
      };
    }),
  };
  const jngData = {
    labels: sortedPatch,
    datasets: jng?.map((data, idx) => {
      return {
        label: data.player,
        fill: false,
        lineTension: 0,
        backgroundColor: color[idx],
        borderColor: color[idx],
        borderWidth: 1,
        data: data.data,
        pointHitRadius: 10, // hover 범위 넓혀 줌
      };
    }),
  };
  const midData = {
    labels: sortedPatch,
    datasets: mid?.map((data, idx) => {
      return {
        label: data.player,
        fill: false,
        lineTension: 0,
        backgroundColor: color[idx],
        borderColor: color[idx],
        borderWidth: 1,
        data: data.data,
        pointHitRadius: 10, // hover 범위 넓혀 줌
      };
    }),
  };
  const botData = {
    labels: sortedPatch,
    datasets: bot?.map((data, idx) => {
      return {
        label: data.player,
        fill: false,
        lineTension: 0,
        backgroundColor: color[idx],
        borderColor: color[idx],
        borderWidth: 1,
        data: data.data,
        pointHitRadius: 10, // hover 범위 넓혀 줌
      };
    }),
  };
  const supData = {
    labels: sortedPatch,
    datasets: sup?.map((data, idx) => {
      return {
        label: data.player,
        fill: false,
        lineTension: 0,
        backgroundColor: color[idx],
        borderColor: color[idx],
        borderWidth: 1,
        data: data.data,
        pointHitRadius: 10, // hover 범위 넓혀 줌
      };
    }),
  };

  if (!isActive) return <></>; 


  return (
    <ComparePositionWrapper>
      <DisplayTeams>
        <div className="RedSide"></div>
        <div className="TeamOne">
          <div>{teamName?.team}</div>
          <img
            src={`Images/TeamLogo/${filters.team}.png`}
            width="54px"
            height="54px"
            alt="teamIcon"
          />
        </div>
        <div className="Vs">VS</div>
        <div className="TeamTwo">
          <img
            src={`Images/TeamLogo/${filters.oppteam}.png`}
            width="54px"
            height="54px"
            alt="teamIcon"
          />
          <div>{teamName?.oppteam}</div>
        </div>
        <div className="BlueSide"></div>
      </DisplayTeams>
      <TopGraph>
        <NavBar>
          <div className="Title">
            <span className="AverageTime">{t("team.comparison.topSBR")}</span>
          </div>
          <div className="Legend">
            <p className="X">X {t("team.comparison.patch")}</p>
            <p className="Y">Y PR</p>
          </div>
        </NavBar>
        <CompareSBR>
          <LegendWrapper>
            {top?.map((legend, idx) => {
              return (
                <Legends key={idx}>
                  <li
                    className="Box"
                    style={{ backgroundColor: color[idx] }}
                  ></li>
                  <li className="Label">{legend.player}</li>
                </Legends>
              );
            })}
          </LegendWrapper>
          <Line
            data={topData}
            options={{
              legend: {
                display: false,
              },
              tooltips: {
                mode: "x",
              },
              hover: {
                animationDuration: 100,
              },

              // responsive: false,
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 15,
                      min: 0,
                      max: 15,
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)",
                    },
                  },
                ],
              },
            }}
          />
        </CompareSBR>
      </TopGraph>
      <JngGraph>
        <NavBar>
          <div className="Title">
            <span className="AverageTime">{t("team.comparison.jngSBR")}</span>
          </div>
          <div className="Legend">
            <p className="X">X {t("team.comparison.patch")}</p>
            <p className="Y">Y PR</p>
          </div>
        </NavBar>
        <CompareSBR>
          <LegendWrapper>
            {jng?.map((legend, idx) => {
              return (
                <Legends key={idx}>
                  <li
                    className="Box"
                    style={{ backgroundColor: color[idx] }}
                  ></li>
                  <li className="Label">{legend.player}</li>
                </Legends>
              );
            })}
          </LegendWrapper>
          <Line
            data={jngData}
            options={{
              legend: {
                display: false,
              },
              tooltips: {
                mode: "x",
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 15,
                      min: 0,
                      max: 15,
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)",
                    },
                  },
                ],
              },
            }}
          />
        </CompareSBR>
      </JngGraph>
      <MidGraph>
        <NavBar>
          <div className="Title">
            <span className="AverageTime">{t("team.comparison.midSBR")}</span>
          </div>
          <div className="Legend">
            <p className="X">X {t("team.comparison.patch")}</p>
            <p className="Y">Y PR</p>
          </div>
        </NavBar>
        <CompareSBR>
          <LegendWrapper>
            {mid?.map((legend, idx) => {
              return (
                <Legends key={idx}>
                  <li
                    className="Box"
                    style={{ backgroundColor: color[idx] }}
                  ></li>
                  <li className="Label">{legend.player}</li>
                </Legends>
              );
            })}
          </LegendWrapper>
          <Line
            data={midData}
            options={{
              legend: {
                display: false,
              },
              tooltips: {
                mode: "x",
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 15,
                      min: 0,
                      max: 15,
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)",
                    },
                  },
                ],
              },
            }}
          />
        </CompareSBR>
      </MidGraph>
      <BotGraph>
        <NavBar>
          <div className="Title">
            <span className="AverageTime">{t("team.comparison.botSBR")}</span>
          </div>
          <div className="Legend">
            <p className="X">X {t("team.comparison.patch")}</p>
            <p className="Y">Y PR</p>
          </div>
        </NavBar>
        <CompareSBR>
          <LegendWrapper>
            {bot?.map((legend, idx) => {
              return (
                <Legends key={idx}>
                  <li
                    className="Box"
                    style={{ backgroundColor: color[idx] }}
                  ></li>
                  <li className="Label">{legend.player}</li>
                </Legends>
              );
            })}
          </LegendWrapper>
          <Line
            data={botData}
            options={{
              legend: {
                display: false,
              },
              tooltips: {
                mode: "x",
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 15,
                      min: 0,
                      max: 15,
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)",
                    },
                  },
                ],
              },
            }}
          />
        </CompareSBR>
      </BotGraph>
      <SupGraph>
        <NavBar>
          <div className="Title">
            <span className="AverageTime">{t("team.comparison.supSBR")}</span>
          </div>
          <div className="Legend">
            <p className="X">X {t("team.comparison.patch")}</p>
            <p className="Y">Y PR</p>
          </div>
        </NavBar>
        <CompareSBR>
          <LegendWrapper>
            {sup?.map((legend, idx) => {
              return (
                <Legends key={idx}>
                  <li
                    className="Box"
                    style={{ backgroundColor: color[idx] }}
                  ></li>
                  <li className="Label">{legend.player}</li>
                </Legends>
              );
            })}
          </LegendWrapper>
          <Line
            data={supData}
            options={{
              legend: {
                display: false,
              },
              tooltips: {
                mode: "x",
                padding: 100,
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 15,
                      min: 0,
                      max: 15,
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)",
                    },
                  },
                ],
              },
            }}
          />
        </CompareSBR>
      </SupGraph>
    </ComparePositionWrapper>
  );
}

export default ComparePosition;

const ComparePositionWrapper = styled.div``;

const DisplayTeams = styled.div`
display: flex;
/* justify-content: center; */
  width: 100%;
  background-color: #16151a;
  position: relative;
  color: #fff;
  display: flex;
  margin: 20px 0;
  border-radius: 20px;
  background-color: #2f2d38;

  .RedSide {
    width: 150px;
    height: 77px;
    margin: 0 115px 0 0;
    object-fit: contain;
    border-radius: 20px;
    background-image: linear-gradient(
      306deg,
      rgba(47, 45, 56, 0) 43%,
      #f04545 105%
    );
  }

  .BlueSide {
    width: 150px;
    height: 77px;
    margin: 0 0 0 87px;
    object-fit: contain;
    border-radius: 20px;
    background-image: linear-gradient(
      54deg,
      rgba(56, 53, 45, 0) 37%,
      #0084d8 115%
    );
  }

  .TeamOne {
    display: flex;
    align-items: center;
    font-family: SpoqaHanSansNeo;
    width: auto;
    margin: 0 0px 0 0px;
    div {
      width: auto;
      height: 19px;
      margin: 30px 0px 28px 0;
      font-family: SpoqaHanSansNeo;
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: right;
      color: #fff;
      white-space: nowrap;
    }
    img {
      width: 54px;
      height: 54px;
      margin: 12px 0px 11px 15px;
      object-fit: contain;
    }
  }

  .TeamTwo {
    display: flex;
    font-family: SpoqaHanSansNeo;
    width: auto;

    margin: 0 0px 0 0px;
    div {
      width: 215px;
      height: 19px;
      margin: 30px 0px 28px 0;
      font-family: SpoqaHanSansNeo;
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
      white-space: nowrap;
    }
    img {
      width: 54px;
      height: 54px;
      margin: 12px 15px 11px 0;
      object-fit: contain;
    }
  }

  .Vs {
    width: 37px;
    height: 37px;
    margin: 25px 100px 0px 100px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
`;

const LegendWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  margin-left: 10px;
`;
const Legends = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 25px;
  > .Box {
    width: 20px;
    height: 3px;
    margin-right: 7px;
  }
  > .Label {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    text-align: center;
    color: #ffffff;
  }
`;

const TopGraph = styled.div`
  width: 1098px;
  height: 293px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-top: 22px;
  border-radius: 20px;
`;

const JngGraph = styled(TopGraph)``;

const MidGraph = styled(TopGraph)``;

const BotGraph = styled(TopGraph)``;

const SupGraph = styled(TopGraph)``;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50.5px;
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
    margin-left: 25px;
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

const CompareSBR = styled.div`
  padding: 12.5px 10px 40px 10px;
  height: 250px;
`;
