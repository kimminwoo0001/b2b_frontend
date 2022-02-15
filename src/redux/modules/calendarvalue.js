export const CALENDAR_INIT = "calendarvalue/CALENDAR_INIT"
export const SET_CALENDAR_ISOPEN = "calendarvalue/SET_CALENDAR_ISOPEN";
export const SET_CALENDAR_ISSTARTSELECTOR = "calendarvalue/SET_CALENDAR_ISSTARTSELECTOR";
export const SET_CALENDAR_DAY_START_IDX = "calendarvalue/SET_CALENDAR_DAY_START_IDX";
export const SET_CALENDAR_START_DATE = "calendarvalue/SET_CALENDAR_START_DATE";
export const SET_CALENDAR_DAY_END_IDX = "calendarvalue/SET_CALENDAR_DAY_END_IDX";
export const SET_CALENDAR_END_DATE = "calendarvalue/SET_CALENDAR_END_DATE";


export const CalendarInit = () => {
  return {
    type: CALENDAR_INIT
  };
}
export const SetCalendarIsOpen = (payload) => {
  return {
    type: SET_CALENDAR_ISOPEN,
    payload
  };
}
export const SetCalendarIsStartSelector = (payload) => {
  return {
    type: SET_CALENDAR_ISSTARTSELECTOR,
    payload
  };
}
export const SetCalendarDayStartIdx = (payload) => {
  return {
    type: SET_CALENDAR_DAY_START_IDX,
    payload
  };
}
export const SetCalendarDayEndIdx = (payload) => {
  return {
    type: SET_CALENDAR_DAY_END_IDX,
    payload
  };
}
export const SetCalendarStartDate = (payload) => {
  return {
    type: SET_CALENDAR_START_DATE,
    payload
  };
}
export const SetCalendarEndDate = (payload) => {
  return {
    type: SET_CALENDAR_END_DATE,
    payload
  };
}

const initialState = {
  isOpen: false,
  isStartSelector: false,
  startDayIdx: "",
  endDayIdx: "",
  startDate: "",
  endDate: "",
}

export default function CalendarReducer(state = initialState, action) {
  switch (action.type) {
    case CALENDAR_INIT:
      return initialState
    case SET_CALENDAR_ISOPEN:
      return {
        ...state,
        isOpen: action.payload
      }
    case SET_CALENDAR_ISSTARTSELECTOR:
      return {
        ...state,
        isStartSelector: action.payload
      }
    case SET_CALENDAR_DAY_START_IDX:
      return {
        ...state,
        startDayIdx: action.payload
      }
    case SET_CALENDAR_DAY_END_IDX:
      return {
        ...state,
        endDayIdx: action.payload
      }
    case SET_CALENDAR_START_DATE:
      return {
        ...state,
        startDate: action.payload
      }
    case SET_CALENDAR_END_DATE:
      return {
        ...state,
        endDate: action.payload
      }
    default:
      return state;
  }
}
