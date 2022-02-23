/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

import { useState, useContext, useEffect, useRef } from "react";
import { cx } from "@emotion/css";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { DropdownContext } from "../../../../Components/Ui/DropDown/DropdownContainer"
import { API } from '../../../config';
import axiosRequest from '../../../../lib/axios/axiosRequest';


// redux action
import {
  SetPatch,
} from "../../../../redux/modules/filtervalue";

import {
  setLeagueFilter,
  setOppSeasonFilter,
  setPatchFilter,
  setPlayerFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../../../redux/modules/selectorvalue";
import { SetModalInfo } from "../../../../redux/modules/modalvalue";
import {SetFilterData, SetIsJunglingClicked} from '../../../../redux/modules/junglevalue';


// util
import { isObjEqual } from "../../../../lib/isObjEqual";
import { initializedFalseValue } from '../../../../lib/initializedFalseValue';

// UI Components
import Accordion from "../../../../Components/Ui/Accordion/Accordion";
import AccordionDetails from "../../../../Components/Ui/Accordion/AccordionDetails";
import AccordionSummary from "../../../../Components/Ui/Accordion/AccordionSummary";
import DropdownContainer from "../../../../Components/Ui/DropDown/DropdownContainer";
import DropdownLabel from "../../../../Components/Ui/DropDown/DropdownLabel";
import DropdownList from "../../../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../../../Components/Ui/DropDown/DropdownItem";
import Checkbox from "../../../../Components/Ui/Checkbox";
import Avatar from "../../../../Components/Ui/Avatar";
import Button from "../../../../Components/Ui/Button";

// css style
import {
  dropdownStyle,
  typoStyle,
  buttonStyle,
  borderRadiusStyle,
} from "../../../../Styles/ui";
import * as S from "../components/styled/StyledSideFilter";

const CompareSideFilter = () => {
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const junglevalue = useSelector((state) => state.JungleMapReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const isInitialMount2 = useRef(true);

  const [champInfo, setChampInfo] = useState();
  const [oppChampInfo, setOppChampInfo] = useState();
  const [patchList, setPatchList] = useState([]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // 전체선택
    if (value === "all") {
      const datas = { ...junglevalue[name] }
        const list = Object.keys(junglevalue[name]);
        const a = list.map((data) => {
          return datas[data] = checked;
        })
        dispatch(SetFilterData({ ...junglevalue, [name]: datas }));
    }
    // 개별선택
    else {
      dispatch(SetFilterData({
        ...junglevalue,
        [name]: { ...junglevalue[name], [value]: checked },
      }));

      // setFilterState((prev) => {
      //   const newData = { ...prev };
      //   newData[name] = { ...newData[name], [value]: checked };

      //   if (isObjEqual(newData[name])) {
      //     newData[name].all = checked;
      //   } else {
      //     newData[name].all = false;
      //   }
      //   return newData;
      // });
    }
  };

  const handleDropdownChange = (e) => {
    const {currentValue, label} = e;
    // if(label === "season" || label === "oppseason" || label === "patch"){
      // 다중선택 처리
      // if (value === "all") {
      //   const datas = { ...junglevalue[name] }
      //     const list = Object.keys(junglevalue[name]);
      //     const a = list.map((data) => {
      //       return datas[data] = checked;
      //     })
      //     dispatch(SetFilterData({ ...junglevalue, [name]: datas }));
      // }
      // 개별선택
    //   else {
    //     dispatch(SetFilterData({
    //       ...junglevalue,
    //       [name]: { ...junglevalue[name], [value]: checked },
    //     }));
    // }
  // }
    // else {
      dispatch(SetFilterData({...junglevalue, [label] : [currentValue]}));

    // }
  }
  // team, oppteam
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

  const fetchLeagueFilter = (year) => {
    let leagueList = [];
    if (year.length === 0) {
      return;
    }

    if (year.includes("2021")) {
      leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL");
    } else {
      leagueList = Object.keys(staticvalue.filterObjects).filter((league) => league !== "LPL" && league !== "MSI" && league !== "WC");
    }

    leagueList.sort();
    console.log(leagueList);
  
  
    dispatch(setLeagueFilter(leagueList));
  }

  const fetchTeamFilter = (years,leagues) => {
    let teamList = [];
    if (years.length !== 0 && leagues.length !== 0) {
      for (let year of years) {
        for (let league of leagues) {
            const allSeasons = Object.keys(staticvalue.filterObjects[league][year])
            for(let season of allSeasons) {
              const teamData = staticvalue.filterObjects[league][year][season];
                      if (teamData) {
                        const teamKeys = Object.keys(teamData);
                        teamList = teamList.concat(teamKeys);
                      }
            }
        }
      }
      // 공통되는 팀이 아닌 경우로만 sorting
      teamList = teamList.filter((item, pos) => teamList.indexOf(item) === pos);

    }
    dispatch(setTeamFilter(teamList));
  }

  const fetchPlayerFilter = (years,leagues,team) => {
    let players = [];
      if (team.length !== 0 ) {
        let playerList = [];
        for (let year of years) {
          for (let league of leagues) {
            const allSeasons = Object.keys(staticvalue.filterObjects[league][year])
            for(let season of allSeasons) {
              const teamData = staticvalue.filterObjects[league][year][season];
              if (teamData) {
                if (teamData[team]) {
                  const playerValues = Object.values(teamData[team]);
                   playerList = playerList.concat(playerValues);
                }
              }
            }
          }
        }
        playerList = playerList
          .filter((item, pos) => playerList.indexOf(item) === pos)
          .sort();

        for (let i = 0; i < playerList.length; i++) {
          const name = playerList[i].split("#")[1];
          const position = playerList[i].split("#")[0];
          if (position === "1") {
            players[i] = {
              position: "top",
              name: name,
            };
          } else if (position === "2") {
            players[i] = {
              position: "jng",
              name: name,
            };
          } else if (position === "3") {
            players[i] = {
              position: "mid",
              name: name,
            };
          } else if (position === "4") {
            players[i] = {
              position: "bot",
              name: name,
            };
          } else if (position === "5") {
            players[i] = {
              position: "sup",
              name: name,
            };
          }
        }
      } 
      // else {
      //   dispatch(ResetPlayer());
      // }
      dispatch(setPlayerFilter(players));
    
  };

  const fetchSeasonFilter = (years,leagues,player) => {
    let seasonList = [];
    if (player.length !== 0) {
      for (let year of years) {
        for (let league of leagues) {
          const seasonKeys = Object.keys(staticvalue.filterObjects[league][year])
          seasonList = seasonList.concat(seasonKeys);
        }
      }
      // 공통되는 시즌이 아닌 경우로만 sorting
      seasonList = seasonList.filter(
        (item, pos) => seasonList.indexOf(item) === pos
      );
    }
    if(player === junglevalue.oppplayer) {
      dispatch(setOppSeasonFilter(seasonList))
    }else {
      dispatch(setSeasonFilter(seasonList));
    }
  }


  const fetchPatchFilter = (year, league, season) => {

    // dispatch(Loading(true))
    const selectedSeasons = Object.keys(season).filter(key => season[key] === true)
    const url = `${API}/lolapi/filter/patch`;
    const params = {
      league: league,
      year: year,
      season: selectedSeasons,
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function (e) {
      const patchResponse = e ?? [];
      setPatchList(patchResponse);
      // dispatch(Loading(false));
    }, function (e) {
      // dispatch(Loading(false));
    });
  }



  useEffect(() => {    
    // dispatch(setPatchFilter([...selector.patchFilter.concat(patchList.filter((item, idx) => patchList.indexOf(item) !== idx))]));
    dispatch(setPatchFilter([...selector.patchFilter.concat(patchList)]));

  },[patchList])


  // const GetChampion = () => {
    
  //   const selectedSeasons = Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true)
  //   const selectedPatches = Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key]===true)

  //   const url = `${API}/lolapi/jungle/player-champions`;
  //   const params = {
  //     league: junglevalue.league,
  //     year: junglevalue.year,
  //     season: selectedSeasons,
  //     patch: selectedPatches,
  //     team: junglevalue.team[0],
  //     player: junglevalue.player[0],
  //     token: user.token,
  //     id: user.id,
  //   };
  //   axiosRequest(undefined, url, params, function(e) {
  //     setChampInfo(e);
  //     // console.log(e.data);
  //   }, function (objStore) {
  //     dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
  //   })
  // }

  const GetChampion = () => {
    const seasonArr =Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true)
    const patchArr =  Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true)
    const url = `${API}/lolapi/jungle/player-champions`;
    const params = {
      league: junglevalue.league,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0] ,
      player: junglevalue.player[0],
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function(e) {

      setChampInfo(e);
      console.log("우리팀:",e);
    }, function (objStore) {
      dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  }




  const GetOppChampion = () => {
    const seasonArr =Object.keys(junglevalue.oppseason).filter(key => junglevalue.oppseason[key] === true)
    const patchArr =  Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true)
    const url = `${API}/lolapi/jungle/player-champions`;
    const params = {
      league: junglevalue.oppleague,
      year: junglevalue.oppyear,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.oppteam[0],
      player: junglevalue.oppplayer[0],
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function(e) {

      setOppChampInfo(e);
      console.log("상대팀:",e);
    }, function (objStore) {
      dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  }


    // champInfo 있을 시 모든 value를 객체 및 false처리
useEffect(() => {
  let newArr = [];
  for(let key in champInfo) {
    newArr.push(champInfo[key].champ);      
  }
  const result = initializedFalseValue(newArr);
  dispatch(SetFilterData(({
    ...junglevalue,
    champion: result,
  })))
}, [champInfo])


 // oppChampInfo 있을 시 모든 value를 객체 밒 false처리
 useEffect(() => {
  let newArr = [];
  for(let key in oppChampInfo) {
    newArr.push(oppChampInfo[key].champs);      
  }
  const result = initializedFalseValue(newArr);
  dispatch(SetFilterData(({
    ...junglevalue,
    oppchampion: result,
  })))
  }, [oppChampInfo])
  



  useEffect(() => {
    if (junglevalue.player.length === 0) {
      return;
    }
    const result = initializedFalseValue(selector.seasonFilter);

    dispatch(SetFilterData({
      ...junglevalue,
      season: result,
    }))
  }, [selector.seasonFilter])


  useEffect(() => {
    if (junglevalue.oppplayer.includes("") || junglevalue.oppplayer.length === 0) {
      return;
    }
    const result = initializedFalseValue(selector.oppseasonFilter);

    dispatch(SetFilterData({
      ...junglevalue,
      oppseason: result,
    }))
  }, [selector.oppseasonFilter])


  useEffect(() => {
    if (Object.keys(junglevalue.oppseason).length === 0) {
      return;
    }
    const result = initializedFalseValue(selector.patchFilter);

    dispatch(SetFilterData({
      ...junglevalue,
      patch: result,
    }))
  }, [selector.patchFilter])



  // team
  useEffect(() => {
    fetchLeagueFilter(junglevalue.year);
  }, [junglevalue.year])

  useEffect(() => {
    fetchTeamFilter(junglevalue.year, junglevalue.league);
  }, [junglevalue.league])

  useEffect(() => {
    fetchPlayerFilter(junglevalue.year, junglevalue.league, junglevalue.team);
  }, [junglevalue.team])

  useEffect(() => {
    fetchSeasonFilter(junglevalue.year, junglevalue.league, junglevalue.player);
  }, [junglevalue.player])


  // oppteam
  useEffect(() => {
    fetchLeagueFilter(junglevalue.oppyear);
  }, [junglevalue.oppyear])

  useEffect(() => {
    fetchTeamFilter(junglevalue.oppyear, junglevalue.oppleague);
  }, [junglevalue.oppleague])

  useEffect(() => {
    fetchPlayerFilter(junglevalue.oppyear, junglevalue.oppleague, junglevalue.oppteam);
  }, [junglevalue.oppteam])

  useEffect(() => {
    fetchSeasonFilter(junglevalue.oppyear, junglevalue.oppleague, junglevalue.oppplayer);
  }, [junglevalue.oppplayer])


  
  // patch


  useEffect(() => {
    if(Object.keys(junglevalue.season).length === 0) {
      return;
    }
    fetchPatchFilter(junglevalue.year, junglevalue.league, junglevalue.season);
  },[junglevalue.season])


  useEffect(() => {
    if(Object.keys(junglevalue.oppseason).length === 0) {
      return;
    }
    fetchPatchFilter(junglevalue.oppyear, junglevalue.oppleague, junglevalue.oppseason);
  },[junglevalue.oppseason])


  useEffect(() => {
    if(Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true).length === 0) {
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
    GetChampion(junglevalue.league, junglevalue.year, junglevalue.season, junglevalue.team, junglevalue.player);
    }
  
  },[junglevalue.patch])

  useEffect(() => {
    if(Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true).length === 0) {
      return;
    }
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      GetOppChampion(junglevalue.oppleague, junglevalue.oppyear, junglevalue.oppseason, junglevalue.oppteam, junglevalue.oppplayer);
    }
  },[junglevalue.champion])
  
 
  useEffect(() => {
    fetchYearFilter();
  }, [])


  return (
    <S.Wrapper>
      <S.FilterContainer>
        {/* step1 : 나의 팀 */}
        <S.FilterSection>
          <Accordion act={true}>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 01</S.TitleLabel>
                <S.Text>{t("video.jungle.myTeam")}</S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              {/* 셀렉트 그룹 */}
              <S.SelectContainer>
                {/* 연도 & 리그 */}
                <div className="group-row">
                  {/* 연도 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="year"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                      onClick={fetchYearFilter}
                    >
                      <DropdownLabel Label css={[dropdownStyle.select_head]}
                        >
                        <S.SelectLabel>{t("video.jungle.selectYear")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.yearFilter?.map((year,idx) => {
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={year}
                          >
                            {year}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>

                  {/* 리그 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="league"
                      onChange={(e) => {
                        handleDropdownChange(e)
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>
                          {t("video.jungle.selectLeague")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.leagueFilter?.map((league,idx) => {
                          return  (
                            <SLeagueWrapper>
                            <img
                            className="leagueLogo"
                            width="24px"
                            height="24px"
                            src={ `Images/ico-league-${league.toLowerCase()}.png`}
                            alt="leagueLogo"
                          /> 
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={league}
                          >
                            {league}
                          </DropdownItem>
                          </SLeagueWrapper>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 팀 & 선수 */}
                <div className="group-row">
                  {/* 팀 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="team"
                      onChange={(e) => {
                        handleDropdownChange(e)
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectTeam")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.teamFilter?.map((team,idx) => {
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={team}
                          >
                            {team}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                  {/* 선수 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="player"
                      onChange={(e) => {
                        handleDropdownChange(e)
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectPlayer")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.playerFilter?.filter(player => player.position === "jng").map((player,idx)  => {
                          console.log(player);
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={player.name}
                          >
                            {player.name}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 시즌 */}
                <div className="group-row">
                  {/* 시즌 */}
                  <div className="group-col-1">
                  <SRow >
                    <SFilterGroup>
                   {junglevalue.player.length === 0 ? 
                    <SInitialStatement> {t("video.jungle.selectSeason")}</SInitialStatement> : 
                    
                    <>
                    <STitle>{t("video.jungle.selectSeason")}</STitle>
                    <SChekcboxAllWrapper>
                      <SCheckboxAll
                      name="season"
                      value="all"
                      onChange={handleChange}
                      checked={selector.seasonFilter.length > 0 && selector.seasonFilter.length === Object.keys(junglevalue.season).length && !Object.values(junglevalue.season).includes(false)}
                    >
                    {t("video.jungle.selectAll")}
                    </SCheckboxAll>
                    </SChekcboxAllWrapper>
                    </>

                    }
                    <SCheckboxWrapper>
                        {selector.seasonFilter?.map((season,idx) => {
                          return (
                            <Checkbox
                            name="season"
                            value={season}
                            onChange={handleChange}
                            checked={junglevalue["season"][season]}
                          >
                            {season}
                          </Checkbox>
                          )
                        } )}
                    </SCheckboxWrapper>
                    </SFilterGroup>
                </SRow>
                  </div>
                </div>
              </S.SelectContainer>
            </AccordionDetails>
          </Accordion>
        </S.FilterSection>

        {/* step2 : 상대 팀 */}
        <div css={{ marginBottom: 30 }}>
          {/* <Accordion act={junglevalue.season.length > 0 && !junglevalue.season.includes("")}> */}
          <Accordion act={Object.keys(junglevalue.season).length !== 0 && Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true).length  > 0}>
            <AccordionSummary css={{ marginBottom: 13 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 02</S.TitleLabel>
                <S.Text>{t("video.jungle.oppTeam")}</S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              {/* 셀렉트 그룹 */}
              <S.SelectContainer>
                {/* 연도 & 리그 */}
                <div className="group-row">
                  {/* 연도 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="oppyear"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectYear")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.yearFilter?.map((year,idx)=> {
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={year}
                          >
                            {year}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>

                  {/* 리그 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="oppleague"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectLeague")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.leagueFilter?.map((league,idx) => {
                          return (
                            <SLeagueWrapper>
                            <img
                            className="leagueLogo"
                            width="24px"
                            height="24px"
                            src={ `Images/ico-league-${league.toLowerCase()}.png`}
                            alt="leagueLogo"
                          /> 
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={league}
                          >
                            {league}
                          </DropdownItem>
                          </SLeagueWrapper>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 팀 & 선수 */}
                <div className="group-row">
                  {/* 팀 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="oppteam"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectTeam")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.teamFilter?.map((oppteam, idx) => {
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={oppteam}
                          >
                            {oppteam}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                  {/* 선수 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="oppplayer"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectPlayer")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.playerFilter?.filter(oppplayer => oppplayer.position === "jng").map((oppplayer,idx) => {
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={oppplayer.name}
                          >
                            {oppplayer.name}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 시즌 */}
                <div className="group-row">
                  {/* 시즌 */}
                  <div className="group-col-1">
                  <SRow >
                    <SFilterGroup>
                   {junglevalue.oppplayer.includes("") || junglevalue.oppplayer.length === 0? 
                    <SInitialStatement> {t("video.jungle.selectSeason")}</SInitialStatement> :
                    <>
                    <STitle>{t("video.jungle.selectSeason")}</STitle>
                    <SChekcboxAllWrapper>
                      <SCheckboxAll
                      name="oppseason"
                      value="all"
                      onChange={handleChange}
                      checked={selector.oppseasonFilter.length > 0 && selector.oppseasonFilter.length === Object.keys(junglevalue.oppseason).length && !Object.values(junglevalue.oppseason).includes(false)}
                    >
                    {t("video.jungle.selectAll")}
                    </SCheckboxAll>
                    </SChekcboxAllWrapper>
                    </>
                    }
                    <SCheckboxWrapper>
                        {selector.oppseasonFilter?.map((oppseason,idx) => {
                          return (
                            <Checkbox
                            name="oppseason"
                            value={oppseason}
                            onChange={handleChange}
                            checked={junglevalue["oppseason"][oppseason]}
                          >
                            {oppseason}
                          </Checkbox>
                          )
                        } )}
                    </SCheckboxWrapper>
                    </SFilterGroup>
                </SRow>
                    {/* <DropdownContainer
                      label="oppseason"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <S.SelectLabel>{t("video.jungle.selectSeason")}</S.SelectLabel>
                      </DropdownLabel>
                      <DropdownList>
                        {selector.seasonFilter?.map((season,idx) => {
                          return (
                            <DropdownItem
                            css={[dropdownStyle.select_item]}
                            value={season}
                          >
                            {season}
                          </DropdownItem>
                          )
                        })}
                      </DropdownList>
                    </DropdownContainer> */}
                  </div>
                </div>
              </S.SelectContainer>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step3 : 패치 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion act={junglevalue.oppseason && Object.keys(junglevalue.oppseason).length >0  && !Object.values(junglevalue.oppseason).includes(false)}>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 03</S.TitleLabel>
                <S.Text>{t("video.jungle.selectPatch")}</S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
            <SRow>
              <SFilterGroup>
                {Object.keys(junglevalue.oppseason).filter(key => junglevalue.oppseason[key] === true).length === 0 ?  
                <SInitialStatement>{t("video.jungle.selectPatch")}</SInitialStatement> : 
                <SChekcboxAllWrapper>

                <SCheckboxAll
                name="patch"
                value="all"
                onChange={handleChange}
                checked={selector.patchFilter?.filter((item,idx) => selector.patchFilter.indexOf(item) === idx).length === Object.keys(junglevalue.patch).length && !Object.values(junglevalue.patch).includes(false)}
              >
              {t("video.jungle.selectAll")}
              </SCheckboxAll>
              </SChekcboxAllWrapper>

                }
                <SCheckboxWrapper>
                {selector.patchFilter?.filter((item,idx) => selector.patchFilter.indexOf(item) === idx).sort().map((patch) => {
                  return (
                    <Checkbox
                      name="patch"
                      value={patch}
                      onChange={handleChange}
                      checked={junglevalue["patch"][patch]}
                    >
                      {patch}
                    </Checkbox>
                  )
                })}
                </SCheckboxWrapper>
              </SFilterGroup>
           </SRow>
            </AccordionDetails>
          </Accordion>
        </div>

       
        {/* step4 : 우리팀 플레이한 챔피언 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion act={Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key]=== true).length >0}>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 04</S.TitleLabel>
                <S.Text>
                  {junglevalue.team.length > 0 && 
                  <Avatar
                  src={`Images/TeamLogo/${junglevalue.team}.png`}
                  alt="teamLogo"
                  size={20}
                  block={false}
                />}
                  {junglevalue.team} {t("video.jungle.champLabel")}
                </S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              <S.Table>
                <S.Head>
                  <S.Col1>
                    <Checkbox
                      name="champion"
                      value="all"
                      onChange={handleChange}
                      checked={Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === false).length === 0}
                    />
                  </S.Col1>
                  <S.Col2>{`${t("video.jungle.champTitle")}(${t("video.jungle.numOfMatches")})`}</S.Col2>
                  <S.Col3>{t("video.jungle.numOfMatches")}</S.Col3>
                  <S.Col3>{t("video.jungle.matchesBySide")}</S.Col3>
                </S.Head>

                <S.Body>
                  {champInfo?.map((champ,idx) => {
                    return (
                      <S.Row isActive={Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true).includes(champ.champ)}>
                      {/* 체크 */}
                      <S.Col1>
                        <Checkbox
                          name="champion"
                          value={champ.champ}
                          onChange={handleChange}
                          checked={Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true).includes(champ.champ)}
                        />
                      </S.Col1>
                      {/* 본문 */}
                      <S.Col2>
                        <S.Champ>
                          <Avatar
                            css={{ marginRight: 5 }}
                            size={20}
                            src={`Images/champion/${champ.champ}.png`}
                            alt="champLogo"
                          />
                        <span>{`${champ.champ} (${champ.blue_champ + champ.red_champ})`}</span>
                        </S.Champ>
                      </S.Col2>
  
                      {/* 경기수 */}
                      <S.Red>{champ.red_champ}</S.Red>
                      <S.Blue>{champ.blue_champ}</S.Blue>
                    </S.Row>
                    )
                  })}
                </S.Body>
              </S.Table>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step5 : 상대팀 플레이한 챔피언 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion act={Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true).length > 0 }>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 05</S.TitleLabel>
                <S.Text>
                  {junglevalue.oppteam.length >0 &&
                  <Avatar
                  src={`Images/TeamLogo/${junglevalue.oppteam}.png`}
                  alt="oppteam"
                  size={20}
                  block={false}
                />
                  }
                  {junglevalue.oppteam} {t("video.jungle.champLabel")}
                </S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              <S.Table>
                <S.Head>
                  <S.Col1>
                    <Checkbox
                      name="oppchampion"
                      value="all"
                      onChange={handleChange}
                      checked={Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === false).length === 0}/>
                  </S.Col1>
                  <S.Col2>{`${t("video.jungle.champTitle")}(${t("video.jungle.numOfMatches")})`}</S.Col2>
                  <S.Col3>{t("video.jungle.numOfMatches")}</S.Col3>
                  <S.Col3>{t("video.jungle.matchesBySide")}</S.Col3>
                </S.Head>

                <S.Body>
                  {oppChampInfo?.map((oppChamp,idx) => {
                    return (
                      <S.Row isActive={Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true).includes(oppChamp.champ)}>
                      {/* 체크 */}
                      <S.Col1>
                        <Checkbox
                          name="oppchampion"
                          value={oppChamp.champ}
                          onChange={handleChange}
                          checked={Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true).includes(oppChamp.champ)}
                          />
                      </S.Col1>
                      {/* 본문 */}
                      <S.Col2>
                        <S.Champ>
                          <Avatar
                            css={{ marginRight: 5 }}
                            size={20}
                            src={`Images/champion/${oppChamp.champ}.png`}
                            alt="oppChampLogo"
                          />
                        <span>{`${oppChamp.champ} (${oppChamp.blue_champ + oppChamp.red_champ})`}</span>
                        </S.Champ>
                      </S.Col2>
  
                      {/* 경기수 */}
                      <S.Red>{oppChamp.red_champ}</S.Red>
                      <S.Blue>{oppChamp.blue_champ}</S.Blue>
                    </S.Row>
                    )
                  })}
                </S.Body>
              </S.Table>
            </AccordionDetails>
          </Accordion>
        </div>
      </S.FilterContainer>

      <S.ButtonContainer>
        <Button
          disabled={Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true).length === 0}
          onClick={() => {
            dispatch(SetIsJunglingClicked(true))
          }}
          css={[
            buttonStyle.color.main,
            buttonStyle.size.full,
            buttonStyle.size.y_20,
            borderRadiusStyle.full,
            typoStyle.body,
          ]}
        >
          {t("video.jungle.compareJungling")}
        </Button>
      </S.ButtonContainer>
    </S.Wrapper>
  );
};
export default CompareSideFilter;



const SRow = styled.div`
  display: ${props => props.toggleFoldBtn ? "none" : "flex"};
  align-items: center;
  margin-bottom: 10px;
`;
const STitle = styled.div`
  flex: 1;
  margin: 0 0 13px 5px;
`;

const SChekcboxAllWrapper = styled.div`
 padding-bottom: 5px;
 border-bottom: 1px solid #433f4e; 
 margin-bottom: 5px;
`

const SCheckboxAll = styled(Checkbox)`
  opacity: ${props => props.name === "year" || props.name === "team" ? 0.3 : 1};
`;

const SInitialStatement = styled.div`
opacity: 0.3;
/* margin: 5px 0 0 0; */
`;

const SFilterGroup = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* flex-flow: wrap; */
  width: 335px;
  min-height: 34px;
  ${typoStyle.contents}

  border-radius: 10px;
  background-color: #23212a;
  /* background-color: ${(props) => props.theme.colors.bg_box}; */
  padding: 10px;

  label {
    margin-right: 10px;
  }

  ${SCheckboxAll} {
    /* margin-bottom: 16px; */
  
  }
`;


const SCheckboxWrapper = styled.div`
flex:1
`;


const SLeagueWrapper = styled.div`
  display: flex;
  align-items: center;
`