export const JUNGLE_INIT = "junglevalue/Jungle_INIT"
export const SET_FILTER_DATA = "junglevalue/SET_FILTER_DATA";


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


const initialState = {
    year: [],
    league: {},
    season: {},
    team: [],
    patch: {},
  }

export default function JungleMapReducer(state = initialState, action) {
  switch (action.type) {
    case JUNGLE_INIT:
      return initialState
    case SET_FILTER_DATA:
      return  action.payload
    default:
      return state;
  }
}
