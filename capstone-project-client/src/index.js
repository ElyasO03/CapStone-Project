import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'
import reducer from './store/reducer';
import LoginS from './LoginS';
import RegisterS from './RegisterS';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('jwt')
if(token) {
  store.dispatch({type: 'ON_LOGIN', payload: token})
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element= { <App />} />
        <Route path = '/login' element= {<LoginS />} />
        <Route path = '/register' element= {<RegisterS />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
