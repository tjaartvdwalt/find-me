import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import Router from './router'
import ReactDOM from 'react-dom'

import './index.scss'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// render the router
var root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

ReactDOM.render(
    <MuiThemeProvider>
      <Router/>
    </MuiThemeProvider>,
  root)
