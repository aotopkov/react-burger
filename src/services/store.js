import { compose } from "redux";
import { createStore } from 'redux'
import { rootReducer } from './reducers/reducers';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancers)