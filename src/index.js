/** @jsxImportSource @emotion/react */
import { jsx, ThemeProvider } from "@emotion/react";

import { Suspense } from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "./Styles/GlobalStyles";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import persistReducer from "./redux/modules";
import createSagaMiddleware from "redux-saga";
import ErrorBoundary from "./Components/ErrorBoundary";
import "./i18n";
import { GlobalFonts } from "./Styles/fonts/fonts";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// ui
import Theme from "./Styles/Theme";
// import AlertModal from "./Components/UtilityComponent/AlertModal";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);
// export const history = syncHistoryWithStore(createBrowserHistory, store);

ReactDOM.render(
  <>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          {/* <AlertModal />/ */}
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={Theme}>
              <Routes />
              <GlobalFonts />
              <GlobalStyles />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </>,
  document.getElementById("root")
);
