import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import {PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/store'
import { Provider } from 'react-redux';
import axios from 'axios';


ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor = {persistor}>
         <App />
      </PersistGate>
      
    </BrowserRouter>
  </Provider>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

