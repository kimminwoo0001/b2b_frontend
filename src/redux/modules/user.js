export const USER_TOKEN = "user/USER_TOKEN";
export const USER_ID = "user/USER_ID";
export const User_IP = "user/User_IP";
export const User_Name = "user/User_Name";
export const User_TeamName = "user/User_TeamName";
export const User_Device = "user/User_Device";
export const User_Alarm = "user/User_Alarm";
export const User_ChargeTime = "user/User_ChargeTime";
export const SET_IS_NEED_CHK_LOGIN = "user/SET_IS_NEED_CHK_LOGIN";

export const UserToken = (payload) => {
  return {
    type: USER_TOKEN,
    payload,
  };
};

export const UserID = (payload) => {
  return {
    type: USER_ID,
    payload,
  };
};

export const UserIP = (payload) => {
  return {
    type: User_IP,
    payload,
  };
};
export const UserName = (payload) => {
  return {
    type: User_Name,
    payload,
  };
};
export const UserTeamName = (payload) => {
  return {
    type: User_TeamName,
    payload,
  };
};

export const UserDevice = (payload) => {
  return {
    type: User_Device,
    payload,
  };
};

export const UserAlarm = (payload) => {
  return {
    type: User_Alarm,
    payload,
  };
};

export const UserChargeTime = (payload) => {
  return {
    type: User_ChargeTime,
    payload,
  };
};
export const SetIsNeedChkLogin = (payload) => {
  return {
    type: SET_IS_NEED_CHK_LOGIN,
    payload,
  };
};



const initialState = {
  isNeedChkLogin: false
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_TOKEN:
      return { ...state, token: action.payload };
    case USER_ID:
      return { ...state, id: action.payload };
    case User_IP:
      return { ...state, ip: action.payload };
    case User_Device:
      return { ...state, device: action.payload };
    case User_Alarm:
      return { ...state, alarm: action.payload };
    case User_ChargeTime:
      return { ...state, charge_time: action.payload };
    case User_Name:
      return { ...state, name: action.payload };
    case User_TeamName:
      return { ...state, teamName: action.payload };
    case SET_IS_NEED_CHK_LOGIN:
      return { ...state, isNeedChkLogin: action.payload };
    default:
      return state;
  }
}
