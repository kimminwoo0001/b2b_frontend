/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { API } from "../../../config";
import axiosRequest from "../../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../../redux/modules/modalvalue";
import {
  SetJunglePlayer,
  SetIsJungleMappingClicked,
  SetFilterData,
} from "../../../../redux/modules/junglevalue";
import { useTranslation } from "react-i18next";

// UI tool kit
import Accordion from "../../../../Components/Ui/Accordion/Accordion";
import AccordionDetails from "../../../../Components/Ui/Accordion/AccordionDetails";
import AccordionSummary from "../../../../Components/Ui/Accordion/AccordionSummary";
import DropdownContainer from "../../../../Components/Ui/DropDown/DropdownContainer";
import DropdownLabel from "../../../../Components/Ui/DropDown/DropdownLabel";
import DropdownList from "../../../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../../../Components/Ui/DropDown/DropdownItem";
import Checkbox from "../../../../Components/Ui/Checkbox";
import Avatar from "../../../../Components/Ui/Avatar";
import Radio from "../../../../Components/Ui/Radio";
import Versus from "../../../../Components/Ui/Versus";
import Button from "../../../../Components/Ui/Button";

// css
import {
  dropdownStyle,
  tableStyle,
  transitionStyle,
  typoStyle,
  scrollbarStyle,
  buttonStyle,
  borderRadiusStyle,
} from "../../../../Styles/ui";
import { isObjEqual } from "../../../../lib/isObjEqual";
import { initializedObjValue } from "../../../../lib/initializedObjValue";

