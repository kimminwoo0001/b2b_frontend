export const USER_TOKEN = "user/USER_TOKEN";
export const USER_ID = "user/USER_ID";

export const UserToken = (payload) => {
  return {
    type: USER_TOKEN,
    payload
  };
};

export const UserID = (payload) => {
  return {
    type: USER_ID,
    payload
  };
};

const initialState = "";

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_TOKEN:
      return { ...state, token: action.payload };
    case USER_ID:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
