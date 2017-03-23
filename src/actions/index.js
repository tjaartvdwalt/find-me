import * as types from '../constants/actions'

export const setCenter = (center) => {
  return {
    type: types.SET_CENTER,
    center
  }
}

export const setMarker = (marker) => {
  return {
    type: types.SET_MARKER,
    marker
  }
}

export const setZoom = (zoom) => {
  return {
    type: types.SET_ZOOM,
    zoom
  }
}

export const setAddress = (address) => {
  return {
    type: types.SET_ADDRESS,
    address
  }
}

export const setSubject = (subject) => {
  return {
    type: types.SET_SUBJECT,
    subject
  }
}

export const setMessage = (message) => {
  return {
    type: types.SET_MESSAGE,
    message
  }
}
