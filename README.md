# Find Me #

Its the day after Christmas, and foolishly, you decide to take the family to Disney World. Your splits up, and at lunch time, you find the last available seat in a packed dining area. You call your wife, and try to explain where you are: "No honey, you have to turn right at the Magic Castle..." 

Wouldn't it be easier if you could send her a map with a pin to your current location?  Somewhat surprisingly Google Maps does not provide an easy interface to do this. 

With this app you can send an email with a Google Maps link to your location. She can conveniently open it in the Maps application on her phone, and find you within minutes.

## Demo ##

You can try the app (here)[]

# Installation #

## Client ##

Firstly, install the external dependencies

`npm install`

In development mode, run

`npm run watch`

To build the application for production, run

`npm run bundle`

The production files will be placed in the `client/dist` directory.


## Webtask ##

Install and initialize the Webtask CLI

`npm install wt-cli -g`
`wt init my@email.address`

Start the webtaks

`wt-cli create --watch webtask/src/find-me.js`

The `--watch` switch reloads the webtask on file change.

# The API #

To send the email link we perform a GET request on our webtask endpoint, with the following parameters: 

| Parameter | Values                          | Default       |
| ----------|:--------------------------------|---------------|
| to        | comma separated email addresses | *Required*    |
| lat       | -90 <= lat <= 90                | *Required*    |
| lon       | -180<=  lat <= 180              | *Required*    |
| zoom      | zoom > 0                        | `15`          |
| subject   | email subject line              | `my location` |
| message   | custom message                  |               |
| test      | if enabled, email is not sent   | `false`       |

# Further development #

- A Mobile (React Native) application.
- Allow user to send the email from his personal GMail account (if this is possible?)