const JungleSideFilter = () => {
  const junglevalue = useSelector((state) => state.JungleMapReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const isInitialMount2 = useRef(true);

  const [radioState, setRadioState] = useState();
  const radioRef = useRef([]);

  const [playerInfo, setPlayerInfo] = useState();
  const [champInfo, setChampInfo] = useState();
  const [oppChampInfo, setOppChampInfo] = useState();
  const [gameList, setGameList] = useState();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // 전체선택
    if (value === "all") {
      const datas = { ...junglevalue[name] };
      const list = Object.keys(junglevalue[name]);
      const a = list.map((data) => {
        return (datas[data] = checked);
      });
      dispatch(SetFilterData({ ...junglevalue, [name]: datas }));
    }
    // 개별선택
    else {
      dispatch(
        SetFilterData({
          ...junglevalue,
          [name]: { ...junglevalue[name], [value]: checked },
        })
      );

      // setFilterState((prev) => {
      //   const newData = { ...prev };
      //   newData[name] = { ...newData[name], [value]: checked };
      //   // if (isObjEqual(newData[name])) {
      //   //   newData[name].all = checked;
      //   // } else {
      //   //   newData[name].all = false;
      //   // }
      //   return newData;
      // });
    }
  };
  // 라디오버튼 체인지 관련로직
  const handleRadio = (e) => {
    const { value, name } = e.target;
    // setRadioState(value);
    dispatch(SetFilterData({ ...junglevalue, [name]: [value] }));
  };
  // 상위 이벤트
  const handleClickGameItem = (num) => {
    radioRef.current[num].click();
  };

  const leagueArr = Object.keys(junglevalue.league).filter(
    (key) => junglevalue.league[key] === true
  );
  const seasonArr = Object.keys(junglevalue.season).filter(
    (key) => junglevalue.season[key] === true
  );
  const patchArr = Object.keys(junglevalue.patch).filter(
    (key) => junglevalue.patch[key] === true
  );

  useEffect(() => {
    if (junglevalue.player === "") {
      return;
    }
    GetChampion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [junglevalue.player]);

  useEffect(() => {
    if (
      junglevalue.champion &&
      Object.keys(junglevalue.champion).filter(
        (key) => junglevalue.champion[key] === true
      ).length === 0
    ) {
      return;}

      GetOppChampion();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [junglevalue.champion]);

  useEffect(() => {
    if (
      junglevalue.oppchampion &&
      Object.keys(junglevalue.oppchampion).filter(
        (key) => junglevalue.oppchampion[key] === true
      ).length === 0
    ) {
      return;
    }
  
      GetGameList();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [junglevalue.oppchampion]);

  // STEP 01 선수 선택 api 호출
  const GetPlayerInfo = () => {
    const url = `${API}/lolapi/jungle/userinfo`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setPlayerInfo(e);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  // STEP 02 챔피언 선택 api 호출
  const GetChampion = () => {
    const url = `${API}/lolapi/jungle/player-champions`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      player: junglevalue.player,
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setChampInfo(e);
        // console.log(e.data);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  // STEP 03 상대 챔피언 선택 api 호출
  const GetOppChampion = () => {
    const selectedChamps =
      junglevalue.champion &&
      Object.keys(junglevalue.champion).filter(
        (key) => junglevalue.champion[key] === true
      );
    const url = `${API}/lolapi/jungle/opp-champions`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      player: junglevalue.player,
      champion: selectedChamps,
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setOppChampInfo(e);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  // STEP 04 동선 확인할 경기 리스트 api 호출
  const GetGameList = () => {
    const selectedChamps =
      junglevalue.champion &&
      Object.keys(junglevalue.champion).filter(
        (key) => junglevalue.champion[key] === true
      );
    const selectedOppChamps =
      junglevalue.oppchampion &&
      Object.keys(junglevalue.oppchampion).filter(
        (key) => junglevalue.oppchampion[key] === true
      );
    const url = `${API}/lolapi/jungle/object-game`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      player: junglevalue.player,
      champion: selectedChamps,
      oppchampion: selectedOppChamps,
      side: "all",
      token: user.token,
      id: user.id,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setGameList(e.game);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    );
  };

  // champInfo 있을 시 모든 value를 객체 및 false처리
  useEffect(() => {
    let newArr = [];
    for (let key in champInfo) {
      newArr.push(champInfo[key].champ);
    }
    const result = initializedObjValue(newArr);
    dispatch(
      SetFilterData({
        ...junglevalue,
        champion: result,
      })
    );
  }, [champInfo]);

  // oppChampInfo 있을 시 모든 value를 객체 밒 false처리
  useEffect(() => {
    let newArr = [];
    for (let key in oppChampInfo) {
      newArr.push(oppChampInfo[key].champs);
    }
    const result = initializedObjValue(newArr);
    dispatch(
      SetFilterData({
        ...junglevalue,
        oppchampion: result,
      })
    );
  }, [oppChampInfo]);

  return (
    <SWrapper>
      <SFilterContainer>
        {/* step1 - select 박스 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion
            act={
              Object.keys(junglevalue.patch).filter(
                (key) => junglevalue.patch[key] === true
              ).length > 0
            }
          >
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 01</SLabel>
                <STeam>
                  <Avatar
                    css={{ marginRight: 3 }}
                    size={20}
                    src={`Images/TeamLogo/${junglevalue.team}.png`}
                    alt="TeamLogo"
                  />
                  <span>
                    {junglevalue.team} {t("video.jungle.selectPlayer")}
                  </span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <DropdownContainer
                label="player"
                onChange={(e) => {
                  console.log(e);
                }}
              >
                <DropdownLabel
                  css={[dropdownStyle.select_head]}
                  onClick={() => GetPlayerInfo()}
                >
                  {`${
                    junglevalue.player && junglevalue.player !== ""
                      ? junglevalue.player
                      : t("video.jungle.selectPlayer")
                  }`}
                </DropdownLabel>
                <DropdownList>
                  {playerInfo?.map((info, idx) => {
                    return (
                      <DropdownItem
                        key={info.name + idx}
                        css={[dropdownStyle.select_item]}
                        value={info.name}
                        onClick={() => dispatch(SetJunglePlayer(info.name))}
                      >
                        {/* {`${lang === "ko" ? info.nativeName : info.name}`} */}
                        {info.name}
                      </DropdownItem>
                    );
                  })}
                </DropdownList>
              </DropdownContainer>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step2 - 챔피언 체크박스 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion act={junglevalue.player && junglevalue.player.length}>
            <AccordionSummary css={{ marginBottom: 13 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 02</SLabel>
                <STeam>
                  <span>{t("video.jungle.champLabel")}</span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <STable>
                <SHead>
                  <div css={Col1}>
                    <Checkbox
                      name="champion"
                      value="all"
                      onChange={handleChange}
                      checked={
                        junglevalue.champion &&
                        Object.keys(junglevalue.champion).filter(
                          (key) => junglevalue.champion[key] === false
                        ).length === 0
                      }
                    />
                  </div>
                  <div css={Col2}>{`${t("video.jungle.champTitle")}(${t("video.jungle.numOfMatches2")})`}</div>
                  <div css={[Col3]}>{t("video.jungle.matchesBySide")}</div>
                  <div css={[Col3]}>{t("video.jungle.numOfMatches")}</div>
                </SHead>

                <SBody>
                  {champInfo?.map((champ, idx) => {
                    return (
                      <SRow
                        isActive={
                          junglevalue.champion &&
                          Object.keys(junglevalue.champion)
                            .filter((key) => junglevalue.champion[key] === true)
                            .includes(champ.champ)
                        }
                      >
                        {/* 체크 */}
                        <div css={Col1}>
                          <Checkbox
                            name="champion"
                            value={champ.champ}
                            onChange={handleChange}
                            checked={
                              junglevalue.champion &&
                              Object.keys(junglevalue.champion)
                                .filter(
                                  (key) => junglevalue.champion[key] === true
                                )
                                .includes(champ.champ)
                            }
                          />
                        </div>

                        {/* 본문 */}
                        <SChamp css={Col2}>
                          <Avatar
                            css={{ marginRight: 5 }}
                            size={20}
                            src={`Images/champion/${champ.champ}.png`}
                            alt="champLogo"
                          />
                          <span>{`${champ.champ} (${
                            champ.blue_champ + champ.red_champ
                          })`}</span>
                        </SChamp>

                        {/* 경기수 */}
                        <SRed>{champ.red_champ}</SRed>
                        <SBlue>{champ.blue_champ}</SBlue>
                      </SRow>
                    );
                  })}
                </SBody>
              </STable>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* stpe3 - 상대팀 챔피언 체크박스 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion
            act={
              junglevalue.champion &&
              Object.keys(junglevalue.champion).filter(
                (key) => junglevalue.champion[key] === true
              ).length
            }
          >
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 03</SLabel>
                <STeam>
                  <span>{t("video.jungle.oppChampLabel")}</span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <STable>
                <SHead>
                  <div css={Col1}>
                    <Checkbox
                      name="oppchampion"
                      value="all"
                      onChange={handleChange}
                      checked={
                        junglevalue.oppchampion &&
                        Object.keys(junglevalue.oppchampion).filter(
                          (key) => junglevalue.oppchampion[key] === false
                        ).length === 0
                      }
                    />
                  </div>
                  <div css={Col2}>{`${t("video.jungle.champTitle")}(${t("video.jungle.numOfMatches2")})`}</div>
                  <div css={[Col3]}>{t("video.jungle.matchesBySide")}</div>
                  <div css={[Col3]}>{t("video.jungle.numOfMatches")}</div>
                </SHead>

                <SBody>
                  {oppChampInfo?.map((oppChamp, idx) => {
                    return (
                      <SRow
                        isActive={
                          junglevalue.oppchampion &&
                          Object.keys(junglevalue.oppchampion)
                            .filter(
                              (key) => junglevalue.oppchampion[key] === true
                            )
                            .includes(oppChamp.champs)
                        }
                      >
                        {/* 체크 */}
                        <div css={Col1}>
                          <Checkbox
                            name="oppchampion"
                            value={oppChamp.champs}
                            onChange={handleChange}
                            checked={
                              junglevalue.oppchampion &&
                              Object.keys(junglevalue.oppchampion)
                                .filter(
                                  (key) => junglevalue.oppchampion[key] === true
                                )
                                .includes(oppChamp.champs)
                            }
                          />
                        </div>
                        {/* 본문 */}
                        <SChamp css={Col2}>
                          <Avatar
                            css={{ marginRight: 5 }}
                            size={20}
                            src={`Images/champion/${oppChamp.champs}.png`}
                            alt="oppChampLogo"
                          />
                          <span>{`${oppChamp.champs} (${
                            oppChamp.blue_champ + oppChamp.red_champ
                          })`}</span>
                        </SChamp>

                        {/* 경기수 */}
                        <SRed>{oppChamp.red_champ}</SRed>
                        <SBlue>{oppChamp.blue_champ}</SBlue>
                      </SRow>
                    );
                  })}
                </SBody>
              </STable>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step4 - 경기체크 */}
        <div>
          <Accordion
            act={
              junglevalue.oppchampion &&
              Object.keys(junglevalue.oppchampion).filter(
                (key) => junglevalue.oppchampion[key] === true
              ).length
            }
          >
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 04</SLabel>
                <STeam>
                  <span>{t("video.jungle.selectGame")}</span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>

            <AccordionDetails>
              <SGameList>
                {/* 경기 정보 item */}
                {gameList?.map((game, idx) => (
                  <SGameItem
                    // isActive={radioState === `${idx+1}경기`}
                    isActive={junglevalue.gameid == game.gameid}
                    key={`경기정보${idx + 1}`}
                    onClick={() => handleClickGameItem(idx + 1)}
                  >
                    {/* 라디오버튼 */}
                    <SRadioContainer>
                      <Radio
                        name="gameid"
                        // value={`${idx+1}경기`}
                        value={game.gameid}
                        ref={(el) => (radioRef.current[idx + 1] = el)}
                        onChange={handleRadio}
                        // checked={radioState === `${idx+1}경기`}
                        checked={junglevalue.gameid == game.gameid}
                      />
                    </SRadioContainer>
                    {/* 경기정보 */}
                    <SInfoContainer>
                      {/* 팀, 경기 날짜 */}
                      <SInfo>
                        <STeam>
                          <Avatar
                            size={24}
                            src={`Images/TeamLogo/${game.team}.png`}
                            color={"blue"}
                            alt="teamLogo"
                          />
                          <Versus spacing={6} />
                          <Avatar
                            size={24}
                            src={`Images/TeamLogo/${game.oppteam}.png`}
                            color={"red"}
                            alt="oppTeamLogo"
                          />
                        </STeam>
                        <span>
                          {game.win.toUpperCase()}
                          <em>{game.date.slice(0, 10)}</em>
                        </span>
                      </SInfo>
                      {/* 경기 이름 */}
                      <SName>{`${game.league.toUpperCase()} ${
                        game.set
                      } SET`}</SName>
                      <STeamSlideContainer>
                        <STeamSide>
                          {game?.champion?.map((champ, idx) => {
                            return (
                              <Avatar
                                key={champ + idx}
                                src={`Images/champion/${champ}.png`}
                                alt="champion"
                                color={"blue"}
                                size={20}
                              />
                            );
                          })}
                        </STeamSide>
                        <Versus spacing={8} />
                        <STeamSide>
                          {game?.oppchampion?.map((oppchamp, idx) => {
                            return (
                              <Avatar
                                key={oppchamp + idx}
                                color={"red"}
                                src={`Images/champion/${oppchamp}.png`}
                                alt="oppChampion"
                                size={20}
                              />
                            );
                          })}
                        </STeamSide>
                      </STeamSlideContainer>
                    </SInfoContainer>
                  </SGameItem>
                ))}
              </SGameList>
            </AccordionDetails>
          </Accordion>
        </div>
      </SFilterContainer>

      <SButtonContainer>
        <Button
          disabled={
            junglevalue.oppChampion &&
            Object.keys(junglevalue.oppchampion).filter(
              (key) => junglevalue.oppchampion[key] === true
            ).length === 0
          }
          css={[
            buttonStyle.color.main,
            buttonStyle.size.full,
            buttonStyle.size.y_20,
            typoStyle.body,
            borderRadiusStyle.full,
          ]}
          onClick={() => {
            dispatch(SetIsJungleMappingClicked(true));
          }}
        >
          {t("video.jungle.confirm")}
        </Button>
      </SButtonContainer>
    </SWrapper>
  );
};

// 레이아웃
const SWrapper = styled.div`
  display: flex;
  /* height: 100%; */
  /* min-height: 427px; */
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg_light};
  border-radius: 20px;
`;

const SFilterContainer = styled.div`
  padding: 24px 20px 0 20px;
`;

const SButtonContainer = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border_light};
`;

// step
const SStepContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SLabel = styled.p`
  ${typoStyle.label}
  height: 100%;
  margin-right: 8px;
`;

const STeam = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`;

// 테이블 관련 코드
const STable = styled.div``;
const SHead = styled.div`
  ${tableStyle.table_head}
`;
const SBody = styled.div``;
const SRow = styled.div`
  border-radius: 999px;
  ${tableStyle.table_row}
  ${transitionStyle.background}
  
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.bg_gnb : ""};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg_gnb};
  }
`;
const SChamp = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  span {
    ${typoStyle.noWrap}
  }
`;

// 경기선택 관련
const SGameList = styled.div`
  height: 400px;
  padding: 0 10px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.bg_select};
  border-radius: 20px;
  ${scrollbarStyle.hidden}
`;
const SGameItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 16px 8px;
  border-radius: 20px;
  cursor: pointer;
  ${transitionStyle.background}
  background-color: ${({ isActive, theme }) =>
    isActive ? `${theme.colors.bg_gnb}` : ""};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg_hover};
  }
`;
const SRadioContainer = styled.div`
  margin-right: 8px;
`;
const SInfoContainer = styled.div`
  max-width: 265px;
`;
const SInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typoStyle.contents}

  em {
    margin-left: 10px;
    ${typoStyle.info_md}
  }
`;

const SName = styled.div`
  width: 100%;
  margin: 5px 0;
  ${typoStyle.noWrap}
`;
const STeamSlideContainer = styled.div`
  display: flex;
`;
const STeamSide = styled.div`
  display: flex;
  > div {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

// 테이블
const Col1 = css`
  margin-right: 16px;
`;

const Col2 = css`
  flex: 1;
  max-width: 180px;
`;

const Col3 = css`
  width: 43px;
  text-align: center;
`;

const SRed = styled.div`
  ${Col3}
  color: ${({ theme }) => theme.colors.red};
`;
const SBlue = styled.div`
  ${Col3}
  color: ${({ theme }) => theme.colors.blue};
`;

export default JungleSideFilter;
