import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { Reset_Map } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { API2 } from "../../config";
import { API } from "../../config";

import timeFormat from "../../../lib/timeFormat";
import axiosRequest from "../../../lib/axios/axiosRequest";
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

function WardTeamFilter({ minFrom, setMinFrom }) {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const [filterData, setFilterData] = useState({});
  const { t } = useTranslation();

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

  return (
    <WardTeamFilterContainer>
      <NoneVisible>
        <div className="title">
          <span className="step">STEP 01</span>
          <span className="subtitle">{t("video.vision.label3")}</span>
        </div>
        <DropDownContainer className="container">
          <div className="menu-container">
            <button
              onClick={() => {
                // 팀 설정 비활성화
                // getTeam();
                // setIsActive(!isActive);
              }}
              className="menu-trigger"
            >
              <span>{filters.team}</span>
              <img src="Images/select-arrow.png" alt="arrowIcon" />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                {filterData?.team?.map((team, idx) => {
                  return (
                    <li
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
                        setIsActive(!isActive);
                      }}
                      key={idx}
                    >
                      {team}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </DropDownContainer>
      </NoneVisible>
      <Steps>
        <div className="title2">
          {/* <span className="step">STEP 02 </span> */}
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
            // getAriaValueText={valuetext}
            valueLabelFormat={timeFormat.ward}
          // ValueLabelComponent={ValueLabelComponent}
          />
        </SliderContainer>

        <DefaultTime>
          <DisplayTime>00:00</DisplayTime>
          <DisplayTime>08:30</DisplayTime>
        </DefaultTime>
      </Steps>
    </WardTeamFilterContainer>
  );
}

export default WardTeamFilter;

const SliderContainer = styled.div`
`;

const WardTeamFilterContainer = styled.div``;

const NoneVisible = styled.div`
  display: none;
`;

const Steps = styled.div`
  min-height: 111px;
  padding: 0px 23px 30px;
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
    margin-bottom: 47px;
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

const DropDownContainer = styled.div`
  margin: 0;
  padding: 0;

  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 20px;
  }

  .menu-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-trigger {
    border-radius: 10px;
    display: flex;
    align-items: center;
    width: 518px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    border: solid 1px rgb(35, 33, 42);
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .menu-trigger span {
    vertical-align: middle;
    width: 518px;
  }

  .menu-trigger img {
  }

  .menu {
    z-index: 999;
    background: rgb(35, 33, 42);
    position: absolute;
    top: 37px;
    right: 1;
    width: 518px;
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
    padding: 10px 10px;
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

  .menu-container2 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-trigger2 {
    display: flex;
    align-items: center;
    width: 94px;
    height: 36px;
    border: solid 1px rgb(67, 63, 78);
    /* background-color: rgb(240, 69, 69); */
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: #fff;
  }

  .menu-trigger2:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .menu-trigger2 span {
    vertical-align: middle;
    width: 94px;
  }

  .menu-trigger2 img {
  }

  .menu2 {
    background: rgb(35, 33, 42);
    position: absolute;
    top: 37px;
    right: 1;
    width: 94px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu2.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu2 ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu2 li {
    text-decoration: none;
    padding: 10px 10px;
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
