import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import Router from './router'
import ReactDOM from 'react-dom'

import reducers from './reducers/email'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
const store = createStore(reducers)

import injectTapEventPlugin from 'react-tap-event-plugin'
      // Needed for onTouchTap
     // http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// render the router
var root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

const render = () => ReactDOM.render(
    <MuiThemeProvider>
    <Provider store={store}>
    <Router/>
    </Provider>
    </MuiThemeProvider>,
  root
)
render()
store.subscribe(render)
