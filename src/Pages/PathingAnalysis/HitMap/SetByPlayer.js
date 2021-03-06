import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled, { css } from "styled-components";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { Reset_Map } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import { API } from "../../config";

import qs from "qs";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import timeFormat from "../../../lib/timeFormat";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import { goPlayerReport } from "../../../lib/pagePath";

const WardSlider = withStyles({
  root: {
    color: "#5942ba",
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
    // class^="PrivateValueLabel-circle" 타임스탬프 배경 스타일링 
    "& > span": {
      minWidth: 50,
      height: 23,
      transform: "rotate(0deg) translateX(-35%) translateY(5px)",
      borderRadius: 3,
      "&::before": {
        content: "",
        position: "absolute",
        display: "block",
        width: 0,
        left: 50,
        bottom: 10,
        border: "15px solid transparent",
        borderBottom: 0,
        borderTop: "7px solid #5942ba",
        transform: "translate(-50%, calc(100% + 5px))",
      }
    },
    // class^="PrivateValueLabel-label" 타임스탬프 내부 스타일링
    "& > span > span": {
      margin: 0,
      whiteSpace: "nowrap",
      padding: 0,
      fontFamily: "Poppins",
      fontSize: 12,
      fontWeight: "bold",
      transform: "rotate(0deg) !important"
    }
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
  const isPageSolo = document.location.pathname === goPlayerReport ? true : false;
  useOutsideAlerter(wrapperRef, isActive2, filters, champArray);


  useEffect(() => {
    wrapperRef.current = null;
    isActive2.current = false;
    dropdownRef.current = null;
    setFilterData();
    setChampArray([]);
  }, [filters.team])

  function useOutsideAlerter(ref, isActive2, filters, champArray) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (isActive2.current === true && ref?.current) {
          if (!ref?.current.contains(event.target)) {
            const refClassList = Array.from(ref?.current.classList);
            if (refClassList.includes("menu2") === false) {
              isActive2.current = false;
              clickChampionConfirm();
            }
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
        const url = `${API}/lolapi/mapping/mappingfilter/team`;
        const params = {
          league: filters.league,
          year: filters.year,
          season: filters.season,
          patch: filters.patch,
          token: user.token,
          id: user.id,
        };
        axiosRequest(
          undefined,
          url,
          params,
          function (e) {
            const data = e.team;
            setFilterData({ ...filterData, team: data });
          },
          function (objStore) {
            dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const refinePlayerData = (data) => {
    let refined = [];
    for (let i = 0; i < data.length; i++) {
      refined.push(data[i].name);
    }
    return refined;
  };

  // const refinePositionData = (data) => {
  //   let refined = [];
  //   for (let i = 0; i < data.length; i++) {
  //     refined.push(data[i].position);
  //   }
  //   return refined;
  // };

  const getPlayer = () => {
    try {
      if (isPageSolo) {
        setIsActive(!isActive);
      } else {
        const url = `${API}/lolapi/mappingfilter/player`;
        const params = {
          league: filters.league,
          year: filters.year,
          season: filters.season,
          patch: filters.patch,
          team: filters.team,
          token: user.token,
          id: user.id,
        };
        axiosRequest(
          undefined,
          url,
          params,
          function (e) {
            const refinedData = refinePlayerData(e);
            // const refinedPositionData = refinePositionData(e);
            setFilterData({
              ...filterData,
              player: refinedData,
              // position: refinedPositionData,
            });
          },
          function (objStore) {
            dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getChampion = () => {
    try {
      const url = `${API}/lolapi/mappingfilter/champion`;
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
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          const data = e.championEng;
          setFilterData({ ...filterData, champion: data });
          if (isPageSolo && champArray.length === 0 && !filterData) {
            setChampArray(data);
            clickChampionConfirm(data);
          }
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const clickChampionConfirm = (champArrayData = "") => {
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
        oppchampion_eng: "",
      })
    );
  };

  return (
    <SetByPlayerContainer>
      <LeftSection>
        <Steps>
          <div className="title">
            <span className="step">STEP 1.</span>
            <span className="subtitle">{t("video.vision.label4")}</span>
          </div>
          <FilterWrapper>
            {/* <DropDownToggle className="container" changeColor={filters.team.length > 0}>
              <div className="menu-container">
                <button
                  onClick={() => {
                    // 팀 선택 비활성화
                    // setIsActive(!isActive);
                    // getTeam();
                  }}
                  className="menu-trigger"
                  style={{ cursor: "default" }}
                >
                  <span className="Label">
                    {filters.team !== ""
                      ? filters.team
                      : t("video.heatmap.team")}
                  </span>
                  {filters.team === "" && <img
                    className="ArrowIcon"
                    src="Images/select-arrow.png"
                    alt="arrowIcon"
                  />}
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
            </DropDownToggle> */}
            <SeletedTeam>{filters.team}</SeletedTeam>
            <DropDownToggle
              className="container"
              changeColor={filters.player.length > 0}
            >
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
                  <span className="Label2">
                    <span className="champLength">
                      {`${champArray.length} `}
                    </span>
                    {` ${t("video.object.champ")}`}
                  </span>
                ) : (
                  <span className="Label2">
                    {t("video.object.selectChamp")}
                  </span>
                )}
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
                  className={`menu2 ${isActive2.current ? "active" : "inactive"
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
//local
  /* span [class^="PrivateValueLabel-circle"] {
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
      border-top: 7px solid #5942ba;
      transform: translate(-50%, calc(100% + 5px));
    }
  }
  span [class^="PrivateValueLabel-label"] {
    margin: 0px;
    padding: 0;
    font-family: SpoqaHanSansNeo;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.33;
    letter-spacing: normal;
    font-weight: bold;
    transform: rotate(0deg) !important;
  } */
  
// nunu.gg 
/* span [class^="jss50"] {
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
      border-top: 7px solid #5942ba;
      transform: translate(-50%, calc(100% + 5px));
    }
  }
  span [class^="jss51"] {
    margin: 0px;
    white-space: nowrap;
    padding: 0;
    font-family: Poppins;
    font-size: 12px;
    font-weight: bold;
    transform: rotate(0deg) !important;
  } */
`;

const DefaultTime = styled.div`
  margin-top: -3px;
  display: flex;
  justify-content: space-between;
`;

const DisplayTime = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: normal;
  text-align: center;
  color: #6b6979;
`;

const Steps = styled.div`
  min-height: 111px;

  > .title {
    display: flex;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    margin-bottom: 12px;

    > .step {
      font-weight: normal;
      color: #84818e;
      margin-right: 5px;
    }
    > .subtitle {
      color: rgb(255, 255, 255);
    }
  }

  > .title2 {
    display: flex;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    margin-bottom: 40px;

    > .step {
      font-weight: normal;
      color: #84818e;
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
  // border-right: 1px solid rgb(67, 63, 78);
  margin: 23px 30px 40px 25px;
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
    width: 234px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    outline: none;
    border: none;
    border-radius: 10px;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgb(175, 173, 190);
  }
  .menu-trigger2 {
    display: flex;
    align-items: center;
    width: 482px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    outline: none;
    border: none;
    border-radius: 10px;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgb(175, 173, 190);
  }
  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
  .SelectedLabel {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 240px;
    margin-left: 20px;
  }
  .SelectedLabel2 {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 488px;
    margin-left: 20px;
  }
  .Label {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) =>
    props.changeColor ? `rgb(255, 255, 255)` : `rgba(255, 255, 255,0.3)`};
    width: 240px;
  }
  .Label2 {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) =>
    props.changeColor ? `rgb(255, 255, 255)` : `rgba(255, 255, 255,0.3)`};
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
    background: #23212a;
    border-radius: 10px;
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
    background: #23212a;
    border-radius: 10px;
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
    margin: 0px 8px;
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
      border-radius: 20px;

    }
  }
  // .menu2 li {
  //   text-decoration: none;
  //   padding: 15px 20px;
  //   display: block;
  //   width: 488px;
  //   font-family: NotoSansKR, Apple SD Gothic Neo;
  //   font-size: 11px;
  //   letter-spacing: -0.55px;
  //   text-align: left;
  //   color: rgb(255, 255, 255);
  //   cursor: pointer;
  //   z-index: 9999;
  //   :hover {
  //     background-color: rgb(60, 58, 72);
  //   }
  //   > input[type="checkbox"] {
  //     -webkit-appearance: none;
  //     -moz-appearance: none;
  //     appearance: none;

  //     display: inline-block;
  //     width: 12px;
  //     height: 12px;

  //     background-clip: content-box;
  //     border: 1.5px solid rgb(72, 70, 85);
  //     border-radius: 2px;
  //     background-color: transparent;

  //     margin-right: 8px;

  //     &:checked {
  //       background-color: #f04545;
  //       border: #f04545;
  //       border-radius: 2px;
  //       background: url("/Images/check.svg") #f04545 no-repeat 2.5px 4px/5.5px
  //         4.5px;
  //       /* float: right; */
  //     }

  //     &:focus {
  //       outline: none !important;
  //     }
  //   }
  }

  .menu2 button {
    text-decoration: none;
    display: block;
    margin: 12px auto;
    width: 100%;
    height: 30px;
    border-radius: 10px;
    // border: solid 1px rgb(72, 70, 85);
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
  }

  .hr-line {
    width: 100%;
    border-bottom: solid 1px rgb(67, 63, 78);
    margin: 5px 0 7px;
  }
`;

const SeletedTeam = styled.div`
  display: flex;
  width: 230px;
  height: 34px;
  color: #fff;
  text-align: center;
  align-items: center;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  margin: 0 0 0 18px;
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
