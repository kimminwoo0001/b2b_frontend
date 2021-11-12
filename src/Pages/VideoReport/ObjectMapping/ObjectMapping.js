import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import ChampionSetting from "./ChampionSetting";
import SelectGame from "./SelectGame";
import SelectObject from "./SelectObject";
import SelectPosition from "./SelectPosition";
import LoadingImg from "../../../Components/LoadingImg/MapLoading";
import Tippy from "@tippy.js/react";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import ObjectTooltip from "./ObjectTooltip";
import addZero from "../../../lib/addZero";
import axiosRequest from "../../../lib/axiosRequest";

function useInterval(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);
}

function useIntervalNormal(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 300);
    return () => clearInterval(id);
  }, []);
}

function ObjectMapping() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  //맵핑 데이터 핸들링 상태값
  const [currentPos, setCurrentPos] = useState();
  const [champInfo, setchampInfo] = useState();
  //Range 핸들링 상태값
  const [range, setRange] = useState(0);
  const [minTime, setMinTime] = useState();
  const [maxTime, setMaxTime] = useState();
  const [play, setPlay] = useState(false);
  const [fast, setFast] = useState(false);
  const [pause, setPause] = useState(false);
  // 토글 버튼 상태값
  const [customOpen, setCustomOpen] = useState(true);
  const [gameOpen, setGameOpen] = useState(false);
  const [objectOpen, setObjectOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  // query string 상태값
  const [gameData, setGameData] = useState([]);
  const [side, setSide] = useState("all");
  const [period, setPeriod] = useState("all");
  const [position, setPosition] = useState(["top", "jng", "mid", "bot", "sup"]);
  const [gameSelect, setGameSelect] = useState([]);

  //맵핑 데이터 fetch 함수
  const fetchingMapData = () => {
    try {
      setLoading(true);
      const url = `${API2}/api/mappingPosition`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        compare: compareOpen ? "" : "off",
        opp_team: filters.oppteam,
        opp_player: filters.oppplayer,
        opp_champion: filters.oppchampion_eng,
        side: side,
        time: period,
        position: position,
        gameid: gameSelect,
        token: user.token,
        id: user.id,
      };
      axiosRequest(url, params, function (e) {
        const dto = e.data;
        setMinTime(dto?.position[0].realCount ? dto?.position[0].realCount : 0);
        setMaxTime(dto.position.length - 1);
        setCurrentPos(dto.position);
        setchampInfo(dto.info);
        setPlay(true);
        console.log(dto.position);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // normal
  useIntervalNormal(() => {
    if (play === true && range < maxTime) {
      setRange(parseInt(range) + 1);
    }
    // if (play === true && range === maxTime) {
    //   setPlay(false);
    // }
  }, 300);

  // fast
  useInterval(() => {
    if (fast === true && range < maxTime) {
      setRange(parseInt(range) + 1);
    }
    // if (fast === true && range === maxTime) {
    //   setFast(false);
    // }
  }, 100);

  // 동선 확인
  const handleConfirm = () => {
    let unselectedItem = [];
    const { team, champion_eng, player, oppteam, oppplayer, oppchampion_eng } =
      filters;

    if (compareOpen) {
      if (
        side &&
        period &&
        position.length > 0 &&
        champion_eng.length > 0 &&
        oppchampion_eng.length > 0 &&
        gameSelect.length > 0
      ) {
        fetchingMapData();
        setRange(0);
      } else {
        if (team.length === 0) unselectedItem.push(t("video.vision.team"));
        if (player.length === 0) unselectedItem.push(t("video.vision.player"));
        if (champion_eng.length === 0)
          unselectedItem.push(t("video.vision.champ"));
        if (oppteam.length === 0) unselectedItem.push(t("video.vision.team2"));
        if (oppplayer.length === 0)
          unselectedItem.push(t("video.vision.player2"));
        if (oppchampion_eng.length === 0)
          unselectedItem.push(t("video.vision.champ2"));
        if (gameSelect.length === 0)
          unselectedItem.push(t("video.vision.game"));
      }
    } else {
      if (
        side &&
        period &&
        position.length > 0 &&
        champion_eng.length > 0 &&
        gameSelect.length > 0
      ) {
        setchampInfo([]);
        fetchingMapData();
        setRange(0);
        setFast(false);
        setPlay(false);
      } else {
        if (team.length === 0) unselectedItem.push(t("video.vision.team"));
        if (player.length === 0) unselectedItem.push(t("video.vision.player"));
        if (champion_eng.length === 0)
          unselectedItem.push(t("video.vision.champ"));
        if (gameSelect.length === 0)
          unselectedItem.push(t("video.vision.game"));
      }
    }

    if (unselectedItem.length > 0) {
      let unselectedSentence = "";
      for (let i = 0; i < unselectedItem.length; i++) {
        unselectedSentence += unselectedItem[i];
        if (i !== unselectedItem.length - 1) {
          unselectedSentence += ", ";
        }
      }
      let alertMessage = t("video.vision.selectAlert").replace(
        "###",
        unselectedSentence
      );
      alert(alertMessage);
    }
  };

  return (
    <ObjectMappingContainer>
      <StepFilter>
        <StepFilterWrapper>
          <Steps>
            {/* 팀/선수 기준 설정   ChampionSetting을 불러와서 사용중*/}
            <StepTitle onClick={() => setCustomOpen(!customOpen)}>
              <div className="title">
                <span className="step">STEP 1.</span>
                <span className="subtitle">{t("video.object.step1")}</span>
              </div>
              <img
                src={
                  customOpen
                    ? "Images/ico-arrow-up.png"
                    : "Images/ico-arrow-down.png"
                }
                alt=""
              />
            </StepTitle>
            <StepContents isActive={customOpen === true}>
              <ChampionSetting
                setGameData={setGameData}
                side={side}
                compareOpen={compareOpen}
                setCompareOpen={setCompareOpen}
                setGameOpen={setGameOpen}
                setGameSelect={setGameSelect}
              />
            </StepContents>
          </Steps>
          <Steps>
            {/* 경기 선택 부분 SelectGame.js 를 불러와서 사용함 */}
            <StepTitle onClick={() => setGameOpen(!gameOpen)}>
              <div className="title">
                <span className="step">STEP 2.</span>
                <span className="subtitle">{t("video.object.step2")}</span>
              </div>
              <img
                src={
                  gameOpen
                    ? "Images/ico-arrow-up.png"
                    : "Images/ico-arrow-down.png"
                }
                alt=""
              />
            </StepTitle>
            <StepContents isActive={gameOpen === true}>
              <SelectGame
                gameData={gameData}
                setSide={setSide}
                side={side}
                setGameSelect={setGameSelect}
                gameSelect={gameSelect}
                setObjectOpen={setObjectOpen}
                setPositionOpen={setPositionOpen}
              />
            </StepContents>
          </Steps>
          <Steps>
            {/* 오브젝트 설정 , SelectObject를 불러와서 사용함 */}
            <StepTitle onClick={() => setObjectOpen(!objectOpen)}>
              <div className="title">
                <span className="step">STEP 3.</span>
                <span className="subtitle">{t("video.object.step3")}</span>
              </div>
              <img
                src={
                  objectOpen
                    ? "Images/ico-arrow-up.png"
                    : "Images/ico-arrow-down.png"
                }
                alt=""
              />
            </StepTitle>
            <StepContents isActive={objectOpen === true}>
              <SelectObject setPeriod={setPeriod} period={period} />
            </StepContents>
          </Steps>
          <Steps>
            {/* 포지션 설정 SelectPosition.js 를 불러와서 사용 중 */}
            <StepTitle onClick={() => setPositionOpen(!positionOpen)}>
              <div className="title">
                <span className="step">STEP 4.</span>
                <span className="subtitle">{t("video.object.step4")}</span>
              </div>
              <img
                src={
                  positionOpen
                    ? "Images/ico-arrow-up.png"
                    : "Images/ico-arrow-down.png"
                }
                alt=""
              />
            </StepTitle>
            <StepContents isActive={positionOpen === true}>
              <SelectPosition position={position} setPosition={setPosition} />
            </StepContents>
          </Steps>
        </StepFilterWrapper>
        <ButtonContainer>
          <ConfirmButton
            onClick={() => handleConfirm()}
            isActive={
              filters.champion_eng &&
              side &&
              period &&
              position.length > 0 &&
              gameSelect.length > 0
            }
          >
            {t("video.object.apply")}
          </ConfirmButton>
        </ButtonContainer>
      </StepFilter>
      <ObjectMapWrapper>
        {loading ? (
          <LoadingImg />
        ) : (
          // 실제로 오브젝트 별 동선 Mapping이 작동되는 부분.
          <ObjectMap>
            {champInfo?.map((info, idx) => {
              console.log(
                "currentPos[range]?.player:",
                currentPos[range]?.player
              );
              if (range === 0) {
                if (info.side === "red") {
                  var x = 630;
                  var y = 45;
                } else {
                  x = 45;
                  y = 640;
                }
              } else {
                for (let i = 0; i < currentPos[range]?.player?.length; i++) {
                  if (
                    `mapping ${info.gameid} ${info.side} ${info.position}` ===
                    `mapping ${currentPos[range]?.player[i].gameid} ${currentPos[range]?.player[i].team} ${currentPos[range]?.player[i].position}`
                  ) {
                    if (
                      Number(currentPos[range]?.player[i].x1) -
                        Number(currentPos[range]?.player[i].x2) !==
                        0 &&
                      Number(currentPos[range]?.player[i].y1) -
                        Number(currentPos[range]?.player[i].y2) !==
                        0
                    ) {
                      x =
                        ((Number(currentPos[range]?.player[i].x1) +
                          Number(currentPos[range]?.player[i].x2)) /
                          2 -
                          14.5) *
                        2.5;

                      y =
                        ((Number(currentPos[range]?.player[i].y1) +
                          Number(currentPos[range]?.player[i].y2)) /
                          2 -
                          14.5) *
                        2.5;
                    } else {
                    }
                  }
                }
              }
              return (
                // player 아이콘 클릭 시 툴팁
                <StyledTippy
                  // options
                  arrow={true}
                  duration={0}
                  delay={[0, 0]}
                  trigger="click"
                  content={
                    <ObjectTooltip
                      champion={info.champion}
                      side={info.side}
                      gameid={info.gameid}
                      position={info.position}
                      player={info.player}
                    />
                  }
                  placement="top"
                  key={idx}
                >
                  {/* 오브젝트별 동선 스타일 좌표값 */}
                  <PlayerInfo
                    key={idx}
                    className={`mapping ${info.gameid} ${info.side} ${info.position}`}
                    style={{
                      top: `${y}px`,
                      left: `${x}px`,
                      height: "29px",
                      width: "29px",
                      transition: "all 0.25s ease-out 0s",
                      backgroundImage: `url(Images/champion/${info.champion}.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      borderRadius: "50%",
                      border: `1px solid ${info.side}`,
                    }}
                  ></PlayerInfo>
                </StyledTippy>
              );
            })}
          </ObjectMap>
        )}
        {/* 타임라인 (range) */}
        <RangeWrapper>
          <RangeInput
            min={0}
            value={range}
            max={maxTime}
            id="rangeSlider"
            type="range"
            onChange={(e) => {
              setRange(Number(e.target.value));
            }}
            onKeyPress={(e) => {
              setRange(Number(e.target.value));
            }}
            step="1"
          />
          <TimeStamp>
            <span className="current">
              {range
                ? `${addZero(
                    Math.floor((range + minTime) / 2 / 60)
                  )} : ${addZero(Math.floor(((range + minTime) / 2) % 60))}`
                : "00 : 00"}
            </span>
            <p>/</p>
            {maxTime ? (
              <span className="max">{`${addZero(
                Math.floor((maxTime + minTime) / 2 / 60)
              )} : ${addZero(((maxTime + minTime) / 2) % 60)}`}</span>
            ) : (
              <span className="max">{`00 : 00`}</span>
            )}
          </TimeStamp>
        </RangeWrapper>
        <ButtonWrapper>
          {play === true || fast === true ? (
            play === true ? (
              <>
                <PlayButton
                  onClick={() => {
                    setPlay(false);
                    setFast(false);
                    setPause(true);
                  }}
                >
                  Pause
                </PlayButton>
                <PlayButton
                  onClick={() => {
                    setFast(true);
                    setPlay(false);
                  }}
                >
                  Fast
                </PlayButton>
              </>
            ) : (
              <>
                <PlayButton
                  onClick={() => {
                    setPlay(false);
                    setFast(false);
                    setPause(true);
                  }}
                >
                  Pause
                </PlayButton>
                <PlayButton
                  onClick={() => {
                    setPlay(true);
                    setFast(false);
                  }}
                >
                  Play
                </PlayButton>
              </>
            )
          ) : pause ? (
            <>
              <PlayButton
                onClick={() => {
                  setPlay(true);
                  setFast(false);
                }}
              >
                Play
              </PlayButton>
              <PlayButton
                onClick={() => {
                  setFast(true);
                  setPlay(false);
                }}
              >
                Fast
              </PlayButton>
            </>
          ) : (
            ""
          )}
        </ButtonWrapper>
      </ObjectMapWrapper>
    </ObjectMappingContainer>
  );
}

export default ObjectMapping;

const StyledTippy = styled(Tippy)``;

const PlayerInfo = styled.div``;

const ObjectMappingContainer = styled.div`
  margin-top: 22.5px;
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  height: 100%;
`;

const StepFilter = styled.div``;

const StepFilterWrapper = styled.div`
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
`;

const Steps = styled.div`
  padding: 22px 19px 0 23px;
  width: 376px;
  min-height: 59px;
  border-bottom: solid 1px rgb(67, 63, 78);
  cursor: pointer;
  :nth-child(4) {
    border-bottom: none;
  }
`;

const StepTitle = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
    display: flex;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    > .step {
      font-weight: normal;
      color: rgb(240, 69, 69);
      margin-right: 5px;
    }
    > .subtitle {
      color: rgb(255, 255, 255);
    }
  }
`;

const StepContents = styled.div`
  opacity: 0;
  max-height: 0px;
  overflow-y: visible;
  width: 100%;
  transition: all 0.2s ease;
  ${(props) =>
    props.isActive &&
    css`
      opacity: 1;
      z-index: 0;
      max-height: 1000px;
    `}
`;

const ConfirmButton = styled.button`
  width: 126px;
  height: 36px;
  border-radius: 3px;
  background-color: rgb(105, 103, 119);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(255, 255, 255);
  ${(props) =>
    props.isActive &&
    css`
      background-color: rgb(240, 69, 69);
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;
const ObjectMapWrapper = styled.div`
  width: 700px;
`;

const ObjectMap = styled.div`
  background-image: url("Images/obj_map_summer.png");
  position: relative;
  width: 700px;
  height: 700px;
  > div {
    position: absolute;
    border-radius: 50%;
  }
`;

const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 14px 0 26px 0;
`;

const RangeInput = styled.input`
  width: 85%;
  height: 6px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background-color: rgb(58, 55, 69);
  border-radius: 6px;
  border: 0.2px solid rgb(58, 55, 69);
  -webkit-appearance: none;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid #817e90;
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background: #817e90;
    cursor: pointer;
  }
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  height: 17px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  color: white;
  p {
    margin: 0 4px 0 4px;
  }
  > .current {
    width: 45%;
    color: rgb(240, 69, 69);
    text-align: right;
  }
  > .max {
    color: rgb(107, 105, 121);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PlayButton = styled.button`
  width: 60px;
  height: 27px;
  border-radius: 2px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(58, 55, 69);
  font-family: Poppins;
  font-size: 13px;
  text-align: center;
  color: rgb(129, 126, 144);
  :hover {
    opacity: 0.8;
  }
  :nth-child(2) {
    margin-left: 10px;
  }
`;
