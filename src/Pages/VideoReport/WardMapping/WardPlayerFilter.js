import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { Reset_Map, Champion, SetChampion } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import { API } from "../../config";

import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import timeFormat from "../../../lib/timeFormat";
import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

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
      zIndex: 0,
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

function WardPlayerFilter({
  compareOpen,
  setCompareOpen,
  minFrom,
  setMinFrom,
}) {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef, false);
  const [isActive2, setIsActive2] = useDetectOutsideClick(dropdownRef, false);
  // const isActive2 = useRef(false);
  const [isActive3, setIsActive3] = useDetectOutsideClick(dropdownRef, false);
  const [isActive4, setIsActive4] = useDetectOutsideClick(dropdownRef, false);
  const [isActive5, setIsActive5] = useDetectOutsideClick(dropdownRef, false);
  const [filterData, setFilterData] = useState({});
  const [champArray, setChampArray] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setChampArray([])
  }, [filters.team])


  const clickChampionConfirm = () => {
    setIsActive2(false);
    // isActive2.current = false;
    // setGameSelect([]);
    // setGameOpen(true);
    // setChampArray([]);
    dispatch(SetChampion(champArray))
    // getGame();
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

  const handleChange = (event, newValue) => {
    setMinFrom(newValue);
  };

  const getTeam = () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };


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


  // mappingfilter/player response 가공
  const refinePlayerData = (data) => {
    let refined = [];
    for (let i = 0; i < data.length; i++) {
      refined.push(data[i].name);
    }
    return refined;
  };




  const getPlayer = () => {
    try {
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
          setFilterData({ ...filterData, player: refinedData });
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
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
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getOppTeam = () => {
    try {
      const url = `${API}/lolapi/mappingfilter/oppteam`;
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
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          setFilterData({ ...filterData, oppteam: e });
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const refineOppPlayerData = (data) => {
    let refined = [];
    for (let i = 0; i < data.length; i++) {
      refined.push(data[i].oppplayer);
    }
    return refined;
  };

  const getOppPlayer = () => {
    try {
      const url = `${API}/lolapi/mappingfilter/oppplayer2`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        oppteam: filters.oppteam,
        token: user.token,
        id: user.id,
      };
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          const refinedData = refineOppPlayerData(e);
          setFilterData({ ...filterData, oppplayer: refinedData });
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getOppChampion = () => {
    try {
      const url = `${API}/lolapi/mappingfilter/oppchampion`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        oppteam: filters.oppteam,
        oppplayer: filters.oppplayer,
        token: user.token,
        id: user.id,
      };
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          const data = e.championEng;
          setFilterData({ ...filterData, oppchampion: data });
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <WardPlayerFilterContainer>
      <Steps>
        <div className="title">
          <span className="step">STEP 01</span>
          <span className="subtitle">{t("video.vision.label1")}</span>
        </div>
        <FilterBox>
          <DropDownBox>
            <DropDownToggle
              className="container"
              changeColor={filters.team.length > 0}
            >
              <div className="menu-container">
                <button
                  onClick={() => {
                    // 팀 설정 비활성화
                    // setIsActive(!isActive);
                    // getTeam();
                  }}
                  className="menu-trigger"
                  style={{
                    cursor: "default",
                    backgroundColor: "rgba(255,255,255,0.0)",
                  }}
                >
                  <span className="Label">
                    {filters.team !== ""
                      ? filters.team
                      : t("video.vision.team")}
                  </span>
                  {filters.team === "" && (
                    <img
                      className="ArrowIcon"
                      src="Images/select-arrow.png"
                      alt="arrowIcon"
                    />
                  )}
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
                      : t("video.vision.player")}
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
            <DropDownToggle
              className="container"
              changeColor={champArray.length > 0}
            >
              <div className="menu-container2">
                <button
                  onClick={() => {
                    setIsActive2(!isActive2);
                    // isActive2.current = false;
                    getChampion();
                  }}
                  className="menu-trigger2"
                >
                  {champArray && champArray.length !== 0 ? (
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
                  {/* <span className="Label2">
                    {filters.champion_eng !== ""
                      ? filters.champion_eng
                      : t("video.vision.champ")}
                  </span> */}
                  <img
                    className="ArrowIcon"
                    src="Images/select-arrow.png"
                    alt="arrowIcon"
                  />
                </button>

                {/* 챔피언 중복선택 추가 */}
                {filterData?.champion ? (
                  <nav
                    ref={dropdownRef}
                    className={`menu3 ${isActive2 ? "active" : "inactive"}`}
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
                {/*  */}
                {/* <nav
                  ref={dropdownRef}
                  className={`menu2 ${isActive2 ? "active" : "inactive"}`}
                >
                  <ul>
                    {filterData?.champion?.map((champion, idx) => {
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

                                team: filters.team,
                                player: filters.player,
                                champion_eng: champion,
                                oppteam: "",
                                oppplayer: "",
                                oppchampion_eng: "",
                              })
                            );
                          }}
                        >
                          {champion}
                        </li>
                      );
                    })}
                  </ul>
                </nav> */}
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
                      : t("video.vision.team2")}
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
                      : t("video.vision.player2")}
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
              changeColor={filters.oppchampion_eng.length > 0}
            >
              <div className="menu-container2">
                <button
                  onClick={() => {
                    setIsActive5(!isActive5);
                    getOppChampion();
                  }}
                  className="menu-trigger2"
                >
                  <span className="Label2">
                    {filters.oppchampion_eng !== ""
                      ? filters.oppchampion_eng
                      : t("video.vision.champ2")}
                  </span>
                  <img
                    className="ArrowIcon"
                    src="Images/select-arrow.png"
                    alt="arrowIcon"
                  />
                </button>
                <nav
                  ref={dropdownRef}
                  className={`menu2 ${isActive5 ? "active" : "inactive"}`}
                >
                  <ul>
                    {filterData?.oppchampion?.map((oppchampion, idx) => {
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

                                team: filters.team,
                                player: filters.player,
                                champion_eng: filters.champion_eng,
                                oppteam: filters.oppteam,
                                oppplayer: filters.oppplayer,
                                oppchampion_eng: oppchampion,
                              })
                            );
                            setIsActive5(!isActive5);
                          }}
                        >
                          {oppchampion}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </DropDownToggle>
          </DropDownBox2>
          {/* <CompareButton onClick={() => setCompareOpen(!compareOpen)}>
            <span>
              {compareOpen === true
                ? t("video.vision.compare2")
                : t("video.vision.compare")}
            </span>
            <img
              src={
                compareOpen === true
                  ? "Images/ico-arrow-up2.png"
                  : "Images/ico-arrow-down2.png"
              }
              alt="arrow"
            />
          </CompareButton> */}
        </FilterBox>
      </Steps>
      <Steps>
        <div className="title2">
          <span className="step">STEP 02</span>
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
            getAriaValueText={timeFormat.ward}
            valueLabelFormat={timeFormat.ward}
          // ValueLabelComponent={ValueLabelComponent}
          />
        </SliderContainer>
        <DefaultTime>
          <DisplayTime>00:00</DisplayTime>
          <DisplayTime>08:30</DisplayTime>
        </DefaultTime>
      </Steps>
    </WardPlayerFilterContainer>
  );
}

export default WardPlayerFilter;

const SliderContainer = styled.div`
`;

const WardPlayerFilterContainer = styled.div``;

const DefaultTime = styled.div`
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
  padding: 0px 23px 20px;
  :nth-child(2) {
    border-bottom: none;
  }

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
    font-family: NotoSansKR, Apple SD Gothic Neo;
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
  overflow: hidden;
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
  width: 517px;
  height: 34px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(67, 63, 78);
  border-radius: 10px;
  > span {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
  img {
    margin-left: 10px;
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
  }

  .menu-container2 {
    position: relative;
  }
  .menu-trigger {
    display: flex;
    align-items: center;
    width: 142px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    outline: none;
    border: none;
  }

  .menu-trigger2 {
    display: flex;
    align-items: center;
    width: 183px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgba(255, 255, 255, 0.3);
    outline: none;
    border: none;
    border-radius: 10px;
  }

  .menu-trigger:hover {
    // box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
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
    width: 142px;
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
    width: 183px;
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
    props.changeColor ? `rgb(255, 255, 255)` : `rgba(255, 255, 255, 0.3)`};
    width: 142px;
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
    props.changeColor ? `rgb(255, 255, 255)` : `rgba(255, 255, 255, 0.3)`};
    width: 183px;
  }

  .Label3 {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: ${(props) => (props.changeColor ? `rgb(255, 255, 255)` : `#84818e`)};
    width: 183px;
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
    width: 142px;
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
    width: 183px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    z-index: 10;
  }

  .menu3 {
    background: #23212a;
    border-radius: 10px;
    position: absolute;
    top: 10;
    right: 1;
    width: 183px;
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
    width: 142px;
    height: 40px;

    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
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

  .menu2 li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    width: 183px;
    height: 40px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
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

  .menu3 button {
    text-decoration: none;
    display: block;
    margin: 10px auto;
    width: 164px;
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
  

  
`;
