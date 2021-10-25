import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import { Reset_Map } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { API2 } from "../../config";
import qs from "qs";
import checkSeason from "../../../lib/checkSeason";

function valuetext(value) {
  const time = value * 5100;
  return `0${Math.floor(time / 1000 / 60)} : ${Math.floor((time / 1000) % 60)}`;
}

const WardSlider = withStyles({
  root: {
    color: "#f04545",
    height: 2
  },
  thumb: {
    height: 13,
    width: 13,
    backgroundColor: "#817e90",
    border: "1px solid #817e90",
    marginTop: -3,
    marginLeft: -7,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50%)",
    top: -30
  },
  track: {
    height: 6,
    borderRadius: 4
  },
  rail: {
    height: 6,
    backgroundColor: "#433f4e",
    borderRadius: 4
  }
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

  const getTeam = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          year: filters.year,
          season: checkSeason(filters) ? filters.season?.map(season => season.substring(5)) : "",
          patch: filters.patch,
          token: user.token,
          id: user.id
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      });
      const data = response.data.team;
      setFilterData({ ...filterData, team: data });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WardTeamFilterContainer>
      <Steps>
        <div className="title">
          <span className="step">STEP 1.</span>
          <span className="subtitle">{t("video.vision.label3")}</span>
        </div>
        <DropDownContainer className="container">
          <div className="menu-container">
            <button
              onClick={() => {
                getTeam();
                setIsActive(!isActive);
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
                            tab: filters.tab,
                            convertleague: filters.convertleague,
                            league: filters.league,
                            year: filters.year,
                            season: filters.season,
                            patch: filters.patch,
                            patchfilter: filters.patchfilter,
                            team: team,
                            player: "",
                            champion_eng: "",
                            oppteam: "",
                            oppplayer: "",
                            oppchampion_eng: ""
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
      </Steps>
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
            // getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
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

const WardTeamFilterContainer = styled.div``;

const Steps = styled.div`
  min-height: 111px;
  border-bottom: 1px solid rgb(67, 63, 78);
  padding: 23px;
  :nth-child(2) {
    border-bottom: none;
  }
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
    width: 518px;
    height: 34px;
    background-color: rgb(35, 33, 42);
    border: solid 1px rgb(35, 33, 42);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: rgb(175, 173, 190);
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
    color: rgb(175, 173, 190);
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
