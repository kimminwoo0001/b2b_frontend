export const TABLE_HEADERS = "tablevalue/TABLE_HEADERS";


export const TableHeaders = (payload) => {
  return {
    type: TABLE_HEADERS,
    payload
  };
}

export default function TableReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState
      }
    case TableHeaders:
      return {
        headers: action.payload
      }
    default:
      return state;
  }
}

const initialState = {
  headers: []
};