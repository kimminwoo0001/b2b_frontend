import react, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import ReactPlayer from 'react-player'
import twitchTimeToMilliSec from '../../lib/twitchTimeToMilliSec';
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { HandledisablePip, HandleDuration, HandleEnablePip, HandleEnded, HandlePlaybackRateChange, HandlePlaying, HandleProgress, HandleSeekChange, HandleSeekMouseDown, HandleSeekMouseUp, HandleStop, HandleToggleControls, HandleToggleLight, HandleToggleLoop, HandleToggleMuted, HandleTogglePip, HandleVolumeChange, SetPause, SetPlay, SetPlayBackRate, SetUrl } from '../../redux/modules/videovalue';
import secToMS from '../../lib/secToMS';
import { SetCurrentItemIdxActiveIdx, SetEventLogActiveIdx, SetLiveActiveIdx, SetGoldActiveIdx, SetStatusLogActiveIdx } from '../../redux/modules/gamevalue';


const VideoPlayer = ({ video, startTime }) => {
  const videovalue = useSelector((state) => state.VideoReducer);
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const [seekTime, setSeekTime] = useState(0)
  const dispatch = useDispatch();

  // video option
  let player;
  const endTime = +gamevalue.startTime + +gamevalue.gameTime;
  const startPlayed = +gamevalue.startTime / +videovalue.duration;
  const sec5 = 5;
  const sec30 = 30;
  const currentTime = Math.floor(
    videovalue.playedSeconds - +gamevalue.startTime
  );
  const curTime = currentTime < 0 ? 0 : currentTime;

  // log option
  const eventLogDataset = gamevalue.logDataset.event;
  const currentItemDataset =
    gamevalue.playerDataset[gamevalue.selectedParticipant].currentItem;
  const liveDataset = gamevalue.liveDataset;
  const goldDataset = gamevalue.teamGoldDataset;
  const statusLogDataset = gamevalue.statusLogDataset;

  const datasets = [eventLogDataset, currentItemDataset, liveDataset, goldDataset, statusLogDataset];


  const load = url => {
    dispatch(SetUrl(url));
  }

  const handlePlayPause = () => {
    dispatch(HandlePlaying(videovalue.playing))
    //this.setState({ playing: !videovalue.playing })
  }

  const handleStop = () => {
    dispatch(HandleStop())
    //this.setState({ url: null, playing: false })
  }

  const handleToggleControls = () => {
    dispatch(HandleToggleControls(!videovalue.controls))
      .then(() => load(videovalue.url))
  }

  const handleToggleLight = () => {
    dispatch(HandleToggleLight(!videovalue.light))
    //this.setState({ light: !videovalue.light })
  }

  const handleToggleLoop = () => {
    dispatch(HandleToggleLoop(!videovalue.loop))
    //this.setState({ loop: !videovalue.loop })
  }

  const handleVolumeChange = e => {
    dispatch(HandleVolumeChange(parseFloat(e.target.value)))
    //this.setState({ volume: parseFloat(e.target.value) })
  }

  const handleToggleMuted = () => {
    dispatch(HandleToggleMuted())
    //this.setState({ muted: !videovalue.muted })
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
    dispatch(HandleTogglePip(!videovalue.pip))
    //this.setState({ pip: !videovalue.pip })
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
    const movePlayed = (parseFloat(+videovalue.playedSeconds) + move) / videovalue.duration;
    dispatch(HandleSeekChange(movePlayed))
    dispatch(HandleSeekMouseUp())
    player.seekTo(movePlayed)
  }

  const handleSeekMouseUp = e => {
    dispatch(HandleSeekMouseUp())
    //this.setState({ seeking: false })
    //console.log("handleSeekMouseUp", parseFloat(seekTime))
    player.seekTo(parseFloat(seekTime))
    //player.seekTo(parseFloat(videovalue.playedSeconds))
  }

  const handleProgress = state => {
    const logIdx = gamevalue.eventLogActiveIdx;
    const itemIdx = gamevalue.itemActiveIdx;
    const liveIdx = gamevalue.liveActiveIdx;
    const goldIdx = gamevalue.goldActiveIdx;
    const Idxs = [logIdx, itemIdx, liveIdx, goldIdx];

    let checkDatasetIdx = 0;
    let checkIdx = 0;
    // 총 게임 시간 넘어가면 자동으로 멈춤 
    if (state.playedSeconds > endTime) {
      dispatch(SetPause());
    }
    // 이벤트 로그 Idx
    try {
      Idxs.map((value, datasetIdx) => {
        checkDatasetIdx = datasetIdx;
        checkIdx = value;
        let timer = datasetIdx === 2 ? curTime / 2 : curTime;

        if (datasets[datasetIdx][value === datasets[datasetIdx].length ? value - 1 : value].realCount / 2 < timer) { // 현재 인덱스 보다 큰 것들 중에서 찾기
          let eventIdx = value;
          let result = 0;
          for (let idx of datasets[datasetIdx].slice(value).keys()) {
            idx += checkIdx;
            if (
              datasets[datasetIdx].length !== idx + 1 &&
              datasets[datasetIdx][idx].realCount / 2 <= timer
            ) {
              result = idx + 1;
              if (datasets[datasetIdx][result === datasets[datasetIdx].length ? result - 1 : result].realCount / 2 < timer) {
                continue;
              }
              if (datasets[datasetIdx][result].realCount / 2 >= timer) {
                result = result - 1;
              }
            } else if (
              datasets[datasetIdx].length !== idx + 1 &&
              datasets[datasetIdx][idx].realCount / 2 > timer
            ) {
              result = idx - 1;
              if (datasets[datasetIdx][idx + 1].realCount / 2 > timer) {
                // 더할 필요 없는 경우 브레이크 
                break;
              }
            }
            if (result !== eventIdx) {
              console.log("Event Idx:", idx);
              if (result > eventIdx) {
                switch (datasetIdx) {
                  case 0:
                    dispatch(SetEventLogActiveIdx(result));
                    break;
                  case 1:
                    dispatch(SetCurrentItemIdxActiveIdx(result));
                    break;
                  case 2:
                    dispatch(SetLiveActiveIdx(result));
                    break
                  case 3:
                    dispatch(SetGoldActiveIdx(result));
                    break;
                  case 4:
                    dispatch(SetStatusLogActiveIdx(result));
                    break;
                  default:
                    break;
                }
                console.log("result1 : ", result);
                break;
              }
            }
          }
        } else if (datasets[datasetIdx][value - 1 < 0 ? 0 : value].realCount / 2 >= timer) {
          let eventIdx = value;
          let result = 0;

          for (let idx of datasets[datasetIdx].slice(0, value).keys()) {
            if (
              eventIdx - 1 >= 0 &&
              datasets[datasetIdx][eventIdx].realCount / 2 > timer
            ) {
              eventIdx = eventIdx - 1;
              if (datasets[datasetIdx][eventIdx === 0 ? 0 : eventIdx].realCount / 2 > timer) {
                continue;
              }
            } else if (
              eventIdx - 1 >= 0 &&
              datasets[datasetIdx][eventIdx].realCount / 2 > timer
            ) {
              eventIdx = eventIdx === 0 ? 0 : eventIdx - 1;
              if (datasets[datasetIdx][eventIdx].realCount / 2 < timer) {
                // 더할 필요 없는 경우 브레이크 
                break;
              }
            }
            if (value !== eventIdx) {
              console.log("Event Idx:", idx);
              result = eventIdx;
              if (value > eventIdx) {
                switch (datasetIdx) {
                  case 0:
                    dispatch(SetEventLogActiveIdx(result));
                    break;
                  case 1:
                    dispatch(SetCurrentItemIdxActiveIdx(result));
                    break;
                  case 2:
                    dispatch(SetLiveActiveIdx(result));
                    break
                  case 3:
                    dispatch(SetGoldActiveIdx(result));
                    break;
                  case 4:
                    dispatch(SetStatusLogActiveIdx(result));
                    break;
                  default:
                    break;
                }
                console.log("result1 : ", result);
                break;
              }
              break;
            }
          }
          //} else if (logIdx !== 1 && datasets[datasetIdx][logIdx - 1 < 0 ? 0 : logIdx - 1].realCount / 2 < curTime) {
        } else if (datasets[datasetIdx][1].realCount / 2 > timer) {
          const result = 0;
          switch (datasetIdx) {
            case 0:
              dispatch(SetEventLogActiveIdx(result));
              break;
            case 1:
              dispatch(SetCurrentItemIdxActiveIdx(result));
              break;
            case 2:
              dispatch(SetLiveActiveIdx(result));
              break
            case 3:
              dispatch(SetGoldActiveIdx(result));
              break;
            case 4:
              dispatch(SetStatusLogActiveIdx(result));
              break;
            default:
              break;
          }
        }
      })
    } catch (e) {
      console.log("checkDatasetIdx: ", checkDatasetIdx);
      console.log("checkIdx: ", checkIdx);
      console.log("ERROR : ", e);
    }
    if (!videovalue.seeking) {
      dispatch(HandleProgress(state))
      //this.setState(state)
    }
  }

  const handleEnded = () => {
    console.log('onEnded')
    dispatch(HandleEnded(videovalue.loop))
    //this.setState({ playing: videovalue.loop })
  }

  const handleDuration = (duration) => {
    dispatch(HandleDuration(duration));
    //this.setState({ duration })
  }

  const ref = newPlayer => {
    player = newPlayer;
  }

  useEffect(() => {
    //twitchPlayer(videovalue);
  }, [])

  return (
    <TwtichVideoContainer>
      <ReactPlayer
        url={videovalue.vodUrl}
        width="1440px"
        height="800px"
        ref={ref}
        className='react-player'
        playing={videovalue.playing}
        controls={videovalue.controls}
        light={videovalue.light}
        loop={videovalue.loop}
        playbackRate={videovalue.playbackRate}
        volume={videovalue.volume}
        muted={videovalue.muted}
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
        <img className='icon' onClick={handlePlayPause} src={videovalue.playing ? 'Images/btn_stop.svg' : 'Images/btn_play.svg'} alt='' />
        <img className='icon' onClick={() => {
          handleSeekMove(+sec5)
        }} src='Images/pre_5.svg' alt='' />
        <img className='icon' onClick={() => {
          handleSeekMove(+sec30)
        }} src='Images/pre_30.svg' alt='' />
        <div className='volume-box'>
          <img className='icon' onClick={handleToggleMuted} src={videovalue.volume === 0 || videovalue.muted ? 'Images/btn_vol-x.svg' : 'Images/btn_vol-1.svg'} alt='' />
          <input className='volume' type='range' min={0} max={1} step='any' value={videovalue.volume} onChange={handleVolumeChange} />
        </div>
        <div className='line-bar'>
          <div className='time-text-box'>
            <span>{secToMS(Math.floor(+videovalue.playedSeconds) - +gamevalue.startTime)} / {secToMS(gamevalue.gameTime)}</span>
          </div>
          <input
            className='game-time-bar'
            type='range' min={startPlayed} max={(endTime) / +videovalue.duration} step='any'
            value={(+videovalue.playedSeconds - +gamevalue.startTime) / videovalue.duration + startPlayed}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </div>
      </div>
    </TwtichVideoContainer >
  );
}

export default VideoPlayer;

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





