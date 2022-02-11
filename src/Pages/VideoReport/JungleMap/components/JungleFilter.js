/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  League,
  Year,
  Season,
  Team,
  Player,
  Patch,
  ResetYear,
  ResetSeason,
  ResetTeam,
  ResetPlayer,
  Position,
  ResetChampion,
  HandleTab,
  ResetFilter2,
  PatchFull,
  SetSeason,
  SetYear,
  SetPatch,
  SetLeague,
  OppTeam,
  Loading,
  SetCheckedInputs,
  CONVERTED_LEAGUE
} from "../../../../redux/modules/filtervalue";
import {
  setLeagueFilter,
  setPatchFilter,
  setPlayerFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../../../redux/modules/selectorvalue";


import Radio from "../../../../Components/Ui/Radio";
import Checkbox from '../../../../Components/Ui/Checkbox'
import { typoStyle } from "../../../../Styles/ui";
import { useTranslation } from "react-i18next";


const JungleFilter = () => {
  const filters = useSelector((state) => state.FilterReducer);
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    year: [],
    league: {},
    season: {},
    team: {},
    patch: {},
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);

    if (type === "radio") {
      setFilterData({ ...filterData, [name]: [value] });
    }

    if (type === "checkbox") {
      console.log("--------", filterData.league)
      if (value === "all") {
        setFilterData((prev) => {
          const newData = { ...prev };
          for (let key in newData[name]) {
            newData[name][key] = checked;
          }
          return newData;
        });
      } else {
        console.log("=====checked:", filterData.season)
        console.log("=====checked:", checked)

        setFilterData({
          ...filterData,
          [name]: { ...filterData[name], [value]: checked },


        });
      }
    }
  };

  const fetchYearFilter = () => {
    let yearList = [];
    const leagues = Object.keys(staticvalue.filterObjects).sort();

    let count = 0;
    for (let i = 0; i < leagues.length; i++) {
      const years = Object.keys(staticvalue.filterObjects[leagues[i]]);
      if (years.length === 1) {
        count++;
      }
    }
    if (count >= 1) {
      yearList = ["2021", "2022"];
    } else {
      yearList = ["2021"]
    }

    yearList = yearList
      .filter((item, pos) => yearList.indexOf(item) === pos)
      .sort();

    console.log(yearList);
    dispatch(setYearFilter(yearList));
  }

  const fetchLeagueFilter = () => {
    let leagueList = [];
    if (filterData.year.length === 0) {
      return;
    }

    if (filterData.year.includes("2021")) {
      leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL");
    } else {
      leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL" && league !== "MSI" && league !== "WC");
    }

    leagueList.sort();
    dispatch(setLeagueFilter(leagueList));
  }

  const fetchSeasonFilter = () => {
    let seasonList = [];
    if (filterData.year.length !== 0) {
      const result = Object.keys(filterData.league).filter(key => filterData.league[key] === true)
      console.log(result);
      for (let year of filterData.year) {
        console.log(year);
        for (let league of result) {
          const ObjectKeys = Object.keys(staticvalue.filterObjects[league][year])
          seasonList = seasonList.concat(ObjectKeys);
        }
      }
      // 공통되는 시즌이 아닌 경우로만 sorting
      seasonList = seasonList.filter(
        (item, pos) => seasonList.indexOf(item) === pos
      );
      console.log("sortedSeasonList", seasonList);
    }
    dispatch(setSeasonFilter(seasonList));
  }

  console.log("=====checked:", filterData)

  // 연도 설정 후 리그필터 호출
  useEffect(() => {
    if (filterData.year.length === 0) {
      return;
    }
    fetchLeagueFilter();
  }, [filterData.year])

  // 리그 설정 후 시즌필터 호출
  useEffect(() => {
    if (Object.keys(filterData.league).length === 0) {
      return;
    }
    fetchSeasonFilter();
  }, [filterData.league])


  // 최초 checkbox state의 value값을 false 처리
  const initializedLeagueValue = (param) => {
    let newArray = [];
    for (let i = 0; i < param.length; i++) {
      newArray.push(param[i])
    }
    const result = newArray.sort().reduce((newObj, key) => {
      console.log(newObj);
      console.log(key);
      newObj[key] = false;
      return newObj;
    },
      {}
      )
    return result;
  }

  useEffect(() => {
    if (filterData.year.length === 0) {
      return;
    }
    const result = initializedLeagueValue(selector.leagueFilter);

    setFilterData({
      ...filterData,
      league: result,
    })
  }, [selector.leagueFilter])

  useEffect(() => {
    if (Object.keys(filterData.league).length === 0) {
      return;
    }
    const result = initializedLeagueValue(selector.seasonFilter);

    setFilterData({
      ...filterData,
      season: result,
    })
  }, [selector.seasonFilter])


  // 첫 렌더 시 연도 필터 가져오기
  useEffect(() => {
    fetchYearFilter();
  }, [])

  useEffect(() => {
    console.log(filterData)
    console.log(staticvalue.filterObjects);
  }, [filterData.year, filterData.league, filterData.season])


  return (
    <SFilterContainer>
      {/* 연도 */}
      <SRow>
        <STitle>연도</STitle>
        <SFilterGroup>
          {selector.yearFilter?.map((year) => {
            return (
              <Radio
                name="year"
                value={year}
                onChange={handleChange}
                checked={filterData.year.includes(year)}
              >
                {year}
              </Radio>
            )
          })}
        </SFilterGroup>
      </SRow>
      {/* 리그 */}
      <SRow>
        <STitle>리그</STitle>
        <SFilterGroup>
          <SCheckboxAll
            name="league"
            value="all"
            onChange={handleChange}
            checked={selector.leagueFilter.length === Object.keys(filterData.league).length && !Object.values(filterData.league).includes(false)}
          >
            전체선택
          </SCheckboxAll>
          {Object.keys(filterData.league).length !== 0 && selector.leagueFilter?.map((league) => {
            console.log(filterData["league"].league === league);
            console.log(filterData);
            return (
              <Checkbox
                name="league"
                value={league}
                onChange={handleChange}
                checked={filterData["league"][league]}
            >
              {league}
            </Checkbox>
            )
          })}

        </SFilterGroup>
      </SRow>
      {/* 시즌 */}
      <SRow>
        <STitle>시즌</STitle>
        <SFilterGroup>
          <SCheckboxAll
            name="season"
            value="all"
            onChange={handleChange}
            checked={selector.seasonFilter.length === Object.keys(filterData.season).length && !Object.values(filterData.season).includes(false)}
          >
            전체선택
          </SCheckboxAll>
          {Object.keys(filterData.season).length !== 0 && selector.seasonFilter?.map((season) => {
            return (
              <Checkbox
                name="season"
                value={season}
                onChange={handleChange}
                checked={filterData["season"][season]}
              >
                {season}
              </Checkbox>
            )
          })}
        </SFilterGroup>
      </SRow>
    </SFilterContainer>
  );
};


const SFilterContainer = styled.section`
  width: 1096px;
  ${typoStyle.contents}
`;
const SRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const STitle = styled.div`
  flex: 1;
`;

const SCheckboxAll = styled(Checkbox)``;

const SFilterGroup = styled.div`
  display: flex;
  align-items: center;
  width: 1004px;
  height: 44px;
  ${typoStyle.contents}

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.bg_box};
  padding-left: 15px;

  label {
    margin-right: 22px;
  }

  ${SCheckboxAll} {
    margin-right: 36px;
  }
`;

export default JungleFilter;
