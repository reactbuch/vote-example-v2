import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

let composeEnhancers = compose;
let preloadedState = undefined;

if (typeof window !== "undefined") {
  // https://redux.js.org/recipes/server-rendering
  preloadedState = window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;

  // Redux Dev Tools: http://extension.remotedev.io/#12-advanced-store-setup
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose;
}

export default function configureStore() {
  const middleware = applyMiddleware(
    // async actions
    thunk
  );
  const enhancer = composeEnhancers(middleware);

  return createStore(reducer, preloadedState, enhancer);
}
