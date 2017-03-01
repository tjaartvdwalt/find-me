import React from 'react'
import { ToastContainer, ToastMessage } from 'react-toastr'
import xhr from 'xhr'

import 'animate.css/animate.css'
import 'toastr/toastr.scss'
import './email.scss'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {lat: 0, lon: 0, message: '', email: ''}

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.sendToast = this.sendToast.bind(this)
  }

  componentWillMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      }, (err) => {
        console.error(err)
      })
    }
  }

  sendToast (options) {
    switch (options.type) {
      case 'success':
        this.refs.container.success(options.message, options.title)
        break
      case 'error':
        this.refs.container.error(options.message, options.title)
        break
      case 'warning':
        this.refs.container.success(options.message, options.title)
        break
      case 'info':
        this.refs.container.success(options.message, options.title)
        break
      default:
        break
    }
  }

  submit (e) {
    console.log('submit')
    var url = `https://wt-c7accb88c76dd1674c80cfeaa6e015c3-0.run.webtask.io/email-my-location?to=${this.state.email}&lat=${this.state.lat}&lon=${this.state.lon}&message=${this.state.message}`
    xhr.get(url, (err, resp) => {
      console.log(resp)
      if (err) {
        this.sendToast({type: 'error', title: 'Failed to send mail', message: err})
        console.error(err)
      } else {
        console.log(resp.rawRequest.response)
        if (resp.statusCode >= 400) {
          this.sendToast({type: 'error', title: 'Delivery failure', message: JSON.parse(resp.rawRequest.response).details})
        } else {
          this.sendToast({type: 'success', title: 'Email sent', message: 'Your email was successfully delivered'})
        }
      }
    })
  }

  handleChange (e) {
    console.log('handleChange')
    var newState
    switch (e.target.name) {
      case 'lat':
        newState = Object.assign({}, this.state, {lat: e.target.value})
        break
      case 'lon':
        newState = Object.assign({}, this.state, {lon: e.target.value})
        break
      case 'message':
        newState = Object.assign({}, this.state, {message: e.target.value})
        break
      case 'email':
        newState = Object.assign({}, this.state, {email: e.target.value})
        break
      default:
      // leave state unchanged!
        break
    }
    this.setState(newState)
  }

  render () {
    return (
      <div className="grid">
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
        <h3>Share your location</h3>
        <p>Send a Google maps link of your location to a friend.</p>
        <div className="row">
          <div className="cell required"><label htmlFor="lat">latitude</label></div>
          <div className="cell"><input name="lat" type="number" onChange={this.handleChange} value={this.state.lat} required/></div>
        </div>
        <div className="row">
          <div className="cell required"><label htmlFor="lon">longitude</label></div>
          <div className="cell"><input name="lon" type="number" onChange={this.handleChange} value={this.state.lon} required/></div>
        </div >
        <div className="row">
          <div className="cell"><label htmlFor="message">message</label></div>
          <div className="cell"><input name="message" type="text" onChange={this.handleChange} value={this.state.message}/></div>
        </div>
        <div className="row">
          <div className="cell required"><label htmlFor="email">email</label></div>
          <div className="cell"><input name="email" type="email" onChange={this.handleChange} value={this.state.email} required/></div>
        </div>
        <div className="row">
          <input type="submit" onClick={this.submit}/>
        </div>
      </div>
    )
  }
}
