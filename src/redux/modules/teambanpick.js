//밴픽 보고서 상태 관리
export const PICK_ONE = "teambanpick/PICK_ONE";
export const PICK_TWO = "teambanpick/PICK_TWO";
export const PICK_THREE = "teambanpick/PICK_THREE";
export const PICK_FOUR = "teambanpick/PICK_FOUR";
export const PICK_FIVE = "teambanpick/PICK_FIVE";
export const BAN_ONE = "teambanpick/BAN_ONE";
export const BAN_TWO = "teambanpick/BAN_TWO";
export const BAN_THREE = "teambanpick/BAN_THREE";
export const BAN_FOUR = "teambanpick/BAN_FOUR";
export const BAN_FIVE = "teambanpick/BAN_FIVE";
export const BANED_ONE = "teambanpick/BANED_ONE";
export const BANED_TWO = "teambanpick/BANED_TWO";
export const BANED_THREE = "teambanpick/BANED_THREE";
export const BANED_FOUR = "teambanpick/BANED_FOUR";
export const BANED_FIVE = "teambanpick/BANED_FIVE";
export const SIDE = "teambanpick/SIDE";
export const GET_BAN_DATA = "teambanpick/GET_BAN_DATA";

export const Pick1 = (payload) => {
  return {
    type: PICK_ONE,
    payload
  };
};

export const Pick2 = (payload) => {
  return {
    type: PICK_TWO,
    payload
  };
};
export const Pick3 = (payload) => {
  return {
    type: PICK_THREE,
    payload
  };
};
export const Pick4 = (payload) => {
  return {
    type: PICK_FOUR,
    payload
  };
};
export const Pick5 = (payload) => {
  return {
    type: PICK_FIVE,
    payload
  };
};

export const Ban1 = (payload) => {
  return {
    type: BAN_ONE,
    payload
  };
};

export const Ban2 = (payload) => {
  return {
    type: BAN_TWO,
    payload
  };
};

export const Ban3 = (payload) => {
  return {
    type: BAN_THREE,
    payload
  };
};

export const Ban4 = (payload) => {
  return {
    type: BAN_FOUR,
    payload
  };
};

export const Ban5 = (payload) => {
  return {
    type: BAN_FIVE,
    payload
  };
};

export const Baned1 = (payload) => {
  return {
    type: BANED_ONE,
    payload
  };
};

export const Baned2 = (payload) => {
  return {
    type: BANED_TWO,
    payload
  };
};

export const Baned3 = (payload) => {
  return {
    type: BANED_THREE,
    payload
  };
};

export const Baned4 = (payload) => {
  return {
    type: BANED_FOUR,
    payload
  };
};

export const Baned5 = (payload) => {
  return {
    type: BANED_FIVE,
    payload
  };
};

export const Side = (payload) => {
  return {
    type: SIDE,
    payload
  };
};

export const GetBanData = (payload) => {
  return {
    type: GET_BAN_DATA,
    payload
  };
};

export default function BanPickReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return initialState;
    case PICK_ONE:
      return { ...state, pick1: action.payload };
    case PICK_TWO:
      return { ...state, pick2: action.payload };
    case PICK_THREE:
      return { ...state, pick3: action.payload };
    case PICK_FOUR:
      return { ...state, pick4: action.payload };
    case PICK_FIVE:
      return { ...state, pick5: action.payload };
    case BAN_ONE:
      return { ...state, ban1: action.payload };
    case BAN_TWO:
      return { ...state, ban2: action.payload };
    case BAN_THREE:
      return { ...state, ban3: action.payload };
    case BAN_FOUR:
      return { ...state, ban4: action.payload };
    case BAN_FIVE:
      return { ...state, ban5: action.payload };
    case BANED_ONE:
      return { ...state, baned1: action.payload };
    case BANED_TWO:
      return { ...state, baned2: action.payload };
    case BANED_THREE:
      return { ...state, baned3: action.payload };
    case BANED_FOUR:
      return { ...state, baned4: action.payload };
    case BANED_FIVE:
      return { ...state, baned5: action.payload };
    case SIDE:
      return { ...state, side: action.payload };
    case GET_BAN_DATA:
      return { ...state, dan: action.payload };
    default:
      return state;
  }
}

const initialState = {
  pick1: null,
  pick2: null,
  pick3: null,
  pick4: null,
  pick5: null,
  ban1: null,
  ban2: null,
  ban3: null,
  ban4: null,
  ban5: null,
  baned1: null,
  baned2: null,
  baned3: null,
  baned4: null,
  baned5: null,
  side: "all",
  dan: null
};
