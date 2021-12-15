export const INITIALIZE_GAME_STATE = "gamevalue/INITIALIZE_GAME_STATE";
export const SET_GAME_ID = "gamevalue/SET_GAME_ID";
export const SET_VOD_ID = "gamevalue/SET_VOD_ID";
export const SET_PLATFORM = "gamevalue/SET_PLATFORM";
export const SET_START_TIME = "gamevalue/SET_START_TIME";
export const SET_GAME_TIME = "gamevalue/SET_GAME_TIME";
export const SET_TIMER = "gamevalue/SET_TIMER";
export const SET_DETAIL_DATASET = "gamevalue/SET_DETAIL_DATASET";
export const SET_PLATFORM_PLAYER = "gamevalue/SET_PLATFORM_PLAYER";

export const HANDLE_PLAYING = "gamevalue/HANDLE_PLAYING";
export const HANDLE_STOP = "gamevalue/SET_STOP";
export const HANDLE_VOLUME_CHANGE = "gamevalue/HANDLE_VOLUME_CHANGE";
export const HANDLE_PLAYBACK_RATE_CHANGE = "gamevalue/SET_PLAYBACK_RATE";
export const HANDLE_SEEK_MOUSE_DOWN = "gamevalue/HANDLE_SEEK_MOUSE_DOWN";
export const HANDLE_SEEK_MOUSE_UP = "gamevalue/HANDLE_SEEK_MOUSE_UP";
export const HANDLE_SEEK_CHANGE = "gamevalue/HANDLE_SEEK_CHANGE";
export const HANDLE_PROGRESS = "gamevalue/HANDLE_PROGRESS";
export const HANDLE_ENDED = "gamevalue/HANDLE_ENDED";
export const HANDLE_DURATION = "gamevalue/HANDLE_DURATION";
export const HANDLE_ENABLE_PIP = "gamevalue/HANDLE_ENABLE_PIP";
export const HANDLE_DISABLE_PIP = "gamevalue/HANDLE_DISABLE_PIP";

export const HANDLE_TOGGLE_CONTROLS = "gamevalue/SET_TOGGLE_CONTROLS";
export const HANDLE_TOGGLE_LIGHT = "gamevalue/SET_TOGGLE_LIGHT";
export const HANDLE_TOGGLE_LOOP = "gamevalue/SET_TOGGLE_LOOP";
export const HANDLE_TOGGLE_MUTED = "gamevalue/HANDLE_TOGGLE_MUTED";
export const HANDLE_TOGGLE_PIP = "gamevalue/HANDLE_TOGGLE_PIP";

export const SET_PLAYBACK_RATE = "gamevalue/SET_PLAYBACK_RATE";
export const SET_PLAY = "gamevalue/SET_PLAY";
export const SET_PAUSE = "gamevalue/SET_PAUSE";
export const SET_URL = "gamevalue/SET_URL";


export const InitializeGameState = (payload) => {
  return {
    type: INITIALIZE_GAME_STATE,
    payload,
  };
};

export const SetGameId = (payload) => {
  return {
    type: SET_GAME_ID,
    payload,
  };
};

export const SetVodId = (payload) => {
  return {
    type: SET_VOD_ID,
    payload,
  };
};

export const SetPlatform = (payload) => {
  return {
    type: SET_PLATFORM,
    payload,
  };
};

export const SetStartTime = (payload) => {
  return {
    type: SET_START_TIME,
    payload,
  };
};

export const SetGameTime = (payload) => {
  return {
    type: SET_GAME_TIME,
    payload,
  };
};

export const SetTimer = (payload) => {
  return {
    type: SET_TIMER,
    payload,
  };
};
export const SetDetailDataSet = (payload) => {
  return {
    type: SET_DETAIL_DATASET,
    payload,
  };
};
export const SetPlatformPlayer = (payload) => {
  return {
    type: SET_PLATFORM_PLAYER,
    payload,
  };
};

