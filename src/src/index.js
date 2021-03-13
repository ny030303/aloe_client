import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// D:\wiki2\node_modules\bootstrap\dist\css\bootstrap.min.css
import "uikit/dist/css/uikit.min.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as uikit from 'uikit/dist/js/uikit.min';
import * as uikitIcons from 'uikit/dist/js/uikit-icons.min';
import * as jquery from 'jquery/dist/jquery.min';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import * as popper from 'popper.js/dist/popper';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
