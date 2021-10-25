import { combineReducers } from "redux";
import filtervalue from "../modules/filtervalue";
import teambanpick from "../modules/teambanpick";
import locale from "./locale";
import user from "./user";
import staticvalue from "./staticvalue";
import tablevalue from "./tablevalue";

import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["FilterReducer", "UserReducer", "StaticValueReducer"],
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
  TableReducer: tablevalue
});

const rootReducer = (state, action) => {
  if (action.type === Logout) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
