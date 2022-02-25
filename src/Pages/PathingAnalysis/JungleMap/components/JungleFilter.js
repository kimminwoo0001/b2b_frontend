/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../../redux/modules/filtervalue";
import {
  setLeagueFilter,
  setPatchFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../../../redux/modules/selectorvalue";
import {
  JungleInit,
  SetFilterData,
  SetJungleLeague,
  SetJunglePatch,
  SetJungleSeason,
} from "../../../../redux/modules/junglevalue";
// ui
import Radio from "../../../../Components/Ui/Radio";
import Checkbox from "../../../../Components/Ui/Checkbox";
import { typoStyle } from "../../../../Styles/ui";
import { useTranslation } from "react-i18next";
import { API } from "../../../config";
import axiosRequest from "../../../../lib/axios/axiosRequest";
import SelectedJungleFilter from "./SelectedJungleFilter";
import { initializedObjValue } from "../../../../lib/initializedObjValue";
import { getTrueValueList } from "../../../../lib/getTureValueList";

const JungleFilter = () => {
  // 기본 데이터
  const leagueData = useSelector(
    (state) => state.StaticValueReducer.filterObjects
  );

  /* 필터정보: 선택가능값 , 리덕스 상태, true인 값 */

  // 연도
  const yearList = useSelector((state) => state.SelectorReducer.yearFilter);
  const seletedYearList = useSelector((state) => state.JungleMapReducer.year);

  // 리그
  const leagueList = useSelector((state) => state.SelectorReducer.leagueFilter);
  const leagueState = useSelector((state) => state.JungleMapReducer.league);
  const selectedLeagues = useMemo(
    () => getTrueValueList(leagueState),
    [leagueState]
  );

  // 시즌
  const seasonList = useSelector((state) => state.SelectorReducer.seasonFilter);
  const seasonState = useSelector((state) => state.JungleMapReducer.season);
  const selectedSeasons = useMemo(
    () => getTrueValueList(seasonState),
    [seasonState]
  );

  // 팀
  const teamList = useSelector((state) => state.SelectorReducer.teamFilter);
  const selectedTeam = useSelector((state) => state.JungleMapReducer.team);

  //패치
  const patchList = useSelector((state) => state.SelectorReducer.patchFilter);
  const patchState = useSelector((state) => state.JungleMapReducer.patch);
  const seletedPatch = useMemo(
    () => getTrueValueList(patchState),
    [patchState]
  );

  const selector = useSelector((state) => state.SelectorReducer);
  const junglevalue = useSelector((state) => state.JungleMapReducer);

  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [toggleFoldBtn, setToggleFoldBtn] = useState(false);

  const handleFoldUp = () => setToggleFoldBtn(!toggleFoldBtn);

  // 인터렉션 핸들러
  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      dispatch(SetFilterData({ ...junglevalue, year: [value] }));
    } else if (name === "team") {
      dispatch(SetFilterData({ ...junglevalue, team: [value] }));
    }
  };
  const handleChangeCheck = (e) => {
    const { name, value, checked } = e.target;
    // 전체선택
    if (value === "all") {
      const datas = { ...junglevalue[name] };
      for (let key in datas) {
        datas[key] = checked;
      }
      return dispatch(SetFilterData({ ...junglevalue, [name]: datas }));
    }

    dispatch(
      SetFilterData({
        ...junglevalue,
        [name]: { ...junglevalue[name], [value]: checked },
      })
    );
  };
  const handleChange = (e) => {
    const { type } = e.target;
    if (type === "radio") handleChangeRadio(e);
    else handleChangeCheck(e);
  };

  // 1. 리그데이터에서 연도선택값 가져오기
  const getYearsData = () => {
    let yearList = [];
    for (let key in leagueData) {
      yearList = Object.keys(leagueData[key]).concat(yearList);
    }
    return [...new Set(yearList)].sort();
  };
  // 2. (연도선택배열)에서 리그데이터에서 리그선택값 가져오기
  const getLeagueData = (yearsArray) => {
    let leagueList = [];

    yearsArray.forEach((year) => {
      for (let key in leagueData) {
        if (leagueData[key].hasOwnProperty(year)) {
          leagueList.push(key);
        }
      }
    });

    return [...new Set(leagueList)].sort();
  };
  // 3. (연도선택배열,리그선택배열) 로 리그데이터에서 시즌선택값 가져오기
  const getSeasonData = (yearsArray, leagueArray) => {
    if (!yearsArray || !leagueArray) return;
    let seasonList = [];

    for (let year of yearsArray) {
      for (let league of leagueArray) {
        const seasonKeys = Object.keys(leagueData[league][year]);
        seasonList = seasonList.concat(seasonKeys);
      }
    }

    return [...new Set(seasonList)];
  };
  // 4. 선택배열(연도, 리그, 시즌) 로 리그데이터에서 팀선택값 가져오기
  const getTeamData = (yearsArray, leagueArray, seasonArray) => {
    if (!yearsArray || !leagueArray || !seasonArray) return;
    if (
      !Array.isArray(yearsArray) ||
      !Array.isArray(leagueArray) ||
      !Array.isArray(seasonArray)
    )
      return;
    let teamList = [];
    for (let year of yearsArray) {
      for (let league of leagueArray) {
        for (let season of seasonArray) {
          const teamData = leagueData[league][year][season];
          if (teamData) {
            const teamKeys = Object.keys(teamData);
            teamList = teamList.concat(teamKeys);
          }
        }
      }
    }
    return [...new Set(teamList)];
  };
  // 5. 선택배열(연도,리그,시즌) 리그데이터에서 패치선택값 받아오기
  const getPatchData = async (yearsArray, leagueArray, seasonArray) => {
    if (!yearsArray || !leagueArray || !seasonArray) return;
    if (
      !Array.isArray(yearsArray) ||
      !Array.isArray(leagueArray) ||
      !Array.isArray(seasonArray)
    )
      return;
    const url = `${API}/lolapi/filter/patch`;
    const params = {
      league: leagueArray,
      year: yearsArray,
      season: seasonArray,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        const patchResponse = e ?? [];
        dispatch(setPatchFilter(patchResponse));
        const patchState = initializedObjValue(patchResponse, true);
        dispatch(SetJunglePatch(patchState));
        dispatch(Loading(false));
      },
      function (e) {
        dispatch(Loading(false));
      }
    );
  };

  // step0 - 페이지렌더 => 연도선택 가능 배열
  useEffect(() => {
    if (yearList.length > 0) return;
    const leagueYearData = getYearsData();
    dispatch(setYearFilter(leagueYearData));
  }, []);

  // step1 - 연도선택 => 리그선택 가능 배열
  useEffect(() => {
    if (seletedYearList.length === 0) return;
    let leagueData = getLeagueData(seletedYearList);

    /* 임시코드
     * 2021년일때 LPL 제외
     * 2022일때 LPL, MSI, WC
     */
    if (seletedYearList.includes("2021")) {
      leagueData = leagueData.filter((league) => league !== "LPL");
    } else if (seletedYearList.includes("2022")) {
      leagueData = leagueData.filter(
        (league) => league !== "LPL" && league !== "WC" && league !== "MSI"
      );
    }

    dispatch(SetJungleLeague(initializedObjValue(leagueData)));
    dispatch(setLeagueFilter(leagueData));
  }, [seletedYearList]);

  // step2 - 리그선택 => 시즌선택 가능 배열
  useEffect(() => {
    if (seletedYearList.length === 0) return;
    const seasonList = getSeasonData(seletedYearList, selectedLeagues);
    dispatch(SetJungleSeason(initializedObjValue(seasonList)));
    dispatch(setSeasonFilter(seasonList));
  }, [selectedLeagues]);

  // setp3-1 - 시즌선택 => 팀선택 가능 배열
  useEffect(() => {
    if (selectedLeagues.length === 0) return;
    const teamList = getTeamData(
      seletedYearList,
      selectedLeagues,
      selectedSeasons
    );
    dispatch(setTeamFilter(teamList));
  }, [selectedSeasons]);

  // step3-2 - 시즌선택 => 패치선택 배열
  useEffect(() => {
    if (selectedSeasons.length === 0) return;
    getPatchData(seletedYearList, selectedLeagues, selectedSeasons);
  }, [selectedSeasons]);

  return (
    <SContainer>
      <SFilterContainer>
        {/* 연도 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.year")}</STitle>
          <SFilterGroup>
            <SCheckboxAll name="year" value="all" disabled={true}>
              {t("video.jungle.selectAll")}
            </SCheckboxAll>
            <SCheckboxWrapper>
              {selector.yearFilter?.map((year) => {
                return (
                  <Radio
                    name="year"
                    value={year}
                    onChange={handleChange}
                    checked={junglevalue.year.includes(year)}
                  >
                    {year}
                  </Radio>
                );
              })}
            </SCheckboxWrapper>
          </SFilterGroup>
        </SRow>
        {/* 리그 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.league")}</STitle>
          <SFilterGroup>
            {Object.keys(leagueState).length === 0 ? (
              <SInitialStatement>
                {t("video.jungle.selectLeague")}
              </SInitialStatement>
            ) : (
              <>
                <SCheckboxAll
                  name="league"
                  value="all"
                  onChange={handleChange}
                  checked={!Object.values(leagueState).includes(false)}
                >
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {leagueList.map((league) => {
                    return (
                      <Checkbox
                        name="league"
                        value={league}
                        onChange={handleChange}
                        checked={leagueState[league]}
                      >
                        {league}
                      </Checkbox>
                    );
                  })}
                </SCheckboxWrapper>
              </>
            )}
          </SFilterGroup>
        </SRow>
        {/* 시즌 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.season")}</STitle>
          <SFilterGroup>
            {Object.keys(leagueState).length === 0 ||
            !Object.values(leagueState).includes(true) ? (
              <SInitialStatement>
                {t("video.jungle.selectSeason")}
              </SInitialStatement>
            ) : (
              <>
                <SCheckboxAll
                  name="season"
                  value="all"
                  onChange={handleChange}
                  checked={
                    seasonList.length > 0 &&
                    !Object.values(seasonState).includes(false)
                  }
                >
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {seasonList.map((season) => {
                    return (
                      <Checkbox
                        name="season"
                        value={season}
                        onChange={handleChange}
                        checked={junglevalue["season"][season]}
                      >
                        {season}
                      </Checkbox>
                    );
                  })}
                </SCheckboxWrapper>
              </>
            )}
          </SFilterGroup>
        </SRow>
        {/* 팀 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.team")}</STitle>
          <SFilterGroup>
            {Object.keys(seasonState).length === 0 ||
            !Object.values(seasonState).includes(true) ? (
              <SInitialStatement>
                {t("video.jungle.selectTeam")}
              </SInitialStatement>
            ) : (
              <>
                <SCheckboxAll name="year" value="all" disabled={true}>
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {teamList.map((team) => {
                    return (
                      <Radio
                        name="team"
                        value={team}
                        onChange={handleChange}
                        checked={junglevalue.team.includes(team)}
                      >
                        {team}
                      </Radio>
                    );
                  })}
                </SCheckboxWrapper>
              </>
            )}
          </SFilterGroup>
        </SRow>
        {/* 패치 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.patch")}</STitle>
          <SFilterGroup>
            {selectedSeasons.length === 0 || selectedTeam.length === 0 ? (
              <SInitialStatement>
                {t("video.jungle.selectPatch")}
              </SInitialStatement>
            ) : (
              <>
                <SCheckboxAll
                  name="patch"
                  value="all"
                  onChange={handleChange}
                  checked={
                    selector.patchFilter.length > 0 &&
                    selector.patchFilter.length ===
                      Object.keys(junglevalue.patch).length &&
                    !Object.values(junglevalue.patch).includes(false)
                  }
                >
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {junglevalue.team.length > 0 &&
                    selector.patchFilter?.map((patch) => {
                      return (
                        <Checkbox
                          name="patch"
                          value={patch}
                          onChange={handleChange}
                          checked={junglevalue["patch"][patch]}
                        >
                          {patch}
                        </Checkbox>
                      );
                    })}
                </SCheckboxWrapper>
              </>
            )}
          </SFilterGroup>
        </SRow>

        {/* 선택된 필터 */}
        {junglevalue.year.length > 0 && (
          <SRow>
            <STitle>{t("video.jungle.selectedFilter")}</STitle>
            <SFilterGroup>
              <SResetWrapper
                onClick={() => {
                  dispatch(JungleInit());
                  setToggleFoldBtn(false);
                }}
              >
                <SResetImg src="Images/ico_reset.svg" alt="reset" />
                <SResetTitle>{t("video.jungle.reset")}</SResetTitle>
              </SResetWrapper>
              <SCheckboxWrapper>
                {/* 선택된 필터 노출 */}
                <SelectedJungleFilter setToggle={setToggleFoldBtn} />
              </SCheckboxWrapper>
            </SFilterGroup>
          </SRow>
        )}
      </SFilterContainer>
      {junglevalue.year.length > 0 && (
        <FoldUpBtn onClick={handleFoldUp}>
          {!toggleFoldBtn ? (
            <img src="Images/btn_fold_up.png" alt="foldup" />
          ) : (
            <img src="Images/btn_fold_down.png" alt="folddown" />
          )}
        </FoldUpBtn>
      )}
    </SContainer>
  );
};

const SContainer = styled.div`
  position: relative;
`;

const SFilterContainer = styled.section`
  width: 1096px;
  ${typoStyle.contents}
`;
const SRow = styled.div`
  display: ${(props) => (props.toggleFoldBtn ? "none" : "flex")};
  align-items: center;
  margin-bottom: 10px;
`;
const STitle = styled.div`
  flex: 1;
`;

const SResetTitle = styled.span`
  ${typoStyle.contents}
`;

const SCheckboxAll = styled(Checkbox)`
  opacity: ${(props) =>
    props.name === "year" || props.name === "team" ? 0.3 : 1};
`;
const SInitialStatement = styled.div`
  opacity: 0.3;
  margin: 5px 0 0 5px;
`;
const SFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: wrap;

  width: 1004px;
  min-height: 44px;
  ${typoStyle.contents}

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.bg_box};
  padding: 10px;

  label {
    margin-right: 22px;
  }

  ${SCheckboxAll} {
    margin-right: 36px;
  }
`;
const SResetWrapper = styled.div`
  margin-right: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SResetImg = styled.img`
  margin-right: 3px;
`;
const SCheckboxWrapper = styled.div`
  flex: 1;
`;
const FoldUpBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: -55px;
`;

export default JungleFilter;
