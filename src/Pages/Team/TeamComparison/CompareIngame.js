import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import { API } from "../../config";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import qs from "qs";
import axiosRequest from "../../../lib/axiosRequest";

function CompareIngame() {
  //팀 비교 인게임 지표
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState();
  //레드팀 데이터
  const [redData, setRedData] = useState();
  //블루팀 데이터
  const [blueData, setBlueData] = useState();
  //첫 갱 그래프 데이터
  const [gank, setGank] = useState();
  //x 축
  const [gankDomain, setGankDomain] = useState();
  //y 축
  const [gankTicks, setGankTicks] = useState();
  //서포팅 받은 시간 그래프 데이터
  const [support, setSupport] = useState();
  //x축
  const [supportDomain, setSupportDomain] = useState();
  //y 축
  const [supportTicks, setSupportTicks] = useState();

  const Team = filters.team;
  const OppTeam = filters.oppteam;

  useEffect(() => {
    GetInGameData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.oppteam, filters.patch]);

  //밴지표 전체 데이터 가져오는 함수
  const GetInGameData = () => {
    setLoading(true);
    const url = `${API}/lolapi/team/comparisonPi`;
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
    axiosRequest(null, url, params, function (e) {
      setTeamName({
        team: filters.team,
        oppteam: filters.oppteam,
      });
      let gankTicks = "";
      //첫 갱크 데이터 min,max,stepsize 값
      if (
        e.data[Team]?.firstGank.firstGankMax >
        e.data[OppTeam]?.firstGank.firstGankMax
      ) {
        setGankDomain(e.data[Team]?.firstGank);
        gankTicks = e.data[Team];
      } else {
        setGankDomain(e.data[OppTeam]?.firstGank);
        gankTicks = e.data[OppTeam];
      }

      //첫 갱크 데이터 가져와서 x,y로 나눠서 배열로 만듬
      const gankData = e.data[Team]?.firstGank.firstGankList?.map((gank) => {
        return { x: gank.position, y1: gank.gankCount };
      });

      const gankData2 = e.data[OppTeam]?.firstGank.firstGankList?.map(
        (gank) => {
          return { x: gank.position, y2: gank.gankCount };
        }
      );
      for (let i = 0; i < gankData.length; i++) {
        Object.assign(gankData[i], gankData2[i]);
        setGank(gankData);
      }
      //첫 서포팅 데이터 min, max, stepsize값
      let supTicks = "";
      if (
        e.data[Team]?.supportedTime.supportedTimeMax >
        e.data[OppTeam]?.supportedTime.supportedTimeMax
      ) {
        supTicks = e.data[Team];
        setSupportDomain(e.data[Team]?.supportedTime);
      } else {
        supTicks = e.data[OppTeam];
        setSupportDomain(e.data[OppTeam]?.supportedTime);
      }

      //첫 서포팅 데이터 가져와서 x,y로 나눠서 배열로 만듬
      const supData = e.data[Team]?.supportedTime.supportedTimeList?.map(
        (sup) => {
          return { x: sup.position, y1: sup.value };
        }
      );
      const supData2 = e.data[OppTeam]?.supportedTime.supportedTimeList.map(
        (sup) => {
          return { x: sup.position, y2: sup.value };
        }
      );
      for (let i = 0; i < supData.length; i++) {
        Object.assign(supData[i], supData2[i]);
        setSupport(supData);
      }
      hanldleTicks(gankTicks, supTicks);
      //Team, OppTeam을 나눠서 데이터를 저장함
      setRedData(e.data[Team]);
      setBlueData(e.data[OppTeam]);
    }).finally(setLoading(false));
  };

  //그래프 y 축 max값 받아오는거 비교해서 더 높은것으로 출력 해주는 함수
  const hanldleTicks = (gankTicks, supTicks) => {
    const gankarray = [];
    const supportarray = [];
    for (let i = 0; i < 6; i++) {
      gankarray.push((gankTicks.firstGank.firstGankRow * i).toFixed(1));
    }
    setGankTicks(gankarray);
    for (let i = 0; i < 6; i++) {
      supportarray.push(
        (supTicks.supportedTime?.supportedTimeRow * i).toFixed(1)
      );
    }
    setSupportTicks(supportarray);
  };

  const renderColorfulLegendText = (value: string, entry: any) => {
    return (
      <span
        style={{
          color: "white",
          fontSize: "15px",
          objectFit: "contain",
          verticalAlign: "middle",
        }}
      >
        {" "}
        {value}
      </span>
    );
  };

  //그래프 툴팁 커스텀
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTool className="custom-tooltip">
          <div className="title">{label}</div>
          <p className="player">
            <p className="player1">{`${payload[0].name} `}</p>
            <p className="value">{`: ${payload[0].value}`}</p>
          </p>
          <p className="player">
            <p className="player2">{`${payload[1].name} `}</p>
            <p className="value">{`: ${payload[1].value}`}</p>
          </p>
        </CustomTool>
      );
    }

    return null;
  };
  if (loading) return <LoadingImg />;
  return (
    <CompareIngameWrapper>
      <ChartBox>
        <FirstGankChart>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("team.comparison.teamGank")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("team.comparison.lane")}</p>
              <p className="Y">Y {t("team.comparison.gankCount")}</p>
            </div>
          </NavBar>
          <CompareTeamStat>
            <BarChart
              width={520}
              height={250}
              margin={{ top: 20, right: 10, bottom: 5, left: 0 }}
              data={gank ? Object.values(gank) : 0}
            >
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
                animationDuration={0}
              />
              <CartesianGrid stroke="#3a3745" vertical={false} />
              <XAxis
                dataKey="x"
                stroke="#3a3745 "
                tick={{ fill: "#84818e", fontSize: 15 }}
              />
              <YAxis
                type="number"
                domain={[gankDomain?.firstGankMin, gankDomain?.firstGankMax]}
                stroke="#3a3745 "
                tick={{
                  fill: "#84818e",
                  fontSize: 15,
                }}
                ticks={gankTicks}
              />
              <Legend
                verticalAlign="bottom"
                align="left"
                wrapperStyle={{ top: 220, left: 230 }}
                height={36}
                iconType="plainline"
                formatter={renderColorfulLegendText}
                iconSize={20}
              />
              <Bar dataKey="y1" name={Team} fill="#f04545" barSize={28} />
              <Bar dataKey="y2" name={OppTeam} fill="#005489" barSize={28} />
            </BarChart>
          </CompareTeamStat>
        </FirstGankChart>
        <LineSupportChart>
          <NavBar>
            <div className="Title">
              <span className="AverageTime">
                {t("team.comparison.supportedTime")}
              </span>
            </div>
            <div className="Legend">
              <p className="X">X {t("team.comparison.lane")}</p>
              <p className="Y">Y {t("team.comparison.supportTime")}</p>
            </div>
          </NavBar>
          <CompareTeamStat>
            <BarChart
              width={520}
              height={220}
              margin={{ top: 0, right: 10, bottom: 5, left: 0 }}
              data={support ? Object.values(support) : 0}
            >
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
                animationDuration={0}
              />
              <CartesianGrid stroke="#3a3745" vertical={false} />
              <XAxis
                dataKey="x"
                stroke="#3a3745 "
                tick={{ fill: "#84818e", fontSize: 15 }}
              />
              <YAxis
                domain={[
                  supportDomain?.supportedTimeMin,
                  supportDomain?.supportedTimeMax,
                ]}
                stroke="#3a3745 "
                tick={{
                  fill: "#84818e",
                  fontSize: 15,
                }}
                ticks={supportTicks}
              />
              <Legend
                verticalAlign="top"
                align="left"
                wrapperStyle={{ top: 220, left: 230 }}
                height={36}
                iconType="plainline"
                formatter={renderColorfulLegendText}
                iconSize={20}
              />
              <Bar dataKey="y1" name={Team} fill="#f04545" barSize={28} />
              <Bar dataKey="y2" name={OppTeam} fill="#005489" barSize={28} />
            </BarChart>
          </CompareTeamStat>
        </LineSupportChart>
      </ChartBox>
      <CompareDisplay>
        <DisplayTeams>
          <div className="RedSide">
            <img
              src={`Images/TeamLogo/${filters.team}.png`}
              width="100px"
              height="100px"
              alt="teamIcon"
            />
            <div className="TeamOne">{teamName?.team}</div>
          </div>
          <div className="Vs">VS</div>
          <div className="BlueSide">
            <img
              src={`Images/TeamLogo/${filters.oppteam}.png`}
              width="100px"
              height="100px"
              alt="teamIcon"
            />
            <div className="TeamTwo">{teamName?.oppteam}</div>
          </div>
        </DisplayTeams>
        <CompareStats>
          {/* <GameDataBox>
          <RedTeamData
          changeColor={redData?.IngameStats["gameTime"].result === true}
          >{`${redData?.IngameStats["match"]}${t("team.comparison.total")} ${redData?.IngameStats["win"]
            }${t("team.comparison.win")} ${redData?.IngameStats["lose"]}${t(
              "team.comparison.lose"
            )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.record")}</AverageLabel>
          <BlueTeamData
          changeColor={blueData?.IngameStats["gameTime"].result === true}
          >{`${blueData?.IngameStats["match"]}${t("team.comparison.total")} ${blueData?.IngameStats["win"]
            }${t("team.comparison.win")} ${blueData?.IngameStats["lose"]}${t(
              "team.comparison.lose"
            )}`}</BlueTeamData>
        </GameDataBox> */}
          <GameDataBox>
            <RedTeamData
              changeColor={redData?.IngameStats["gameTime"].result === true}
            >{`${redData?.IngameStats["gameTime"]?.minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${redData?.IngameStats["gameTime"]?.second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.playTime")}</AverageLabel>
            <BlueTeamData
              changeColor={blueData?.IngameStats["gameTime"].result === true}
            >{`${blueData?.IngameStats["gameTime"]?.minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["gameTime"]?.second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={redData?.IngameStats["firstDragon"].result === true}
            >{`${redData?.IngameStats["firstDragon"].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${redData?.IngameStats["firstDragon"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.firstdragon")}</AverageLabel>
            <BlueTeamData
              changeColor={blueData?.IngameStats["firstDragon"].result === true}
            >{`${blueData?.IngameStats["firstDragon"].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["firstDragon"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={redData?.IngameStats["dragons"].result === true}
            >{`${redData?.IngameStats["dragons"].value.toFixed(1)}${t(
              "team.comparison.times"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.slayedDragon")}</AverageLabel>
            <BlueTeamData
              changeColor={blueData?.IngameStats["dragons"].result === true}
            >{`${blueData?.IngameStats["dragons"].value.toFixed(1)}${t(
              "team.comparison.times"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={redData?.IngameStats["firstHerald"].result === true}
            >{`${redData?.IngameStats["firstHerald"].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${redData?.IngameStats["firstHerald"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.firstHerald")}</AverageLabel>
            <BlueTeamData
              changeColor={blueData?.IngameStats["firstHerald"].result === true}
            >{`${blueData?.IngameStats["firstHerald"].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["firstHerald"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={redData?.IngameStats["heralds"].result === true}
            >{`${redData?.IngameStats["heralds"].value.toFixed(1)}${t(
              "team.comparison.times"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.avgHerald")}</AverageLabel>
            <BlueTeamData
              changeColor={blueData?.IngameStats["heralds"].result === true}
            >{`${blueData?.IngameStats["heralds"].value.toFixed(1)}${t(
              "team.comparison.times"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={redData?.IngameStats["barons"].result === true}
            >{`${redData?.IngameStats["barons"].value.toFixed(1)}${t(
              "team.comparison.times"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.baron")}</AverageLabel>
            <BlueTeamData
              changeColor={blueData?.IngameStats["barons"].result === true}
            >{`${blueData?.IngameStats["barons"].value.toFixed(1)}${t(
              "team.comparison.times"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={
                redData?.IngameStats["timeOfFirstGank"].result === true
              }
            >{`${redData?.IngameStats["timeOfFirstGank"].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${redData?.IngameStats["timeOfFirstGank"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.firstGank")}</AverageLabel>
            <BlueTeamData
              changeColor={
                blueData?.IngameStats["timeOfFirstGank"].result === true
              }
            >{`${blueData?.IngameStats["timeOfFirstGank"].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["timeOfFirstGank"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData
              changeColor={
                redData?.IngameStats["numberOfTeamFight"].result === true
              }
            >{`${redData?.IngameStats["numberOfTeamFight"].winRate.toFixed(
              1
            )}${t("team.comparison.times")}`}</RedTeamData>
            <AverageLabel>{t("team.comparison.avgTeamFight")}</AverageLabel>
            <BlueTeamData
              changeColor={
                blueData?.IngameStats["numberOfTeamFight"].result === true
              }
            >{`${blueData?.IngameStats["numberOfTeamFight"].winRate.toFixed(
              1
            )}${t("team.comparison.times")}`}</BlueTeamData>
          </GameDataBox>
        </CompareStats>
      </CompareDisplay>
    </CompareIngameWrapper>
  );
}

export default CompareIngame;

const CustomTool = styled.div`
  background-color: #1d1d1d;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  color: white;
  font-family: "Spoqa Han Sans";
  > p {
    margin-bottom: 6px;
  }

  > .title {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  > .player {
    display: flex;
    font-size: 10px;

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
    display: flex;
    color: #84818e;
    > .value {
      margin-left: 3px;
      color: white;
    }
  }
`;

const CompareIngameWrapper = styled.div`
  display: flex;
`;

const CompareDisplay = styled.div`
  width: 550px;
  margin-top: 30px;
  border-radius: 20px;
  background-color: #2f2d38;
`;

const DisplayTeams = styled.div`
  position: relative;
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 10px 10px;
  margin-bottom: 0px;
  .RedSide,
  .BlueSide {
    display: flex;
    flex-direction: column;
    width: 275px;
    align-items: center;
    font-family: "Spoqa Han Sans";
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
  }

  .RedSide {
    padding-right: 40px;
  }

  .BlueSide {
    padding-left: 40px;
  }

  .Vs {
    position: absolute;
    top: 50%;
    font-family: "Spoqa Han Sans";
    font-size: 20px;
    font-weight: bold;
    color: #6b6979;
  }
`;

const CompareStats = styled.div`
  .under-line {
    width: 85%;
    display: table;
    margin-left: auto;
    margin-right: auto;
    border-top: 1px solid #433f4e;
  }
`;

const GameDataBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1px 0px;
  color: #fff;
`;

const RedTeamData = styled.div`
  width: 30%;
  text-align: center;
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: normal;
  ${(props) =>
    props.changeColor
      ? css`
          color: #f04545;
        `
      : css`
          opacity: 0.3;
        `}
`;

const AverageLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  margin: 0 0px;
`;

const BlueTeamData = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  width: 30%;
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: normal;
  ${(props) =>
    props.changeColor
      ? css`
          color: #f04545;
        `
      : css`
          opacity: 0.3;
        `}
`;

// chart styling

const ChartBox = styled.div`
  justify-content: space-between;
  margin-top: 31px;
  margin-right: 22px;
`;

const FirstGankChart = styled.div`
  width: 538px;
  height: 317px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
  margin-bottom: 15px;
`;

const LineSupportChart = styled.div`
  width: 538px;
  height: 317px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50.5px;
  border-bottom: 1px solid rgb(35, 33, 42);
  .AverageTime {
    width: 61px;
    font-family: "Spoqa Han Sans";
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
    font-family: "Spoqa Han Sans";
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
    font-family: "Spoqa Han Sans";
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

const CompareTeamStat = styled.div`
  /* padding: 20px; */
  height: 317px;
`;
