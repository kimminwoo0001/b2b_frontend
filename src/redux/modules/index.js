import { combineReducers } from "redux";
import filtervalue from "../modules/filtervalue";
import teambanpick from "../modules/teambanpick";
import locale from "./locale";
import user from "./user";
import staticvalue from "./staticvalue";
import tablevalue from "./tablevalue";
import pivalue from "./pivalue";
import selectorvalue from "./selectorvalue";
import modalvalue from "./modalvalue";
import gamevalue from "./gamevalue";

import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// 세션 스토리지에 whitelist에 있는 Redux를 저장.
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["FilterReducer", "UserReducer", "StaticValueReducer", "SelectorReducer", "ModalReducer"],
};

const Logout = "Logout";
export const UserLogout = () => {
  return {
    type: Logout,
  };
};

const appReducer = combineReducers({
  BanPickReducer: teambanpick,
  FilterReducer: filtervalue,
  LocaleReducer: locale,
  UserReducer: user,
  StaticValueReducer: staticvalue,
  TableReducer: tablevalue,
  PiAreaReducer: pivalue,
  SelectorReducer: selectorvalue,
  ModalReducer: modalvalue,
  GameReportReducer: gamevalue
});

const rootReducer = (state, action) => {
  if (action.type === Logout) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
