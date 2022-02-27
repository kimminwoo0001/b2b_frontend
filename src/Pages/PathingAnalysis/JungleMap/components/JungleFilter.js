/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState, useEffect, useMemo } from "react";
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
  ResetJungleSelectedPatch,
  SetFilterData,
  SetJungleLeague,
  SetJunglePatch,
  SetJungleSeason,
  SetJungleTeam,
  SetJunlgeYear,
} from "../../../../redux/modules/junglevalue";
// ui
import Radio from "../../../../Components/Ui/Radio";
import Checkbox from "../../../../Components/Ui/Checkbox";
import { typoStyle } from "../../../../Styles/ui";
import { useTranslation } from "react-i18next";
import SelectedJungleFilter from "./SelectedJungleFilter";
import { initializedObjValue } from "../../../../lib/initializedObjValue";
import { getTrueValueList } from "../../../../lib/getTureValueList";
import {
  findLegueData,
  findSeasonData,
  findTeamData,
  findYearData,
  getPatchData,
} from "../../../../lib/searchLeagueData";

const JungleFilter = () => {
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [toggleFoldBtn, setToggleFoldBtn] = useState(false);
  // 기본 데이터
  const leagueData = useSelector(
    (state) => state.StaticValueReducer.filterObjects
  );

  /* 필터정보: 선택가능값 , 리덕스 상태, true인 값 */
  // 연도
  const yearList = useSelector((state) => state.SelectorReducer.yearFilter);
  const seletedYearList = useSelector((state) => state.JungleMapReducer.year);

  // 리그
  const leagueState = useSelector((state) => state.JungleMapReducer.league);
  const selectedLeagues = useMemo(
    () => getTrueValueList(leagueState),
    [leagueState]
  );

  // 시즌
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
  const selectedPatch = useMemo(
    () => getTrueValueList(patchState),
    [patchList]
  );

  const junglevalue = useSelector((state) => state.JungleMapReducer);
  const handleFoldUp = () => setToggleFoldBtn(!toggleFoldBtn);

  // 인터렉션 핸들러
  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      dispatch(SetJunlgeYear([value]));
    } else if (name === "team") {
      dispatch(SetJungleTeam([value]));
    }
  };
  const handleChangeCheck = (e) => {
    // 리그 시즌 패치
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

  const getYearsData = findYearData(leagueData);
  const getLeagueData = findLegueData(leagueData);
  const getSeasonData = findSeasonData(leagueData);
  const getTeamData = findTeamData(leagueData);

  // step0 - 페이지렌더 => 연도선택 가능 배열
  useEffect(() => {
    const leagueYearData = getYearsData();
    dispatch(setYearFilter(leagueYearData));
  }, []);

  // step1 - 연도선택 => 리그선택 가능 배열
  useEffect(() => {
    dispatch(ResetJungleSelectedPatch());
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

    // 리그데이터 설정
    dispatch(setLeagueFilter(leagueData));
    dispatch(SetJungleLeague(initializedObjValue(leagueData)));
  }, [seletedYearList]);

  // step2 - 리그선택 => 시즌선택 가능 배열
  useEffect(() => {
    // 선택된 patch 리셋
    dispatch(ResetJungleSelectedPatch());
    if (selectedLeagues.length === 0) return;
    const seasonList = getSeasonData(seletedYearList, selectedLeagues);

    // 시즌데이터 설정
    dispatch(SetJungleSeason(initializedObjValue(seasonList)));
    dispatch(setSeasonFilter(seasonList));
  }, [selectedLeagues]);

  // setp3 - 시즌선택 => 1. 팀선택 가능 배열 2. 패치 선택 가능배열
  useEffect(() => {
    // 선택된 patch 리셋
    dispatch(ResetJungleSelectedPatch());
    if (selectedSeasons.length === 0) return;

    const teamList = getTeamData(
      seletedYearList,
      selectedLeagues,
      selectedSeasons
    );

    // 1. 패치선택 가능 정보 받아오기
    fetchData();

    // 2. 팀선택 가능배열 받아오기
    dispatch(SetJungleTeam([]));
    dispatch(setTeamFilter(teamList));

    async function fetchData() {
      try {
        dispatch(Loading(true));
        const result = await getPatchData(
          seletedYearList,
          selectedLeagues,
          selectedSeasons
        );
        dispatch(setPatchFilter(result.data?.response));
        const patchState = initializedObjValue(result.data?.response, true);
        dispatch(SetJunglePatch(patchState));
      } catch (error) {
        console.log("패치정보에러", error);
        // 실패시 모달작업
      } finally {
        dispatch(Loading(false));
      }
    }
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
              {yearList.map((year, _) => {
                return (
                  <Radio
                    key={year + _}
                    name="year"
                    value={year}
                    onChange={handleChange}
                    checked={seletedYearList.includes(year)}
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
                  checked={
                    Object.keys(leagueState).length > 0 &&
                    !Object.values(leagueState).includes(false)
                  }
                >
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {Object.keys(leagueState).map((league, _) => {
                    return (
                      <Checkbox
                        key={league + _}
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
                    Object.keys(seasonState).length > 0 &&
                    !Object.values(seasonState).includes(false)
                  }
                >
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {Object.keys(seasonState).map((season, _) => {
                    return (
                      <Checkbox
                        key={season + _}
                        name="season"
                        value={season}
                        onChange={handleChange}
                        checked={seasonState[season]}
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
            {selectedLeagues.length === 0 || selectedSeasons.length === 0 ? (
              <SInitialStatement>
                {t("video.jungle.selectTeam")}
              </SInitialStatement>
            ) : (
              <>
                <SCheckboxAll name="year" value="all" disabled={true}>
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {teamList.map((team, _) => {
                    return (
                      <Radio
                        key={team + _}
                        name="team"
                        value={team}
                        onChange={handleChange}
                        checked={selectedTeam.includes(team)}
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
            {selectedSeasons.length === 0 ||
            selectedTeam.length === 0 ||
            Object.keys(patchState).length === 0 ? (
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
                    Object.keys(patchState).length > 0 &&
                    !Object.values(patchState).includes(false)
                  }
                >
                  {t("video.jungle.selectAll")}
                </SCheckboxAll>
                <SCheckboxWrapper>
                  {selectedTeam.length > 0 &&
                    patchList.map((patch, _) => {
                      return (
                        <Checkbox
                          key={patch + _}
                          name="patch"
                          value={patch}
                          onChange={handleChange}
                          checked={patchState[patch]}
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
        {seletedYearList.length > 0 && (
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

      {/* 접는버튼 */}
      {seletedYearList.length > 0 && (
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

// 스타일시트
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
