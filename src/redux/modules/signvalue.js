export const SET_AUTH_CORD = "signvalue/SET_AUTH_CORD";
export const SET_SIGN_TYPE = "signvalue/SET_SIGN_TYPE";


export const SetAuthCord = (payload) => {
  return {
    type: SET_AUTH_CORD,
    payload,
  };
}
export const SetSignType = (payload) => {
  return {
    type: SET_SIGN_TYPE,
    payload,
  };
}

const initialState = "";

export default function SignReducer(state = initialState, action) {
  switch (action.type) {

    case SET_AUTH_CORD:
      return { ...state, authCode: action.payload };
    case SET_SIGN_TYPE:
      return { ...state, signType: action.payload };
    default:
      return state;
  }
}
