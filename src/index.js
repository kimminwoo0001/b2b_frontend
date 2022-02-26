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
import ModalProvider from "./Components/Modals/ModalProvider";
import ReactModal from "react-modal";
import Modals from "./Components/Modals/Modals";
// import AlertModal from "./Components/UtilityComponent/AlertModal";

/* 리덕스 & 리덕스사가 & 세션스토리지에 리덕스 상태 보관 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
const persistor = persistStore(store);
// export const navigate =  syncHistoryWithStore(createBrowserHistory, store);

/* 모달 렌더링 관련*/
ReactModal.setAppElement("#root");

ReactDOM.render(
  <>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          {/* <AlertModal />/ */}
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={Theme}>
              <GlobalFonts />
              <GlobalStyles />
              {/* 모달 통합 context */}
              <ModalProvider>
                <Routes />
                <Modals />
              </ModalProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </>,
  document.getElementById("root")
);
