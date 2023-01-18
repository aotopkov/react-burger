import { compose } from "redux";
import { createStore } from 'redux'
import { rootReducer } from './reducers/reducers';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";

const wsUrlOrder = 'wss://norma.nomoreparties.space/orders'

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrlOrder)));

export const store = createStore(rootReducer, enhancers)