import react, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import ReactPlayer from 'react-player'
import twitchTimeToMilliSec from '../../lib/twitchTimeToMilliSec';
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { HandledisablePip, HandleDuration, HandleEnablePip, handleEnablePip, HandleEnded, HandlePlaybackRateChange, HandlePlaying, HandleProgress, HandleSeekChange, HandleSeekMouseDown, HandleSeekMouseUp, HandleStop, HandleToggleControls, HandleToggleLight, HandleToggleLoop, HandleToggleMuted, HandleTogglePip, HandleVolumeChange, SetPause, SetPlay, SetPlayBackRate, SetPlayRate, SetUrl } from '../../redux/modules/gamevalue';


const TwitchVideoPlayer = ({ video, startTime }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const dispatch = useDispatch();
  let player;
  //const twitchPlayer = useRef(null);
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
    //currentTime = time * 2;
    timerId = setInterval(() => {

    }, 1000);
  }

  const load = url => {
    dispatch(SetUrl(url));
    // this.setState({
    //   url,
    //   played: 0,
    //   loaded: 0,
    //   pip: false
    // })
  }

  const handlePlayPause = () => {
    dispatch(HandlePlaying(gamevalue.playing))
    //this.setState({ playing: !gamevalue.playing })
  }

  const handleStop = () => {
    dispatch(HandleStop())
    //this.setState({ url: null, playing: false })
  }

  const handleToggleControls = () => {
    dispatch(HandleToggleControls(!gamevalue.controls))
      .then(() => load(gamevalue.url))
    // const url = gamevalue.url
    // this.setState({
    //   controls: !gamevalue.controls,
    //   url: null
    // }, () => this.load(url))
  }

  const handleToggleLight = () => {
    dispatch(HandleToggleLight(!gamevalue.light))
    //this.setState({ light: !gamevalue.light })
  }

  const handleToggleLoop = () => {
    dispatch(HandleToggleLoop(!gamevalue.loop))
    //this.setState({ loop: !gamevalue.loop })
  }

  const handleVolumeChange = e => {
    dispatch(HandleVolumeChange(parseFloat(e.target.value)))
    //this.setState({ volume: parseFloat(e.target.value) })
  }

  const handleToggleMuted = () => {
    dispatch(HandleToggleMuted(!gamevalue.muted))
    //this.setState({ muted: !gamevalue.muted })
  }

  const handleSetPlaybackRate = e => {
    dispatch(SetPlayBackRate(parseFloat(e.target.value)))
    //this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  const handleOnPlaybackRateChange = (speed) => {
    dispatch(HandlePlaybackRateChange(parseFloat(speed)))
    //this.setState({ playbackRate: parseFloat(speed) })
  }

  const handleTogglePIP = () => {
    dispatch(HandleTogglePip(!gamevalue.pip))
    //this.setState({ pip: !gamevalue.pip })
  }

  const handlePlay = () => {
    console.log('onPlay')
    dispatch(SetPlay())
    //this.setState({ playing: true })
  }

  const handleEnablePIP = () => {
    console.log('onEnablePIP')
    dispatch(HandleEnablePip())
    //this.setState({ pip: true })
  }

  const handleDisablePIP = () => {
    console.log('onDisablePIP')
    dispatch(HandledisablePip());
    //this.setState({ pip: false })
  }

  const handlePause = () => {
    console.log('onPause')
    dispatch(SetPause())
    //this.setState({ playing: false })
  }

  const handleSeekMouseDown = e => {
    dispatch(HandleSeekMouseDown())
    //this.setState({ seeking: true })
  }

  const handleSeekChange = e => {
    dispatch(HandleSeekChange(parseFloat(e.target.value)))
    //this.setState({ played: parseFloat(e.target.value) })
  }

  const handleSeekMouseUp = e => {
    dispatch(HandleSeekMouseUp())
    //this.setState({ seeking: false })
    player.seekTo(parseFloat(e.target.value))
  }

  const handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!gamevalue.seeking) {
      dispatch(HandleProgress(state))
      //this.setState(state)
    }
  }

  const handleEnded = () => {
    console.log('onEnded')
    dispatch(HandleEnded(gamevalue.loop))
    //this.setState({ playing: gamevalue.loop })
  }

  const handleDuration = (duration) => {
    console.log('onDuration', duration)
    dispatch(HandleDuration(duration));
    //this.setState({ duration })
  }

  const ref = newPlayer => {
    player = newPlayer;
  }

  useEffect(() => {
    //twitchPlayer(gamevalue);
  }, [])

  return (
    <TwtichVideoContainer>
      <ReactPlayer
        url='https://www.twitch.tv/videos/1136669396?t=0h45m23s'
        width="1440px"
        height="800px"
        ref={ref}
        className='react-player'
        playing={gamevalue.playing}
        controls={gamevalue.controls}
        light={gamevalue.light}
        loop={gamevalue.loop}
        playbackRate={gamevalue.playbackRate}
        volume={gamevalue.volume}
        muted={gamevalue.muted}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        onEnablePIP={handleEnablePIP}
        onDisablePIP={handleDisablePIP}
        onPause={handlePause}
        onBuffer={() => console.log('onBuffer')}
        onPlaybackRateChange={handleOnPlaybackRateChange}
        onSeek={e => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={e => console.log('onError', e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      {/* ref={twitchPlayer}
        time={gamevalue.startTime}
        video={gamevalue.vodId}
        id="player"
        width="1440px"
        height="800px"
        hideControls={false} // 컨트롤 UI 숨김
        theme="dark"
        // onPlay={() => {
        //   // 중지를 해제한 시점
        //   console.log("일시 중지를 해제한 시점")
        // }}
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
      /> */}
      <div className='time-bar'>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='icon-bar'>
          <button onClick={handlePlayPause}>{gamevalue.playing ? 'Pause' : 'Play'}</button>
        </div>
        <div className='icon-bar'></div>
        <div className='icon-bar'></div>
        <div className='icon-bar'>
          <input type='range' min={0} max={1} step='any' value={gamevalue.volume} onChange={handleVolumeChange} />
        </div>
        <div className='line-bar'>
          <div className='time-text-box'>
            <span>00:00 / 37:00</span>
          </div>
          <input
            className='game-time-bar'
            type='range' min={0} max={0.999999} step='any'
            value={gamevalue.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
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
      .game-time-bar {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        margin-top: 6px;
        width: 90%; /* Full-width */
        height:6px; /* Specified height */
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;

        ::-webkit-slider-thumb {
          -webkit-appearance: none; /* Override default look */
          appearance: none;
          width: 25px; /* Set a specific slider handle width */
          height: 6px; /* Slider handle height */
          background: #04AA6D; /* Green background */
          cursor: pointer; /* Cursor on hover */
        }

        ::-webkit-slider-runnable-track {
          height: 6px;
          -webkit-appearance: none;
          color: #13bba4;
          margin-top: -1px;
        }

        ::-moz-range-thumb {
          width: 25px; /* Set a specific slider handle width */
          height: 6px; /* Slider handle height */
          background: #04AA6D; /* Green background */
          cursor: pointer; /* Cursor on hover */
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



