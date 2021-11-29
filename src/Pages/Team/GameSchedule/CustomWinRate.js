import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../../config";
import qs from "qs";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import axiosRequest from "../../../lib/axiosRequest";


function CustomWinRate({ index, toggleCustom, setCustomOpen, customOpen, el }) {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [roster1, setRoster1] = useState([]);
  const [roster2, setRoster2] = useState([]);
  const [winRate, setWinRate] = useState();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive2, setIsActive2] = useDetectOutsideClick(dropdownRef, false);
  const [isActive3, setIsActive3] = useDetectOutsideClick(dropdownRef, false);
  const [isActive4, setIsActive4] = useDetectOutsideClick(dropdownRef, false);
  const [isActive5, setIsActive5] = useDetectOutsideClick(dropdownRef, false);
  const [isActive6, setIsActive6] = useDetectOutsideClick(dropdownRef, false);
  const [isActive7, setIsActive7] = useDetectOutsideClick(dropdownRef, false);
  const [isActive8, setIsActive8] = useDetectOutsideClick(dropdownRef, false);
  const [isActive9, setIsActive9] = useDetectOutsideClick(dropdownRef, false);
  const [isActive10, setIsActive10] = useDetectOutsideClick(dropdownRef, false);

  const GetRoster = () => {
    const url = `${API}/lolapi/filter/roster`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team1: el.Team1,
      team2: el.Team2,
      token: user.token,
      id: user.id
    }
    axiosRequest(url, params, function (e) {
      setTeam1(e.data[el.Team1]);
      setTeam2(e.data[el.Team2]);
    })
  };

  const GetWinRate = () => {
    const player1 = Object.values(roster1)?.map((name) => name.name);
    const player2 = Object.values(roster2)?.map((name) => name.name);

    const url = `${API}/lolapi/filter/roster2`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team1: player1.join(),
      team2: player2.join(),
      token: user.token,
      id: user.id
    };
    axiosRequest(url, params, function (e) {
      setWinRate(e.data);
    });
  };

  const handleApiCall = () => {
    if (index !== customOpen) {
      GetRoster();
    } else {
    }
  };

  return (
    <MainWrapper>
      <MapWeekTab key={index}>
        <TabWrapper>
          <DateAndTime>
            <div className="Date">{el.Date}</div>
            <div className="Time">{`${t("league.schedule.pm")} ${el.Time
              }`}</div>
          </DateAndTime>
          <BlueSide>
            <WinRate1></WinRate1>
            <div className="TeamName">{el.Team1}</div>
            <img
              src={`Images/HomeLogo/${el.Team1}.png`}
              alt="TeamIcon"
              className="TeamIcon"
            />
          </BlueSide>
          <div className="Vs">VS</div>
          <RedSide>
            <img
              src={`Images/HomeLogo/${el.Team2}.png`}
              alt="TeamIcon"
              className="TeamIcon"
            />
            <div className="TeamName">{el.Team2}</div>
            <WinRate2></WinRate2>
          </RedSide>
        </TabWrapper>
      </MapWeekTab>
      <CustomWinRateWrapper>
        <ShowMoreContents isActive={customOpen === index}>
          <ManualNav>
            <div className="TitleContain">
              <div className="Title">{t("league.schedule.customize")}</div>
              <div className="Manual">{t("league.schedule.customLabel")}</div>
            </div>

            <button
              onClick={() => {
                setRoster1(0);
                setRoster2(0);
                setWinRate("");
              }}
            >
              <img src="Images/ico-team-video-return-off.png" alt="restBtn" />
              <div className="Reset">{t("league.schedule.customReset")}</div>
            </button>
          </ManualNav>
          <ViewContents>
            <TeamContainer>
              <TeamName>
                <img
                  src={`Images/HomeLogo/${el.Team1}.png`}
                  alt="TeamIcon"
                  className="TeamIcon"
                />
                <div className="TeamName">{el.Team1}</div>
              </TeamName>
              <SelectPlayers>
                <TopBox>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive(!isActive)}
                        >
                          {roster1?.top ? (
                            <img
                              src={roster1?.top.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-top.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive ? "active" : "inactive"}`}
                        >
                          <ul>
                            {team1?.top?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setRoster1({ ...roster1, top: data });
                                  }}
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster1?.top
                        ? roster1.top.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster1?.top
                        ? `(${roster1.top.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive2(!isActive2)}
                        >
                          {roster1?.jng ? (
                            <img
                              src={roster1?.jng.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-jng.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive2 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team1?.jng?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setRoster1({ ...roster1, jng: data });
                                  }}
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster1?.jng
                        ? roster1.jng.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster1?.jng
                        ? `(${roster1.jng.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive3(!isActive3)}
                        >
                          {roster1?.mid ? (
                            <img
                              src={roster1?.mid.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-mid.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive3 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team1?.mid?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setRoster1({ ...roster1, mid: data });
                                  }}
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster1?.mid
                        ? roster1.mid.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster1?.mid
                        ? `(${roster1.mid.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                </TopBox>
                <BottomBox>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive4(!isActive4)}
                        >
                          {roster1?.bot ? (
                            <img
                              src={roster1?.bot.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-bot.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive4 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team1?.bot?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setRoster1({ ...roster1, bot: data });
                                  }}
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster1?.bot
                        ? roster1.bot.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster1?.bot
                        ? `(${roster1.bot.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive5(!isActive5)}
                        >
                          {roster1?.sup ? (
                            <img
                              src={roster1?.sup.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-sup.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive5 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team1?.sup?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setRoster1({ ...roster1, sup: data });
                                  }}
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster1?.sup
                        ? roster1.sup.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster1?.sup
                        ? `(${roster1.sup.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                </BottomBox>
              </SelectPlayers>
            </TeamContainer>
            <div className="Vs">VS</div>
            <TeamContainer>
              <TeamName>
                <img
                  src={`Images/HomeLogo/${el.Team2}.png`}
                  alt="TeamIcon"
                  className="TeamIcon"
                />
                <div className="TeamName">{el.Team2}</div>
              </TeamName>
              <SelectPlayers>
                <TopBox>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive6(!isActive6)}
                        >
                          {roster2?.top ? (
                            <img
                              src={roster2?.top.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-top.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive6 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team2?.top?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() =>
                                    setRoster2({ ...roster2, top: data })
                                  }
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster2?.top
                        ? roster2.top.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster2?.top
                        ? `(${roster2.top.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive7(!isActive7)}
                        >
                          {roster2?.jng ? (
                            <img
                              src={roster2?.jng.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-jng.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive7 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team2?.jng?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() =>
                                    setRoster2({ ...roster2, jng: data })
                                  }
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster2?.jng
                        ? roster2.jng.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster2?.jng
                        ? `(${roster2.jng.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive8(!isActive8)}
                        >
                          {roster2?.mid ? (
                            <img
                              src={roster2?.mid.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-mid.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive8 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team2?.mid?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() =>
                                    setRoster2({ ...roster2, mid: data })
                                  }
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster2?.mid
                        ? roster2.mid.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster2?.mid
                        ? `(${roster2.mid.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                </TopBox>
                <BottomBox>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive9(!isActive9)}
                        >
                          {roster2?.bot ? (
                            <img
                              src={roster2?.bot.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-bot.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive9 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team2?.bot?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() =>
                                    setRoster2({ ...roster2, bot: data })
                                  }
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster2?.bot
                        ? roster2.bot.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster2?.bot
                        ? `(${roster2.bot.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                  <SelectComponent>
                    <DropDownContainer className="container">
                      <div className="menu-container">
                        <div
                          className="DropDown"
                          onClick={() => setIsActive10(!isActive10)}
                        >
                          {roster2?.sup ? (
                            <img
                              src={roster2?.sup.Image}
                              alt="PositionIcon"
                              style={{ width: "80px", height: "58px" }}
                            />
                          ) : (
                            <img
                              src="Images/ico-position-sup.png"
                              alt="PositionIcon"
                              style={{ width: "26px", height: "26px" }}
                            />
                          )}
                        </div>
                        <nav
                          ref={dropdownRef}
                          className={`menu ${isActive10 ? "active" : "inactive"
                            }`}
                        >
                          <ul>
                            {team2?.sup?.map((data, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => {
                                    setRoster2({ ...roster2, sup: data });
                                    setIsActive10(!isActive10);
                                  }}
                                >
                                  {data.name}
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      </div>
                    </DropDownContainer>
                    <div className="PlayerName">
                      {roster2?.sup
                        ? roster2.sup.name
                        : t("league.schedule.playerLabel")}
                      <br />
                      {roster2?.sup
                        ? `(${roster2.sup.nativeName})`
                        : t("league.schedule.playerLabel2")}
                    </div>
                  </SelectComponent>
                </BottomBox>
              </SelectPlayers>
            </TeamContainer>
          </ViewContents>
          <CalculateWinRate>
            <div className="WinRateBox">
              <div className="Label">{t("league.schedule.winProbability")}</div>
              <Value Higher={winRate?.team1 > winRate?.team2}>
                {winRate ? `${winRate?.team1.toFixed(1)}%` : "0.0%"}
              </Value>
            </div>
            <WinRateButton
              Active={
                Object.keys(roster1).length === 5 &&
                  Object.keys(roster2).length === 5
                  ? true
                  : false
              }
              onClick={() => {
                Object.keys(roster1).length === 5 &&
                  Object.keys(roster2).length === 5
                  ? GetWinRate()
                  : alert("5개 이상 선택해주세요");
              }}
            >
              {t("league.schedule.apply")}
            </WinRateButton>
            <div className="WinRateBox">
              <div className="Label">{t("league.schedule.winProbability")}</div>
              <Value Higher={winRate?.team1 < winRate?.team2}>
                {winRate ? `${winRate?.team2.toFixed(1)}%` : "0.0%"}
              </Value>
            </div>
          </CalculateWinRate>
        </ShowMoreContents>
        <ShowMoreButton
          onClick={() => {
            toggleCustom(index);
            handleApiCall();
          }}
        >
          <div className="Label">{t("league.schedule.matchPrediction")}</div>
          <img
            src={
              customOpen === index
                ? "Images/ico-arrow-up.png"
                : "Images/ico-1depth-arrow-off.png"
            }
            alt="arrow"
          />
        </ShowMoreButton>
      </CustomWinRateWrapper>
    </MainWrapper>
  );
}

export default CustomWinRate;

const MainWrapper = styled.div`
  margin-bottom: 18px;
  :nth-child(1) {
    margin-top: 22px;
  }
`;

const CustomWinRateWrapper = styled.div`
  margin-left: 129px;
`;

const ShowMoreContents = styled.div`
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  width: 100%;
  transition: all 0.4s ease;

  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  ${(props) =>
    props.isActive &&
    css`
      opacity: 1;
      padding: 30px;
      max-height: 1000px;
    `}
`;

const ShowMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 969px;
  height: 33px;
  background-color: #111015;
  cursor: pointer;
  .Label {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #6b6979;
    margin-right: 10px;
  }
`;

const ManualNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  .TitleContain {
    display: flex;
  }
  button {
    display: flex;
  }
  .Title {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.65px;
    text-align: left;
    color: #ffffff;
    margin-right: 7px;
  }
  .Manual {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: left;
    color: #6b6979;
  }
  img {
    width: 10px;
    height: 10px;
    margin-right: 9.9px;
  }
  .Reset {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: #afadbe;
  }
`;

const TeamContainer = styled.div`
  width: 432px;
  height: 336px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
`;

const TeamName = styled.div`
  height: 38.5px;
  border-bottom: 1px solid #3a3745;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 7.7px;
  }
  .TeamName {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: #6b6979;
  }
`;

const SelectPlayers = styled.div`
  height: 100%;
`;

const TopBox = styled.div`
  display: flex;
  margin-top: 38.5px;
  justify-content: center;
`;

const BottomBox = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: center;
`;

const SelectComponent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 23px 0 23px;
  .DropDown {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 66px;
    background-color: #3a3745;
    cursor: pointer;
  }
  .PlayerName {
    margin-top: 5px;
    width: 80px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: #afadbe;
  }
`;

const ViewContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .Vs {
    font-family: Poppins;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin: 0 12px 0 12px;
    color: #6b6979;
  }
`;

const WinRateButton = styled.button`
  width: 122px;
  height: 36px;
  border-radius: 3px;
  background-color: #696777;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.65px;
  text-align: center;
  color: #ffffff;
  margin: 0 120px 0 120px;
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.Active &&
    css`
      border-radius: 3px;
      background-color: #f04545;
      color: #ffffff;
    `}
`;

const Value = styled.div`
  font-family: Poppins;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  ${(props) =>
    props.Higher &&
    css`
      color: #f04545;
    `}
`;

const CalculateWinRate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 21px;

  .WinRateBox {
    display: flex;
  }
  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #696777;
    margin-right: 29px;
  }
`;

const MapWeekTab = styled.div`
  width: 100%;
  height: 85px;

  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;
const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  .Vs {
    width: 20px;
    height: 21px;
    font-family: Poppins;
    font-size: 15px;
    font-weight: bold;
    color: #6b6979;
  }
`;

const DateAndTime = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 129px;
  padding: 21px 18px 18px 18px;
  .Date {
    width: auto;
    height: 17px;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    text-align: left;
    color: #6b6979;
    margin-bottom: 6px;
  }
  .Time {
    width: auto;
    height: 23px;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    color: #ffffff;
  }
`;

const BlueSide = styled.div`
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 500;
  color: #6b6979;

  .TeamName {
    width: 231px;
    height: 21px;
    text-align: right;
  }
  img {
    width: 52px;
    height: 52px;
    margin: 0 40px 0 22px;
  }
`;

const RedSide = styled.div`
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 500;
  color: #6b6979;

  .TeamName {
    width: 231px;
    height: 21px;
    text-align: left;
  }
  img {
    width: 52px;
    height: 52px;
    margin: 0 22px 0 40px;
  }
`;

const WinRate1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 83px;
  color: #f04545;
  background-image: url("Images/left-lose-gradient.png");
`;
const WinRate2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 83px;
  color: #f04545;
  background-image: url("Images/right-lose-gradient.png");
`;

const DropDownContainer = styled.div`
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
    width: 180px;
    height: 34px;
    background-color: #23212a;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(175, 173, 190);
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .menu-trigger span {
    vertical-align: middle;
    width: 130px;
    margin: 0 10px;
  }

  img {
    width: 100px;
    height: 100px;
  }

  .menu {
    background: #3a3745;
    position: absolute;
    top: 66px;
    right: 0;
    width: 80px;
    z-index: 5;
    /* box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3); */
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
    padding: 10px 10px;
    display: block;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    height: 26px;
    letter-spacing: -0.55px;
    text-align: left;
    color: rgb(255, 255, 255);
    cursor: pointer;
    :hover {
      background-color: #484453;
    }
  }
`;
