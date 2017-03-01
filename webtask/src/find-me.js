const nodemailer = require('nodemailer')

var validateTo = (to) => {
  if (!to) {
    return {err: '"to" is required'}
  }
  return {to}
}

var validateLat = (lat) => {
  if (!lat) {
    return {err: '"lat" is required'}
  }
  var latFloat = parseFloat(lat)
  if (Number.isNaN(latFloat) || latFloat > 90 || latFloat < -90) {
    return {err: '"lat" needs to be between -90 and 90'}
  }
  return {lat}
}

var validateLon = (lon) => {
  if (!lon) return {err: '"lon" is required'}
  var lonFloat = parseFloat(lon)
  if (Number.isNaN(lonFloat) || lonFloat > 180 || lonFloat < -180) {
    return {err: '"lon" needs to be between -180 and 180'}
  }
  return {lon}
}

var validateZoom = (zoom) => {
  if (!zoom) { zoom = 15 }
  var zoomFloat = parseFloat(zoom)
  if (Number.isNaN(zoomFloat) || zoomFloat < 0) {
    return {err: '"zoom" needs to be a positive number'}
  }
  return {zoom}
}

module.exports = (context, cb) => {
  var err = []
  var to, lat, lon, zoom, subject, message, test

  var toObj = validateTo(context.query.to)
  !toObj.err ? to = toObj.to : err.push(toObj.err)

  var latObj = validateLat(context.query.lat)
  !latObj.err ? lat = latObj.lat : err.push(latObj.err)

  var lonObj = validateLon(context.query.lon)
  !lonObj.err ? lon = lonObj.lon : err.push(lonObj.err)

  var zoomObj = validateZoom(context.query.zoom)
  !zoomObj.err ? zoom = zoomObj.zoom : err.push(zoomObj.err)

  context.query.subject ? subject = context.query.subject : subject = 'my location'
  context.query.message ? message = context.query.message : message = ''
  context.query.test ? test = true : test = false

  if (err.length > 0) {
    cb(err.join(', '), null)
  } else {
    var transporter
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Maybe a pipe dream, but in future we can send the email from the client's address?
        // type: 'OAuth2',
        // accessToken: ''
        user: context.secrets.username,
        pass: context.secrets.password
      }
    })

    var mailOptions = {
      from: 'context.secrets.username',
      to: to,
      subject: subject,
      text: `${message}
https://www.google.com/maps/place/${lat},${lon}/@${lat},${lon},${zoom}z`
    }
    if (test) {
      cb(null, mailOptions)
    } else {
      transporter.sendMail(mailOptions, (error, info) => {
        cb(error, info)
      })
    }
  }
}

