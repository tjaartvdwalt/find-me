import React from 'react'
import Config from 'Config'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers/main.js'

import auth from './auth'
import GoogleMap from './map'
import xhr from 'xhr'

const MainComponent = class extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit (e) {
    console.log(this)
    var url = `${Config.webtaskUrl}?email=${this.props.email}&lat=${this.props.marker.lat}&lon=${this.props.marker.lng}&zoom=${this.props.zoom}&message=${this.props.message}`
    xhr.get(
      {
        url,
        json: true,
        headers: {'Authorization': `Bearer ${auth.getToken()}`}
      }, (err, res) => {
      if (err) {
          // there was an error making the request
        console.log(err)
        this.props.setToast({type: 'critical', message: 'Error making an internet request'})
      } else {
        if (res.statusCode === 200) {
          this.props.setToast({type: 'ok', message: 'Your email was successfully delivered'})
        } else {
          this.props.setToast({type: 'critical', message: 'An unknown error occured'})
        }
      }
    })
  }

  render () {
    return (
      <View><Text>test</Text></View>
    )
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)

export default Main
