import react, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import ReactPlayer from 'react-player'
import twitchTimeToMilliSec from '../../lib/twitchTimeToMilliSec';
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { HandledisablePip, HandleDuration, HandleEnablePip, handleEnablePip, HandleEnded, HandlePlaybackRateChange, HandlePlaying, HandleProgress, HandleSeekChange, HandleSeekMouseDown, HandleSeekMouseUp, HandleStop, HandleToggleControls, HandleToggleLight, HandleToggleLoop, HandleToggleMuted, HandleTogglePip, HandleVolumeChange, SetPause, SetPlay, SetPlayBackRate, SetPlayRate, SetUrl, SET_PAUSE } from '../../redux/modules/gamevalue';
import secToMS from '../../lib/secToMS';


const TwitchVideoPlayer = ({ video, startTime }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const [seekTime, setSeekTime] = useState(0)
  const dispatch = useDispatch();
  let player;
  const endTime = +gamevalue.startTime + +gamevalue.gameTime;
  const startPlayed = +gamevalue.startTime / +gamevalue.duration;
  const sec5 = 5;
  const sec30 = 30;

  const load = url => {
    dispatch(SetUrl(url));
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
    dispatch(HandleToggleMuted())
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
    //console.log("handleSeekChange", parseFloat(e.target.value))
    setSeekTime(parseFloat(e.target.value));
    dispatch(HandleSeekChange(parseFloat(e.target.value)))
    //this.setState({ played: parseFloat(e.target.value) })
  }

  const handleSeekMove = (move) => {
    handleSeekMouseDown();
    const movePlayed = (parseFloat(+gamevalue.playedSeconds) + move) / gamevalue.duration;
    dispatch(HandleSeekChange(movePlayed))
    dispatch(HandleSeekMouseUp())
    player.seekTo(movePlayed)
  }

  const handleSeekMouseUp = e => {
    dispatch(HandleSeekMouseUp())
    //this.setState({ seeking: false })
    //console.log("handleSeekMouseUp", parseFloat(seekTime))
    player.seekTo(parseFloat(seekTime))
    //player.seekTo(parseFloat(gamevalue.playedSeconds))
  }

  const handleProgress = state => {
    //console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking

    // 총 게임 시간 넘어가면 자동으로 멈춤 
    if (state.playedSeconds > endTime) {
      dispatch(SetPause());
    }
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
        url={gamevalue.vodUrl}
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
        progressInterval={500}
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
      <div className='time-bar'>
        <img className='icon' onClick={() => {
          handleSeekMove(-sec30)
        }} src='Images/back_30.svg' alt='' />
        <img className='icon' onClick={() => {
          handleSeekMove(-sec5)
        }} src='Images/back_5.svg' alt='' />
        <img className='icon' onClick={handlePlayPause} src={gamevalue.playing ? 'Images/btn_stop.svg' : 'Images/btn_play.svg'} alt='' />
        <img className='icon' onClick={() => {
          handleSeekMove(+sec5)
        }} src='Images/pre_5.svg' alt='' />
        <img className='icon' onClick={() => {
          handleSeekMove(+sec30)
        }} src='Images/pre_30.svg' alt='' />
        <div className='volume-box'>
          <img className='icon' onClick={handleToggleMuted} src={gamevalue.volume === 0 || gamevalue.muted ? 'Images/btn_vol-x.svg' : 'Images/btn_vol-1.svg'} alt='' />
          <input className='volume' type='range' min={0} max={1} step='any' value={gamevalue.volume} onChange={handleVolumeChange} />
        </div>
        <div className='line-bar'>
          <div className='time-text-box'>
            <span>{secToMS(Math.floor(+gamevalue.playedSeconds) - +gamevalue.startTime)} / {secToMS(gamevalue.gameTime)}</span>
          </div>
          <input
            className='game-time-bar'
            type='range' min={startPlayed} max={(endTime) / +gamevalue.duration} step='any'
            value={(+gamevalue.playedSeconds - +gamevalue.startTime) / gamevalue.duration + startPlayed}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </div>
      </div>
    </TwtichVideoContainer >
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
    bottom: 0;
    display: flex;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.74));

    .icon {
      width: 50px;
      height: 50px;
      object-fit: contain;
      cursor: pointer;
    }

    .volume-box {
      position: relative;
      .volume {
        display: none;
        height: 60px;
      }

      :hover {
        .volume {
          display: block;
          position: absolute;
          top: -55px;
          left: -40px;
          writing-mode: bt-lr; /* IE */
          -webkit-appearance: slider-vertical; /* WebKit */
        }
      }
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
        border-radius: 10px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        ::-webkit-slider-thumb {
          -webkit-appearance: none; /* Override default look */
          appearance: none;
          width: 25px; /* Set a specific slider handle width */
          height: 6px; /* Slider handle height */
          background: #5942ba; /* Green background */
          box-shadow: -100vw 0 0 100vw #5942ba;
          cursor: pointer; /* Cursor on hover */
        }

        ::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          animate: 0.2s;
          background: #3a3745;
        }

        ::-moz-range-thumb {
          width: 25px; /* Set a specific slider handle width */
          height: 6px; /* Slider handle height */
          background: #5942ba; /* Green background */
          cursor: pointer; /* Cursor on hover */
        }
      }
    }
  }
`;




