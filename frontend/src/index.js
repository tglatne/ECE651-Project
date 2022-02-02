import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
import 'bootswatch/dist/lux/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
<<<<<<< HEAD
=======

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
>>>>>>> sagar
=======
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
