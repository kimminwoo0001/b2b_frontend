export const GET_FILTER_ALL_ITMES = "staticvalue/Get_Filter_All_Items";


export const GetFilterAllItems = (payload) => {
  return {
    type: GET_FILTER_ALL_ITMES,
    payload
  };
}

export default function StaticValueReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState
      }
    case GET_FILTER_ALL_ITMES:
      return {
        ...state,
        filterObjects: action.payload
      }
    default:
      return state;
  }
}

const initialState = {
  filterObjects: null,
  filterHeader: {
    "league": "league",
    "year": "year",
    "season": "season",
    "team": "team",
    "player": "player",
    "patch": "patch"
  }
};