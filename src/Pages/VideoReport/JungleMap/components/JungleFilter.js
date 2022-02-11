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
    year: "",
    league: {}
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFilterData({ ...filterData, [name]: value });
    }

    if (type === "checkbox") {
      if (value === "all") {
        setFilterData((prev) => {
          const newData = { ...prev };
          for (let key in newData[name]) {
            newData[name][key] = checked;
          }
          return newData;
        });
      } else {
        console.log("checked:", checked)
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
    if (filterData.year === "") {
      return;
    }

    if (filterData.year === "2021") {
      leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL");
    } else if (filterData.year === "2022") {
      leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL" && league !== "MSI" && league !== "WC");
    }

    leagueList.sort();
    dispatch(setLeagueFilter(leagueList));
  }

  useEffect(() => {
    fetchLeagueFilter();
  }, [filterData.year])

  // 첫 렌더링 시 연도 필터 가져오기
  useEffect(() => {
    fetchYearFilter();
  }, [])

  useEffect(() => {
    console.log(filterData)
  }, [filterData.year, filterData.league])

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
                checked={filterData.year === year}
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
            checked={filterData.league.all}
          >
            전체선택
          </SCheckboxAll>
          {selector.leagueFilter?.map((league) => {
            console.log(filterData["league"].league === league);
            return (
              <Checkbox
                name="league"
                value={league}
                onChange={handleChange}
                checked={filterData["league"].league === league}
            >
              {league}
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
