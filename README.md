[![build status](https://gitlab.com/tjaart/findme/badges/master/build.svg)](https://gitlab.com/tjaart/findme/commits/master)
[![coverage report](https://gitlab.com/tjaart/findme/badges/master/coverage.svg)](https://tjaart.gitlab.io/findme/coverage)

# Find Me #

[Try the Demo app](http://findme.tjaart.org/demo)


Its the day after Christmas, and foolishly, you decide to take the family to Disney World. Your party splits up, and at lunch time, you find the last available seat in a packed dining area. You call your wife, and try to explain where you are: "No honey, you have to turn right at the Magic Castle..." 

Wouldn't it be easier if you could send your location to the Google Maps app on her phone? ~~Somewhat surprisingly Google Maps does not provide an easy interface to do this.~~ [^1]

With this app you can send an email with a Google Maps link to your location. When she clicks on the link, it opens in Google Maps, and she can find you!

[^1]: As of March 2017 Google Maps provides [a feature](https://techcrunch.com/2017/03/22/google-maps-now-lets-you-share-your-location-with-friends-and-family-for-a-specific-period-of-time/) that would serve our primary use case. It is worth noting however, that the spirit of this Google Maps feature is very different from Find Me. Find Me is not designed to track its user, but allows the user to share a "one time location" with someone. That puts the user in control of when, and with whom, he wants to share his location.

# Installation #

## Web Client ##

Firstly, install the external dependencies

`npm install`

For development mode, run

`npm run watch`

For a production build, run

`npm run bundle`

The production files will be placed in the `dist/` directory.


## Webtask ##

### Use the Demo webtask ###

By default, the app is linked the Demo Site Webtask. This uses a free tier account, and is limited to 1 request per second. You are welcome to use it for testing, but if you are going to create heavy traffic, please create your own task to keep the Demo responsive for other users. (The same applies for the Auth0, and Google Maps configuration, please replace the default config with your own configuration in production.)

### Create your own webtask ###

#### Install and initialize the Webtask CLI ####

`npm install wt-cli -g`

`wt-cli init my@email.address`

#### Create the webtaks ####

`wt-cli create --watch -s GMAIL_USERNAME=MY_GMAIL_USER -s GMAIL_PASSWORD=MY_GMAIL_PASS -s AUTH0_CLIENT_SECRET=MY_SECRET ./webtask/src/findme.js`

The `--watch` switch is optional, and reloads the webtask on file change.

#### Update webpack.config.js ####

When you have run `wt-cli create`, it responds with your endpoint URL. You have to set this URL in `externals.Config.webtaskUrl` in `webpack.config.js`: 

~~~ javascript
'Config': JSON.stringify(process.env.ENV === 'production' ? {
    ...
    webtaskUrl: 'https://wt-c7accb88c76dd1674c80cfeaa6e015c3-0.run.webtask.io/findme'
    ...
  } : {
    ...
    webtaskUrl: 'https://wt-c7accb88c76dd1674c80cfeaa6e015c3-0.run.webtask.io/findme'
    ...
}
~~~

# The API #

To send the email link we perform a GET request on our webtask endpoint.

The request should have a `Bearer` token, obtained from Auth0. 

| Parameter | Values                          | Default       |
| ----------|:--------------------------------|---------------|
| mail      | comma separated email addresses | *Required*    |
| lat       | -90 <= lat <= 90                | *Required*    |
| lon       | -180<=  lat <= 180              | *Required*    |
| zoom      | zoom > 0                        | `15`          |
| subject   | email subject line              | `my location` |
| message   | custom message                  |  Empty        |
| test      | if enabled, email is not sent   | `false`       |

# Further development #

- A Mobile (React Native) application.
- ~~Allow user to send the email from his personal GMail account (if this is possible?)~~ (Now possible by passing variables to webtask)