export const HandlePlaying = (payload) => {
  return {
    type: HANDLE_PLAYING,
    payload
  };
};
export const HandleStop = (payload) => {
  return {
    type: HANDLE_STOP,
    payload
  };
};
export const HandleVolumeChange = (payload) => {
  return {
    type: HANDLE_VOLUME_CHANGE,
    payload
  };
};
export const HandlePlaybackRateChange = (payload) => {
  return {
    type: HANDLE_PLAYBACK_RATE_CHANGE,
    payload
  };
};
export const HandleSeekMouseDown = (payload) => {
  return {
    type: HANDLE_SEEK_MOUSE_DOWN,
    payload
  };
};
export const HandleSeekMouseUp = (payload) => {
  return {
    type: HANDLE_SEEK_MOUSE_UP,
    payload
  };
};
export const HandleSeekChange = (payload) => {
  return {
    type: HANDLE_SEEK_CHANGE,
    payload
  };
};
export const HandleProgress = (payload) => {
  return {
    type: HANDLE_PROGRESS,
    payload
  };
};
export const HandleEnded = (payload) => {
  return {
    type: HANDLE_ENDED,
    payload
  };
};
export const HandleDuration = (payload) => {
  return {
    type: HANDLE_DURATION,
    payload
  };
};
export const HandleToggleControls = (payload) => {
  return {
    type: HANDLE_TOGGLE_CONTROLS,
    payload
  };
};
export const HandleToggleLight = (payload) => {
  return {
    type: HANDLE_TOGGLE_LIGHT,
    payload
  };
};
export const HandleToggleLoop = (payload) => {
  return {
    type: HANDLE_TOGGLE_LOOP,
    payload
  };
};
export const HandleToggleMuted = (payload) => {
  return {
    type: HANDLE_TOGGLE_MUTED,
    payload
  };
};
export const HandleTogglePip = (payload) => {
  return {
    type: HANDLE_TOGGLE_PIP,
    payload
  };
};

export const HandleEnablePip = (payload) => {
  return {
    type: HANDLE_ENABLE_PIP,
    payload
  };
};
export const HandledisablePip = (payload) => {
  return {
    type: HANDLE_DISABLE_PIP,
    payload
  };
};


export const SetPlayBackRate = (payload) => {
  return {
    type: SET_PLAYBACK_RATE,
    payload
  };
};

export const SetPlay = (payload) => {
  return {
    type: SET_PLAY,
    payload
  };
};
export const SetPause = (payload) => {
  return {
    type: SET_PAUSE,
    payload
  };
};
export const SetUrl = (payload) => {
  return {
    type: SET_URL,
    payload
  };
};




const initialState = {
  gameId: "",
  vodId: "", //"1136669396",
  platform: "", //"twitch",
  startTime: "", //"0h34m06s",
  gameTime: "", //"2200",
  timer: 0,
  detail: null,
  player: null,
  playing: true,
  controls: false,
  light: false,
  volume: 0.8,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
  url: ""
};
export default function GameReportReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState,
      };
    case SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload,
      };
    case SET_VOD_ID:
      return {
        ...state,
        vodId: action.payload,
      };
    case SET_PLATFORM:
      return {
        ...state,
        platform: action.payload,
      };
    case SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case SET_GAME_TIME:
      return {
        ...state,
        gameTime: action.payload,
      };
    case SET_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case SET_DETAIL_DATASET:
      return {
        ...state,
        detail: action.payload,
      }
    case SET_PLATFORM_PLAYER:
      return {
        ...state,
        player: action.payload,
      }
    case HANDLE_PLAYING:
      return {
        ...state,
        player: action.payload,
      }
    case HANDLE_STOP:
      return {
        ...state,
        url: null,
        playing: false,
      }
    case HANDLE_TOGGLE_CONTROLS:
      return {
        controls: action.payload,
      }
    case HANDLE_TOGGLE_LIGHT:
      return {
        ...state,
        light: action.payload,
      }
    case HANDLE_TOGGLE_LOOP:
      return {
        ...state,
        loop: action.payload,
      }
    case HANDLE_VOLUME_CHANGE:
      return {
        ...state,
        volume: action.payload,
      }
    case HANDLE_TOGGLE_MUTED:
      return {
        ...state,
        muted: action.payload,
      }
    case SET_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.payload,
      }
    case HANDLE_PLAYBACK_RATE_CHANGE:
      return {
        ...state,
        playbackRate: action.payload,
      }
    case HANDLE_TOGGLE_PIP:
      return {
        ...state,
        pip: action.payload,
      }
    case SET_PLAY:
      return {
        ...state,
        playing: true,
      }
    case HANDLE_ENABLE_PIP:
      return {
        ...state,
        pip: true,
      }
    case HANDLE_DISABLE_PIP:
      return {
        ...state,
        pip: false,
      }
    case SET_PAUSE:
      return {
        ...state,
        playing: false,
      }
    case HANDLE_SEEK_MOUSE_DOWN:
      return {
        ...state,
        seeking: true,
      }
    case HANDLE_SEEK_CHANGE:
      return {
        ...state,
        played: action.payload,
      }
    case HANDLE_SEEK_MOUSE_UP:
      return {
        ...state,
        seeking: false,
      }
    case HANDLE_PROGRESS:
      return {
        ...state,
        playedSeconds: action.payload.playedSeconds,
        played: action.payload.played
      };

    case HANDLE_ENDED:
      return {
        ...state,
        playing: action.payload,
      }
    case HANDLE_DURATION:
      return {
        ...state,
        duration: action.payload,
      }
    case SET_URL:
      return {
        ...state,
        url: action.payload,
        played: 0,
        loaded: 0,
        pip: false
      }
    case INITIALIZE_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
