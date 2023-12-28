import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { ReduxStore } from './ReduxStore/ReduxStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={ReduxStore}>
      <App />
    </Provider>
  </Router>
)
