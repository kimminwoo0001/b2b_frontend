import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PlayerCompare from "../Components/PlayerCompare";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import qs from "qs";
import {
  Champion,
  Champion_Eng,
  Opp_Champion,
  Opp_Champion_Eng,
  ResetChampion,
  ResetChampion2,
} from "../../../redux/modules/filtervalue";
import axiosRequest from "../../../lib/axiosRequest";

function OppStat() {
  //상대 전적 기록 탭
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [loading, setLoading] = useState(false);
  const { filters, lang, user } = useSelector((state) => ({
    filters: state.FilterReducer,
    lang: state.LocaleReducer,
    user: state.UserReducer,
  }));
  const [player, setPlayer] = useState();
  const [oppPlayer, setOppPlayer] = useState();
  const [champFilter, setChampFilter] = useState();
  const [champEng, setChampEng] = useState();
  const [oppFilter, setOppFilter] = useState();
  const [oppEng, setOppEng] = useState();
  const [isActiveOpp, setIsActiveOpp] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  useEffect(() => {
    GetComparisonStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.oppplayer, filters.resetchamp, filters.patch]);

  //팀 필터 fetch 함수
  const GetComparisonStat = () => {
    setLoading(true);
    const url = `${API}/lolapi/player/comparisonRecord`;
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
      setPlayer(e[filters.player]);
      setOppPlayer(e[filters.oppplayer]);
    }).finally((e) => {
      setLoading(false);
    });
  };

  const GetChampionFilter = () => {
    const url = `${API}/lolapi/filter/vschampion`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: filters.position,
      team: filters.team,
      oppteam: filters.oppteam,
      oppplayer: filters.oppplayer,
      player: filters.player,
      oppchampion: filters.oppchampion_eng,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      setChampFilter(e.champion);
      setChampEng(e.championEng);
    });
  };

  const GetOppFilter = () => {
    const url = `${API}/lolapi/filter/vschampion`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: filters.position,
      team: filters.oppteam,
      oppteam: filters.team,
      oppplayer: filters.player,
      player: filters.oppplayer,
      champion: filters.champion_eng,
      token: user.token,
      id: user.id,
    };

    axiosRequest(url, params, function (e) {
      setOppFilter(e.champion);
      setOppEng(e.championEng);
    });
  };

  if (loading) return <LoadingImg />;
  return (
    <OppStatWrapper>
      <PlayerCompare />
      {/* 개인전적을 보여주는 의미가 없어 주석처리 */}
      {/* <PlayerStatWrapper>
        <div className="records red">{`${player?.total.value}${t(
          "solo.comparison.total"
        )} ${player?.win}${t("solo.comparison.win")} ${player?.lose}${t(
          "solo.comparison.lose"
        )}`}</div>
        <span className="leftGradient"></span>
        <div className="soloRecord">{t("solo.comparison.statLabel")}</div>
        <span className="rightGradient"></span>
        <div className="records blue">{`${oppPlayer?.total.value}${t(
          "solo.comparison.total"
        )} ${oppPlayer?.win}${t("solo.comparison.win")} ${oppPlayer?.lose}${t(
          "solo.comparison.lose"
        )}`}</div>
      </PlayerStatWrapper> */}
      <OppStatContents>
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
                      // dispatch(ResetOppChampion());
                    }}
                    className="menu-trigger"
                  >
                    <img
                      className="ChampIconImg"
                      src="Images/ico-champion-select.png"
                      alt="champIcon"
                    />
                    <span className="Label">
                      {filters.champion
                        ? filters.champion
                        : lang === "ko"
                        ? `${filters.player} ${t("filters.allChampLabel2")}`
                        : `${t("filters.allChampLabel2")} ${filters.player} `}
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
                      {(lang === "ko" ? champFilter : champEng)?.map(
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
                      {filters.oppchampion
                        ? filters.oppchampion
                        : lang === "ko"
                        ? `${filters.oppplayer} ${t("filters.allChampLabel2")}`
                        : `${t("filters.allChampLabel2")} ${
                            filters.oppplayer
                          } `}
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
                      {(lang === "ko" ? oppFilter : oppEng)?.map(
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
                GetComparisonStat();
                dispatch(ResetChampion2(""));
              }}
            >
              {t("solo.comparison.apply")}
            </button>
            <button
              className="Reset"
              onClick={() => {
                dispatch(ResetChampion("reset"));
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
        <ComapreValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue>
                {`${player?.total.value.toFixed(0)} ${t(
                  "solo.comparison.total"
                )} ${player?.win.toFixed(0)} ${t(
                  "solo.comparison.win"
                )} ${player?.lose.toFixed(0)} ${t("solo.comparison.lose")}`}
              </PlayerValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.statLabelvs")}</div>
            <div className="Wrapper">
              <OppValue>{`${oppPlayer?.total.value.toFixed(0)} ${t(
                "solo.comparison.total"
              )} ${oppPlayer?.win.toFixed(0)} ${t(
                "solo.comparison.win"
              )} ${oppPlayer?.lose.toFixed(0)} ${t(
                "solo.comparison.lose"
              )}`}</OppValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue>
                {`${player?.total.value.toFixed(0)} ${t(
                  "solo.comparison.games"
                )}`}
              </PlayerValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.gamePlayed")}</div>
            <div className="Wrapper">
              <OppValue>{`${oppPlayer?.total.value.toFixed(0)} ${t(
                "solo.comparison.games"
              )}`}</OppValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue color={player?.winRate.result === true}>
                {`${player?.winRate.value.toFixed(1)} %`}
              </PlayerValue>
              <ComparedValue
                color={player?.winRate.result === true ? "true" : 0}
              >
                (
                <img
                  src={
                    player?.winRate.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.winRate.value2).toFixed(1)} %p`}</div>
                )
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.winrate")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.winRate.result === true ? "true" : 0}
              >{`${oppPlayer?.winRate.value.toFixed(1)} %`}</OppValue>
              <OppComparedValue
                color={oppPlayer?.winRate.result === true ? "true" : 0}
              >
                (
                <img
                  src={
                    oppPlayer?.winRate.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.winRate.value2).toFixed(
                  1
                )} %p`}</div>
                )
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.solokill.result === true ? "true" : undefined}
              >
                {`${player?.solokill.value.toFixed(0)} ${t(
                  "solo.comparison.kills"
                )}`}
              </PlayerValue>
              <ComparedValue
                color={player?.solokill.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.solokill.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.solokill.value2).toFixed(0)} `}</div>)
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.solokill")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.solokill.result === true ? "true" : undefined}
              >
                {`${oppPlayer?.solokill.value.toFixed(0)} ${t(
                  "solo.comparison.kills"
                )}`}
              </OppValue>
              <OppComparedValue
                color={oppPlayer?.solokill.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.solokill.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>
                  {`${Math.abs(oppPlayer?.solokill.value2).toFixed(0)}`}
                </div>
                )
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.kda.result === true ? "true" : undefined}
              >
                <div className="WhiteValue">{`${player?.kill.toFixed(0)}`}</div>
                <div className="Slash">/</div>
                <div className="WhiteValue">{`${player?.death.toFixed(
                  0
                )}`}</div>
                <div className="Slash">/</div>
                <div className="WhiteValue">{`${player?.assist.toFixed(
                  0
                )}`}</div>
                <div className="KDAValue">{`${player?.kda.value.toFixed(
                  1
                )}:1`}</div>
              </PlayerValue>
              <ComparedValue
                color={player?.kda.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.kda.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.kda.value2).toFixed(1)}: 1`}</div>)
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.kda")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.kda.result === true ? "true" : undefined}
              >
                <div className="WhiteValue">{`${oppPlayer?.kill.toFixed(
                  0
                )}`}</div>
                <div className="Slash">/</div>
                <div className="WhiteValue">{`${oppPlayer?.death.toFixed(
                  0
                )}`}</div>
                <div className="Slash">/</div>
                <div className="WhiteValue">{`${oppPlayer?.assist.toFixed(
                  0
                )}`}</div>
                <div className="KDAValue">{`${oppPlayer?.kda.value.toFixed(
                  1
                )}:1`}</div>
              </OppValue>
              <OppComparedValue
                color={oppPlayer?.kda.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.kda.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.kda.value2).toFixed(1)}: 1`}</div>)
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.cs.result === true ? "true" : undefined}
              >{`${player?.cs.value.toFixed(1)}`}</PlayerValue>
              <ComparedValue
                color={player?.cs.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.cs.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.cs.value2).toFixed(1)}`}</div>)
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.cs")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.cs.result === true ? "true" : undefined}
              >{`${oppPlayer?.cs.value.toFixed(1)}`}</OppValue>
              <OppComparedValue
                color={oppPlayer?.cs.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.cs.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.cs.value2).toFixed(1)}`}</div>)
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.dpm.result === true ? "true" : undefined}
              >{`${player?.dpm.value.toFixed(1)}`}</PlayerValue>
              <ComparedValue
                color={player?.dpm.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.dpm.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.dpm.value2).toFixed(1)}`}</div>)
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.dpm")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.dpm.result === true ? "true" : undefined}
              >{`${oppPlayer?.dpm.value.toFixed(1)}`}</OppValue>
              <OppComparedValue
                color={oppPlayer?.dpm.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.dpm.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.dpm.value2).toFixed(1)}`}</div>)
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.dtpm.result === true ? "true" : undefined}
              >{`${player?.dtpm.value.toFixed(1)}`}</PlayerValue>
              <ComparedValue
                color={player?.dtpm.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.dtpm.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.dtpm.value2).toFixed(1)}`}</div>)
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.dtpm")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.dtpm.result === true ? "true" : undefined}
              >{`${oppPlayer?.dtpm.value.toFixed(1)}`}</OppValue>
              <OppComparedValue
                color={oppPlayer?.dtpm.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.dtpm.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.dtpm.value2).toFixed(1)}`}</div>)
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.match_parti.result === true ? "true" : undefined}
              >{`${player?.match_parti.value.toFixed(1)} %`}</PlayerValue>
              <ComparedValue
                color={player?.match_parti.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.match_parti.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.match_parti.value2).toFixed(
                  1
                )} %p`}</div>
                )
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.fightParti")}</div>
            <div className="Wrapper">
              <OppValue
                color={
                  oppPlayer?.match_parti.result === true ? "true" : undefined
                }
              >{`${oppPlayer?.match_parti.value.toFixed(1)} %`}</OppValue>
              <OppComparedValue
                color={
                  oppPlayer?.match_parti.result === true ? "true" : undefined
                }
              >
                (
                <img
                  src={
                    oppPlayer?.match_parti.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.match_parti.value2).toFixed(
                  1
                )} %p`}</div>
                )
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.kp.result === true ? "true" : undefined}
              >{`${player?.kp.value.toFixed(1)} %`}</PlayerValue>
              <ComparedValue
                color={player?.kp.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.kp.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.kp.value2).toFixed(1)} %p`}</div>)
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.killParti")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.kp.result === true ? "true" : undefined}
              >{`${oppPlayer?.kp.value.toFixed(1)} %`}</OppValue>
              <OppComparedValue
                color={oppPlayer?.kp.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.kp.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.kp.value2).toFixed(1)} %p`}</div>)
              </OppComparedValue>
            </div>
          </DisplayValue>
          <DisplayValue>
            <div className="Wrapper">
              <PlayerValue
                color={player?.match.result === true ? "true" : undefined}
              >{`${player?.match.value.toFixed(1)} ${t(
                "solo.comparison.sec"
              )}`}</PlayerValue>
              <ComparedValue
                color={player?.match.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    player?.match.result
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(player?.match.value2).toFixed(1)} ${t(
                  "solo.comparison.sec"
                )}`}</div>
                )
              </ComparedValue>
            </div>
            <div className="ValueTitle">{t("solo.comparison.engage")}</div>
            <div className="Wrapper">
              <OppValue
                color={oppPlayer?.match.result === true ? "true" : undefined}
              >{`${oppPlayer?.match.value.toFixed(1)} ${t(
                "solo.comparison.sec"
              )}`}</OppValue>
              <OppComparedValue
                color={oppPlayer?.match.result === true ? "true" : undefined}
              >
                (
                <img
                  src={
                    oppPlayer?.match.result === true
                      ? "Images/ico-teamreport-num-up.png"
                      : "Images/ico-teamreport-num-down-wh.png"
                  }
                  alt="icon"
                />
                <div>{`${Math.abs(oppPlayer?.match.value2).toFixed(1)} ${t(
                  "solo.comparison.sec"
                )}`}</div>
                )
              </OppComparedValue>
            </div>
          </DisplayValue>
        </ComapreValue>
      </OppStatContents>
    </OppStatWrapper>
  );
}

