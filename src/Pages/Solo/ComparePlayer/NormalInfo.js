import React, { useRef, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import {
  Champion,
  Champion_Eng,
  Opp_Champion,
  Opp_Champion_Eng,
  ResetChampion,
  ResetChampion2,
  ResetOppChampion,
} from "../../../redux/modules/filtervalue";
import qs from "qs";
import axiosRequest from "../../../lib/axiosRequest";

function NormalInfo() {
  //기본정보 탭
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [player, setPlayer] = useState();
  const [oppPlayer, setOppPlayer] = useState();
  const [champFilter, setChampFilter] = useState();
  const [champEng, setChampEng] = useState();
  const [oppFilter, setOppFilter] = useState();
  const [oppEng, setOppEng] = useState();
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [oppData, setOppData] = useState();

  const [isActiveOpp, setIsActiveOpp] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  useEffect(() => {
    GetComparisonStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.player, filters.patch, filters.oppplayer, filters.resetchamp]);

  // const resetChamp = useCallback(() => {
  //   dispatch(ResetChampion());
  //   GetComparisonStat();
  // }, [dispatch]);

  const GetComparisonStat = () => {
    setLoading(true);
    const url = `${API}/api/player/comparison`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      player: filters.player,
      oppteam: filters.oppteam,
      oppplayer: filters.oppplayer,
      champion: filters.champion_eng,
      oppchampion: filters.oppchampion_eng,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      const copy = e.data[filters.player];
      const copyoppData = e.data[filters.oppplayer];
      setData(copy);
      setOppData(copyoppData);
      //선수 데이터
      setPlayer({
        line: copy.line.toFixed(1),
        investment: copy.investment.toFixed(1),
        loss: copy.loss.toFixed(1),
        match: copy.match.toFixed(1),
        gold: copy.gold.toFixed(1),
      });
      //상대 선수 데이터
      setOppPlayer({
        line: copyoppData.line.toFixed(1),
        investment: copyoppData.investment.toFixed(1),
        loss: copyoppData.loss.toFixed(1),
        match: copyoppData.match.toFixed(1),
        gold: copyoppData.gold.toFixed(1),
      });
      setLoading(false);
    });
  };

  //챔피언 필터
  const GetChampionFilter = () => {
    const url = `${API}/api/filter/champion2`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      player: filters.player,
      oppplayer: filters.oppplayer,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      setChampFilter(e.data.champion);
      setChampEng(e.data.championEng);
    });
  };
  //상대 챔피언 필터
  const GetOppFilter = () => {
    const url = `${API}/api/filter/oppchampion2?`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      champion: filters.champion_eng,
      player: filters.player,
      oppplayer: filters.oppplayer,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      setOppFilter(e.data.champion);
      setOppEng(e.data.championEng);
    });
  };

  // 오각형 그래프 세팅
  const RadarData = {
    labels: [
      t("solo.comparison.LanePhase"),
      t("solo.comparison.smartDmg"),
      t("solo.comparison.smartTank"),
      t("solo.comparison.teamfight"),
      t("solo.comparison.growth"),
    ],
    datasets: [
      {
        label: filters.player,
        backgroundColor: "rgba(240, 69, 69, 0.2)",
        borderColor: "#f04545",
        pointBackgroundColor: "rgba(240, 69, 69, 0.2)",
        poingBorderColor: "#f04545",
        pointHoverBackgroundColor: "#f04545",
        pointHoverBorderColor: "rgba(240, 69, 69, 0.2)",
        data: [
          player?.line,
          player?.investment,
          player?.loss,
          player?.match,
          player?.gold,
        ],
        pointStyle: "line",
      },
      {
        label: filters.oppplayer,
        backgroundColor: "rgba(0, 117, 191, 0.2)",
        borderColor: "#0075bf",
        pointBackgroundColor: "rgba(0, 117, 191, 0.2)",
        poingBorderColor: "#0075bf",
        pointHoverBackgroundColor: "#0075bf",
        pointHoverBorderColor: "rgba(0, 117, 191, 0.2)",
        data: [
          oppPlayer?.line,
          oppPlayer?.investment,
          oppPlayer?.loss,
          oppPlayer?.match,
          oppPlayer?.gold,
        ],
        pointStyle: "line",
      },
    ],
  };

  //오각형 그래프 옵션
  const options = {
    tooltips: {
      intersect: false,
      enabled: true,
      callbacks: {
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    legend: {
      display: true,
      position: "top",
      align: "start",
      labels: {
        usePointStyle: true,
        fontColor: "rgb(255, 255, 255)",
      },
    },
    scale: {
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
      angleLines: {
        color: "rgb(67, 63, 78)",
        lineWidth: 1,
      },
      gridLines: {
        color: "rgb(67, 63, 78)",
      },
    },
  };
  if (loading) return <LoadingImg />;
  return (
    <NormalInfoWrapper>
      <PlayerCompareWrapper>
        <div className="RedSidePlayer">
          <img
            src={data?.playerInfo.Image}
            width="94px"
            height="74px"
            alt="PlayerIcon"
            onError={(e) => {
              e.target.src = "Images/player_error_image.png";
            }}
          />
        </div>
        <img
          className="PositionIcon"
          src={`Images/ico-position-${filters.position}.png`}
          width="28.6px"
          height="28.6px"
          alt="PositionIcon"
        />
        <div className="NameContainer">
          <span className="NickName">
            {lang === "kr"
              ? data?.playerInfo.NativeName
              : data?.playerInfo.Name}
          </span>
          <span className="RealName">{data?.playerInfo.ID}</span>
        </div>
        <div className="AverageBox">
          <div className="PerformanceTitle">
            {t("solo.comparison.avgScore")}
          </div>
          <PerformanceValue
            color={data?.sbrAvg < oppData?.sbrAvg}
            className="PerformanceValue"
          >
            {data?.sbrAvg.toFixed(1)}
          </PerformanceValue>
        </div>
        <div className="AverageBoxTwo">
          <div className="PerformanceTitle">
            {t("solo.comparison.bestScore")}
          </div>
          <PerformanceValue
            color={data?.sbrMax < oppData?.sbrMax}
            className="PerformanceValue"
          >
            {data?.sbrMax.toFixed(1)}
          </PerformanceValue>
        </div>
        <div className="Vs">VS</div>
        <div className="AverageBox">
          <div className="PerformanceTitle">
            {t("solo.comparison.avgScore")}
          </div>
          <PerformanceValue2
            color={data?.sbrAvg > oppData?.sbrAvg}
            className="PerformanceValueBlue"
          >
            {oppData?.sbrAvg.toFixed(1)}
          </PerformanceValue2>
        </div>
        <div className="AverageBoxTwo">
          <div className="PerformanceTitle">
            {t("solo.comparison.bestScore")}
          </div>
          <PerformanceValue2
            color={data?.sbrMax > oppData?.sbrMax}
            className="PerformanceValueBlue"
          >
            {oppData?.sbrMax.toFixed(1)}
          </PerformanceValue2>
        </div>
        <div className="NameContainerBlue">
          <span className="NickName">
            {lang === "kr"
              ? oppData?.playerInfo.NativeName
              : oppData?.playerInfo.Name}
          </span>
          <span className="RealName">{oppData?.playerInfo.ID}</span>
        </div>
        <img
          className="PositionIcon"
          src={`Images/ico-position-${filters.position}.png`}
          alt="PositionIcon"
          width="28.6px"
          height="28.6px"
        />
        <div className="BlueSidePlayer">
          <img
            src={oppData?.playerInfo.Image}
            width="94px"
            height="74px"
            alt="PlayerIcon"
            onError={(e) => {
              e.target.src = "Images/player_error_image.png";
            }}
          />
        </div>
      </PlayerCompareWrapper>
      <PlayerStatWrapper>
        <div className="records red">{`${data?.total}${t(
          "solo.comparison.total"
        )} ${data?.win}${t("solo.comparison.win")} ${data?.lose}${t(
          "solo.comparison.lose"
        )}`}</div>
        <span className="leftGradient"></span>
        <div className="soloRecord">{t("solo.comparison.statLabel")}</div>
        <span className="rightGradient"></span>
        <div className="records blue">{`${oppData?.total}${t(
          "solo.comparison.total"
        )} ${oppData?.win}${t("solo.comparison.win")} ${oppData?.lose}${t(
          "solo.comparison.lose"
        )}`}</div>
      </PlayerStatWrapper>
      <NormalCompare>
        {/* <ChampionSettingNav>
          <SettingTitle>
            <span className="Title">{t("solo.comparison.champSetting")}</span>
            <img
              src="Images/ico-notice-gy.png"
              width="14px"
              height="14px"
              alt="noticeIcon"
            />
            <span className="Alert">{t("solo.comparison.settingLabel")}</span>
          </SettingTitle>
          <DropDownContainer>
            <div className="DropDown">
              <DropDown className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActive(!isActive);
                      GetChampionFilter();
                      dispatch(ResetOppChampion());
                    }}
                    className="menu-trigger"
                  >
                    <img
                      className="ChampIconImg"
                      src="Images/ico-champion-select.png"
                      alt="champIcon"
                    />
                    <span className="Label">
                      {t("solo.comparison.filtersLabel")}
                    </span>
                    <span className="SelectedLabel">
                      {filters.champion
                        ? filters.champion
                        : t("filters.allChampLabel")}
                    </span>
                    <img
                      className="ArrowIcon"
                      src="Images/ico-filter-arrow.png"
                      alt="arrowIcon"
                    />
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
              </DropDown>
            </div>
            <div className="Vs">VS</div>
            <div className="DropDown">
              <DropDown className="container">
                <div className="menu-container">
                  <button
                    onClick={() => {
                      setIsActiveOpp(!isActiveOpp);
                      GetOppFilter();
                    }}
                    className="menu-trigger"
                  >
                    <img
                      className="ChampIconImg"
                      src="Images/ico-champion-select.png"
                      alt="champIcon"
                    />
                    <span className="Label">
                      {t("solo.comparison.filtersLabel2")}
                    </span>
                    <span className="SelectedLabel">
                      {filters.oppchampion
                        ? filters.oppchampion
                        : t("filters.allChampLabel")}
                    </span>
                    <img
                      className="ArrowIcon"
                      src="Images/ico-filter-arrow.png"
                      alt="arrowIcon"
                    />
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
              </DropDown>
            </div>
            <button
              className="Select"
              onClick={() => {
                dispatch(ResetChampion2(""));
                GetComparisonStat();
              }}
            >
              {t("solo.comparison.apply")}
            </button>
            <button
              className="Reset"
              onClick={() => {
                dispatch(ResetChampion("reset"));
                // GetComparisonStat();
              }}
            >
              <img
                src="Images/ico-team-video-return-off.png"
                width="10px"
                height="10px"
                alt="resetICon"
              />
              <p>{t("solo.comparison.reset")}</p>
            </button>
          </DropDownContainer>
        </ChampionSettingNav> */}
        <CompareChart>
          <Radar type="radar" data={RadarData} options={options} />
        </CompareChart>
      </NormalCompare>
    </NormalInfoWrapper>
  );
}

export default NormalInfo;

const PlayerStatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  background-color: #23212a;
  margin: 20px 0;
  border-radius: 16px;
  > .leftGradient {
    width: 49px;
    height: 26px;
    margin-left: 170px;
    /* background-image: linear-gradient(
      to left,
      rgb(38, 35, 45),
      rgb(22, 21, 26)
    ); */
  }
  > .rightGradient {
    width: 49px;
    height: 26px;
    margin-right: 170px;
    /* background-image: linear-gradient(
      to right,
      rgb(38, 35, 45),
      rgb(22, 21, 26)
    ); */
  }
  > .soloRecord {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 26px;
    background-color: rgb(38, 35, 45);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.65px;
    color: #fff;
  }
  > .records {
    font-family: "Spoqa Han Sans";
    font-size: 14px;
    line-height: 32px;
    background-color: #23212a;
    font-weight: bold;
  }

  > .red {
    color: #f04545;
  }

  > .blue {
    color: #0075bf;
  }
`;

const PerformanceValue = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgb(240, 69, 69);

  .PerformanceValueBlue {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #0075bf;
  }
  ${(props) =>
    props.color &&
    css`
      color: #6b6979;
    `}
`;

const PerformanceValue2 = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #0075bf;
  ${(props) =>
    props.color &&
    css`
      color: #6b6979;
    `}
`;

const PlayerCompareWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  width: 100%;
  border-radius: 20px;
  background-color: #23212a;
  background-image: url("Images/full-gradient.png");
  background-repeat: no-repeat;
  .RedSidePlayer {
    width: 105px;
    height: 77px;
  }
  .BlueSidePlayer {
    display: flex;
    justify-content: flex-end;
    width: 105px;
    height: 77px;
  }

  .NameContainer {
    display: flex;
    width: 140px;
    flex-direction: column;
    margin-left: 9.4px;
  }
  .NameContainerBlue {
    display: flex;
    width: 140px;
    flex-direction: column;
    margin-right: 9.4px;
    text-align: right;
  }
  .NickName {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    color: rgb(132, 129, 142);
    margin-bottom: 3px;
  }
  .RealName {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: rgb(255, 255, 255);
  }
  .PerformanceTitle {
    /* width: 80px; */
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-bottom: 4.7px;
    text-align: center;
  }

  .AverageBox {
    width: 80px;
    :nth-child(7) {
      margin-right: 35px;
    }
  }
  .AverageBoxTwo {
    width: 80px;

    :nth-of-type(4) {
      margin-left: 35px;
    }
  }
  .Vs {
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    color: rgb(107, 105, 121);
    margin: 0 55px;
  }
`;

const NormalInfoWrapper = styled.div``;

const NormalCompare = styled.div`
  margin-top: 22px;
  width: 100%;
  border-radius: 20px;
  background-color: rgb(47, 45, 56);
`;

const ChampionSettingNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 115px;
  border-bottom: solid 1px rgb(58, 55, 69);
`;

const CompareChart = styled.div`
  height: 579px;
  padding: 22px;
  background-color: #23212a;
  border-radius: 20px;
`;

const SettingTitle = styled.div`
  display: flex;
  align-items: center;
  .Title {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.65px;
    color: rgb(255, 255, 255);
    margin: 0 15px 0 23px;
  }
  .Alert {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    color: rgb(132, 129, 142);
    margin-left: 4px;
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0 0 23px;

  .Vs {
    font-family: Poppins;
    font-size: 15px;
    font-weight: bold;
    color: rgb(132, 129, 142);
    margin: 0 15px;
  }
  .Select {
    width: 84px;
    height: 40px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    color: rgb(255, 255, 255);
    margin: 0 10px;
  }
  .Reset {
    display: flex;
    align-items: center;
    width: 64px;
    height: 40px;
    border-radius: 3px;
    border: solid 1px #474554;
    background-color: #3a3745;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    color: rgb(175, 173, 190);
    p {
      margin-left: 5px;
    }
  }
`;

const DropDown = styled.div`
  margin: 0;
  padding: 0;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
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
    width: 421px;
    height: 40px;
    background-color: #23212a;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .SelectedLabel {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 160px;
    margin-left: 20px;
  }

  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin: 0 0px 0 11.4px;
    width: 170px;
    border-right: 1px solid rgb(72, 70, 85);
  }

  .ArrowIcon {
    /* position: fixed;
    margin-left: 390px; */
  }

  .ChampIconImg {
    /* position: fixed; */
    margin-left: 13.1px;
  }

  .menu {
    background: rgb(35, 33, 42);
    position: absolute;
    top: 40px;
    right: 0;
    width: 210px;
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
    font-family: NotoSansKR, Apple SD Gothic Neo;
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
