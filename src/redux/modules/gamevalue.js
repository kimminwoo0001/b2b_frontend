export const INITIALIZE_GAME_STATE = "gamevalue/INITIALIZE_GAME_STATE";
export const SET_GAME_ID = "gamevalue/SET_GAME_ID";

export const SET_TIMER = "gamevalue/SET_TIMER";
export const SET_DETAIL_DATASET = "gamevalue/SET_DETAIL_DATASET";
export const SET_PLATFORM_PLAYER = "gamevalue/SET_PLATFORM_PLAYER";

export const SET_UNIQUE_ID = "gamevalue/SET_UNIQUE_ID";
export const SET_OPPSIDE = "gamevalue/SET_OPPSIDE";
export const SET_FIXED_DATASET = "gamevalue/SET_FIXED_DATASET";
export const SET_PLAYERS_DATASET = "gamevalue/SET_PLAYERS_DATASET";
export const SET_LOG_DATASET = "gamevalue/SET_LOG_DATASET";
export const SET_AUTO_DATASET = "gamevalue/SET_AUTO_DATASET";


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


export const SetUniqueId = (payload) => {
  return {
    type: SET_UNIQUE_ID,
    payload
  };
};
export const SetOppside = (payload) => {
  return {
    type: SET_OPPSIDE,
    payload
  };
};
export const SetFixedDataset = (payload) => {
  return {
    type: SET_FIXED_DATASET,
    payload
  };
}
export const SetPlayersDataset = (payload) => {
  return {
    type: SET_PLAYERS_DATASET,
    payload
  };
}
export const SetLogDataset = (payload) => {
  return {
    type: SET_LOG_DATASET,
    payload
  };
}
export const SetAutoDataset = (payload) => {
  return {
    type: SET_AUTO_DATASET,
    payload
  };
}

const initialState = {
  gameId: "",
  timer: 0,
  detail: null,
  player: null,
  uniqueId: "",
  fixedDataset: {},
  playerDataset: {},
  logDataset: {},
  autoDataset: {},
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

    case SET_UNIQUE_ID:
      return {
        ...state,
        uniqueId: action.payload,
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

    case SET_OPPSIDE:
      return {
        ...state,
        oppside: action.payload
      }
    case SET_FIXED_DATASET:
      return {
        ...state,
        fixedDataset: action.payload
      }
    case SET_PLAYERS_DATASET:
      return {
        ...state,
        playerDataset: action.payload
      }
    case SET_LOG_DATASET:
      return {
        ...state,
        logDataset: action.payload
      }
    case SET_AUTO_DATASET:
      return {
        ...state,
        fixedDataset: action.payload
      }
    case INITIALIZE_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
