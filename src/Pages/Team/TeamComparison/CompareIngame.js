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
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/team/comparisonPi`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
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
      team: result.data[filters.team].teamName,
      oppteam: result.data[filters.oppteam].teamName
    });
    let gankTicks = "";
    //첫 갱크 데이터 min,max,stepsize 값
    if (
      result.data[Team]?.firstGank.firstGankMax >
      result.data[OppTeam]?.firstGank.firstGankMax
    ) {
      setGankDomain(result.data[Team]?.firstGank);
      gankTicks = result.data[Team];
    } else {
      setGankDomain(result.data[OppTeam]?.firstGank);
      gankTicks = result.data[OppTeam];
    }

    //첫 갱크 데이터 가져와서 x,y로 나눠서 배열로 만듬
    const gankData = result.data[Team]?.firstGank.firstGankList?.map((gank) => {
      return { x: gank.position, y1: gank.gankCount };
    });

    const gankData2 = result.data[OppTeam]?.firstGank.firstGankList?.map(
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
      result.data[Team]?.supportedTime.supportedTimeMax >
      result.data[OppTeam]?.supportedTime.supportedTimeMax
    ) {
      supTicks = result.data[Team];
      setSupportDomain(result.data[Team]?.supportedTime);
    } else {
      supTicks = result.data[OppTeam];
      setSupportDomain(result.data[OppTeam]?.supportedTime);
    }

    //첫 서포팅 데이터 가져와서 x,y로 나눠서 배열로 만듬
    const supData = result.data[Team]?.supportedTime.supportedTimeList?.map(
      (sup) => {
        return { x: sup.position, y1: sup.value };
      }
    );
    const supData2 = result.data[OppTeam]?.supportedTime.supportedTimeList.map(
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
    setRedData(result.data[Team]);
    setBlueData(result.data[OppTeam]);
    setLoading(false);
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
      <CompareStats>
        <GameDataBox>
          <RedTeamData
          // changeColor={redData?.IngameStats["gameTime"].result === true}
          >{`${redData?.IngameStats["match"]}${t("team.comparison.total")} ${redData?.IngameStats["win"]
            }${t("team.comparison.win")} ${redData?.IngameStats["lose"]}${t(
              "team.comparison.lose"
            )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.record")}</AverageLabel>
          <BlueTeamData
          // changeColor={blueData?.IngameStats["gameTime"].result === true}
          >{`${blueData?.IngameStats["match"]}${t("team.comparison.total")} ${blueData?.IngameStats["win"]
            }${t("team.comparison.win")} ${blueData?.IngameStats["lose"]}${t(
              "team.comparison.lose"
            )}`}</BlueTeamData>
        </GameDataBox>
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
          >{`${redData?.IngameStats["dragons"].value.toFixed(1)}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.slayedDragon")}</AverageLabel>
          <BlueTeamData
            changeColor={blueData?.IngameStats["dragons"].result === true}
          >{`${blueData?.IngameStats["dragons"].value.toFixed(
            1
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
          >{`${redData?.IngameStats["heralds"].value.toFixed(1)}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.avgHerald")}</AverageLabel>
          <BlueTeamData
            changeColor={blueData?.IngameStats["heralds"].result === true}
          >{`${blueData?.IngameStats["heralds"].value.toFixed(
            1
          )}`}</BlueTeamData>
        </GameDataBox>
        <GameDataBox>
          <RedTeamData
            changeColor={redData?.IngameStats["barons"].result === true}
          >{`${redData?.IngameStats["barons"].value.toFixed(1)}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.baron")}</AverageLabel>
          <BlueTeamData
            changeColor={blueData?.IngameStats["barons"].result === true}
          >{`${blueData?.IngameStats["barons"].value.toFixed(
            1
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
          )}`}</RedTeamData>
          <AverageLabel>{t("team.comparison.avgTeamFight")}</AverageLabel>
          <BlueTeamData
            changeColor={
              blueData?.IngameStats["numberOfTeamFight"].result === true
            }
          >{`${blueData?.IngameStats["numberOfTeamFight"].winRate.toFixed(
            1
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

const CompareIngameWrapper = styled.div``;

const DisplayTeams = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  margin-bottom: 31px;
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

const CompareStats = styled.div``;

const ChartBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 31px;
`;

const GameDataBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AverageLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 22px;
  background-color: rgb(47, 45, 56);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.95px;

  color: rgb(129, 126, 144);
  margin: 0 30px;
`;

const RedTeamData = styled.div`
  /* display: flex; */
  width: 300px;
  font-family: Poppins;
  font-size: 13px;
  text-align: right;
  color: #84818e;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
    `}
`;

const BlueTeamData = styled.div`
  width: 300px;
  font-family: Poppins;
  font-size: 13px;
  text-align: left;
  color: #84818e;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
    `}
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
