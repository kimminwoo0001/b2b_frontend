export const Get_Filter_All_Items = "staticvalue/Get_Filter_All_Items";


export const GetFilterAllItems = (payload) => {
  return {
    type: Get_Filter_All_Items,
    payload
  };
}

export default function StaticValueReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState
      }
    case Get_Filter_All_Items:
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
};