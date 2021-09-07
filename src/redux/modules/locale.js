export const LANG = "locale/LANG";

export const Language = (payload) => {
  return {
    type: LANG,
    payload
  };
};

const initialState = sessionStorage.getItem("i18nextLng");

export default function LocaleReducer(state = initialState, action) {
  switch (action.type) {
    case LANG:
      return action.payload;
    default:
      return state;
  }
}
