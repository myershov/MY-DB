import { DataTable } from './components'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import './main.styl'
import store from './store/gameboard/actions'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={DataTable} />
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
