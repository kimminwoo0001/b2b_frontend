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
  const [checkedList, setCheckedLists] = useState([]);
  
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    year: 2021,
    league: { all: false, LCK: true, LCKCL: false, LCS: false },
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
        setFilterData({
          ...filterData,
          [name]: { ...filterData[name], [value]: checked },
        });
      }
    }
  };

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback(
  (checked, item) => {
    if (checked) {
    setCheckedLists([...checkedList, item]);
    } else {
    setCheckedLists(checkedList.filter((el) => el !== item));
  }
},
  [checkedList]
  );
;


  const fetchYearFilter = () => {
    let yearList = [];
    let count = 0;
    for (let league of filters.league) {
      const ObjectKeys = Object.keys(staticvalue.filterObjects[league]);
      if (ObjectKeys.length === 1) {
        count++;
      }
    }
    if (count >= 1) {
      yearList = ["2021"];
    } else {
      yearList = ["2021", "2022"];
    }

    yearList = yearList
      .filter((item, pos) => yearList.indexOf(item) === pos)
      .sort()
    // .reverse();

    // if (filters.year.length !== 0) {
    //   dispatch(Year(yearList[0])); // 리그 선택 시, 가장 최근 Year, Season을 자동 선택
    // }
    dispatch(setYearFilter(yearList));
  };

  const fetchLeagueFilter = () => {
    let leagueList = [];
    console.log(staticvalue.filterObjects)
    leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL").sort();
    dispatch(League(leagueList[0]));
    dispatch(setLeagueFilter(leagueList.sort()));
  };

  useEffect(() => {
    fetchYearFilter();
  }, [])

  useEffect(() => {
    if(filters.year.length === 0) {
      return;
    }
    fetchLeagueFilter();
  },[filters.year])


  return (
    <SFilterContainer>
      {/* 연도 */}
      <SRow>
        <STitle>연도</STitle>
        <SFilterGroup>
          {selector.yearFilter.map((year) => {
            console.log(filters.year)
            return (
              <Radio
                name="year"
                value="year"
                // onChange={handleChange}
                onClick={() => { dispatch(SetYear([year]))}}
                checked={filters.year.includes(year)}
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
            onChange={handleChange}
            name="league"
            value="all"
            checked={filterData.league.all}
          >
            전체선택
          </SCheckboxAll>
          {selector.leagueFilter?.map((league) => {
            return (
              <Checkbox
              // onChange={handleChange}
              onChange={(e) => onCheckedElement(e.target.checked, league)}
              name="league"
              value="league"
              checked={filters.league.includes(league)}
              onClick={() => {dispatch(League(league))}}
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
            onChange={handleChange}
            name="league"
            value="all"
            checked={filterData.league.all}
          >
            전체선택
          </SCheckboxAll>
        </SFilterGroup>
      </SRow>
      {/* 팀 */}
      <SRow>
        <STitle>팀</STitle>
        <SFilterGroup>
          <SCheckboxAll
            onChange={handleChange}
            name="league"
            value="all"
            checked={filterData.league.all}
          >
            전체선택
          </SCheckboxAll>
        </SFilterGroup>
      </SRow>
      {/* 패치 */}
      <SRow>
        <STitle>패치</STitle>
        <SFilterGroup>
          <SCheckboxAll
            onChange={handleChange}
            name="league"
            value="all"
            checked={filterData.league.all}
          >
            전체선택
          </SCheckboxAll>
        </SFilterGroup>
      </SRow>
      {/* 선택된 필터 배치*/}
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
