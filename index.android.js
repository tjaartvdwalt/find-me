import React, { Component } from 'react'
import Router from './src/android/router'

import reducer from './src/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
const store = createStore(reducer)

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class findme extends Component {
  render () {
    return (
      <Text>hello me!!!</Text>
    )
  }
}

AppRegistry.registerComponent('findme', () => findme)
