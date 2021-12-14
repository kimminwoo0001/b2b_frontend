export const SET_GAME_ID = "gamevalue/SET_GAME_ID";
export const SET_PLATFORM = "gamevalue/SET_PLATFORM";
export const INITIALIZE_GAME_STATE = "gamevalue/INITIALIZE_GAME_STATE";

export const SetGameId = (payload) => {
  return {
    type: SET_GAME_ID,
    payload,
  };
};

export const SetPlatform = (payload) => {
  return {
    type: SET_PLATFORM,
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
  platform: "",
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
    case SET_PLATFORM:
      return {
        ...state,
        platform: action.payload,
      };
    case INITIALIZE_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
