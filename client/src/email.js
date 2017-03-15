import auth from './auth'
import Config from 'Config'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import GoogleMap from './map'

import React from 'react'
import xhr from 'xhr'

import 'animate.css/animate.css'
import 'toastr/toastr.scss'
import './email.scss'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: {lat: 0, lng: 0},
      marker: {lat: 0, lng: 0},
      zoom: 17,
      customLocation: false,
      email: '',
      subject: 'my locations',
      message: '',
      snackbar: {active: false, message: ''}
    }

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          marker: {lat: position.coords.latitude, lng: position.coords.longitude}
        })
      }, (err) => {
        console.error(err)
      })
    }
  }

  submit (e) {
    var url = `${Config.webtaskUrl}?email=${this.state.email}&lat=${this.state.marker.lat}&lon=${this.state.marker.lng}&zoom=${this.state.zoom}&message=${this.state.message}`
    xhr.get(
      {
        url,
        json: true,
        headers: {'Authorization': `Bearer ${auth.getToken()}`}
      }, (err, res) => {
      if (err) {
          // there was an error making the request
        console.log(err)
        this.setState({snackbar: {active: true, message: 'No internet connection!'}})
      } else {
        var message
        if (res.statusCode === 200) {
          message = 'Your email was successfully delivered'
        } else {
          res.body.message ? message = res.body.message : message = 'An unknown error occured.'
        }

        this.setState({snackbar: {active: true, message: message}})
      }
    })
  }

  handleChange (e) {
    switch (e.target.id) {
      case 'subject':
        this.setState({subject: e.target.value})
        break
      case 'message':
        this.setState({message: e.target.value})
        break
      case 'email':
        this.setState({email: e.target.value})
        break
      default:
      // leave state unchanged!
        break
    }
  }

  render () {
    // not great code, but don't know how else to get it working
    let self = this
    return (
        <div className="container">
        <AppBar title="Find Me"
      onLeftIconButtonTouchTap={this.showMenu}
        />
        <div className="header">
        <TextField
      id="email"
      hintText="Email address"
      onChange={this.handleChange}
      value={this.state.email}
        />
        <TextField
      id="message"
      onChange={this.handleChange}
      hintText="Custom Message"
      fullWidth={true}
      value={this.state.message}
        />
        </div>
        <div className="main">
        <GoogleMap
      center={this.state.center}
      marker={this.state.marker}
      zoom={this.state.zoom}
      mapZoomChanged={
        function () {
          self.setState({
            zoom: this.zoom
          })
        }}
      mapClick={(event) => {
        this.setState({
          marker: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
        })
      }}
        />
        </div>
        <div className="footer">
        <RaisedButton
      label="Send Mail"
      primary={true}
      onClick={this.submit}
      fullWidth={true}
        />
        </div>
        <Snackbar
      open={this.state.snackbar.active}
      message={this.state.snackbar.message}
      autoHideDuration={4000}
        />
        </div>
    )
  }
}
