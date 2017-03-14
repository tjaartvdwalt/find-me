import React from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth'

export default class extends React.Component {
  state = {
    redirectToReferrer: false
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (<div>{auth.login()}</div>)
  }
  componentDidUpdate () {
    console.log('login')
  }
}
