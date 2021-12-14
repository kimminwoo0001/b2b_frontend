import react, { useRef, useEffect, useState } from 'react';
import { TwitchEmbed, TwitchPlayer } from 'react-twitch-embed';
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import twitchTimeToMilliSec from '../../lib/twitchTimeToMilliSec';
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

let currentTime = 0;


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

const TwitchVideoPlayer = ({ video, startTime }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const twitchPlayer = useRef(null);
  const [range, setRange] = useState(0);
  const [minTime, setMinTime] = useState();
  const [maxTime, setMaxTime] = useState();
  const { t } = useTranslation();
  const [play, setPlay] = useState(false);
  const [fast, setFast] = useState(false);
  const [pause, setPause] = useState(false);
  let timerId = null;

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setRange(newValue);
  };

  function timerStart(time) {
    currentTime = time * 2;
    timerId = setInterval(() => {
      currentTime += 1;

      let t = currentTime / 2;
      let h = Math.floor(t / 3600);
      let m = Math.floor((t % 3600) / 60);
      let s = Math.floor((t % 3600) % 60);
      console.log(`${h}h ${m}m ${s}s`);

    }, 500);
  }

  useIntervalNormal(() => {
    if (play === true && range < maxTime) {
      setRange(parseInt(range) + 1);
      //handleTimeLine();
    }
    if (play === true && range === maxTime - 1) {
      setPause(true);
    }
  }, 300);

  useInterval(() => {
    if (fast === true && range < maxTime) {
      setRange(parseInt(range) + 1);
      // handleTimeLine();
    }
    if (fast === true && range === maxTime - 1) {
      setPause(true);
    }
  }, 100);

  useEffect(() => {

  })

  return (
    <TwtichVideoContainer>
      <TwitchPlayer
        ref={twitchPlayer}
        time={gamevalue.startTime}
        video={gamevalue.gameId}
        id="player"
        width="1440px"
        height="800px"
        hideControls={false} // 컨트롤 UI 숨김
        theme="dark"
        onPlay={() => {
          // 중지를 해제한 시점
          console.log("일시 중지를 해제한 시점")
        }}
        onPlaying={() => {
          // 영상이 시작한 시점
          console.log("영상이 시작한 시점");
          timerStart(twitchTimeToMilliSec(gamevalue.startTime) + gamevalue.timer)

        }}
        onPause={() => {
          clearInterval()
          console.log("일시 중지된 시점")
        }}
        onReady={() => {
          console.log("준비를 마친 시점")
        }}
      />
      <div className='time-bar'>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='line-bar'>
          <div className='time-text-box'>
            <span>00:00 / 37:00</span>
          </div>
          <Sliders
            min={0}
            value={range}
            max={gamevalue.gameTime * 2}
            id="rangeSlider"
            type="range"
            onChange={handleChange}
            onKeyPress={handleChange}
            //valueLabelDisplay="on"
            aria-labelledby="range-slider"
          />
        </div>
      </div>
    </TwtichVideoContainer>
  );
}

export default TwitchVideoPlayer;

const TwtichVideoContainer = styled.div`
  width:1440px;
  height:800px;
  position: relative;

  .time-bar {
    position: absolute;
    width: 1440px;
    height: 67px;
    padding-bottom: 17px;
    padding-left: 20px;
    background-color: #33f;
    bottom: 0;
    display: flex;

    .icon-bar {
      width: 50px;
      height: 50px;
      object-fit: contain;
      background-color: #3f0;
    }

    .line-bar {
      width: 1069px;
      height: 17px;
      margin: 20px 0 13px 20px;
      display: flex;

      .time-text-box {
        width: 79px;
        height: 17px;
        margin: 0 10px 0 0;

        span {
          font-family: SpoqaHanSansNeo;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.3;
          letter-spacing: normal;
          text-align: left;
          color: #fff;
        }
      }
    }
  }
`;


const Sliders = withStyles({
  root: {
    color: "#5942ba",
    height: 2,
    width: 1000,
    marginTop: -6
  },
  thumb: {
    height: 13,
    width: 13,
    backgroundColor: "#817e90",
    border: "1px solid #817e90",
    marginTop: -3,
    marginLeft: -7,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50%)",
    top: -30,
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    backgroundColor: "#433f4e",
    borderRadius: 4,
  },
})(Slider);



