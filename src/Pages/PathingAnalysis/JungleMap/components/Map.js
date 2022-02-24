/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { API } from '../../../config';
import axiosRequest from "../../../../lib/axios/axiosRequest";
import Tippy from "@tippy.js/react";
import ObjectTooltip from "../../ObjectMapping/ObjectTooltip";

import { SetModalInfo } from "../../../../redux/modules/modalvalue";
import {SetJunglePlayer, SetIsJungleMappingClicked, SetFilterData} from '../../../../redux/modules/junglevalue';
import { useTranslation } from "react-i18next";
import addZero from "../../../../lib/addZero";
import { initializedFalseValue } from "../../../../lib/initializedFalseValue";


function useIntervalFast(callback) {
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

const Map = ({position, setPosition}) => {
    const junglevalue = useSelector(state => state.JungleMapReducer);
    const user = useSelector((state) => state.UserReducer);
    const lang = useSelector((state) => state.LocaleReducer);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // mapping data 
    const [mappingPosition, setMappingPosition] = useState();
    const [mappingInfo, setMappingInfo] = useState();

    // range handling
    const [range, setRange] = useState(0);
    const [minTime, setMinTime] = useState();
    const [maxTime, setMaxTime] = useState();
    const [play, setPlay] = useState(false);
    const [playFast, setPlayFast] = useState(false);
    const [pause, setPause] = useState(false);

    const leagueArr =  Object.keys(junglevalue.league).filter(key => junglevalue.league[key] === true)
    const seasonArr =  Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true)
    const patchArr =  Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true)
  



  // mapping api
  const GetMappingInfo = () => {
    const selectedChamps = junglevalue.champion && Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true);
    const selectedOppChamps = junglevalue.oppchampion && Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true);
    const url = `${API}/lolapi/jungle/mapping`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      player: junglevalue.player,
      champion: selectedChamps,
      oppchampion: selectedOppChamps,
      side:"all",
      time:"all",
      position:['top','jng','mid','bot','sup'],
      gameid:junglevalue.gameid[0],
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function(e) {
      if(e.position.length !== 0) {
        setMinTime(e?.position[0].realCount? e?.position[0].realCount : 0)
        setMaxTime(e?.position.length - 1);
        setMappingPosition(e.position);
        setMappingInfo(e.info)
        dispatch(SetIsJungleMappingClicked(false));
      }
     
    }, function (objStore) {
      dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  }


  
  useIntervalNormal(() => {
    if(play === true && range < maxTime) {
      setRange(parseInt(range) + 1);
    }
  },300)


  useIntervalFast(() => {
    if(playFast === true && range < maxTime) {
      setRange(parseInt(range) + 1);
    }
  },100)

  // mapping api 호출
  useEffect(() => {
    if(junglevalue.oppchampion && 
        Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key]=== true).length === 0 
        || !junglevalue.isMappingClicked) {
      return;
    }
    GetMappingInfo();
  },[junglevalue.isMappingClicked])


    return (
        <SMapContainer>
            <SWardPathingMap>
            {mappingInfo?.filter(info => position &&  Object.keys(position).filter(key => position[key] === true).includes(info.position)).map((info,idx) => {
              let x; 
              let y;
              if(range === 0) {
                if(info.side === "red") {
                  x = 630;
                  y = 45;
                }else {
                  x = 45;
                  y = 640;
                }
              }else {
                for(let i = 0; i < mappingPosition[range]?.player?.length; i++) {
                  if(
                    `mapping ${info.gameid} ${info.side} ${info.position}` ===
                    `mapping ${mappingPosition[range]?.player[i].gameid} ${mappingPosition[range]?.player[i].team} ${mappingPosition[range]?.player[i].position}`
                  ) {
                    if(
                    Number(mappingPosition[range]?.player[i].x1) - 
                    Number(mappingPosition[range]?.player[i].x2)!== 0 && 
                    Number(mappingPosition[range]?.player[i].y1) - 
                    Number(mappingPosition[range]?.player[i].y2)!== 0
                    ) {
                      x = 
                      ((Number(mappingPosition[range]?.player[i].x1) +
                       Number(mappingPosition[range]?.player[i].x2)) 
                       / 2 - 14.5) 
                       * 2.5;

                      y = 
                      ((Number(mappingPosition[range]?.player[i].y1) + 
                      Number(mappingPosition[range]?.player[i].y2)) 
                      / 2 - 14.5) 
                      * 2.5;
                    }else {

                    }
                  }
                }
              }
              return (
                <StyledTippy
                // options
                arrow={true}
                duration={0}
                delay={[0, 0]}
                trigger="click"
                content={
                  <ObjectTooltip
                    champion={info.champions}
                    side={info.side}
                    gameid={info.gameid}
                    position={info.position}
                    player={info.player}
                    result={info.win}
                    oppteam={info.opp_team}
                    oppchampion={info.opp_champions}
                  />
                }
                placement="top"
                key={idx}
              >
                  <PlayerInfo
                  className={`mapping ${info.gameid} ${info.side} ${info.position}`}
                  style={{
                    top: `${y}px`,
                    left: `${x}px`,
                    height: "30px",
                    width: "30px",
                    transition: "all 0.25s ease-out 0s",
                    backgroundImage: `url(Images/champion/${info.champions}.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    borderRadius: "50%",
                    border: `1px solid ${info.side}`,
                  }}></PlayerInfo>
                </StyledTippy>

              )
            })}
            </SWardPathingMap>
            <RangeWrapper>
              {play || playFast? (
                  <img src="Images/btn_stop.svg" alt="stopBtn" 
                  onClick={() => {
                    setPlay(false);
                    setPlayFast(false);
                    setPause(true);
                  }}/>
                ): (
                  <>
                  <img src="Images/btn_play.svg" alt="playBtn" 
                  onClick={() => {
                    setPlay(true);
                    setPause(false);
                  }}/>
                 <img src="Images/pre_2.svg" alt="playFastBtn" 
                  onClick={() => {
                   setPlayFast(true);
                   setPause(false);
                   }}/>
                   </>
              )}
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
                    <span className="max">{'15 : 00'}</span>
                  ) : (
                    <span className="max">{`00 : 00`}</span>
                  )}
                </TimeStamp>
            </RangeWrapper>
        </SMapContainer>
    );
};

export default Map;

const SMapContainer = styled.section`
width: 700px;
`;

const SWardPathingMap = styled.div`
  background-image: url("Images/obj_map_summer.png");
  position: relative;
  width: 700px;
  height: 700px;
`;





///////////////////// 
const StyledTippy = styled(Tippy)``;

const PlayerInfo = styled.div`
position: absolute;
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
  width: 150px;
  height: 17px;
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: normal;
  color: #6b6979;
  p {
    margin: 0 4px 0 4px;
  }
  > .current {
    width: 45%;
    color: rgb(240, 69, 69);
    text-align: right;
  }
  > .max {
    width: 55px;
    color: #6b6979;
  }
`;
