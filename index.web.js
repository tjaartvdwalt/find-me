import React from 'react'
import Router from './src/router.web'
import ReactDOM from 'react-dom'
import reducer from './src/reducers'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

// import injectTapEventPlugin from 'react-tap-event-plugin'
// // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

// render the router
const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  root)
