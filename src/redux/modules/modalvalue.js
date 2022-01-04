export const MODAL_INIT = "modalvalue/MODAL_INIT"
export const SET_DESC = "modalvalue/SET_DESC";
export const SET_IS_OPEN = "modalvalue/SET_IS_OPEN";
export const SET_FUNC_ID = "modalvalue/SET_FUNC_ID";
export const SET_IS_SELECTOR = "modalvalue/SET_IS_SELECTOR";
export const SET_CONFIRM_FUNC_ID = "modalvalue/SET_CONFIRM_FUNC_ID";
export const SET_CANCEL_FUNC_ID = "modalvalue/SET_CANCEL_FUNC_ID";
export const SET_STATUS = "modalvalue/SET_STATUS";
export const SET_MODAL_INFO = "modalvalue/SET_MODAL_INFO";
export const SET_SEMI_DESC = "modalvalue/SET_SEMI_DESC";
export const SET_SELECTED_RESULT = "modalvalue/SET_SELECTED_RESULT";

export const ModalInit = () => {
  return {
    type: MODAL_INIT
  };
}
export const SetDesc = (payload) => {
  return {
    type: SET_DESC,
    payload
  };
}

export const SetIsOpen = (payload) => {
  return {
    type: SET_IS_OPEN,
    payload
  };
}

export const SetIsSelector = (payload) => {
  return {
    type: SET_IS_SELECTOR,
    payload
  };
}

export const SetConfirmFuncId = (payload) => {
  return {
    type: SET_CONFIRM_FUNC_ID,
    payload
  };
}

export const SetCancelFuncId = (payload) => {
  return {
    type: SET_CANCEL_FUNC_ID,
    payload
  };
}

export const SetStatus = (payload) => {
  return {
    type: SET_STATUS,
    payload
  };
}

export const SetModalInfo = (payload) => {
  return {
    type: SET_MODAL_INFO,
    payload
  };
}

export const SetSemiDesc = (payload) => {
  return {
    type: SET_SEMI_DESC,
    payload
  };
}
export const SetSelectedResult = (payload) => {
  return {
    type: SET_SELECTED_RESULT,
    payload
  };
}

const initialState = {
  status: "",
  desc: "",
  isOpen: false,
  isSelector: false,
  confirmFuncId: "",
  cancelFuncId: "",
  semiDesc: "",
  selectedResult: false,
}

export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_INIT:
      return initialState
    case SET_DESC:
      return {
        ...state,
        desc: action.payload
      }
    case SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload
      }
    case SET_IS_SELECTOR:
      return {
        ...state,
        isSelector: action.payload
      }
    case SET_CONFIRM_FUNC_ID:
      return {
        ...state,
        confirmFuncId: action.payload
      }
    case SET_CANCEL_FUNC_ID:
      return {
        ...state,
        cancelFuncId: action.payload
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case SET_SEMI_DESC:
      return {
        ...state,
        semiDesc: action.payload
      }
    case SET_SELECTED_RESULT:
      return {
        ...state,
        selectedResult: action.payload
      }
    case SET_MODAL_INFO:
      return action.payload
    default:
      return state;
  }
}
