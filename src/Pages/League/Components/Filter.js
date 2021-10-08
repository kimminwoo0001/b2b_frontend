import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Patch,
  League,
  ConvertedLeague,
  ResetFilter,
  PatchFull
} from "../../../redux/modules/filtervalue";
import axios from "axios";
import styled, { css } from "styled-components";
import { API } from "../../config";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "./useDetectOustsideClick";
import qs from "qs";

function Filter() {
  //리그 필터
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const [leagueFilter, setLeagueFilter] = useState();


  const { t } = useTranslation();
  const LeagueLCK = "lck";
  const LeagueLEC = "lec";
  const LeagueLCS = "lcs";
  const LeagueLPL = "lpl";
  const Msi = "msi";

  const dropdownRef = useRef(null);
  const [isActiveLeague, setIsActiveLeague] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  // 리그 필터 fetch 해오는 함수
  const fetchLeagueFilter = async () => {
    const parsedMatchData = await axios.get(`${API}/api/filter/league`, {
      params: {
        token: user.token,
        id: user.id
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });

    const convertData = [];
    //  받아온 데이터를  LCS, LEC ,LCK, MSI 로 변환 시키는 과정
    // ex) lck ==> LCK
    parsedMatchData?.data?.league?.forEach((el) => {
      if (el === Msi) {
        convertData.push("MSI");
      } else if (el === LeagueLCS) {
        convertData.push("LCS");
      } else if (el === LeagueLEC) {
        convertData.push("LEC");
      } else if (el === LeagueLCK) {
        convertData.push("LCK");
      } else if (el === LeagueLPL) {
        convertData.push("LPL");
      }
    });
    setLeagueFilter(convertData.sort());
  };

  const menus = [
    { name: t("sidebar.part1"), path: "/", image: "/Images/ico-home.png" },
    {
      name: t("sidebar.part2"),
      path: "/league",
      image: "/Images/ico-league.png"
    },
    { name: t("sidebar.part3"), path: "/team", image: "/Images/ico-team.png" },
    {
      name: t("sidebar.part4"),
      path: "/solo",
      image: "/Images/ico-player.png"
    },
    {
      name: t("sidebar.part5"),
      path: "/video",
      image: "/Images/ico-team-video-all-on.png"
    },
    {
      name: t("sidebar.part6"),
      path: "/teamCompare",
      image: "/Images/ico-team-compare.png"
    },
    {
      name: t("sidebar.part7"),
      path: "/playerCompare",
      image: "/Images/ico-player-compare.png"
    },
    {
      name: t("sidebar.part8"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png"
    },
    {
      name: t("sidebar.part9"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png"
    }
  ];

  //아래 리그 dropdown에서 선택된 값을 백엔드 요청에 쓰일 수 있도록  다시 변환 시키는 과정
  // ex) LCK ==> lck
  useEffect(() => {
    if (filters.convertleague === "LCK") {
      dispatch(League(LeagueLCK));
    } else if (filters.convertleague === "LEC") {
      dispatch(League(LeagueLEC));
    } else if (filters.convertleague === "LCS") {
      dispatch(League(LeagueLCS));
    } else if (filters.convertleague === "MSI") {
      dispatch(League(Msi));
    } else if (filters.convertleague === "LPL") {
      dispatch(League(LeagueLPL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.convertleague]);

  // 패치 필터 fetch 함수
  const fetchingPatchFilter = async (league) => {
    const result = await axios.get(`${API}/api/filter/patch`, {
      params: {
        league:
          league === "LCK"
            ? "lck"
            : league === "LEC"
              ? "lec"
              : league === "LPL"
                ? "lpl"
                : league === "LCS"
                  ? "lcs"
                  : "21msi",
        // patch: filters.patch,
        token: user.token,
        id: user.id
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });
    dispatch(PatchFull(result.data.patch));
  };

  // const handleMouseEvent = (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  // };

  return (
    <FilterWrapper>
      <FilterHeader>
        {/*<img src="Images/ico-filter.png" alt="filterIcon"></img>*/}
        <div className="header">
          {lang === 'kr' ? <label>{menus[filters.menu_num].name}</label>
            : <label style={{ fontSize: '33px' }}>{menus[filters.menu_num].name}</label>}
        </div>
        <div className="description">
          {t("filters.description")}
        </div>



      </FilterHeader>
      <LeagueFilter>
        {/* 리그 dropdown */}
        <label>League</label>
        <DropDownToggle className="container">
          <div className="menu-container">
            <button
              onClick={() => {
                setIsActiveLeague(!isActiveLeague);
                fetchLeagueFilter();
              }}
              className="menu-trigger"
            >
              <img
                className="ChampIconImg"
                width="14px"
                height="14px"
                src={
                  filters.convertleague !== ""
                    ? `Images/ico-league-${filters.convertleague.toLowerCase()}.png`
                    : "Images/ico-filter-none.png"
                }
                alt="champIcon"
              />
              <span className="Label">
                {filters.convertleague !== ""
                  ? filters.convertleague
                  : t("filters.leagueLabel")}
              </span>
              <img
                className="ArrowIcon"
                src="Images/ico-filter-arrow.png"
                alt="arrowIcon"
              />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActiveLeague ? "active" : "inactive"}`}
            >
              <ul>
                {leagueFilter?.map((league, idx) => {
                  return (
                    <div className="Wrapper" key={idx}>
                      <img
                        className="ChampIconImg"
                        width="14px"
                        height="14px"
                        src={`Images/ico-league-${league.toLowerCase()}.png`}
                        alt="champIcon"
                      />
                      <li
                        onClick={() => {
                          dispatch(ConvertedLeague(league));
                          dispatch(ResetFilter(league));
                          setIsActiveLeague(!isActiveLeague);
                          fetchingPatchFilter(league);
                        }}
                        key={idx}
                      >
                        {league}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </nav>
          </div>
        </DropDownToggle>
      </LeagueFilter>
      <PatchFilter>
        <label>Patch Version</label>
        {!filters.patchfilter ? (
          // 리그가 선택되지 않았을 때 보여주는 레이아웃
          <PatchLabels>
            <img
              className="ChampIconImg"
              width="14px"
              height="14px"
              src={
                filters.patch !== ""
                  ? `Images/ico-filter-version.png`
                  : "Images/ico-filter-none.png"
              }
              alt="champIcon"
            />
            <span className="Label">{t("filters.patchLabel")}</span>
          </PatchLabels>
        ) : (
          filters.patchfilter?.map((patch, idx) => {
            return (
              // 리그가 선택되었을때 보여주는 체크박스와 패치 리스트
              <SelectedPatch
                key={idx}
                isChecked={filters.patch.includes(patch) ? true : false}
                onClick={() => dispatch(Patch(patch))}
              >
                <input
                  checked={filters.patch.includes(patch) ? true : false}
                  type="checkbox"
                  readOnly
                ></input>
                <div className="Version">
                  {patch === "11.6" ? "11.6 (P.O)" : patch}
                </div>
              </SelectedPatch>
            );
          })
        )}
      </PatchFilter>
    </FilterWrapper>
  );
}

export default Filter;

const PatchLabels = styled.div`
  display: flex;
  align-items: center;
  color: #84818e;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.55px;
  text-align: left;
  width: 100%;
  > img {
    margin: 0 8px 0 10px;
  }
`;

const FilterWrapper = styled.div`
  width: 331px;
  position: sticky;
  top: 0;
  bottom: 0;
  padding: 50px 41px 61px 40px;
  background-color: #23212A;
  // border-right: 1px solid #484655;
`;
/*
const FilterHeader = styled.div`
  height: 49px;
  border-bottom: 1px solid #484655;
  img {
    margin-left: 9px;
    margin-top: 17px;
  }
  label {
    width: 24px;
    height: 15px;
    margin: 0 0 0px 6px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    line-height: 1.36;
    text-align: left;
    color: #84818e;
  }
`;*/

const FilterHeader = styled.div`
  width: 250px;
  font-family: NotoSansKR;
  color: #fff;
  .header {
    height: 70px;
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.88;
    letter-spacing: normal;
    text-align: left;
  }
  .description {
    // height: 47px;
    //margin: 20px 0 0;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  
  
`;


const LeagueFilter = styled.div`
  height: 61px;
  border-bottom: 1px solid #484655;
  label {
    width: 35px;
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 11px;
    line-height: 1.36;
    text-align: left;
    color: #84818e;
  }
`;

const PatchFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 61px;
  border-bottom: 1px solid #484655;
  label {
    width: 120px;
    height: 15px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    margin: 7.6px 0 11px 8px;
    font-size: 11px;
    line-height: 1.36;
    text-align: left;
    color: #84818e;
  }
`;

const SelectedPatch = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 12px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
      background-color: rgb(35, 34, 43);
    `}
  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
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
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4.5px 12px;
  width: 110px;
  height: 25px;
  border-radius: 30px;
  background-color: rgb(72, 70, 85);
  margin-bottom: 6px;

  > img {
    cursor: pointer;
    :hover {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -ms-transform: scale(1.1);
      -o-transform: scale(1.1);
    }
  } */
`;

const DropDownToggle = styled.div`
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
    height: 25px;
    background-color: #2f2d38;
    font-size: 11px;
    width: 128px;
    color: white;
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
    width: 180px;
    margin-left: 20px;
  }

  .Label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    width: 80px;
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
    top: 28px;
    right: 0;
    width: 128px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    z-index: 10;
  }

  .menu.active {
    opacity: 1;

    visibility: visible;
    transform: translateY(0);
    z-index: 10;
    overflow-y: auto;
    max-height: 300px;
    &::-webkit-scrollbar {
      width: 4px;
      height: 10px;

      border-radius: 3px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(67, 63, 78);
      border-radius: 3px;
    }
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 10;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    width: 128px;
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
