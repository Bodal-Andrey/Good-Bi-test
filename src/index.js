import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createApi from "./api.js";
import { reducer, Operation } from "./reducer.js";

const api = createApi();

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(Operation.loadName());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
