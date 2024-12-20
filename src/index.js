import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);

//do not treat warnings as errors
process.env.CI = false;
