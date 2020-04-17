import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { BrowserRouter, Route } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// if(process.env.NODE_ENV !== 'production') {
//     React.Perf = require('react-addons-perf');
// }
// ReactDOM.render(
//     <BrowserRouter>
//         <Route path="/POC*" component={App}/>
//     </BrowserRouter>
//     , document.getElementById('root')
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
