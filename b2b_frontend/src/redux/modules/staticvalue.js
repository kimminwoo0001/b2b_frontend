export const SET_FILTER_ALL_ITMES = "staticvalue/SET_FILTER_ALL_ITMES";
export const SET_RUNES_OBJECT = "staticvalue/SET_RUNES_OBJECT";


export const SetFilterAllItems = (payload) => {
  return {
    type: SET_FILTER_ALL_ITMES,
    payload
  };
}
export const SetRunesJson = (payload) => {
  return {
    type: SET_RUNES_OBJECT,
    payload
  };
}

export default function StaticValueReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState
      }
    case SET_FILTER_ALL_ITMES:
      return {
        ...state,
        filterObjects: action.payload
      }
    case SET_RUNES_OBJECT:
      console.log('runesObjects', action.payload);
      return {
        ...state,
        runesObjects: action.payload
      }
    default:
      return state;
  }
}

const initialState = {
  filterObjects: null,
  runesObjects: null,
  filterHeader: {
    "league": "league",
    "year": "year",
    "season": "season",
    "team": "team",
    "player": "player",
    "patch": "patch"
  }
};