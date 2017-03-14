import auth from './auth'
import Config from 'Config'
import AppBar from 'material-ui/AppBar'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import GoogleMap from './map.jsx'

import React from 'react'
import xhr from 'xhr'

import 'animate.css/animate.css'
import 'toastr/toastr.scss'
import './email.scss'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 0,
      lon: 0,
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
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      }, (err) => {
        console.error(err)
      })
    }
  }

  submit (e) {
    var url = `${Config.webtaskUrl}?email=${this.state.email}&lat=${this.state.lat}&lon=${this.state.lon}&zoom=${this.state.zoom}&message=${this.state.message}`
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
      case 'lat':
        this.setState({lat: e.target.value})
        break
      case 'lon':
        this.setState({lon: e.target.value})
        break
      case 'subject':
        this.setState({subject: e.target.value})
        break
      case 'message':
        this.setState({message: e.target.value})
        break
      case 'email':
        this.setState({email: e.target.value})
        break
      case 'customLocation':
        this.setState({customLocation: !this.state.customLocation})
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
            hintText="my@adress.com"
            floatingLabelText="Email addresses"
            onChange={this.handleChange}
            value={this.state.email}
            />
          <TextField
            id="message"
            onChange={this.handleChange}
            hintText="Custom email message"
            floatingLabelText="Message"
            value={this.state.message}
            />
        </div>
        <div className="main">
          <GoogleMap
            lat={this.state.lat}
            lon={this.state.lon}
            zoom={this.state.zoom}
            mapCenterChanged={
              function () {
                self.setState({
                  lat: this.center.lat(),
                  lon: this.center.lng()
                  // zoom: this.zoom
                })
              }}
            mapZoomChanged={
              function () {
                self.setState({
                  lat: this.center.lat(),
                  lon: this.center.lng(),
                  zoom: this.zoom
                })
              }}
            />
        </div>
        <div className="footer">
          {//          <Toggle
           // id="customLocation"
           // label="Modify Location"
           // onClick={this.handleChange}
           // />
          }
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
