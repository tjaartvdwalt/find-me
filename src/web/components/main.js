import React from 'react'
import Config from 'Config'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers/main.js'

import belle from 'belle'
const Button = belle.Button
const TextInput = belle.TextInput

import auth from './auth'
import GoogleMap from './map'

import xhr from 'xhr'

import './main.scss'

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
    // let toast
    // if (this.props.toast) {
    //   console.log('show toast')
    //   toast = <Toast
    //   status={this.props.toast.type}
    //   onClose={() => { this.props.clearToast() }}
    //     >
    //     {this.props.toast.message}
    //   </Toast>
    // }

    return (
      <div className="container">
        <div className="header">
          <h1>Find Me</h1>
          <div>
            <TextInput
              id="email"
              placeholder="Email address"
              onChange={e => { this.props.setEmail(e.target.value) }}
              />
          </div>
          <div>
            <TextInput
              id="message"
              placeholder="Customized message"
              onChange={e => { this.props.setMessage(e.target.value) }}
              value={this.props.message}
              />
          </div>
        </div>
        <div className="main">
        <GoogleMap />
        </div>
        <div className="footer">
          <Button primary style={{width: '100%'}}>Send Email</Button>
        </div>
      </div>
    )
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)

export default Main
