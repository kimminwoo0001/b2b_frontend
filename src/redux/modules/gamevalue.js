export const SET_GAME_ID = "gamevalue/SET_GAME_ID"

export const SetGameId = (payload) => {
  return {
    type: SET_GAME_ID,
    payload
  }
}

const initialState = {
  gameId: ""
}

export default function GameReportReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState
      }
    case SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload
      }
    default:
      return state;
  }
} 