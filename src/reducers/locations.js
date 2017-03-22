const initState = {
  center: {lat: 0, lng: 0},
  marker: {lat: 0, lng: 0},
  zoom: 17,
  email: '',
  subject: 'my locations',
  message: '',
  toast: undefined
}

const locations = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CENTER':
      return Object.assign({}, state, {center: action.center})
    case 'SET_MARKER':
      return Object.assign({}, state, {marker: action.marker})
    case 'SET_ZOOM':
      return Object.assign({}, state, {zoom: action.zoom})
    case 'SET_EMAIL':
      return Object.assign({}, state, {email: action.email})
    case 'SET_SUBJECT':
      return Object.assign({}, state, {subject: action.subject})
    case 'SET_MESSAGE':
      return Object.assign({}, state, {message: action.message})
    case 'SET_TOAST':
      return Object.assign({}, state, {toast: action.toast})
    case 'CLEAR_TOAST':
      return Object.assign({}, state, {toast: undefined})
    default:
      return state
  }
}

export default locations
