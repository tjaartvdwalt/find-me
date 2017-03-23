import React from 'react'
import { View, Text } from 'react-native'
import { NativeRouter as Router, Route, Redirect } from 'react-router-native'
// import auth from './components/auth'
import Main from './components/main'
// import Login from './components/login'

// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/login' })
//   }
// }

// <PrivateRoute exact path="/" component={Main} onEnter={requireAuth} />
// <Route path="/login" component={Login} />

export default () => (
  <Router>
    <View>
      <Route exact path="/" component={Main} />
    </View>
  </Router>
)

// const PrivateRoute = ({ component, ...rest }) => (
//   <Route {...rest} render={props => (
//       auth.loggedIn() ? (
//         React.createElement(component, props)
//       ) : (
//         <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }}/>
//       )
//   )}/>
// )
