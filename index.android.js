import React, { Component } from 'react'
import Router from './src/router.android'

import reducer from './src/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
const store = createStore(reducer)

import { AppRegistry } from 'react-native'

export default class findme extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('findme', () => findme)
