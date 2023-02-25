import { compose } from "redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers/reducers";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { WS_ACTIONS } from "./actions/socket";

export const wsUrlOrder = "wss://norma.nomoreparties.space/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_ACTIONS)));

export const store = createStore(rootReducer, enhancers);
