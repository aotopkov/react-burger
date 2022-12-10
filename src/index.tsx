import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/normalize.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { composeEnhancers } from './components/App/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/reducers';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancers)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
