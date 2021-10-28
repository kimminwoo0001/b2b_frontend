import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import GameLists from "./GameLists";
import LoadingImg from "../../../Components/LoadingImg/MapLoading";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import Tippy from "@tippy.js/react";
import ObjectTooltip from "../ObjectMapping/ObjectTooltip";


//fast 버튼 setinterval 메모리 최적화 함수
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

//play 버튼 setinterval 메모리 최적화 함수
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

function GameMapping() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // queryString 핸들링 상태값
  const [side, setSide] = useState("all");
  const [gameId, setGameId] = useState();
  //map데이터 핸들링 상태값
  const [mapData, setmapData] = useState([]);
  const [currentPos, setCurrentPos] = useState();
  const [timeLineData, setTimeLineData] = useState([]);
  const [info, setInfo] = useState();
  const [vod, setVod] = useState();
  //Range 핸들링 상태값
  const [range, setRange] = useState(0);
  const [maxTime, setMaxTime] = useState();
  const [minTime, setMinTime] = useState();
  const [play, setPlay] = useState(false);
  const [fast, setFast] = useState(false);
  const [pause, setPause] = useState(false);

  const [gameListData, setGameListData] = useState();

  //게임 리스트 불러오기
  useEffect(() => {
    getGameLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side, filters.team, filters.patch]);

  const getGameLists = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingFilter`,
        params: {
          league: filters.league,
          year: filters.year,
          season: filters.season,
          patch: filters.patch,
          team: filters.team,
          object: "off",
          side: side,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      setGameListData(Object.values(response.data["match"]));
      console.log(response.data.match);
    } catch (e) {
      console.log(e);
    }
  };

  //맵핑 데이터 fetch 함수
  const fetchingMapData = async () => {
    const gameid = filters?.gameid ?? '';
    if (gameid.length > 0) {
      setLoading(true);
      try {
        const result = await axios.request({
          method: "GET",
          url: `${API2}/api/mappingPosition`,
          params: {
            gameid: filters.gameid,
            token: user.token,
            id: user.id,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        });

        // 맵핑 포지션
        const dto = result.data;

        for (let i = 0; i < dto.position.length; i++) {
          if (dto.position[i].player) {
            setMinTime(dto.position[i]);
            setRange(dto.position[i].realCount);
            break;
          }
        }
        setVod(dto.vod);
        setMaxTime(dto?.position[dto.position.length - 1]?.realCount);
        setCurrentPos(dto.position);
        setInfo(dto.info);
        setTimeLineData(dto.timeline);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setPlay(true);
      }
    } else {
      alert(t("video.vision.selectGame"))
    }
  };

  // 타임라인 데이터 함수
  const handleTimeLine = () => {
    let arrevent = [];
    for (let i = 0; i < timeLineData?.length; i++) {
      let event = timeLineData[i];
      if (event?.timestamp <= range) {
        arrevent.push(event);
      }
    }
    setmapData(arrevent);
  };

  useIntervalNormal(() => {
    if (play === true && range < maxTime) {
      setRange(parseInt(range) + 1);
      handleTimeLine();
    }
    if (play === true && range === maxTime - 1) {
      setPause(true);
    }
  }, 300);

  useInterval(() => {
    if (fast === true && range < maxTime) {
      setRange(parseInt(range) + 1);
      handleTimeLine();
    }
    if (fast === true && range === maxTime - 1) {
      setPause(true);
    }
  }, 100);

  return (
    <GameMappingContainer>
      <LeftSection>
        <GameListWrapper>
          <GameListNav>
            <span>{t("video.game.select")}</span>
            <p>{`${t("video.game.total")} ${gameListData?.length}${t(
              "video.game.total2"
            )}`}</p>
          </GameListNav>
          <GameLists
            side={side}
            setSide={setSide}
            gameListData={gameListData}
            gameId={gameId}
            setGameId={setGameId}
          />
        </GameListWrapper>
        <GetDataButton
          onClick={() => {
            fetchingMapData();
            setmapData([]);
            setRange(0);
            setFast(false);
            setPlay(false);
          }}
          isActive={filters.gameid}
        >
          {t("video.game.apply")}
        </GetDataButton>
      </LeftSection>
      <RightSection>
        <TimeLineContainer>
          {mapData?.map((time, idx) => {
            return (
              <ShowTimeLine key={idx} onClick={() => setRange(time.timestamp)}>
                <img src="Images/icon-clock.png" alt="" />
                <TimeMinSec>{`${Math.floor(time?.timestamp / 2 / 60)}${t(
                  "video.game.min"
                )} ${(time?.timestamp / 2) % 60}${t(
                  "video.game.sec"
                )}`}</TimeMinSec>
                <img
                  src={`Images/champion/${time?.killerChampion}.png`}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    marginRight: "4px",
                  }}
                  alt=""
                />
                <PlayerName color={time?.killerTeam === "blue"}>
                  {time?.killerName}
                </PlayerName>
                <TimeLineInfo>{time?.type}</TimeLineInfo>
                {time?.victimChampion ? (
                  <>
                    <img
                      src={`Images/champion/${time?.victimChampion}.png`}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        marginRight: "4px",
                      }}
                      alt=""
                    />
                    <PlayerName color={time?.victimTeam === "blue"}>
                      {time?.victimName}
                    </PlayerName>
                  </>
                ) : (
                  ""
                )}
              </ShowTimeLine>
            );
          })}
        </TimeLineContainer>
        <DeathZone>
          <span className="B">B</span>
          <DeathChampB></DeathChampB>
          <DeathChampB></DeathChampB>
          <DeathChampB></DeathChampB>
          <DeathChampB></DeathChampB>
          <DeathChampB></DeathChampB>
          <p>DEATH</p>
          <DeathChampR></DeathChampR>
          <DeathChampR></DeathChampR>
          <DeathChampR></DeathChampR>
          <DeathChampR></DeathChampR>
          <DeathChampR></DeathChampR>
          <span className="R">R</span>
        </DeathZone>
        {loading ? (
          <LoadingImg />
        ) : (
          <GameMap>
            {info?.map((info, idx) => {
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
                    var x =
                      ((Number(currentPos[range]?.player[i].x1) +
                        Number(currentPos[range]?.player[i].x2)) /
                        2 -
                        14) *
                      2.5;

                    var y =
                      ((Number(currentPos[range]?.player[i].y1) +
                        Number(currentPos[range]?.player[i].y2)) /
                        2 -
                        14) *
                      2.5;
                  } else {
                    if (currentPos[range]?.player[i].team === "red") {
                      if (currentPos[range]?.player[i].position === "top") {
                        x = 475;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "jng") {
                        x = 515;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "mid") {
                        x = 555;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "bot") {
                        x = 595;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "sup") {
                        x = 630;
                        y = -40;
                      }
                    } else {
                      if (currentPos[range]?.player[i].position === "top") {
                        x = 40;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "jng") {
                        x = 80;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "mid") {
                        x = 120;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "bot") {
                        x = 160;
                        y = -40;
                      }
                      if (currentPos[range]?.player[i].position === "sup") {
                        x = 200;
                        y = -40;
                      }
                    }
                  }
                }
              }

              return (
                // 동선 툴팁
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
          </GameMap>
        )}

        <RangeWrapper>
          <RangeInput
            min={minTime ? minTime?.realCount : 0}
            value={range}
            max={maxTime}
            id="rangeSlider"
            type="range"
            onChange={(e) => {
              setRange(e.target.value);
            }}
            onKeyPress={(e) => {
              setRange(e.target.value);
            }}
            step="1"
          />
          <TimeStamp>
            <span className="current">{`${Math.floor(range / 2 / 60)} : ${(
              (range / 2) %
              60
            ).toFixed(1)}`}</span>
            <p>/</p>
            {maxTime ? (
              <span className="max">{`${Math.floor(maxTime / 2 / 60)} : ${(maxTime / 2) % 60
                }`}</span>
            ) : (
              <span className="max">{`00 : 00`}</span>
            )}
          </TimeStamp>
        </RangeWrapper>

        <ButtonWrapper>
          {play === true || fast === true ? (
            play === true ? (
              <>
                <VodLink href={vod} target="_blank">
                  <img src="Images/btn-videolink.png" alt="img"></img>
                </VodLink>
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
                <VodLink href={vod} target="_blank">
                  <img src="Images/btn-videolink.png" alt="img"></img>
                </VodLink>
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
              <VodLink href={vod} target="_blank">
                <img src="Images/btn-videolink.png" alt="img"></img>
              </VodLink>
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
      </RightSection>
    </GameMappingContainer>
  );
}

export default GameMapping;

const StyledTippy = styled(Tippy)``;

const VodLink = styled.a`
  /* background-image: url("Images/btn-videolink.png"); */
`;

const PlayerInfo = styled.div``;

const GameMappingContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin-top: 22.5px;
`;

const LeftSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const RightSection = styled.section``;

const GameListWrapper = styled.div`
  padding: 22px 20px;
  width: 376px;
  /* height: 926px; */
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
  margin-bottom: 14px;
`;

const GameListNav = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.6px;
  > span {
    color: rgb(255, 255, 255);
    margin-right: 4px;
  }
  > p {
    color: rgb(129, 126, 144);
  }
`;

const GetDataButton = styled.button`
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

const TimeLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 700px;
  height: 152px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(35, 33, 42);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;

    border-radius: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(58, 55, 69);
    border-radius: 3px;
  }
`;

const ShowTimeLine = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  max-width: 70%;
  padding: 0 10px;
  height: 30px;
  border-radius: 2px;
  background-color: rgb(47, 45, 56);
`;

const TimeMinSec = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  line-height: 28px;
  text-align: left;
  color: rgb(107, 105, 121);
  margin: 0 10px 0 5px;
`;

const PlayerName = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.6px;
  text-align: left;
  color: rgb(240, 69, 69);
  ${(props) =>
    props.color &&
    css`
      color: rgb(0, 132, 216);
    `}
`;

const TimeLineInfo = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  line-height: 28px;
  margin: 0 8px;
  color: rgb(255, 255, 255);
`;

const DeathZone = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 52px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  > .B {
    font-family: Poppins;
    font-size: 12px;
    text-align: left;
    color: rgb(0, 117, 191);
  }
  > .R {
    font-family: Poppins;
    font-size: 12px;
    text-align: left;
    color: rgb(240, 69, 69);
  }
  > p {
    margin: 0 106px;
    font-family: Poppins;
    font-size: 12px;
    line-height: 40px;
    text-align: left;
    color: rgb(129, 126, 144);
  }
`;

const DeathChampB = styled.div`
  width: 29px;
  height: 29px;
  background-color: rgb(35, 33, 42);
  border-radius: 50%;
  margin-left: 10px;
`;

const DeathChampR = styled.div`
  width: 29px;
  height: 29px;
  background-color: rgb(35, 33, 42);
  border-radius: 50%;
  margin-right: 10px;
`;

const GameMap = styled.div`
  width: 700px;
  height: 700px;
  position: relative;
  background-image: url("Images/obj_map_summer.png");
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
  :nth-child(3) {
    margin-left: 10px;
  }
  :nth-child(2) {
    margin-left: 10px;
  }
`;
