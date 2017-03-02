import Auth0Lock from 'auth0-lock'
import Config from 'Config'
import { browserHistory } from 'react-router'

const AuthService = class {
  constructor (clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: Config.callbackUrl,
        responseType: 'token',
        params: {
          access_type: 'offline',
          scope: 'openid'
        }
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication (authResult) {
    console.log(authResult)
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    // browserHistory.replace('/')
  }

  login () {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken (idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout () {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
  }
}

export default new AuthService('mKPHl3hi9ws7CmMkbCEgB0Ss19MVyD5Z', 'tjaart.auth0.com')
