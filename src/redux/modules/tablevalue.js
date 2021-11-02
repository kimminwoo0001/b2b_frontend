export const TABLE_HEADERS = "tablevalue/TABLE_HEADERS";
export const SET_TABLE_HEADERS = "tablevalue/SET_TABLE_HEADERS";


export const TableHeaders = (payload) => {
  return {
    type: TABLE_HEADERS,
    payload
  };
}

export const setTableHeaders = (payload) => {
  return {
    type: SET_TABLE_HEADERS,
    payload
  };
}



export default function TableReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState
      }
    case TABLE_HEADERS:
      if (state.headers.length === 0) {
        return { ...state, headers: [action.payload] };
      }
      if (state.headers.find((e) => e === action.payload)) {
        return {
          ...state,
          headers: state.headers.filter((e) => e !== action.payload)
        };
      }
      return {
        ...state,
        headers: [...state.headers.filter((e) => e !== ""), action.payload]
      };
    case SET_TABLE_HEADERS:
      return {
        ...state,
        headers: action.payload
      }
    default:
      return state;
  }
}

const initialState = {
  headers: []
};