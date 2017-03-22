# Find Me #

Its the day after Christmas, and foolishly, you decide to take the family to Disney World. Your party splits up, and at lunch time, you find the last available seat in a packed dining area. You call your wife, and try to explain where you are: "No honey, you have to turn right at the Magic Castle..." 

Wouldn't it be easier if you could send your location to the Google Maps app on her phone?  Somewhat surprisingly Google Maps does not provide an easy interface to do this. 

With this app you can send an email with a Google Maps link to your location. When she clicks on the link, it opens in Google Maps, and she can find you!

## Demo ##

Try the app [here](https://tjaart.gitlab.io/findme)

# Installation #

## Client ##

Firstly, install the external dependencies

`npm install`

For development mode, run

`npm run watch`

For a production build, run

`npm run bundle`

The production files will be placed in the `client/dist` directory.


## Webtask ##

Install and initialize the Webtask CLI

`npm install wt-cli -g`

`wt-cli init my@email.address`

To create the webtaks

`wt-cli create --watch -s GMAIL_USERNAME=MY_GMAIL_USER -s GMAIL_PASSWORD=MY_GMAIL_PASS -s AUTH0_CLIENT_SECRET=MY_SECRET ./webtask/src/find-me.js`

The `--watch` switch reloads the webtask on file change.

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
| message   | custom message                  |               |
| test      | if enabled, email is not sent   | `false`       |

# Further development #

- A Mobile (React Native) application.
- Allow user to send the email from his personal GMail account (if this is possible?)
