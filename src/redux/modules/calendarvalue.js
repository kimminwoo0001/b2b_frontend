export const CALENDAR_INIT = "calendarvalue/CALENDAR_INIT"
export const SET_CALENDAR_ISOPEN = "calendarvalue/SET_CALENDAR_ISOPEN";
export const SET_CALENDAR_ISSTARTSELECTOR = "calendarvalue/SET_CALENDAR_ISSTARTSELECTOR";


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

const initialState = {
  isOpen: false,
  isStartSelector: false
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
    default:
      return state;
  }
}
