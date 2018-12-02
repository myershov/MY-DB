import { DataTable } from './components'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import './main.styl'
import store from './store/gameboard/actions'
// const store = createStore(combineReducers(reducers), composeWithDevTools(
//   applyMiddleware(thunk)
// ))

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
