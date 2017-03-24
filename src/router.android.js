import React from 'react'
import { View, Text } from 'react-native'
import { AndroidBackButton,
         NativeRouter,
         Route,
         Redirect, withRouter
       } from 'react-router-native'
// import auth from './components/auth'
import Main from './components/android/main'
var Auth0Lock = require('react-native-lock')
var lock = new Auth0Lock({clientId: 'CDNLfPkpLYY3uGmT6bE9jmqauGtkUP3o', domain: 'tjaart.auth0.com'})

// import Login from './components/login'

// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/login' })
//   }
// }

// <PrivateRoute exact path="/" component={Main} onEnter={requireAuth} />
// <Route path="/login" component={Login} />

export default () => (
  <NativeRouter>
    <AndroidBackButton>
      <View>
        <Main />
        <PrivateRoute exact path="/" component={Main} />
      </View>
    </AndroidBackButton>
  </NativeRouter>
)

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      this.loggedIn ? (
        React.createElement(component, props)
      ) : (
        lock.show({}, (err, profile, token) => {
          if (err) {
            console.log(err)
            return
          }
          this.loggedIn = true
  // Authentication worked!
          console.log('Logged in with Auth0!')
        })
      )
  )}/>
)