export default OppStat;

const PlayerStatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  background-color: #23212a;
  margin: 20px 0;
  border-radius: 16px;
  /* background-image: url("/Images/red-blue-gradient.png"); */

  > .leftGradient {
    width: 49px;
    height: 26px;
    margin-left: 170px;
  }
  > .rightGradient {
    width: 49px;
    height: 26px;
    margin-right: 170px;
  }
  > .soloRecord {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 26px;
    background-color: rgb(38, 35, 45);
    font-family: NotoSansKR;
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
    color: #fff;
  }
`;

const OppStatWrapper = styled.div`
  /* height: calc(100vh - 215px); */
  height: 100%;
`;

const OppStatContents = styled.div`
  width: 100%;
  border-radius: 20px;
`;

const ChampionSettingNav = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 115px;
  border-bottom: solid 1px rgb(58, 55, 69);
`;

const SettingTitle = styled.div`
  display: flex;
  align-items: center;
  .Title {
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.65px;
    color: rgb(255, 255, 255);
    margin: 0 15px 0 23px;
  }
  .Alert {
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    color: rgb(132, 129, 142);
    margin-left: 4px;
  }
`;

const ComapreValue = styled.div`
  min-height: 571px;
  /* background-color: #23212a; */
  /* border-radius: 20px; */
`;

