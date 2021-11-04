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
  Legend
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
  const GetInGameData = async () => {
    setLoading(true);
    const url = `${API}/api/team/comparisonPi`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      oppteam: filters.oppteam,
      token: user.token,
      id: user.id
    }
    axiosRequest(url, params, function (e) {
      setTeamName({
        team: e.data[filters.team].teamName,
        oppteam: e.data[filters.oppteam].teamName
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
    return <span style={{ color: "white", fontSize: "12px" }}>{value}</span>;
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
      <DisplayTeams>
        <div className="RedSide">
          <img
            src={`Images/TeamLogo/${filters.team}.png`}
            width="54px"
            height="54px"
            alt="teamIcon"
          />
          <div className="TeamOne">{teamName?.team}</div>
        </div>
        <div className="Vs">VS</div>
        <div className="BlueSide">
          <img
            src={`Images/TeamLogo/${filters.oppteam}.png`}
            width="54px"
            height="54px"
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
        <GameDataBox>
          <RedTeamData
            changeColor={redData?.IngameStats["dragons"].result === true}
          >{`${redData?.IngameStats["dragons"].value.toFixed(1)}${t(
            "team.comparison.times"
          )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.slayedDragon")}</AverageLabel>
          <BlueTeamData
            changeColor={blueData?.IngameStats["dragons"].result === true}
          >{`${blueData?.IngameStats["dragons"].value.toFixed(
            1)}${t(
              "team.comparison.times"
            )}`}</BlueTeamData>
        </GameDataBox>
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
        <GameDataBox>
          <RedTeamData
            changeColor={redData?.IngameStats["heralds"].result === true}
          >{`${redData?.IngameStats["heralds"].value.toFixed(1)}${t(
            "team.comparison.times"
          )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.avgHerald")}</AverageLabel>
          <BlueTeamData
            changeColor={blueData?.IngameStats["heralds"].result === true}
          >{`${blueData?.IngameStats["heralds"].value.toFixed(
            1
          )}${t(
            "team.comparison.times"
          )}`}</BlueTeamData>
        </GameDataBox>
        <GameDataBox>
          <RedTeamData
            changeColor={redData?.IngameStats["barons"].result === true}
          >{`${redData?.IngameStats["barons"].value.toFixed(1)}${t(
            "team.comparison.times"
          )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.baron")}</AverageLabel>
          <BlueTeamData
            changeColor={blueData?.IngameStats["barons"].result === true}
          >{`${blueData?.IngameStats["barons"].value.toFixed(
            1
          )}${t(
            "team.comparison.times"
          )}`}</BlueTeamData>
        </GameDataBox>
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
        <GameDataBox>
          <RedTeamData
            changeColor={
              redData?.IngameStats["numberOfTeamFight"].result === true
            }
          >{`${redData?.IngameStats["numberOfTeamFight"].winRate.toFixed(
            1
          )}${t(
            "team.comparison.times"
          )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.avgTeamFight")}</AverageLabel>
          <BlueTeamData
            changeColor={
              blueData?.IngameStats["numberOfTeamFight"].result === true
            }
          >{`${blueData?.IngameStats["numberOfTeamFight"].winRate.toFixed(
            1
          )}${t(
            "team.comparison.times"
          )}`}</BlueTeamData>
        </GameDataBox>
      </CompareStats>
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
              margin={{ top: 20, right: 20, bottom: 5, left: -20 }}
              data={gank ? Object.values(gank) : 0}
            >
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <CartesianGrid stroke="#3a3745" vertical={false} />
              <XAxis
                dataKey="x"
                stroke="#3a3745 "
                tick={{ fill: "#84818e", fontSize: 12 }}
              />
              <YAxis
                type="number"
                domain={[gankDomain?.firstGankMin, gankDomain?.firstGankMax]}
                stroke="#3a3745 "
                tick={{
                  fill: "#84818e",
                  fontSize: 12
                }}
                ticks={gankTicks}
              />
              <Legend
                verticalAlign="top"
                align="left"
                wrapperStyle={{ top: 10, left: 20 }}
                height={36}
                iconType="plainline"
                formatter={renderColorfulLegendText}
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
              height={250}
              margin={{ top: 20, right: 20, bottom: 5, left: -20 }}
              data={support ? Object.values(support) : 0}
            >
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <CartesianGrid stroke="#3a3745" vertical={false} />
              <XAxis
                dataKey="x"
                stroke="#3a3745 "
                tick={{ fill: "#84818e", fontSize: 12 }}
              />
              <YAxis
                domain={[
                  supportDomain?.supportedTimeMin,
                  supportDomain?.supportedTimeMax
                ]}
                stroke="#3a3745 "
                tick={{
                  fill: "#84818e",
                  fontSize: 12
                }}
                ticks={supportTicks}
              />
              <Legend
                verticalAlign="top"
                align="left"
                wrapperStyle={{ top: 10, left: 20 }}
                height={36}
                iconType="plainline"
                formatter={renderColorfulLegendText}
              />
              <Bar dataKey="y1" name={Team} fill="#f04545" barSize={28} />
              <Bar dataKey="y2" name={OppTeam} fill="#005489" barSize={28} />
            </BarChart>
          </CompareTeamStat>
        </LineSupportChart>
      </ChartBox>
    </CompareIngameWrapper>
  );
}

export default CompareIngame;

const CustomTool = styled.div`
  background-color: rgba(35, 33, 42, 0.9);
  padding: 10px;
  width: 100%;
  color: white;
  font-size: 12px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  > p {
    margin-bottom: 6px;
  }

  > .title {
    font-size: 14px;
    margin-bottom: 6px;
  }
  > .player {
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
    display: flex;
    color: #84818e;
    > .value {
      margin-left: 3px;
      color: white;
    }
  }
`;

const CompareIngameWrapper = styled.div`
`;

const DisplayTeams = styled.div`
  background-color: #16151a;
  position: relative;
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding : 60px 20px;
  margin-bottom: 20px;

  .RedSide, .BlueSide {
    display: flex;
    flex-direction: column;
    width: 475px;
    align-items: center;
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
  }

  .Vs {
    position: absolute;
    top: 50%;
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    color :#6b6979 ;  
  }
`;

const CompareStats = styled.div``;


const GameDataBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 140px;
  border-top: 1px solid  #433f4e;
  color: #fff;
`;

const RedTeamData = styled.div`
  width:30%;
  text-align: center;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 23px;
  font-weight: bold;
  ${(props) =>
    props.changeColor ?
      css`
      color: #f04545;
    ` :
      css`
    opacity: 0.3;
  `
  }   
`;


const AverageLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:30%;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 23px;
  font-weight: 300;
  letter-spacing: -0.95px;
  margin: 0 30px;
`;


const BlueTeamData = styled.div`
  display: flex;
  justify-content: space-around;
  padding : 20px;
  width:30%;
  font-size: 23px;
  font-weight: bold;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  ${(props) =>
    props.changeColor ?
      css`
      color: #f04545;
    ` :
      css`
    opacity: 0.3;
  `
  } 
`;

// chart styling

const ChartBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 31px;
`;

const FirstGankChart = styled.div`
  width: 538px;
  height: 293px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const LineSupportChart = styled.div`
  width: 538px;
  height: 293px;
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

const CompareTeamStat = styled.div`
  /* padding: 20px; */
  height: 250px;
`;
