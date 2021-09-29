import { combineReducers } from "redux";
import filtervalue from "../modules/filtervalue";
import teambanpick from "../modules/teambanpick";
import locale from "./locale";
import user from "./user";
import staticvalue from "./staticvalue";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["FilterReducer", "User"]
};

const rootReducer = combineReducers({
  BanPickReducer: teambanpick,
  FilterReducer: filtervalue,
  LocaleReducer: locale,
  User: user,
  StaticValueReducer: staticvalue,
});

export default persistReducer(persistConfig, rootReducer);

