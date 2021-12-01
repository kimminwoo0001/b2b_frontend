import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../config";
import axios from "axios";
import {
  Champion,
  Champion_Eng,
  Opp_Champion,
  Opp_Champion_Eng,
  ResetChampion,
  ResetChampion2,
} from "../../../redux/modules/filtervalue";
import axiosRequest from "../../../lib/axiosRequest";

function HitMapFilter() {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [champFilter, setChampFilter] = useState();
  const [champEng, setChampEng] = useState();
  const [oppFilter, setOppFilter] = useState();
  const [oppEng, setOppEng] = useState();
  const [isActiveOpp, setIsActiveOpp] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const GetChampionFilter = () => {
    const url = `${API}/lolapi/filter/champion`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      player: filters.player,
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function (e) {
      setChampFilter(e.champion);
      setChampEng(e.championEng);
    })
  };

  const GetOppFilter = () => {
    const url = `${API}/lolapi/filter/oppplayerchamp?`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: filters.position,
      champion: filters.champion_eng,
      player: filters.player,
      oppplayer: filters.oppplayer,
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function (e) {
      setOppFilter(e.champion);
      setOppEng(e.championEng);
    })
  };

  return (
    <HitMapFilterContainer>
      <ChampionSettingNav>
        <SettingTitle>
          <span className="Title">챔피언 설정</span>
          <img
            src="Images/ico-notice-gy.png"
            width="14px"
            height="14px"
            alt="noticeIcon"
          />
          <span className="Alert">
            두 선수가 만났던 경기의 상대 전적 기록을 안내해드립니다.
          </span>
        </SettingTitle>
        <DropDownContainer>
          <div className="DropDown">
            <DropDown className="container">
              <div className="menu-container">
                <button
                  onClick={() => {
                    setIsActive(!isActive);
                    GetChampionFilter();
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
                      : `${filters.player} 이(가) 플레이 한 모든 챔피언`}
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
                    {champFilter?.map((champion, idx) => {
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
                    })}
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
                      : `${filters.oppplayer} 이(가) 플레이 한 모든 챔피언`}
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
                    {oppFilter?.map((champion, idx) => {
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
                    })}
                  </ul>
                </nav>
              </div>
            </DropDown>
          </div>
          <button
            className="Select"
            onClick={() => {
              dispatch(ResetChampion2(""));
            }}
          >
            적용
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
            <p>초기화</p>
          </button>
        </DropDownContainer>
      </ChampionSettingNav>
    </HitMapFilterContainer>
  );
}

export default HitMapFilter;

const HitMapFilterContainer = styled.div`
  margin-top: 19px;
`;

const ChampionSettingNav = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 115px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
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
    width: 180px;
    margin-left: 20px;
  }

  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
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
