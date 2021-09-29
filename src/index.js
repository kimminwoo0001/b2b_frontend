import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "./Styles/GlobalStyles";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/modules";
import createSagaMiddleware from "redux-saga";
import ErrorBoundary from "./Components/ErrorBoundary";
// import reportWebVitals from "./reportWebVitals";
import "./i18n";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const sagaMiddleware = createSagaMiddleware();
// reportWebVitals();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);

// export const history = syncHistoryWithStore(createBrowserHistory, store);

ReactDOM.render(
  <>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes />
            <GlobalStyles />
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </>,
  document.getElementById("root")
);

