import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

// Redux Dev Tools: http://extension.remotedev.io/#12-advanced-store-setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
  : compose;

export default function configureStore() {
  const middleware = applyMiddleware(
    // async actions
    thunk
  );
  const enhancer = composeEnhancers(middleware);

  return createStore(rootReducer, enhancer);
}
