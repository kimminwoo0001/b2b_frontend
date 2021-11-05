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
import timeFormat from "../../../lib/timeFormat";
import axiosRequest from "../../../lib/axiosRequest";

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

function SetByPlayer({ minFrom, setMinFrom }) {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const wrapperRef = useRef(null);
  const isActive2 = useRef(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [filterData, setFilterData] = useState();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef, false);
  const { t } = useTranslation();
  const [champArray, setChampArray] = useState([]);
  const isPageSolo = document.location.pathname === '/solo' ? true : false;
  useOutsideAlerter(wrapperRef, isActive2, filters, champArray);

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

      if (isPageSolo && !filterData) {
        getChampion();
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, isActive2, filters, champArray]);


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
  const handleChange = (event, newValue) => {
    setMinFrom(newValue);
  };

  const getTeam = () => {
    try {
      if (isPageSolo) {
        setIsActive(!isActive);
      } else {
        const url = `${API2}/api/mappingFilter`;
        const params = {
          league: filters.league,
          year: filters.year,
          season: filters.season,
          patch: filters.patch,
          token: user.token,
          id: user.id,
        };
        axiosRequest(url, params, function (e) {
          const data = e.data.team;
          setFilterData({ ...filterData, team: data });
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPlayer = () => {
    try {
      if (isPageSolo) {
        setIsActive(!isActive);
      } else {
        const url = `${API2}/api/mappingFilter`;
        const params = {
          league: filters.league,
          year: filters.year,
          season: filters.season,
          patch: filters.patch,
          team: filters.team,
          token: user.token,
          id: user.id,
        };
        axiosRequest(url, params, function (e) {
          const data = e.data.player;
          setFilterData({ ...filterData, player: data });
        })
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getChampion = () => {
    try {
      const url = `${API2}/api/mappingFilter`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        token: user.token,
        id: user.id,
      }
      axiosRequest(url, params, function (e) {
        const data = e.data.champion;
        setFilterData({ ...filterData, champion: data });
        if (isPageSolo && champArray.length === 0 && !filterData) {
          setChampArray(data);
          clickChampionConfirm(data);
        }
      })
    } catch (e) {
      console.log(e);
    }
  };

  const clickChampionConfirm = (champArrayData = '') => {
    isActive2.current = false;
    dispatch(
      Reset_Map({
        menu_num: filters.menu_num,
        filterMenuState: filters.filterMenuState,
        tab: filters.tab,
        convertleague: filters.convertleague,
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,

        team: filters.team,
        player: filters.player,
        champion_eng: champArray.length > 0 ? champArray : champArrayData,
        position: filters.position,
        oppteam: "",
        oppplayer: "",
        oppchampion_eng: ""
      })
    );
  }

  return (
    <SetByPlayerContainer>
      <LeftSection>
        <Steps>
          <div className="title">
            <span className="step">STEP 1.</span>
            <span className="subtitle">{t("video.vision.label4")}</span>
          </div>
          <FilterWrapper>
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
                            dispatch(
                              Reset_Map({
                                menu_num: filters.menu_num,
                                filterMenuState: filters.filterMenuState,
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
                            setIsActive1(false);
                            setChampArray([]);
                            dispatch(
                              Reset_Map({
                                menu_num: filters.menu_num,
                                filterMenuState: filters.filterMenuState,
                                tab: filters.tab,
                                convertleague: filters.convertleague,
                                league: filters.league,
                                year: filters.year,
                                season: filters.season,
                                patch: filters.patch,

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
          </FilterWrapper>
          <DropDownToggle className="container">
            <div className="menu-container2">
              <button
                onClick={() => {
                  //setIsActive2(!isActive2);
                  isActive2.current = !isActive2.current;
                  getChampion();
                }}
                className="menu-trigger2"
              >
                <span className="Label2">
                  <span className="champLength">{`${champArray.length}`}</span>
                  {` ${t("video.object.champ")}`}
                </span>
                <img
                  className="ArrowIcon"
                  src="Images/select-arrow.png"
                  alt="arrowIcon"
                />
              </button>
              {console.log("isActive2.current:", isActive2.current)}
              {filterData?.champion ? (
                <nav
                  ref={wrapperRef}
                  className={`menu2 ${isActive2.current ? "active" : "inactive"}`}
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
                        //setIsActive2(false);
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
              getAriaValueText={timeFormat.hitmap}
              valueLabelFormat={timeFormat.hitmap}
            // ValueLabelComponent={ValueLabelComponent}
            />
          </SliderContainer>
          <DefaultTime>
            <DisplayTime>00:00</DisplayTime>
            <DisplayTime>15:00</DisplayTime>
          </DefaultTime>
        </Steps>
      </RightSection>
    </SetByPlayerContainer>
  );
}

export default SetByPlayer;

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

const SetByPlayerContainer = styled.div`
  display: flex;
`;

const LeftSection = styled.section`
  width: 549px;
  border-right: 1px solid rgb(67, 63, 78);
  margin: 23px 30px 23px 25px;
`;

const RightSection = styled.section`
  width: 549px;
  padding: 0 23px 0 10px;
  margin: 23px 0;
`;

const FilterWrapper = styled.div`
  display: flex;
`;

const DropDownToggle = styled.div`
  padding: 0;
  width: 240px;
  margin: 0 8px 0 0;
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  .menu-container {
    position: relative;
  }

  .menu-container2 {
    position: relative;
    margin-top: 8px;
  }
  .menu-trigger {
    display: flex;
    align-items: center;
    width: 240px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    font-size: 12px;
    color: rgb(175, 173, 190);
    outline: none;
    border: none;
  }
  .menu-trigger2 {
    display: flex;
    align-items: center;
    width: 488px;
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
  .SelectedLabel {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 240px;
    margin-left: 20px;
  }
  .SelectedLabel2 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 488px;
    margin-left: 20px;
  }
  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 240px;
  }
  .Label2 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 488px;
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
    width: 240px;
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
    width: 488px;
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
  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    width: 240px;
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
    width: 488px;
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

  .menu2 button {
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