const PlayerValue = styled.div`
  display: flex;
  font-family: "Spoqa Han Sans";
  font-size: 16px;
  text-align: center;
  margin-right: 5px;
  color: ${(props) => (props.color ? "#f04545" : "#fff")};
  .Slash {
    color: ${(props) => (props.color ? "#f04545" : "#fff")};
    margin: 0 4px 0 4px;
  }
  .KDAValue {
    color: ${(props) => (props.color ? "#f04545" : "#fff")};

    font-weight: bold;
    margin-left: 8px;
  }
`;

const OppValue = styled.div`
  display: flex;
  font-family: "Spoqa Han Sans";
  font-size: 16px;
  text-align: center;
  margin: 5px 0;
  color: ${(props) => (props.color ? "#f04545" : "#fff")};
  .Slash {
    color: ${(props) => (props.color ? "#f04545" : "#fff")};
    margin: 0 4px 0 4px;
  }
  .KDAValue {
    color: ${(props) => (props.color ? "#f04545" : "#fff")};
    font-weight: bold;
    margin-left: 8px;
  }
`;

const DisplayValue = styled.div`
  height: 32px;
  border-bottom: 1px solid #433f4e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: #3a3745;
  }
  .ComparedValue {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Spoqa Han Sans";
    text-align: center;
    color: #f04545;
    img {
      margin: 0 5px 0 5px;
    }
  }
  .OppComparedValue {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Spoqa Han Sans";
    text-align: center;
    color: #817e90;
    img {
      margin: 0 5px 0 5px;
    }
  }
  .Wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 489px;
    div {
      font-size: 16px;
    }
  }

  .ValueTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 22px;
    font-family: "Spoqa Han Sans";
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: center;
    color: #fff;
  }
`;

