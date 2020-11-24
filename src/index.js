import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
const store = createStore(reducer)


mapboxgl.accessToken = 'pk.eyJ1IjoicmVhY3RzYW1wbGUiLCJhIjoiY2tjNmJ2cDB3MDdrNTJ4cGI0czg1bW1udSJ9.-x7UK4qYV_ZyELq5gXGNwA'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
