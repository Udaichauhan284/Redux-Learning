import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {accountReducer} from './reducers/account.js';
import {bonusReducer} from './reducers/bouns.js';
import {thunk} from 'redux-thunk';

const store = createStore(
combineReducers({
  account : accountReducer,
  bonus : bonusReducer
}), 
applyMiddleware(thunk)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
