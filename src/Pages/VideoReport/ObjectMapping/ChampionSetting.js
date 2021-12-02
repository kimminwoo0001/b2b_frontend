import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Reset_Map } from "../../../redux/modules/filtervalue";
import { API2 } from "../../config";
import { API } from "../../config";

import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import qs from "qs";
import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

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
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const wrapperRef = useRef(null);
  const wrapperRef2 = useRef(null);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef, false);
  // const [isActive2, setIsActive2] = useState(false);
  const isActive2 = useRef(false);
  const [isActive3, setIsActive3] = useDetectOutsideClick(dropdownRef, false);
  const [isActive4, setIsActive4] = useDetectOutsideClick(dropdownRef, false);
  //const [isActive5, setIsActive5] = useState(false);
  const isActive5 = useRef(false);
  const [filterData, setFilterData] = useState({});
  const [champArray, setChampArray] = useState([]);
  const [champArray2, setChampArray2] = useState([]);
  useOutsideAlerter(wrapperRef, isActive2, filters, champArray);
  useOutsideAlerter2(wrapperRef2, isActive5, filters, champArray2);

  function useOutsideAlerter(ref, isActive2, filters, champArray) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (isActive2.current && ref?.current) {
          if (!ref?.current.contains(event.target)) {
            //setIsActive2(false);
            isActive2.current = false;
            clickChampionConfirm();
          }
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, isActive2, filters, champArray]);
  }

  function useOutsideAlerter2(ref, isActive5, filters, champArray2) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (isActive5.current && ref?.current) {
          if (!ref?.current.contains(event.target)) {
            //setIsActive5(false);
            isActive5.current = false;
            clickCompareConfirm();
          }
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, isActive5, filters, champArray2]);
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

  //
  const getTeam = () => {
    try {
      let teamList = [];
      for (let league of filters.league) {
        for (let year of filters.year) {
          for (let season of filters.season) {
            const seasonData = staticvalue.filterObjects[league][year][season];
            if (seasonData) {
              const ObjectKeys = Object.keys(seasonData);
              teamList = teamList.concat(ObjectKeys);
            }
          }
        }
      }
      teamList = teamList
        .filter((item, pos) => teamList.indexOf(item) === pos)
        .sort();
      setFilterData({ ...filterData, team: teamList });
    } catch (e) {
      console.log(e);
    }
  };

  //
  const getPlayer = () => {
    try {
      let players = [];
      let playerList = [];
      for (let league of filters.league) {
        for (let year of filters.year) {
          for (let season of filters.season) {
            const seasonData = staticvalue.filterObjects[league][year][season];
            if (seasonData) {
              if (seasonData[filters.team]) {
                const ObjectKeys = Object.values(seasonData[filters.team]);
                console.log("ObjectKeys", ObjectKeys);
                playerList = playerList.concat(ObjectKeys);
              }
            }
          }
        }
      }
      playerList = playerList
        .filter((item, pos) => playerList.indexOf(item) === pos)
        .sort();

      for (let i = 0; i < playerList.length; i++) {
        const name = playerList[i].split("#")[1];
        const position = playerList[i].split("#")[0];
        if (position === "1") {
          players[i] = {
            position: "top",
            name: name,
          };
        } else if (position === "2") {
          players[i] = {
            position: "jng",
            name: name,
          };
        } else if (position === "3") {
          players[i] = {
            position: "mid",
            name: name,
          };
        } else if (position === "4") {
          players[i] = {
            position: "bot",
            name: name,
          };
        } else if (position === "5") {
          players[i] = {
            position: "sup",
            name: name,
          };
        }
      }
      setFilterData({ ...filterData, player: players });
    } catch (e) {
      console.log(e);
    }
  };

  const getChampion = () => {
    try {
      const url = `${API}/lolapi/mapping/mappingFilter/champion`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        token: user.token,
        id: user.id,
      };
      axiosRequest(undefined, url, params, function (e) {
        const data = e.champion;
        console.log(data);
        setFilterData({ ...filterData, champion: data });
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
    } catch (e) {
      console.log(e);
    }
  };

  const getOppTeam = () => {
    try {
      const url = `${API}/lolapi/mapping/mappingFilter/oppteam`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        token: user.token,
        id: user.id,
      };
      axiosRequest(undefined, url, params, function (e) {
        const data = e.opp_team;
        setFilterData({ ...filterData, oppteam: data });
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
    } catch (e) {
      console.log(e);
    }
  };

  const getOppPlayer = () => {
    try {
      const url = `${API}/lolapi/mapping/mappingFilter/oppplayer`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        opp_team: filters.oppteam,
        token: user.token,
        id: user.id,
      };
      axiosRequest(undefined, url, params, function (e) {
        const data = e.opp_player;
        setFilterData({ ...filterData, oppplayer: data });
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
    } catch (e) {
      console.log(e);
    }
  };

  const getOppChampion = () => {
    try {
      const url = `${API}/lolapi/mapping/mappingFilter/oppchampion`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        opp_team: filters.oppteam,
        opp_player: filters.oppplayer,
        token: user.token,
        id: user.id,
      };
      axiosRequest(undefined, url, params, function (e) {
        const data = e.opp_champion;
        setFilterData({ ...filterData, oppchampion: data });
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
    } catch (e) {
      console.log(e);
    }
  };

  const getGame = () => {
    try {
      const url = `${API}/lolapi/mapping/mappingFilter`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: champArray,
        compare: "off",
        side: side,
        token: user.token,
        id: user.id,
      };
      axiosRequest(undefined, url, params, function (e) {
        setGameData(Object.values(e["match"]));
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
    } catch (e) {
      console.log(e);
    }
  };

  const getGameAll = () => {
    try {
      if (filters.oppchampion_eng) {
        const url = `${API}/lolapi/mapping/mappingFilter`;
        const params = {
          league: filters.league,
          year: filters.year,
          season: filters.season,
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
        };
        axiosRequest(undefined, url, params, function (e) {
          setGameData(Object.values(e["match"]));
        }, function (objStore) {
          dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
        });
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

  const clickChampionConfirm = () => {
    //setIsActive2(false);
    isActive2.current = false;
    setGameSelect([]);
    setGameOpen(true);
    setChampArray2([]);
    getGame();
    dispatch(
      Reset_Map({
        ...filters,
        menu_num: filters.menu_num,
        tab: filters.tab,
        convertleague: filters.convertleague,
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,

        team: filters.team,
        player: filters.player,
        champion_eng: champArray,
        oppteam: "",
        oppplayer: "",
        oppchampion_eng: "",
      })
    );
  };

  const clickCompareConfirm = () => {
    //setIsActive5(false);
    isActive5.current = false;
    setGameSelect([]);
    setGameOpen(true);
    getGameAll();
    dispatch(
      Reset_Map({
        ...filters,
        menu_num: filters.menu_num,
        tab: filters.tab,
        convertleague: filters.convertleague,
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,

        team: filters.team,
        player: filters.player,
        champion_eng: champArray,
        oppteam: filters.oppteam,
        oppplayer: filters.oppplayer,
        oppchampion_eng: champArray2,
      })
    );
  };

  return (
    <ChampionSettingContainer>
      <FilterBox>
        <DropDownBox>
          <DropDownToggle
            className="container"
            changeColor={filters.team.length > 0}
          >
            <div className="menu-container">
              <button
                onClick={() => {
                  // 팀 선택 비활성화
                  // setIsActive(!isActive);
                  // getTeam();
                }}
                className="menu-trigger"
                style={{
                  cursor: "default",
                  backgroundColor: "rgba(0,0,0,0)",
                }}
              >
                <span className="Label">
                  {filters.team !== "" ? filters.team : t("video.object.team")}
                </span>
                {filters.team === "" && (
                  <img
                    className="ArrowIcon"
                    src="Images/select-arrow.png"
                    alt="arrowIcon"
                  />
                )}
              </button>
              {console.log("isActive", isActive)}
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
                              ...filters,
                              menu_num: filters.menu_num,
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              year: filters.year,
                              season: filters.season,
                              patch: filters.patch,
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
          <DropDownToggle
            className="container"
            changeColor={filters.player.length > 0}
          >
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
                              ...filters,
                              menu_num: filters.menu_num,
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              year: filters.year,
                              season: filters.season,
                              patch: filters.patch,

                              team: filters.team,
                              player: player.name,
                              champion_eng: "",
                              oppteam: "",
                              oppplayer: "",
                              oppchampion_eng: "",
                            })
                          );
                        }}
                      >
                        {player.name}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </DropDownToggle>
          <DropDownToggle
            className="container"
            changeColor={champArray.length > 0}
          >
            <div className="menu-container2">
              <button
                onClick={() => {
                  //setIsActive2(!isActive2);
                  isActive2.current = !isActive2.current;
                  getChampion();
                }}
                className="menu-trigger2"
              >
                {champArray.length > 0 ? (
                  <span className="Label3">
                    <span className="champLength">
                      {`${champArray.length} `}
                    </span>
                    {` ${t("video.object.champ")}`}
                  </span>
                ) : (
                  <span className="Label3">
                    {t("video.object.selectChamp")}
                  </span>
                )}
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              {filterData?.champion ? (
                <nav
                  ref={wrapperRef}
                  className={`menu3 ${isActive2.current ? "active" : "inactive"
                    }`}
                >
                  <ul>
                    <Menu3li
                      onClick={() =>
                        pushChampion(
                          filterData?.champion?.length === champArray.length
                            ? "none"
                            : "all"
                        )
                      }
                      isChecked={
                        filterData?.champion?.length === champArray.length
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
                    </Menu3li>
                    <div className="hr-line"></div>
                    {filterData?.champion?.map((champion, idx) => {
                      return (
                        <Menu3li
                          key={idx}
                          onClick={() => pushChampion(champion)}
                          isChecked={champArray.includes(champion)}
                        >
                          <input
                            checked={
                              champArray.includes(champion) ? true : false
                            }
                            type="checkbox"
                            readOnly
                          ></input>
                          {champion}
                        </Menu3li>
                      );
                    })}
                    <button
                      onClick={() => {
                        clickChampionConfirm();
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
          <DropDownToggle
            className="container"
            changeColor={filters.oppteam.length > 0}
          >
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
                              ...filters,
                              menu_num: filters.menu_num,
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              year: filters.year,
                              season: filters.season,
                              patch: filters.patch,

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
          <DropDownToggle
            className="container"
            changeColor={filters.oppplayer.length > 0}
          >
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
                              ...filters,
                              menu_num: filters.menu_num,
                              tab: filters.tab,
                              convertleague: filters.convertleague,
                              league: filters.league,
                              year: filters.year,
                              season: filters.season,
                              patch: filters.patch,

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
          <DropDownToggle
            className="container"
            changeColor={champArray2.length > 0}
          >
            <div className="menu-container2">
              <button
                onClick={() => {
                  //setIsActive5(!isActive5);
                  isActive5.current = !isActive5.current;
                  getOppChampion();
                }}
                className="menu-trigger2"
              >
                {champArray2.length > 0 ? (
                  <span className="Label3">
                    <span className="champLength">
                      {`${champArray2.length} `}
                    </span>
                    {` ${t("video.object.champ")}`}
                  </span>
                ) : (
                  <span className="Label3">
                    {t("video.object.selectChamp")}
                  </span>
                )}
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              {filterData?.oppchampion ? (
                <nav
                  ref={wrapperRef2}
                  className={`menu3 ${isActive5.current ? "active" : "inactive"
                    }`}
                >
                  <ul>
                    <Menu3li
                      onClick={() =>
                        pushChampion2(
                          filterData?.oppchampion?.length === champArray2.length
                            ? "none"
                            : "all"
                        )
                      }
                      isChecked={
                        filterData?.oppchampion?.length === champArray2.length
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
                    </Menu3li>
                    <div className="hr-line"></div>
                    {filterData?.oppchampion?.map((champion, idx) => {
                      return (
                        <Menu3li
                          key={idx}
                          onClick={() => pushChampion2(champion)}
                          isChecked={champArray2.includes(champion)}
                        >
                          <input
                            checked={
                              champArray2.includes(champion) ? true : false
                            }
                            type="checkbox"
                            readOnly
                          ></input>
                          {champion}
                        </Menu3li>
                      );
                    })}
                    <button
                      onClick={() => {
                        clickCompareConfirm();
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
  margin: 0px 0 0px 0;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;

const FilterBox = styled.div``;

const DropDownBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 4px;
  overflow-y: visible;
`;

const DropDownBox2 = styled.div`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  justify-content: space-evenly;
  margin-bottom: 4px;
  opacity: 0;
  max-height: 0px;
  overflow-y: visible;
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
  height: 34px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(67, 63, 78);
  border-radius: 10px;
  > span {
    margin: 5px 3px 2px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
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

  .menu-container2 {
    position: relative;
  }
  .menu-container {
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    height: 34px;
    background-color: rgb(35, 33, 42);
    margin: 5px 3px 2px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgb(175, 173, 190);
    width: 74px;
    outline: none;
    border: none;
    border-radius: 10px;
  }

  .menu-trigger2 {
    display: flex;
    align-items: center;
    height: 34px;
    background-color: rgb(35, 33, 42);
    margin: 5px 3px 2px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgb(175, 173, 190);
    width: 124px;
    outline: none;
    border: none;
    border-radius: 10px;
  }

  .menu-trigger:hover {
    // box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .SelectedLabel {
    margin: 5px 3px 2px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
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
    color: r
      ${(props) => (props.changeColor ? `rgb(255, 255, 255)` : `#84818e`)};
    width: 124px;
    margin-left: 20px;
  }

  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: ${(props) => (props.changeColor ? `rgb(255, 255, 255)` : `#84818e`)};
    width: 74px;
  }

  .Label2 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: ${(props) => (props.changeColor ? `rgb(255, 255, 255)` : `#84818e`)};
    width: 124px;
  }

  .Label3 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: ${(props) => (props.changeColor ? `rgb(255, 255, 255)` : `#84818e`)};
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
    margin: 0px 8px;
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

  .menu3 button {
    text-decoration: none;
    display: block;
    margin: 10px auto;
    width: 104px;
    height: 30px;
    border-radius: 10px;
    background-color: #5942ba;
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    cursor: pointer;
    z-index: 9999;
    // :hover {
    //   background-color: rgb(60, 58, 72);
  }

  .hr-line {
    width: 100%;
    border-bottom: solid 1px rgb(67, 63, 78);
    margin: 5px 0 7px;
  }
`;

const Menu3li = styled.li`
  margin-top: 4px;
  text-decoration: none;
  padding: 3px 5px;
  display: flex;
  width: 100%;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  cursor: pointer;
  z-index: 9999;
  

  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
      background-color: rgba(22, 21, 28, 0.5);
      border-radius: 10px;
    `}
  >  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 20px;
    height: 20px;

    background-clip: content-box;
    background: url("/Images/btn_check_off.svg") no-repeat;
    margin-right: 8px;

    &:checked {
      background-color: #5942ba;
      border: #5942ba;
      border-radius: 2px;
      background: url("/Images/btn_check_on.svg") no-repeat;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
  :hover {
    border-radius: 10px;
    background-color: #3a3745;
  }
  }

  
`;
