import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { API } from "../../config";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";

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
  useEffect(() => {
    GetPositionGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  //그래프 컬러 값
  const color = [
    "#f04545",
    "rgb(0, 196, 255)",
    "rgb(255, 196, 0)",
    "rgb(130, 172, 35)",
    "#ba00ff",
    "#95532a"
  ];

  //포지션 그래프 fetch 함수
  const GetPositionGraphData = async () => {
    setLoading(true);
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/team/comparison`,
      params: {
        league: filters.league,
        patch: filters.patch,
        team: filters.team,
        oppteam: filters.oppteam,
        token: user.token,
        id: user.id
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });
    setTeamName({
      team: result.data.teamName,
      oppteam: result.data.oppteamName
    });
    //top데이터 받아와서 그래프에 넣기 위해 가공하는 과정
    const topData = [];
    const topArray = [];
    Object.values(result?.data["top"]).forEach((patch) => {
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
    });

    for (let i = 0; i < topData.length; i++) {
      topArray.push({
        player: Object.keys(result.data["top"])[i],
        data: topData[i]
      });
    }
    setTop(topArray);

    //정글데이터 받아와서 그래프에 넣기 위해 가공하는 과정
    const jngData = [];
    const jngArray = [];
    Object.values(result?.data["jng"]).forEach((patch) => {
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
        player: Object.keys(result.data["jng"])[i],
        data: jngData[i]
      });
    }
    setJng(jngArray);

    //미드 데이터 받아와서 그래프에 넣기 위해 가공하는 과정
    const midData = [];
    const midArray = [];
    Object.values(result?.data["mid"]).forEach((patch) => {
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
        player: Object.keys(result.data["mid"])[i],
        data: midData[i]
      });
    }
    setMid(midArray);

    //원딜 데이터 받아와서 그래프에 넣기 위해 가공하는 과정
    const botData = [];
    const botArray = [];
    Object.values(result?.data["bot"]).forEach((patch) => {
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
        player: Object.keys(result.data["bot"])[i],
        data: botData[i]
      });
    }
    setBot(botArray);

    //서포터 데이터 받아와서 그래프에 넣기 위해 가공하는 과정
    const supData = [];
    const supArray = [];
    Object.values(result?.data["sup"]).forEach((patch) => {
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
        player: Object.keys(result.data["sup"])[i],
        data: supData[i]
      });
    }
    setSup(supArray);

    setLoading(false);
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
        data: data.data
      };
    })
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
        data: data.data
      };
    })
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
        data: data.data
      };
    })
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
        data: data.data
      };
    })
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
        data: data.data
      };
    })
  };

  if (loading) return <LoadingImg />;
  return (
    <ComparePositionWrapper>
      <DisplayTeams>
        <div className="RedSide"></div>
        <div className="TeamOne">{teamName?.team}</div>
        <img
          src={`Images/TeamLogo/${filters.team}.png`}
          width="54px"
          height="54px"
          alt="teamIcon"
        />
        <div className="Vs">VS</div>
        <img
          src={`Images/TeamLogo/${filters.oppteam}.png`}
          width="54px"
          height="54px"
          alt="teamIcon"
        />
        <div className="TeamTwo">{teamName?.oppteam}</div>
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
                display: false
              },
              // responsive: false,
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 14,
                      min: 0,
                      max: 15
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)"
                    }
                  }
                ]
              }
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 14,
                      min: 0,
                      max: 15
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)"
                    }
                  }
                ]
              }
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 14,
                      min: 0,
                      max: 15
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)"
                    }
                  }
                ]
              }
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 14,
                      min: 0,
                      max: 15
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)"
                    }
                  }
                ]
              }
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
                      stepSize: 3,
                      fontColor: "#84818e",
                      fontSize: 14,
                      min: 0,
                      max: 15
                    },
                    gridLines: {
                      color: "rgb(58, 55, 69)"
                    }
                  }
                ]
              }
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
  align-items: center;
  margin-top: 28px;
  width: 100%;
  height: 79px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  .RedSide {
    width: 145px;
    height: 77px;
    background-image: url("Images/left-red-gradient.png");
  }
  .BlueSide {
    width: 145px;
    height: 77px;
    background-image: url("Images/right-blue-gradient.png");
  }
  .TeamOne {
    font-family: Poppins;
    width: 244px;
    font-size: 15px;
    font-weight: 500;
    text-align: right;
    color: rgb(132, 129, 142);
    margin: 0 23px 0 0px;
  }
  .TeamTwo {
    font-family: Poppins;
    width: 244px;
    font-size: 15px;
    font-weight: 500;
    text-align: left;
    color: rgb(132, 129, 142);
    margin: 0 0px 0 23px;
  }
  .Vs {
    width: 40px;
    /* height: 43px; */
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    color: rgb(107, 105, 121);
    margin: 0 62px;
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
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
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

const CompareSBR = styled.div`
  padding: 12.5px 10px 40px 10px;
  height: 250px;
`;
