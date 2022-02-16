export const JUNGLE_INIT = "junglevalue/Jungle_INIT"
export const SET_FILTER_DATA = "junglevalue/SET_FILTER_DATA";
export const SET_JUNGLE_PLAYER ="junglevalue/SET_JUNGLE_PLAYER";
export const SET_OPP_JUNGLE_PLAYER ="junglevalue/SET_OPP_JUNGLE_PLAYER";
export const SET_CHAMP = "junglevalue/SET_CHAMP";
export const SET_OPP_CHAMP = "junglevalue/SET_OPP_CHAMP";


export const JungleInit = () => {
  return {
    type: JUNGLE_INIT,
  };
}
export const SetFilterData = (payload) => {
  return {
    type: SET_FILTER_DATA,
    payload
  };
}

export const SetJunglePlayer = (payload) => {
  return {
    type: SET_JUNGLE_PLAYER,
    payload
  };
}

export const SetChamp = (payload) => {
  return {
    type: SET_CHAMP,
    payload
  };
}

export const SetOppChamp = (payload) => {
  return {
    type: SET_OPP_CHAMP,
    payload
  };
}

const initialState = {
    year: [],
    league: {},
    season: {},
    team: [],
    patch: {},
    player:"",
    champion:{},
    oppchampion:{}
  }

export default function JungleMapReducer(state = initialState, action) {
  switch (action.type) {
    case JUNGLE_INIT:
      return initialState
    case SET_FILTER_DATA:
      return  action.payload
    case SET_JUNGLE_PLAYER:
      return {
         ...state,
         player: action.payload
      }
    case SET_CHAMP:
      return  action.payload
    case SET_OPP_CHAMP:
        return action.payload
    default:
      return state;
  }
}
