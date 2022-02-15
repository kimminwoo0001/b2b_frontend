export const CALENDAR_INIT = "calendarvalue/CALENDAR_INIT"
export const SET_CALENDAR_ISOPEN = "calendarvalue/SET_CALENDAR_ISOPEN";
export const SET_CALENDAR_ISSTARTSELECTOR = "calendarvalue/SET_CALENDAR_ISSTARTSELECTOR";
export const SET_CALENDAR_DAY_START_IDX = "calendarvalue/SET_CALENDAR_DAY_START_IDX";
export const SET_CALENDAR_DAY_END_IDX = "calendarvalue/SET_CALENDAR_DAY_START_IDX";


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

const initialState = {
  isOpen: false,
  isStartSelector: false,
  startDayIdx: -1,
  endDayIdx: -1,
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
      if (action.payload === state.startDayIdx) {
        return {
          ...state,
          startDayIdx: -1
        }
      } else {
        return {
          ...state,
          startDayIdx: action.payload
        }
      }
    case SET_CALENDAR_DAY_END_IDX:
      if (action.payload === state.endDayIdx) {
        return {
          ...state,
          endDayIdx: -1
        }
      } else {
        return {
          ...state,
          endDayIdx: action.payload
        }
      }
    default:
      return state;
  }
}
