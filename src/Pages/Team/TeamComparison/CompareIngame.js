import React, { useEffect, useState, useRef} from "react";
import styled, { css } from "styled-components";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import { API } from "../../config";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  active,
  payload,
  label,

} from "recharts";
import axiosRequest from "../../../lib/axiosRequest";
import { useDispatch } from "react-redux";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import {  HandleTab
} from '../../../redux/modules/filtervalue';

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
  const dispatch = useDispatch();
  const pagePath = document.location.pathname;
  const isInitialMount = useRef(true);


  useEffect(() => {
    if(isInitialMount.current) {
      isInitialMount.current = false;
    }else {
      if(pagePath === "/team")  {
        dispatch(HandleTab(0));
      }  
    }
  }, [filters.team])

  useEffect(() => {
    // 모달창이 닫혀있으면서 팀비교 탭인 경우에만 인게임지표 api 호출
    if (!filters.compareModal && filters.tab === 2) {
      GetInGameData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.compareModal, filters.tab, filters.patch]);

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
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setTeamName({
          team: filters.team,
          oppteam: filters.oppteam,
        });
        let gankTicks = "";
        //첫 갱크 데이터 min,max,stepsize 값
        if (
          e[Team]?.firstGank.firstGankMax > e[OppTeam]?.firstGank.firstGankMax
        ) {
          setGankDomain(e[Team]?.firstGank);
          gankTicks = e[Team];
        } else {
          setGankDomain(e[OppTeam]?.firstGank);
          gankTicks = e[OppTeam];
        }

        //첫 갱크 데이터 가져와서 x,y로 나눠서 배열로 만듬
        const gankData = e[Team]?.firstGank.firstGankList?.map((gank) => {
          return { x: gank.position, y1: gank.gankCount };
        });

        const gankData2 = e[OppTeam]?.firstGank.firstGankList?.map((gank) => {
          return { x: gank.position, y2: gank.gankCount };
        });
        for (let i = 0; i < gankData.length; i++) {
          Object.assign(gankData[i], gankData2[i]);
          setGank(gankData);
        }
        //첫 서포팅 데이터 min, max, stepsize값
        let supTicks = "";
        if (
          e[Team]?.supportedTime.supportedTimeMax >
          e[OppTeam]?.supportedTime.supportedTimeMax
        ) {
          supTicks = e[Team];
          setSupportDomain(e[Team]?.supportedTime);
        } else {
          supTicks = e[OppTeam];
          setSupportDomain(e[OppTeam]?.supportedTime);
        }

        //첫 서포팅 데이터 가져와서 x,y로 나눠서 배열로 만듬
        const supData = e[Team]?.supportedTime.supportedTimeList?.map((sup) => {
          return { x: sup.position, y1: sup.value };
        });
        const supData2 = e[OppTeam]?.supportedTime.supportedTimeList.map(
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
        setRedData(e[Team]);
        setBlueData(e[OppTeam]);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    ).finally(setLoading(false));
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
  // 향후 data가 없으면 -1 로 받을 예정

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("payload", payload);
      return (
        payload.length > 1 && (
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
        )
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
                wrapperStyle={{ top: 235, left: 200 }}
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
                wrapperStyle={{ top: 235, left: 200 }}
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
            <div className="imgWrapper">
              <img
                src={
                  filters.team.slice(-2) === ".C"
                    ? `Images/LCK_CL_LOGO/${filters.team}.png`
                    : `Images/TeamLogo/${filters.team}.png`
                }
                width="73px"
                height="73px"
                alt="teamIcon"
              />
            </div>
            <div className="TeamName">{teamName?.team}</div>
          </div>
          <div className="Vs">VS</div>
          <div className="BlueSide">
            <div className="imgWrapper">
              <img
                src={
                  filters.oppteam.slice(-2) === ".C"
                    ? `Images/LCK_CL_LOGO/${filters.oppteam}.png`
                    : `Images/TeamLogo/${filters.oppteam}.png`
                }
                width="73px"
                height="73px"
                alt="teamIcon"
              />
            </div>
            <div className="TeamName">{teamName?.oppteam}</div>
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
            <RedTeamData>{`${redData?.IngameStats["gameTime"]?.minute.toFixed(
              0
            )}${t("team.comparison.min")} ${redData?.IngameStats[
              "gameTime"
            ]?.second.toFixed(0)}${t("team.comparison.sec")}`}</RedTeamData>
            <IndexBox>
              <LeftArrow
                didMyTeamWin={
                  (redData?.IngameStats["gameTime"].minute !==
                    blueData?.IngameStats["gameTime"].minute &&
                    redData?.IngameStats["gameTime"].minute <
                      blueData?.IngameStats["gameTime"].minute) ||
                  (redData?.IngameStats["gameTime"].minute ===
                    blueData?.IngameStats["gameTime"].minute &&
                    redData?.IngameStats["gameTime"].second <
                      blueData?.IngameStats["gameTime"].second)
                }
              ></LeftArrow>
              <AverageLabel>{t("team.comparison.playTime")}</AverageLabel>
              <RightArrow
                didOppTeamWin={
                  (redData?.IngameStats["gameTime"].minute !==
                    blueData?.IngameStats["gameTime"].minute &&
                    redData?.IngameStats["gameTime"].minute >
                      blueData?.IngameStats["gameTime"].minute) ||
                  (redData?.IngameStats["gameTime"].minute ===
                    blueData?.IngameStats["gameTime"].minute &&
                    redData?.IngameStats["gameTime"].second >
                      blueData?.IngameStats["gameTime"].second)
                }
              ></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats["gameTime"]?.minute.toFixed(
              0
            )}${t("team.comparison.min")} ${blueData?.IngameStats[
              "gameTime"
            ]?.second.toFixed(0)}${t("team.comparison.sec")}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData>{`${redData?.IngameStats["firstDragon"].minute.toFixed(
              0
            )}${t("team.comparison.min")} ${redData?.IngameStats[
              "firstDragon"
            ].second.toFixed(0)}${t("team.comparison.sec")}`}</RedTeamData>
            <IndexBox>
              <LeftArrow
                didMyTeamWin={
                  (redData?.IngameStats["firstDragon"].minute !==
                    blueData?.IngameStats["firstDragon"].minute &&
                    redData?.IngameStats["firstDragon"].minute <
                      blueData?.IngameStats["firstDragon"].minute) ||
                  (redData?.IngameStats["firstDragon"].minute ===
                    blueData?.IngameStats["firstDragon"].minute &&
                    redData?.IngameStats["firstDragon"].second <
                      blueData?.IngameStats["firstDragon"].second)
                }
              ></LeftArrow>
              <AverageLabel>{t("team.comparison.firstdragon")}</AverageLabel>
              <RightArrow
                didOppTeamWin={
                  (redData?.IngameStats["firstDragon"].minute !==
                    blueData?.IngameStats["firstDragon"].minute &&
                    redData?.IngameStats["firstDragon"].minute >
                      blueData?.IngameStats["firstDragon"].minute) ||
                  (redData?.IngameStats["firstDragon"].minute ===
                    blueData?.IngameStats["firstDragon"].minute &&
                    redData?.IngameStats["firstDragon"].second >
                      blueData?.IngameStats["firstDragon"].second)
                }
              ></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats[
              "firstDragon"
            ].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["firstDragon"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData>{`${redData?.IngameStats["dragons"].value.toFixed(
              1
            )}${t("team.comparison.times")}`}</RedTeamData>
            <IndexBox>
              <LeftArrow
                didMyTeamWin={
                  redData?.IngameStats["dragons"].value.toFixed(1) >
                  blueData?.IngameStats["dragons"].value.toFixed(1)
                }
              ></LeftArrow>
              <AverageLabel>{t("team.comparison.slayedDragon")}</AverageLabel>
              <RightArrow
                didOppTeamWin={
                  redData?.IngameStats["dragons"].value.toFixed(1) <
                  blueData?.IngameStats["dragons"].value.toFixed(1)
                }
              ></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats["dragons"].value.toFixed(
              1
            )}${t("team.comparison.times")}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            {redData?.IngameStats["firstHerald"].minute === 0
              ? (<RedTeamData> - </RedTeamData>) :
              (<RedTeamData>{`${redData?.IngameStats["firstHerald"].minute.toFixed(
              0
            )}${t("team.comparison.min")} ${redData?.IngameStats[
              "firstHerald"
                ].second.toFixed(0)}${t("team.comparison.sec")}`}</RedTeamData>)}
            <IndexBox>
              {redData?.IngameStats["firstHerald"].minute === 0 ?
                (<LeftArrow didMyTeamWin={false}></LeftArrow>) :
                (<LeftArrow
                didMyTeamWin={
                  (redData?.IngameStats["firstHerald"].minute !==
                    blueData?.IngameStats["firstHerald"].minute &&
                    redData?.IngameStats["firstHerald"].minute <
                      blueData?.IngameStats["firstHerald"].minute) ||
                  (redData?.IngameStats["firstHerald"].minute ===
                    blueData?.IngameStats["firstHerald"].minute &&
                    redData?.IngameStats["firstHerald"].second <
                      blueData?.IngameStats["firstHerald"].second) ||
                    (blueData?.IngameStats["firstHerald"].minute === 0 &&
                      blueData?.IngameStats["firstHerald"].second === 0)
                }
                ></LeftArrow>)}
              <AverageLabel>{t("team.comparison.firstHerald")}</AverageLabel>
              {blueData?.IngameStats["firstHerald"].minute === 0 ?
                (<RightArrow didOppTeamWin={false}></RightArrow>) :
                (<RightArrow
                didOppTeamWin={
                  (redData?.IngameStats["firstHerald"].minute !==
                    blueData?.IngameStats["firstHerald"].minute &&
                    redData?.IngameStats["firstHerald"].minute >
                      blueData?.IngameStats["firstHerald"].minute) ||
                  (redData?.IngameStats["firstHerald"].minute ===
                    blueData?.IngameStats["firstHerald"].minute &&
                    redData?.IngameStats["firstHerald"].second >
                      blueData?.IngameStats["firstHerald"].second) ||
                    (redData?.IngameStats["firstHerald"].minute === 0 &&
                      redData?.IngameStats["firstHerald"].second === 0)
                }
                ></RightArrow>)}
            </IndexBox>
            {blueData?.IngameStats["firstHerald"].minute === 0 ?
              (<BlueTeamData> - </BlueTeamData>) :
              (<BlueTeamData>{`${blueData?.IngameStats[
              "firstHerald"
            ].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["firstHerald"].second.toFixed(0)}${t(
              "team.comparison.sec"
                )}`}</BlueTeamData>)}
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData>{`${redData?.IngameStats["heralds"].value.toFixed(
              1
            )}${t("team.comparison.times")}`}</RedTeamData>
            <IndexBox>
              <LeftArrow
                didMyTeamWin={
                  redData?.IngameStats["heralds"].value.toFixed(1) >
                  blueData?.IngameStats["heralds"].value.toFixed(1)
                }
              ></LeftArrow>
              <AverageLabel>{t("team.comparison.avgHerald")}</AverageLabel>
              <RightArrow
                didOppTeamWin={
                  redData?.IngameStats["heralds"].value.toFixed(1) <
                  blueData?.IngameStats["heralds"].value.toFixed(1)
                }
              ></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats["heralds"].value.toFixed(
              1
            )}${t("team.comparison.times")}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData>{`${redData?.IngameStats["barons"].value.toFixed(
              1
            )}${t("team.comparison.times")}`}</RedTeamData>
            <IndexBox>
              <LeftArrow
                didMyTeamWin={
                  redData?.IngameStats["barons"].value.toFixed(1) >
                  blueData?.IngameStats["barons"].value.toFixed(1)
                }
              ></LeftArrow>
              <AverageLabel>{t("team.comparison.baron")}</AverageLabel>
              <RightArrow
                didOppTeamWin={
                  redData?.IngameStats["barons"].value.toFixed(1) <
                  blueData?.IngameStats["barons"].value.toFixed(1)
                }
              ></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats["barons"].value.toFixed(
              1
            )}${t("team.comparison.times")}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData>{`${redData?.IngameStats[
              "timeOfFirstGank"
            ].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${redData?.IngameStats["timeOfFirstGank"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</RedTeamData>
            <IndexBox>
              <LeftArrow></LeftArrow>
              <AverageLabel>{t("team.comparison.firstGank")}</AverageLabel>
              <RightArrow></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats[
              "timeOfFirstGank"
            ].minute.toFixed(0)}${t(
              "team.comparison.min"
            )} ${blueData?.IngameStats["timeOfFirstGank"].second.toFixed(0)}${t(
              "team.comparison.sec"
            )}`}</BlueTeamData>
          </GameDataBox>
          <div className="under-line"></div>
          <GameDataBox>
            <RedTeamData>{`${redData?.IngameStats[
              "numberOfTeamFight"
            ].winRate.toFixed(1)}${t("team.comparison.times")}`}</RedTeamData>
            <IndexBox>
              <LeftArrow></LeftArrow>
              <AverageLabel>{t("team.comparison.avgTeamFight")}</AverageLabel>
              <RightArrow></RightArrow>
            </IndexBox>
            <BlueTeamData>{`${blueData?.IngameStats[
              "numberOfTeamFight"
            ].winRate.toFixed(1)}${t("team.comparison.times")}`}</BlueTeamData>
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
  /* padding: 20px 10px 10px 10px;   */
  padding: 30px 0;
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

    .imgWrapper {
      width: 100px;
      height: 100px;
      background-color: #23212a;
      border-radius: 50%;
      padding-top: 13px;
      img {
        display: block;
        margin: auto;
      }
    }
    .TeamName {
      margin-top: 10px;
    }
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
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: normal;
  color: #fff;
`;

const AverageLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 169px;
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
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: normal;
  color: #fff;
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

const LeftArrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-right: 8px solid #fff;
  border-bottom: 5px solid transparent;
  visibility: ${(props) => (props.didMyTeamWin ? "visible" : "hidden")};
`;

const RightArrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-left: 8px solid #fff;
  border-bottom: 5px solid transparent;
  visibility: ${(props) => (props.didOppTeamWin ? "visible" : "hidden")};
`;

const IndexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 209px;
`;