const ComparedValue = styled.div`
  display: flex;
  align-items: center;
  font-family: "Spoqa Han Sans";
  font-size: 23px;
  text-align: center;
  color: #fff;
  img {
    margin: 0 5px 0 5px;
  }
  ${(props) =>
    props.color &&
    css`
      color: #f04545;
    `}
`;

const OppComparedValue = styled.div`
  display: flex;
  align-items: center;
  font-family: "spoqa hans sans";
  font-size: 23px;

  text-align: center;
  color: #fff;
  img {
    margin: 0 5px 0 5px;
  }
  ${(props) =>
    props.color &&
    css`
      color: #f04545;
    `}
`;

const DropDownContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0 0 23px;

  .Vs {
    font-family: "Spoqa Han Sans";
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
    font-family: "Spoqa Han Sans";
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
    font-family: "Spoqa Han Sans";
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
    /* font-family: "Spoqa Han Sans", Arial, Helvetica, sans-serif; */
    font-family: "Spoqa Han Sans";
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
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 180px;
    margin-left: 20px;
  }

  .Label {
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin: 0 0px 0 11.4px;
    /* padding-right: 29.6px; */
    width: 350px;
  }

  .ArrowIcon {
    /* position: fixed; */
    /* margin-left: 390px; */
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
    width: 421px;
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
    font-family: "Spoqa Han Sans";
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
