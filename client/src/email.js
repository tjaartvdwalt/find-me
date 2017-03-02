import Config from 'Config'
import AppBar from 'material-ui/AppBar'
import Immutable from 'immutable'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'

import React from 'react'

import xhr from 'xhr'

import 'animate.css/animate.css'
import 'toastr/toastr.scss'
import './email.scss'

export default class extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = Immutable.fromJS({
      lat: {val: 0},
      lon: {val: 0},
      customLocation: {val: false},
      email: {val: ''},
      subject: {val: 'my locations'},
      message: {val: ''},
      snackbar: {active: false, message: '', type: ''}
    })

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.state = this.state.setIn(['lat', 'val'], position.coords.latitude)
        this.state = this.state.setIn(['lon', 'val'], position.coords.longitude)
        // Not good code! We should fix this
        console.log(this)
      }, (err) => {
        console.error(err)
      })
    }
  }

  clientValidation () {
    var valid = true
    if (this.state.getIn(['email', 'val']) === '') {
      this.state = this.state.setIn(['email', 'error'], 'Email is required')
      valid = false
    }
    if (this.state.getIn(['lat', 'val']) < -90 || this.state.getIn('lat', 'val') > 90) {
      this.state = this.state.setIn(['email', 'error'], 'Latitude should be between -90 and 90')
    }
    return valid
  }

  submit (e) {
    if (this.clientValidation()) {
      var url = `${Config.webtaskUrl}?to=${this.state.getIn(['email', 'val'])}&lat=${this.state.getIn(['lat', 'val'])}&lon=${this.state.getIn(['lon', 'val'])}&message=${this.state.getIn(['message', 'val'])}`
      xhr.get(url, (err, resp) => {
        if (err) {
          this.state = this.state.setIn(['snackbar', 'active'], true)
          this.state = this.state.setIn(['snackbar', 'type'], 'error')
          this.state = this.state.setIn(['snackbar', 'message'], err)
        } else {
          if (resp.statusCode >= 400) {
            this.state = this.state.setIn(['snackbar', 'active'], true)
            this.state = this.state.setIn(['snackbar', 'type'], 'error')
            this.state = this.state.setIn(['snackbar', 'message'], JSON.parse(resp.rawRequest.response).details)
          } else {
            this.state = this.state.setIn(['snackbar', 'active'], true)
            this.state = this.state.setIn(['snackbar', 'type'], 'error')
            this.state = this.state.setIn(['snackbar', 'message'], 'Your email was successfully delivered')
          }
        }
      })
    }
  }

  handleChange (e) {
    console.log(this)
    switch (e.target.id) {
      case 'lat':
        this.state = this.state.setIn(['lat', 'val'], e.target.value)
        break
      case 'lon':
        this.state = this.state.setIn(['lon', 'val'], e.target.value)
        break
      case 'subject':
        this.state = this.state.setIn(['subject', 'val'], e.target.value)
        break
      case 'message':
        this.state = this.state.setIn(['message', 'val'], e.target.value)
        break
      case 'email':
        this.state = this.state.setIn(['email', 'val'], e.target.value)
        console.log(this.state.getIn(['email', 'val']))
        break
      case 'customLocation':
        this.state = this.state.setIn(['customLocation', 'val'], e.target.value)
        break
      default:
      // leave state unchanged!
        break
    }
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
      errorText={this.state.getIn(['email', 'error'])}
      onChange={this.handleChange}
      defaultValue={this.state.getIn(['email', 'val'])}
        />
        </div>
        <div>
        <TextField
      id="lat"
      floatingLabelText="Latitude"
      disabled={!this.state.getIn(['customLocation', 'val'])}
      defaultValue={this.state.getIn(['lat', 'val'])}
        />
        </div>
        <div>
        <TextField
      id="lon"
      floatingLabelText="Longitude"
      disabled={!this.state.getIn(['customLocation', 'val'])}
      onChange={this.handleChange}
      defaultValue={this.state.getIn(['lon', 'val'])}
        />
        </div>
        <div>
        <TextField
      id="subject"
      floatingLabelText="Subject"
      onChange={this.handleChange}
      defaultValue={this.state.getIn(['subject', 'val'])}
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
      defaultValue={this.state.getIn(['message', 'val'])}
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
      className={this.state.getIn(['snackbar', 'type'])}
      open={this.state.getIn(['snackbar', 'active'])}
      message={this.state.getIn(['snackbar', 'message'])}
      autoHideDuration={4000}
        />
        </div>
    )
  }
}
