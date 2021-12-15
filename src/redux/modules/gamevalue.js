export const SET_GAME_ID = "gamevalue/SET_GAME_ID";
export const SET_VOD_ID = "gamevalue/SET_VOD_ID";
export const SET_PLATFORM = "gamevalue/SET_PLATFORM";
export const SET_START_TIME = "gamevalue/SET_START_TIME";
export const SET_GAME_TIME = "gamevalue/SET_GAME_TIME";
export const SET_TIMER = "gamevalue/SET_TIMER";
export const SET_DETAIL_DATASET = "gamevalue/SET_DETAIL_DATASET";
export const INITIALIZE_GAME_STATE = "gamevalue/INITIALIZE_GAME_STATE";


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

export const InitializeGameState = (payload) => {
  return {
    type: INITIALIZE_GAME_STATE,
    payload,
  };
};

const initialState = {
  gameId: "",
  vodId: "", //"1136669396",
  platform: "", //"twitch",
  startTime: "", //"0h34m06s",
  gameTime: "", //"2200",
  timer: 0,
  detail: null
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
    case INITIALIZE_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
