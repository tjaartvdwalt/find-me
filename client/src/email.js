import Config from 'Config'
import AppBar from 'material-ui/AppBar'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'

import React from 'react'
import xhr from 'xhr'

import 'animate.css/animate.css'
import 'toastr/toastr.scss'
import './email.scss'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {lat: 0, lon: 0, customLocation: false, email: '', subject: 'my locations', message: '', snackbar: {active: false, message: '', type: ''}}

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
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
    var url = `${Config.webtaskUrl}?to=${this.state.email}&lat=${this.state.lat}&lon=${this.state.lon}&message=${this.state.message}`
    xhr.get(url, (err, resp) => {
      if (err) {
        this.setState(Object.assign({}, this.state, {snackbar: {active: true, type: 'error', message: err}}))
        // this.sendToast({type: 'error', title: 'Failed to send mail', })
        console.error(err)
      } else {
        if (resp.statusCode >= 400) {
          this.setState(Object.assign({}, this.state, {snackbar: {active: true, type: 'error', message: JSON.parse(resp.rawRequest.response).details}}))
          // this.sendToast({type: 'error', title: 'Delivery failure', })
        } else {
          this.setState(Object.assign({}, this.state, {snackbar: {active: true, type: 'success', message: 'Your email was successfully delivered'}}))
          // this.sendToast({type: 'success', title: 'Email sent', })
        }
      }
    })
  }

  handleChange (e) {
    var newState
    switch (e.target.id) {
      case 'lat':
        newState = Object.assign({}, this.state, {lat: e.target.value})
        break
      case 'lon':
        newState = Object.assign({}, this.state, {lon: e.target.value})
        break
      case 'subject':
        newState = Object.assign({}, this.state, {subject: e.target.value})
        break
      case 'message':
        newState = Object.assign({}, this.state, {message: e.target.value})
        break
      case 'email':
        newState = Object.assign({}, this.state, {email: e.target.value})
        break
      case 'customLocation':
        newState = Object.assign({}, this.state, {customLocation: !this.state.customLocation})
        break
      default:
      // leave state unchanged!
        break
    }
    this.setState(newState)
  }

  showMenu () {
    console.log('should implement')
  }

  render () {
    return (
        <div className="container">
        <AppBar title="Find Me"
      onLeftIconButtonTouchTap={this.showMenu}
        />

        <div>
        <TextField
      id="email"
      floatingLabelText="Email Addresses"
      onChange={this.handleChange}
      value={this.state.email}
        />
        </div>
        <div>
        <TextField
      id="lat"
      floatingLabelText="Latitude"
      disabled={!this.state.customLocation}
      value={this.state.lat}
        />
        </div>
        <div>
        <TextField
      id="lon"
      floatingLabelText="Longitude"
      disabled={!this.state.customLocation}
      onChange={this.handleChange}
      value={this.state.lon}
        />
        </div>
        <div>
        <TextField
      id="subject"
      floatingLabelText="Subject"
      onChange={this.handleChange}
      value={this.state.subject}
        />
        </div>
        <div>
        <TextField
      id="message"
      onChange={this.handleChange}
      hintText="Add a Message to my email"
      floatingLabelText="Message"
      multiLine={true}
      rows={3}
      value={this.state.message}
        />
        </div>
        <div>

        <Toggle
      id="customLocation"
      label="Modify Location"
      onClick={this.handleChange}
        />
        <RaisedButton
      label="Send Mail"
      primary={true}
      onClick={this.submit}
        />
        </div>
        <Snackbar
      className={this.state.snackbar.type}
      open={this.state.snackbar.active}
      message={this.state.snackbar.message}
      autoHideDuration={4000}
        />
        </div>
    )
  }
}
