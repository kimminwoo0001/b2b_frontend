import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Reset_Map } from "../../../redux/modules/filtervalue";
import { API2 } from "../../config";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import qs from "qs";

function ChampionSetting({
  setGameData,
  side,
  compareOpen,
  setCompareOpen,
  setGameOpen,
  setGameSelect,
}) {
  //오브젝트 별 동선 팀/선수 기준 설정 Step 에 있는 드랍다운
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const wrapperRef = useRef(null);
  const wrapperRef2 = useRef(null);
  useOutsideAlerter(wrapperRef);
  useOutsideAlerter2(wrapperRef2);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef, false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useDetectOutsideClick(dropdownRef, false);
  const [isActive4, setIsActive4] = useDetectOutsideClick(dropdownRef, false);
  const [isActive5, setIsActive5] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [champArray, setChampArray] = useState([]);
  const [champArray2, setChampArray2] = useState([]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive2(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function useOutsideAlerter2(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive5(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const pushChampion = (champion) => {
    if (
      champArray.find((e) => e === champion) &&
      champion !== "all" &&
      champion !== "none"
    ) {
      setChampArray(champArray.filter((e) => e !== champion));
    } else if (
      champArray.length >= 0 &&
      champion !== "all" &&
      champion !== "none"
    ) {
      setChampArray([...champArray.filter((e) => e !== ""), champion]);
    } else if (champion === "all" && champion !== "none") {
      setChampArray(filterData?.champion);
    } else if (champion === "none") {
      setChampArray([]);
    }
  };

  const pushChampion2 = (champion) => {
    if (
      champArray2.find((e) => e === champion) &&
      champion !== "all" &&
      champion !== "none"
    ) {
      setChampArray2(champArray2.filter((e) => e !== champion));
    } else if (
      champArray2.length >= 0 &&
      champion !== "all" &&
      champion !== "none"
    ) {
      setChampArray2([...champArray2.filter((e) => e !== ""), champion]);
    } else if (champion === "all" && champion !== "none") {
      setChampArray2(filterData?.oppchampion);
    } else if (champion === "none") {
      setChampArray2([]);
    }
  };

  const getTeam = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const data = response.data.team;
      setFilterData({ ...filterData, team: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getPlayer = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const data = response.data.player;
      setFilterData({ ...filterData, player: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getChampion = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const data = response.data.champion;
      setFilterData({ ...filterData, champion: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getOppTeam = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          champion: filters.champion_eng,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const data = response.data.opp_team;
      setFilterData({ ...filterData, oppteam: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getOppPlayer = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          champion: filters.champion_eng,
          opp_team: filters.oppteam,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const data = response.data.opp_player;
      setFilterData({ ...filterData, oppplayer: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getOppChampion = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          champion: filters.champion_eng,
          opp_team: filters.oppteam,
          opp_player: filters.oppplayer,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const data = response.data.opp_champion;
      setFilterData({ ...filterData, oppchampion: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getGame = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          champion: champArray,
          compare: "off",
          side: side,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });

      setGameData(Object.values(response.data["match"]));
    } catch (e) {
      console.log(e);
    }
  };

  const getGameAll = async () => {
    try {
      if (filters.oppchampion_eng) {
        const response = await axios.request({
          method: "GET",
          url: `${API2}/api/mappingFilter`,
          params: {
            league: filters.league,
            patch: filters.patch,
            team: filters.team,
            player: filters.player,
            champion: champArray,
            opp_team: filters.oppteam,
            opp_player: filters.oppplayer,
            opp_champion: filters.oppchampion_eng,
            side: side,
            token: user.token,
            id: user.id,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        });

        setGameData(Object.values(response.data["match"]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side, filters.patch]);

  useEffect(() => {
    getGameAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.oppchampion_eng, side, filters.patch]);

  return (
    <ChampionSettingContainer>
      <FilterBox>
        <DropDownBox>
          <DropDownToggle className="container">
            <div className="menu-container">
              <button
                onClick={() => {
                  setIsActive(!isActive);
                  getTeam();
                }}
                className="menu-trigger"
              >
                <span className="Label">
                  {filters.team !== "" ? filters.team : t("video.object.team")}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              <nav
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
              >
                <ul>
                  {filterData?.team?.map((team, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          setChampArray([]);
                          setChampArray2([]);
                          dispatch(
                            Reset_Map({
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              patch: filters.patch,
                              patchfilter: filters.patchfilter,
                              team: team,
                              player: "",
                              champion_eng: "",
                              oppteam: "",
                              oppplayer: "",
                              oppchampion_eng: "",
                            })
                          );
                        }}
                      >
                        {team}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </DropDownToggle>
          <DropDownToggle className="container">
            <div className="menu-container2">
              <button
                onClick={() => {
                  setIsActive1(!isActive1);
                  getPlayer();
                }}
                className="menu-trigger2"
              >
                <span className="Label2">
                  {filters.player !== ""
                    ? filters.player
                    : t("video.object.player")}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              <nav
                ref={dropdownRef}
                className={`menu2 ${isActive1 ? "active" : "inactive"}`}
              >
                <ul>
                  {filterData?.player?.map((player, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          setChampArray([]);
                          setChampArray2([]);
                          dispatch(
                            Reset_Map({
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              patch: filters.patch,
                              patchfilter: filters.patchfilter,
                              team: filters.team,
                              player: player,
                              champion_eng: "",
                              oppteam: "",
                              oppplayer: "",
                              oppchampion_eng: "",
                            })
                          );
                        }}
                      >
                        {player}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </DropDownToggle>
          <DropDownToggle className="container">
            <div className="menu-container2">
              <button
                onClick={() => {
                  setIsActive2(!isActive2);
                  getChampion();
                }}
                className="menu-trigger2"
              >
                <span className="Label3">
                  <span className="champLength">{`${champArray.length} `}</span>
                  {` ${t("video.object.champ")}`}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              {filterData?.champion ? (
                <nav
                  ref={wrapperRef}
                  className={`menu3 ${isActive2 ? "active" : "inactive"}`}
                >
                  <ul>
                    <li
                      onClick={() =>
                        pushChampion(
                          filterData?.champion?.length === champArray.length
                            ? "none"
                            : "all"
                        )
                      }
                    >
                      <input
                        checked={
                          filterData?.champion?.length === champArray.length
                            ? true
                            : false
                        }
                        type="checkbox"
                        readOnly
                      ></input>
                      Select All
                    </li>
                    {filterData?.champion?.map((champion, idx) => {
                      return (
                        <li key={idx} onClick={() => pushChampion(champion)}>
                          <input
                            checked={
                              champArray.includes(champion) ? true : false
                            }
                            type="checkbox"
                            readOnly
                          ></input>
                          {champion}
                        </li>
                      );
                    })}
                    <button
                      onClick={() => {
                        setIsActive2(false);
                        setGameSelect([]);
                        setGameOpen(true);
                        setChampArray2([]);
                        getGame();
                        dispatch(
                          Reset_Map({
                            tab: filters.tab,
                            convertleague: filters.convertleague,
                            league: filters.league,
                            patch: filters.patch,
                            patchfilter: filters.patchfilter,
                            team: filters.team,
                            player: filters.player,
                            champion_eng: champArray,
                            oppteam: "",
                            oppplayer: "",
                            oppchampion_eng: "",
                          })
                        );
                      }}
                    >
                      {t("video.object.confirm")}
                    </button>
                  </ul>
                </nav>
              ) : (
                ""
              )}
            </div>
          </DropDownToggle>
        </DropDownBox>
        <DropDownBox2 isActive={compareOpen === true}>
          <DropDownToggle className="container">
            <div className="menu-container">
              <button
                onClick={() => {
                  setIsActive3(!isActive3);
                  getOppTeam();
                }}
                className="menu-trigger"
              >
                <span className="Label">
                  {filters.oppteam !== ""
                    ? filters.oppteam
                    : t("video.object.team2")}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              <nav
                ref={dropdownRef}
                className={`menu ${isActive3 ? "active" : "inactive"}`}
              >
                <ul>
                  {filterData?.oppteam?.map((oppteam, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          setChampArray2([]);
                          dispatch(
                            Reset_Map({
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              patch: filters.patch,
                              patchfilter: filters.patchfilter,
                              team: filters.team,
                              player: filters.player,
                              champion_eng: filters.champion_eng,
                              oppteam: oppteam,
                              oppplayer: "",
                              oppchampion_eng: "",
                            })
                          );
                        }}
                      >
                        {oppteam}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </DropDownToggle>
          <DropDownToggle className="container">
            <div className="menu-container2">
              <button
                onClick={() => {
                  setIsActive4(!isActive4);
                  getOppPlayer();
                }}
                className="menu-trigger2"
              >
                <span className="Label2">
                  {filters.oppplayer !== ""
                    ? filters.oppplayer
                    : t("video.object.player2")}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              <nav
                ref={dropdownRef}
                className={`menu2 ${isActive4 ? "active" : "inactive"}`}
              >
                <ul>
                  {filterData?.oppplayer?.map((oppplayer, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          setChampArray2([]);
                          setIsActive4(false);
                          dispatch(
                            Reset_Map({
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              patch: filters.patch,
                              patchfilter: filters.patchfilter,
                              team: filters.team,
                              player: filters.player,
                              champion_eng: filters.champion_eng,
                              oppteam: filters.oppteam,
                              oppplayer: oppplayer,
                              oppchampion_eng: "",
                            })
                          );
                        }}
                      >
                        {oppplayer}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </DropDownToggle>
          <DropDownToggle className="container">
            <div className="menu-container2">
              <button
                onClick={() => {
                  setIsActive5(!isActive5);
                  getOppChampion();
                }}
                className="menu-trigger2"
              >
                <span className="Label3">
                  <span className="champLength">{`${champArray2.length}`}</span>
                  {` ${t("video.object.champ")}`}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              {filterData?.oppchampion ? (
                <nav
                  ref={wrapperRef2}
                  className={`menu3 ${isActive5 ? "active" : "inactive"}`}
                >
                  <ul>
                    <li
                      onClick={() =>
                        pushChampion2(
                          filterData?.oppchampion?.length === champArray2.length
                            ? "none"
                            : "all"
                        )
                      }
                    >
                      <input
                        checked={
                          filterData?.oppchampion?.length === champArray2.length
                            ? true
                            : false
                        }
                        type="checkbox"
                        readOnly
                      ></input>
                      Select All
                    </li>
                    {filterData?.oppchampion?.map((champion, idx) => {
                      return (
                        <li key={idx} onClick={() => pushChampion2(champion)}>
                          <input
                            checked={
                              champArray2.includes(champion) ? true : false
                            }
                            type="checkbox"
                            readOnly
                          ></input>
                          {champion}
                        </li>
                      );
                    })}
                    <button
                      onClick={() => {
                        setIsActive5(false);
                        setGameSelect([]);
                        setGameOpen(true);
                        getGameAll();
                        dispatch(
                          Reset_Map({
                            tab: filters.tab,
                            convertleague: filters.convertleague,
                            league: filters.league,
                            patch: filters.patch,
                            patchfilter: filters.patchfilter,
                            team: filters.team,
                            player: filters.player,
                            champion_eng: champArray,
                            oppteam: filters.oppteam,
                            oppplayer: filters.oppplayer,
                            oppchampion_eng: champArray2,
                          })
                        );
                      }}
                    >
                      {t("video.object.confirm")}
                    </button>
                  </ul>
                </nav>
              ) : (
                ""
              )}
            </div>
          </DropDownToggle>
        </DropDownBox2>
        <CompareButton onClick={() => setCompareOpen(!compareOpen)}>
          <span>
            {compareOpen === true
              ? t("video.object.compare2")
              : t("video.object.compare")}
          </span>
          <img
            src={
              compareOpen === true
                ? "Images/ico-arrow-up2.png"
                : "Images/ico-arrow-down2.png"
            }
            alt="arrow"
          />
        </CompareButton>
      </FilterBox>
    </ChampionSettingContainer>
  );
}

export default ChampionSetting;

const ChampionSettingContainer = styled.div`
  margin: 14px 0 24px 0;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;

const FilterBox = styled.div``;

const DropDownBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 4px;
`;

const DropDownBox2 = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 4px;
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  width: 100%;
  transition: all 0.2s ease;
  ${(props) =>
    props.isActive &&
    css`
      opacity: 1;
      max-height: 1000px;
    `}
`;

const CompareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 27px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(67, 63, 78);
  > span {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: center;
    color: rgb(175, 173, 190);
    margin-right: 10px;
  }
`;

const DropDownToggle = styled.div`
  margin-right: 4px;
  :nth-child(3) {
    margin-right: 0px;
  }

  padding: 0;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  .menu-container {
    /* position: relative;
    display: flex;
    justify-content: center;
    align-items: center; */
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    height: 34px;
    background-color: rgb(35, 33, 42);
    font-size: 12px;
    color: rgb(175, 173, 190);
    width: 74px;
    outline: none;
    border: none;
  }

  .menu-trigger2 {
    display: flex;
    align-items: center;
    height: 34px;
    background-color: rgb(35, 33, 42);
    font-size: 12px;
    color: rgb(175, 173, 190);
    width: 124px;
    outline: none;
    border: none;
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
    width: 74px;
    margin-left: 20px;
  }

  .SelectedLabel2 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 124px;
    margin-left: 20px;
  }

  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 74px;
  }

  .Label2 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 124px;
  }

  .Label3 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 124px;
    /* ::first-letter {
      color: #f04545;
    } */
  }

  .champLength {
    color: #f04545;
  }

  .Wrapper {
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    :hover {
      background-color: rgb(60, 58, 72);
    }
    img {
      margin: 0 5px 0 15px;
    }
  }

  .ChampIconImg {
    margin: 0 8px 0 4px;
  }

  .menu {
    background: rgb(47, 45, 56);
    position: absolute;
    top: 10;
    right: 1;
    width: 74px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    z-index: 10;
  }

  .menu2 {
    background: rgb(47, 45, 56);
    position: absolute;
    top: 10;
    right: 1;
    width: 124px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    z-index: 10;
  }

  .menu3 {
    background: rgb(47, 45, 56);
    position: absolute;
    top: 10;
    right: 1;
    width: 124px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    z-index: 10;
  }

  .menu.active {
    opacity: 5;
    visibility: visible;
    transform: translateY(0);
    z-index: 10111;
  }

  .menu2.active {
    opacity: 5;
    visibility: visible;
    transform: translateY(0);
    z-index: 10111;
  }

  .menu3.active {
    opacity: 5;
    visibility: visible;
    transform: translateY(0);
    z-index: 10111;
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 99999;
  }

  .menu2 ul {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 99990;
  }
  .menu3 ul {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 99990;
  }
  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    width: 74px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: rgb(255, 255, 255);
    cursor: pointer;
    z-index: 9999;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }

  .menu2 li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    width: 124px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: center;
    color: rgb(255, 255, 255);
    cursor: pointer;
    z-index: 9999;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }

  .menu3 li {
    text-decoration: none;
    padding: 15px 20px;
    display: flex;
    width: 124px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: rgb(255, 255, 255);
    cursor: pointer;
    z-index: 9999;
    :hover {
      background-color: rgb(60, 58, 72);
    }
    > input[type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      display: inline-block;
      width: 12px;
      height: 12px;

      background-clip: content-box;
      border: 1.5px solid rgb(72, 70, 85);
      border-radius: 2px;
      background-color: transparent;

      margin-right: 8px;

      &:checked {
        background-color: #f04545;
        border: #f04545;
        border-radius: 2px;
        background: url("/Images/check.svg") #f04545 no-repeat 2.5px 4px/5.5px
          4.5px;
        /* float: right; */
      }

      &:focus {
        outline: none !important;
      }
    }
  }

  .menu3 button {
    text-decoration: none;
    display: block;
    margin: 12px auto;
    width: 104px;
    height: 25px;
    border-radius: 3px;
    border: solid 1px rgb(72, 70, 85);
    background-color: rgba(72, 70, 85, 0.5);
    font-family: NotoSansKR;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: center;
    color: rgb(175, 173, 190);
    cursor: pointer;
    z-index: 9999;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }
`;
