import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

ReactDOM.render(<App history={history} />, document.getElementById('root'));
serviceWorker.unregister();
