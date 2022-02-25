/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../../redux/modules/filtervalue";
import {
  setLeagueFilter,
  setPatchFilter,
  setPlayerFilter,
  setSeasonFilter,
  setTeamFilter,
  setYearFilter,
} from "../../../../redux/modules/selectorvalue";
import {
  JungleInit,
  SetFilterData,
  SetJunglePlayer,
} from "../../../../redux/modules/junglevalue";
// ui
import Radio from "../../../../Components/Ui/Radio";
import Checkbox from "../../../../Components/Ui/Checkbox";
import { typoStyle } from "../../../../Styles/ui";
import { useTranslation } from "react-i18next";
import { API } from "../../../config";
import axiosRequest from "../../../../lib/axios/axiosRequest";
import SelectedJungleFilter from "./SelectedJungleFilter";
import { initializedFalseValue } from "../../../../lib/initializedFalseValue";

const JungleFilter = () => {
  const leagueData = useSelector(
    (state) => state.StaticValueReducer.filterObjects
  );
  //스태틱 벨류에서 계산한값
  const yearList = useSelector((state) => state.SelectorReducer.yearFilter);
  console.log(yearList);
  const selector = useSelector((state) => state.SelectorReducer);
  const junglevalue = useSelector((state) => state.JungleMapReducer);

  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [toggleFoldBtn, setToggleFoldBtn] = useState(false);

  const handleFoldUp = () => setToggleFoldBtn(!toggleFoldBtn);

  // 사용자 체크 선택
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

  //  dispath filterValue data

  // 1. 리그정보에서 연도가지고 오기
  const dispatchYear = () => {
    let yearList = [];

    for (let key in leagueData) {
      yearList = Object.keys(leagueData[key]).concat(yearList);
    }
    dispatch(setYearFilter([...new Set(yearList)].sort()));
  };

  const fetchLeagueFilter = () => {
    let leagueList = [];
    if (junglevalue.year.length === 0) {
      return;
    }

    if (junglevalue.year.includes("2021")) {
      leagueList = Object.keys(leagueData).filter((league) => league !== "LPL");
    } else {
      leagueList = Object.keys(leagueData).filter(
        (league) => league !== "LPL" && league !== "MSI" && league !== "WC"
      );
    }

    leagueList.sort();
    console.log(leagueList);

    dispatch(setLeagueFilter(leagueList));
  };

  const fetchSeasonFilter = () => {
    let seasonList = [];
    if (junglevalue.year.length !== 0) {
      const result = Object.keys(junglevalue.league).filter(
        (key) => junglevalue.league[key] === true
      );
      for (let year of junglevalue.year) {
        for (let league of result) {
          const seasonKeys = Object.keys(leagueData[league][year]);
          seasonList = seasonList.concat(seasonKeys);
        }
      }
      // 공통되는 시즌이 아닌 경우로만 sorting
      seasonList = seasonList.filter(
        (item, pos) => seasonList.indexOf(item) === pos
      );
    }

    dispatch(setSeasonFilter(seasonList));
  };

  const fetchTeamFilter = () => {
    let teamList = [];
    if (
      junglevalue.year.length !== 0 &&
      Object.keys(junglevalue.season).length !== 0
    ) {
      const selectedLeagues = Object.keys(junglevalue.league).filter(
        (key) => junglevalue.league[key] === true
      );
      const selectedSeasons = Object.keys(junglevalue.season).filter(
        (key) => junglevalue.season[key] === true
      );
      for (let year of junglevalue.year) {
        for (let league of selectedLeagues) {
          for (let season of selectedSeasons) {
            const teamData = leagueData[league][year][season];
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
  };

  const fetchPatchFilter = () => {
    const selectedLeagues = Object.keys(junglevalue.league).filter(
      (key) => junglevalue.league[key] === true
    );
    const selectedSeasons = Object.keys(junglevalue.season).filter(
      (key) => junglevalue.season[key] === true
    );

    dispatch(Loading(true));
    const url = `${API}/lolapi/filter/patch`;
    const params = {
      league: selectedLeagues,
      year: junglevalue.year,
      season: selectedSeasons,
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
        const datas = { ...junglevalue.patch };
        const list = Object.keys(junglevalue.patch);
        const a = list.map((data) => {
          return (datas[data] = true);
        });
        dispatch(SetFilterData({ ...junglevalue, patch: datas }));

        dispatch(Loading(false));
      },
      function (e) {
        dispatch(Loading(false));
      }
    );
  };

  // life cycle

  // first
  useEffect(() => {
    if (yearList.length > 0) return;
    dispatchYear();
  }, []);
  /*
  // 연도 설정 후 리그필터 호출
  useEffect(() => {
    if (junglevalue.year.length === 0) {
      return;
    }
    dispatch(
      SetFilterData({
        year: junglevalue.year,
        league: {},
        season: {},
        team: [],
        patch: {},
      })
    );
    fetchLeagueFilter();
  }, [junglevalue.year]);

  // 리그 설정 후 시즌필터 호출
  useEffect(() => {
    if (Object.keys(junglevalue.league).length === 0) {
      return;
    }
    fetchSeasonFilter();
  }, [junglevalue.league]);

  //시즌 설정 후 팀 필터 호출
  useEffect(() => {
    if (Object.keys(junglevalue.season).length === 0) {
      return;
    }
    fetchTeamFilter();
  }, [junglevalue.season]);

  useEffect(() => {
    if (junglevalue.team.length === 0) {
      return;
    }
    fetchPatchFilter();
  }, [junglevalue.team]);

  useEffect(() => {
    if (junglevalue.patch.length === 0) {
      return;
    }
    // dispatch(SetJunglePlayer(""));
  }, [junglevalue.patch]);

  useEffect(() => {
    if (junglevalue.year.length === 0) {
      return;
    }
    const result = initializedFalseValue(selector.leagueFilter);

    dispatch(
      SetFilterData({
        ...junglevalue,
        league: result,
      })
    );
  }, [selector.leagueFilter]);

  useEffect(() => {
    if (Object.keys(junglevalue.league).length === 0) {
      return;
    }
    const result = initializedFalseValue(selector.seasonFilter);

    dispatch(
      SetFilterData({
        ...junglevalue,
        season: result,
      })
    );
  }, [selector.seasonFilter]);

  useEffect(() => {
    if (junglevalue.team.length === 0) {
      return;
    }
    const result = initializedFalseValue(selector.patchFilter, true);
    console.log(result);
    dispatch(
      SetFilterData({
        ...junglevalue,
        patch: result,
      })
    );
  }, [selector.patchFilter]);

  */
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
            {junglevalue.year.length === 0 ? (
              <SInitialStatement>
                {" "}
                {t("video.jungle.selectLeague")}
              </SInitialStatement>
            ) : (
              <SCheckboxAll
                name="league"
                value="all"
                onChange={handleChange}
                checked={
                  selector.leagueFilter.length > 0 &&
                  selector.leagueFilter.length ===
                    Object.keys(junglevalue.league).length &&
                  !Object.values(junglevalue.league).includes(false)
                }
              >
                {t("video.jungle.selectAll")}
              </SCheckboxAll>
            )}
            <SCheckboxWrapper>
              {Object.keys(junglevalue.league).length !== 0 &&
                selector.leagueFilter?.map((league) => {
                  return (
                    <Checkbox
                      name="league"
                      value={league}
                      onChange={handleChange}
                      checked={junglevalue["league"][league]}
                    >
                      {league}
                    </Checkbox>
                  );
                })}
            </SCheckboxWrapper>
          </SFilterGroup>
        </SRow>
        {/* 시즌 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.season")}</STitle>
          <SFilterGroup>
            {Object.keys(junglevalue.league).length === 0 ||
            !Object.values(junglevalue.league).includes(true) ? (
              <SInitialStatement>
                {t("video.jungle.selectSeason")}
              </SInitialStatement>
            ) : (
              <SCheckboxAll
                name="season"
                value="all"
                onChange={handleChange}
                checked={
                  selector.seasonFilter.length > 0 &&
                  selector.seasonFilter.length ===
                    Object.keys(junglevalue.season).length &&
                  !Object.values(junglevalue.season).includes(false)
                }
              >
                {t("video.jungle.selectAll")}
              </SCheckboxAll>
            )}
            <SCheckboxWrapper>
              {Object.keys(junglevalue.season).length !== 0 &&
                selector.seasonFilter?.map((season) => {
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
          </SFilterGroup>
        </SRow>
        {/* 팀 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.team")}</STitle>
          <SFilterGroup>
            {Object.keys(junglevalue.season).length === 0 ||
            !Object.values(junglevalue.season).includes(true) ? (
              <SInitialStatement>
                {t("video.jungle.selectTeam")}
              </SInitialStatement>
            ) : (
              <SCheckboxAll name="year" value="all" disabled={true}>
                {t("video.jungle.selectAll")}
              </SCheckboxAll>
            )}
            <SCheckboxWrapper>
              {Object.keys(junglevalue.season).length !== 0 &&
                selector.teamFilter?.map((team) => {
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
          </SFilterGroup>
        </SRow>
        {/* 패치 */}
        <SRow toggleFoldBtn={toggleFoldBtn}>
          <STitle>{t("video.jungle.patch")}</STitle>
          <SFilterGroup>
            {junglevalue.team.length === 0 ? (
              <SInitialStatement>
                {t("video.jungle.selectPatch")}
              </SInitialStatement>
            ) : (
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
            )}
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
          </SFilterGroup>
        </SRow>
        {/* 선택된 필터 */}
        {junglevalue.year.length > 0 ? (
          <SRow>
            <STitle>{t("video.jungle.selectedFilter")}</STitle>
            <SFilterGroup>
              <SResetWrapper
                onClick={() => {
                  dispatch(JungleInit());
                  if (toggleFoldBtn) {
                    setToggleFoldBtn(!toggleFoldBtn);
                  }
                }}
              >
                <SResetImg src="Images/ico_reset.svg" alt="reset" />
                <SResetTitle>{t("video.jungle.reset")}</SResetTitle>
              </SResetWrapper>
              <SCheckboxWrapper>
                {/* 선택된 필터 노출 */}
                <SelectedJungleFilter
                  filterData={junglevalue}
                  toggleFoldBtn={toggleFoldBtn}
                  setToggleFoldBtn={setToggleFoldBtn}
                />
              </SCheckboxWrapper>
            </SFilterGroup>
          </SRow>
        ) : (
          <></>
        )}
      </SFilterContainer>
      {junglevalue.year.length > 0 ? (
        <FoldUpBtn onClick={handleFoldUp}>
          {!toggleFoldBtn ? (
            <img src="Images/btn_fold_up.png" alt="foldup" />
          ) : (
            <img src="Images/btn_fold_down.png" alt="folddown" />
          )}
        </FoldUpBtn>
      ) : (
        <></>
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
