export const setCenter = (center) => {
  console.log(this)
  return {
    type: 'SET_CENTER',
    center
  }
}

export const setMarker = (marker) => {
  console.log('marker')
  console.log(marker)
  return {
    type: 'SET_MARKER',
    marker
  }
}

export const setZoom = (zoom) => {
  return {
    type: 'SET_ZOOM',
    zoom
  }
}

export const setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    email
  }
}

export const setSubject = (subject) => {
  return {
    type: 'SET_SUBJECT',
    subject
  }
}

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}

export const setToast = (toast) => {
  return {
    type: 'SET_TOAST',
    toast
  }
}

export const clearToast = () => {
  return {
    type: 'CLEAR_TOAST'
  }
}
