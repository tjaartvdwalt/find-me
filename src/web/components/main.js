import React from 'react'
import Config from 'Config'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers/main.js'

import belle from 'belle'
const Button = belle.Button
const TextInput = belle.TextInput

import {ToastContainer, ToastMessage} from 'react-toastr'
const ToastMessageFactory = React.createFactory(ToastMessage.animation)

import auth from './auth'
import GoogleMap from './map'
import xhr from 'xhr'

import 'animate.css'
import 'toastr/toastr.scss'
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
        this.refs.container.error(`Error making an internet request`, `Failure`, {
          closeButton: true
        })
      } else {
        if (res.statusCode === 200) {
          this.refs.container.success(`Your email has been successfully sent`, `Success`, {
            closeButton: true
          })
        } else {
          this.refs.container.error(`Could not send your email`, `Failure`, {
            closeButton: true
          })
        }
      }
    })
  }

  render () {
    return (
        <div className="container">
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-right"
            >
          </ToastContainer>
          <div className="header">
            <h1>Find Me</h1>
            <TextInput
              id="email"
              placeholder="Email address"
              onChange={e => { this.props.setEmail(e.target.value) }}
              >
            </TextInput>
            <TextInput
              id="message"
              placeholder="Customized message"
              onChange={e => { this.props.setMessage(e.target.value) }}
              value={this.props.message}
              />
          </div>
          <div className="main">
            <GoogleMap />
          </div>
          <div className="footer">
            <Button
              primary
              style={{width: '100%'}}
              onClick={e => { this.submit(e) }}
              >
              Send Email</Button>
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
