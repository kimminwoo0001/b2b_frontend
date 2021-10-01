import { combineReducers } from "redux";
import filtervalue from "../modules/filtervalue";
import teambanpick from "../modules/teambanpick";
import locale from "./locale";
import user from "./user";
import staticvalue from "./staticvalue";

import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["FilterReducer", "UserReducer"]
};

const rootReducer = combineReducers({
  BanPickReducer: teambanpick,
  FilterReducer: filtervalue,
  LocaleReducer: locale,
  UserReducer: user,
  StaticValueReducer: staticvalue,
});

export default persistReducer(persistConfig, rootReducer);

