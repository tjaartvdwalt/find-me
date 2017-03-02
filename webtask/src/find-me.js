const nodemailer = require('nodemailer')
const Webtask = require('webtask-tools')
const Express = require('express')
const server = Express()
const BodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

server.use(BodyParser.json())

var validateEmail = (email) => {
  if (!email) {
    return 'email is required'
  }
}

var validateLat = (lat) => {
  if (!lat) {
    return 'lat is required'
  }
  var latFloat = parseFloat(lat)
  if (Number.isNaN(latFloat) || latFloat > 90 || latFloat < -90) {
    return 'lat needs to be between -90 and 90'
  }
}

var validateLon = (lon) => {
  if (!lon) return 'lon is required'
  var lonFloat = parseFloat(lon)
  if (Number.isNaN(lonFloat) || lonFloat > 180 || lonFloat < -180) {
    return 'lon needs to be between -180 and 180'
  }
}

var validateZoom = (zoom) => {
  if (!zoom) { zoom = 15 }
  var zoomFloat = parseFloat(zoom)
  if (Number.isNaN(zoomFloat) || zoomFloat < 0) {
    return 'zoom needs to be a positive number'
  }
}

const validate = function (params) {
  if (validateEmail(params.email)) { return validateEmail(params.email) }
  if (validateLat(params.lat)) { return validateLat(params.lat) }
  if (validateLat(params.lat)) { return validateLat(params.lat) }
  if (validateLon(params.lon)) { return validateLon(params.lon) }
  if (validateZoom(params.zoom)) { return validateZoom(params.zoom) }
}

var getToken = (authorizationHeader) => {
  var myRe = /Bearer (.*)/g
  var myArray = myRe.exec(authorizationHeader)
  console.log(myArray)
  if (myArray !== null && myArray.length > 1) {
    return myArray[1]
  }
}

const sendMail = function (options, cb) {
  var params = options.params
  var secrets = options.secrets
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // Maybe a pipe dream, but in future we can send the email from the client's address?
        // type: 'OAuth2',
        // accessToken: ''
      user: secrets.GMAIL_USERNAME,
      pass: secrets.GMAIL_PASSWORD
    }
  })
  console.log(params)
  console.log(secrets)

  var mailOptions = {
    from: `${secrets.GMAIL_USERNAME}`,
    to: params.email,
    subject: params.subject,
    text: `${params.message}
https://www.google.com/maps/place/${params.lat},${params.lon}/@${params.lat},${params.lon},${params.zoom}z`
  }
  if (params.test) {
    cb(null, mailOptions)
  } else {
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error)
      cb(error, info)
    })
  }
}

const parseParams = function (params) {
  // lets follow good practice and make this a pure function
  var retParams = Object.assign({}, params)
  if (!retParams.subject) { retParams.subject = 'my location' }
  if (!retParams.message) { retParams.message = '' }
  if (!retParams.zoom) { retParams.zoom = 15 }

  return retParams
}

server.get('/', function (req, res) {
  var secrets = req.webtaskContext.secrets
  console.log(req.headers.authorization)
  var token = getToken(req.headers.authorization)
  console.log(token)
  jwt.verify(token, secrets.AUTH0_CLIENT_SECRET, (err, decode) => {
    if (err) {
      res.status(400).json({message: err.message})
    } else {
      var params = parseParams(req.webtaskContext.query)
      var errorMsg = validate(params)
      if (errorMsg) {
        res.status(400).json({message: errorMsg})
      } else {
        sendMail({params, secrets}, (err, response) => {
          if (err) { res.status(400).json({message: err}) }
          res.json(response)
        })
      }
    }
  })
})

module.exports = Webtask.fromExpress(server)
