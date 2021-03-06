/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState, useEffect, useCallback } from "react";
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
import { API } from '../../../config';
import axiosRequest from '../../../../lib/axios/axiosRequest';


const JungleFilter = () => {
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    year: [],
    league: {},
    season: {},
    team: [],
    patch: {},
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      setFilterData({ ...filterData, [name]: [value] });
    }

    if (type === "checkbox") {
      if (value === "all") {
        // (prev) => {
        //   const newData = { ...prev };
        //   for (let key in newData[name]) {
        //     newData[name][key] = checked;
        //   }
        //   return newData;
        // }
        const datas = { ...filterData[name] }
        const list = Object.keys(filterData[name]);
        const a = list.map((data) => {
          return datas[data] = checked;
        })
        //  console.log("??????", datas)
        setFilterData({ ...filterData, [name]: datas });
      } else {
        // console.log("=====checked:", filterData.season)
        // console.log("=====checked:", checked)
        setFilterData({
          ...filterData,
          [name]: { ...filterData[name], [value]: checked },
        });
      }
    }
  };
  console.log("filterData.league =====> ", filterData.league);

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
    // console.log("??????2");
    if (filterData.year.length !== 0) {
      // console.log("??????");
      const result = Object.keys(filterData.league).filter(key => filterData.league[key] === true)
      for (let year of filterData.year) {
        for (let league of result) {
          const seasonKeys = Object.keys(staticvalue.filterObjects[league][year])
          seasonList = seasonList.concat(seasonKeys);
        }
      }
      // ???????????? ????????? ?????? ???????????? sorting
      seasonList = seasonList.filter(
        (item, pos) => seasonList.indexOf(item) === pos
      );
    }

    dispatch(setSeasonFilter(seasonList));
  }

  const fetchTeamFilter = () => {
    let teamList = [];
    if (filterData.year.length !== 0 && Object.keys(filterData.season).length !== 0) {
      const selectedLeagues = Object.keys(filterData.league).filter(key => filterData.league[key] === true)
      const selectedSeasons = Object.keys(filterData.season).filter(key => filterData.season[key] === true)
      // console.log("result --------", result)
      // console.log("result2 --------", result2)
      for (let year of filterData.year) {
        for (let league of selectedLeagues) {
          for (let season of selectedSeasons) {
            const teamData = staticvalue.filterObjects[league][year][season];
            if (teamData) {
              const teamKeys = Object.keys(teamData);
              teamList = teamList.concat(teamKeys);
            }
          }
        }
      }
      // console.log("result3---------",teamList);
      // ???????????? ?????? ?????? ???????????? sorting
      teamList = teamList.filter((item, pos) => teamList.indexOf(item) === pos);

    }
    dispatch(setTeamFilter(teamList));
  }

  const fetchPatchFilter = () => {
    const selectedLeagues = Object.keys(filterData.league).filter(key => filterData.league[key] === true)
    const selectedSeasons = Object.keys(filterData.season).filter(key => filterData.season[key] === true)

    dispatch(Loading(true))
    const url = `${API}/lolapi/filter/patch`;
    const params = {
      league: selectedLeagues,
      year: filterData.year,
      season: selectedSeasons,
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function (e) {
      const patchResponse = e ?? [];
      dispatch(setPatchFilter(patchResponse));
      dispatch(SetPatch(patchResponse));
      dispatch(Loading(false));
    }, function (e) {
      dispatch(Loading(false));
    });
  }





  // ?????? ?????? ??? ???????????? ??????
  useEffect(() => {
    if (filterData.year.length === 0) {
      return;
    }
    fetchLeagueFilter();
  }, [filterData.year])

  // ?????? ?????? ??? ???????????? ??????
  useEffect(() => {
    console.log("??????3")
    if (Object.keys(filterData.league).length === 0) {
      return;
    }
    fetchSeasonFilter();

  }, [filterData.league])

  //?????? ?????? ??? ??? ?????? ??????
  useEffect(() => {
    if (Object.keys(filterData.season).length === 0) {
      return;
    }
    fetchTeamFilter();
    // fetchPatchFilter();
  }, [filterData.season])


  useEffect(() => {
    if (filterData.team.length === 0) {
      return;
    }
    fetchPatchFilter();
  }, [filterData.team])


  // ?????? checkbox state??? value?????? false ??????
  const initializedLeagueValue = (param) => {
    let newArray = [];
    for (let i = 0; i < param.length; i++) {
      newArray.push(param[i])
    }
    const result = newArray.sort().reduce((newObj, key) => {

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

  useEffect(() => {
    if (filterData.team.length === 0) {
      return;
    }
    const result = initializedLeagueValue(selector.patchFilter);

    setFilterData({
      ...filterData,
      patch: result,
    })
  }, [selector.patchFilter])


  // ??? ?????? ??? ?????? ?????? ????????????
  useEffect(() => {
    fetchYearFilter();
  }, [])

  useEffect(() => {
    console.log(filterData)
  }, [filterData.year, filterData.league, filterData.season, filterData.team, filterData.patch])


  return (
    <SFilterContainer>
      {/* ?????? */}
      <SRow>
        <STitle>??????</STitle>
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
      {/* ?????? */}
      <SRow>
        <STitle>??????</STitle>
        <SFilterGroup>
          <SCheckboxAll
            name="league"
            value="all"
            onChange={handleChange}
            checked={selector.leagueFilter.length > 0 && selector.leagueFilter.length === Object.keys(filterData.league).length && !Object.values(filterData.league).includes(false)}
          >
            ????????????
          </SCheckboxAll>
          {Object.keys(filterData.league).length !== 0 && selector.leagueFilter?.map((league) => {
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
      {/* ?????? */}
      <SRow>
        <STitle>??????</STitle>
        <SFilterGroup>
          <SCheckboxAll
            name="season"
            value="all"
            onChange={handleChange}
            checked={selector.seasonFilter.length > 0 && selector.seasonFilter.length === Object.keys(filterData.season).length && !Object.values(filterData.season).includes(false)}
          >
            ????????????
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
      {/* ??? */}
      <SRow>
        <STitle>???</STitle>
        <SFilterGroup>
          {Object.keys(filterData.season).length !== 0 && selector.teamFilter?.map((team) => {
            return (
              <Radio
                name="team"
                value={team}
                onChange={handleChange}
                checked={filterData.team.includes(team)}
              >
                {team}
              </Radio>
            )
          })}
        </SFilterGroup>
      </SRow>
      <SRow>
        <STitle>??????</STitle>
        <SFilterGroup>
          <SCheckboxAll
            name="patch"
            value="all"
            onChange={handleChange}
            checked={selector.patchFilter.length > 0 && selector.patchFilter.length === Object.keys(filterData.patch).length && !Object.values(filterData.patch).includes(false)}
          >
            ????????????
          </SCheckboxAll>
          {filterData.team.length > 0 && selector.patchFilter?.map((patch) => {
            return (
              <Checkbox
                name="patch"
                value={patch}
                onChange={handleChange}
                checked={filterData["patch"][patch]}
              >
                {patch}
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
  flex-flow: wrap;
  align-items: center;
  width: 1004px;
  min-height: 44px;
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
