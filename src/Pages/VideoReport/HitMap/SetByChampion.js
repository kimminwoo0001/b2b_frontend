import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { Reset_Map } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import qs from "qs";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  const time = value * 9000;
  return `${Math.floor(time / 1000 / 60)} : ${Math.floor((time / 1000) % 60)}`;
}

const WardSlider = withStyles({
  root: {
    color: "#f04545",
    height: 2,
  },
  thumb: {
    height: 13,
    width: 13,
    backgroundColor: "#817e90",
    border: "1px solid #817e90",
    marginTop: -3,
    marginLeft: -7,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50%)",
    top: -30,
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    backgroundColor: "#433f4e",
    borderRadius: 4,
  },
})(Slider);

function SetByChampion({ minFrom, setMinFrom }) {
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
  const isPageSolo = document.location.pathname === '/solo' ? true : false;

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
  const handleChange = (event, newValue) => {
    setMinFrom(newValue);
  };

  const getTeam = async () => {
    try {
      if (isPageSolo) {
        setIsActive(!isActive);
      } else {
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPlayer = async () => {
    try {
      if (isPageSolo) {
        setIsActive1(!isActive);
      } else {
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
      }
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
  return (
    <SetByChampionContainer>
      <LeftSection>
        <Steps>
          <div className="title">
            <span className="step">STEP 1.</span>
            <span className="subtitle">{t("video.vision.label4")}</span>
          </div>
          <FilterWrapper>
            <LabelVs>
              <div className="top"></div>
              <div>VS</div>
              <div className="bottom"></div>
            </LabelVs>
            <FilterContainer>
              <FilterBox>
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
                        {filters.team !== ""
                          ? filters.team
                          : t("video.heatmap.team")}
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
                  <div className="menu-container">
                    <button
                      onClick={() => {
                        setIsActive1(!isActive1);
                        getPlayer();
                      }}
                      className="menu-trigger"
                    >
                      <span className="Label">
                        {filters.player !== ""
                          ? filters.player
                          : t("video.heatmap.player")}
                      </span>
                      <img
                        className="ArrowIcon"
                        src="Images/select-arrow.png"
                        alt="arrowIcon"
                      />
                    </button>
                    <nav
                      ref={dropdownRef}
                      className={`menu ${isActive1 ? "active" : "inactive"}`}
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
                        <span className="champLength">{`${champArray.length}`}</span>
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
                                filterData?.champion?.length ===
                                  champArray.length
                                  ? "none"
                                  : "all"
                              )
                            }
                          >
                            <input
                              checked={
                                filterData?.champion?.length ===
                                  champArray.length
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
                              <li
                                key={idx}
                                onClick={() => pushChampion(champion)}
                              >
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
                              setChampArray2([]);
                              dispatch(
                                Reset_Map({
                                  tab: filters.tab,
                                  convertleague: filters.convertleague,
                                  league: filters.league,
                                  patch: filters.patch,
                                  patchfilter: filters.patchfilter,
                                  team: filters.team,
                                  position: filters.position,
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
              </FilterBox>
              <FilterBox>
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
                          : t("video.heatmap.team2")}
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
                                    position: filters.position,
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
                  <div className="menu-container">
                    <button
                      onClick={() => {
                        setIsActive4(!isActive4);
                        getOppPlayer();
                      }}
                      className="menu-trigger"
                    >
                      <span className="Label">
                        {filters.oppplayer !== ""
                          ? filters.oppplayer
                          : t("video.heatmap.player2")}
                      </span>
                      <img
                        className="ArrowIcon"
                        src="Images/select-arrow.png"
                        alt="arrowIcon"
                      />
                    </button>
                    <nav
                      ref={dropdownRef}
                      className={`menu ${isActive4 ? "active" : "inactive"}`}
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
                                    position: filters.position,
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
                                filterData?.oppchampion?.length ===
                                  champArray2.length
                                  ? "none"
                                  : "all"
                              )
                            }
                          >
                            <input
                              checked={
                                filterData?.oppchampion?.length ===
                                  champArray2.length
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
                              <li
                                key={idx}
                                onClick={() => pushChampion2(champion)}
                              >
                                <input
                                  checked={
                                    champArray2.includes(champion)
                                      ? true
                                      : false
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
                              dispatch(
                                Reset_Map({
                                  tab: filters.tab,
                                  convertleague: filters.convertleague,
                                  league: filters.league,
                                  patch: filters.patch,
                                  patchfilter: filters.patchfilter,
                                  team: filters.team,
                                  player: filters.player,
                                  position: filters.position,
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
              </FilterBox>
            </FilterContainer>
          </FilterWrapper>
        </Steps>
      </LeftSection>
      <RightSection>
        <Steps>
          <div className="title2">
            <span className="step">STEP 2.</span>
            <span className="subtitle">{t("video.vision.label2")}</span>
          </div>
          <SliderContainer className="slider-container">
            <WardSlider
              min={0}
              max={100}
              value={minFrom}
              onChange={handleChange}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              valueLabelFormat={valuetext}
            // ValueLabelComponent={ValueLabelComponent}
            />
          </SliderContainer>
          <DefaultTime>
            <DisplayTime>00:00</DisplayTime>
            <DisplayTime>15:00</DisplayTime>
          </DefaultTime>
        </Steps>
      </RightSection>
    </SetByChampionContainer>
  );
}

export default SetByChampion;

const SliderContainer = styled.div`
  span [class^="PrivateValueLabel-circle"] {
    min-width: 50px;
    height: 23px;
    transform: rotate(0deg) translateX(-35%) translateY(5px);
    border-radius: 10%;
    ::before {
      content: "";
      position: absolute;
      display: block;
      width: 0px;
      left: 50%;
      bottom: 10;
      border: 15px solid transparent;
      border-bottom: 0;
      border-top: 7px solid #f04545;
      transform: translate(-50%, calc(100% + 5px));
    }
  }
  span [class^="PrivateValueLabel-label"] {
    margin: 0px;
    padding: 0;
    font-family: Poppins;
    font-size: 12px;
    font-weight: bold;
    transform: rotate(0deg) !important;
  }
`;

const DefaultTime = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DisplayTime = styled.div`
  font-family: Poppins;
  font-size: 12px;
  text-align: center;
  color: rgb(107, 105, 121);
`;

const FilterContainer = styled.div``;

const FilterBox = styled.div`
  display: flex;
  :nth-child(1) {
    margin-bottom: 8px;
  }
`;

const Steps = styled.div`
  min-height: 111px;

  > .title {
    display: flex;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    margin-bottom: 12px;

    > .step {
      font-weight: normal;
      color: rgb(240, 69, 69);
      margin-right: 5px;
    }
    > .subtitle {
      color: rgb(255, 255, 255);
    }
  }

  > .title2 {
    display: flex;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    margin-bottom: 47px;

    > .step {
      font-weight: normal;
      color: rgb(240, 69, 69);
      margin-right: 5px;
    }
    > .subtitle {
      color: rgb(255, 255, 255);
    }
  }
`;

const LeftSection = styled.section`
  width: 549px;
  border-right: 1px solid rgb(67, 63, 78);
  margin: 23px 30px 23px 25px;
`;

const RightSection = styled.section`
  width: 549px;
  padding: 0 23px 0 10px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const SetByChampionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LabelVs = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  color: rgb(107, 105, 121);
  margin: 0 10px 0 0;
  > .top {
    position: absolute;
    top: 235px;
    left: 255px;
    width: 12px;
    height: 9px;
    border-left: 1px solid rgb(67, 63, 78);
    border-top: 1px solid rgb(67, 63, 78);
  }
  > .bottom {
    position: absolute;
    top: 265px;
    left: 255px;
    width: 12px;
    height: 9px;
    border-left: 1px solid rgb(67, 63, 78);
    border-bottom: 1px solid rgb(67, 63, 78);
  }
`;

const DropDownToggle = styled.div`
  width: 140px;
  padding: 0;
  margin: 0 0px 0 0;
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  .menu-container {
  }
  .menu-trigger {
    display: flex;
    align-items: center;
    width: 140px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    font-size: 12px;
    color: rgb(175, 173, 190);
    outline: none;
    border: none;
  }
  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
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

  .SelectedLabel {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 140px;
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
    width: 140px;
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
    width: 140px;
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
    width: 140px;
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
