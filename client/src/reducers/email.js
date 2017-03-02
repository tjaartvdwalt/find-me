export default (state, action) => {
  switch (action.type) {
    case 'SET_LAT':
      return state.setIn(['lat', 'val'], action.text)
    case 'SET_LON':
      return state.setIn(['lon', 'val'], action.text)
    case 'SET_SUBJECT':
      return state.setIn(['subject', 'val'], action.text)
    case 'SET_MESSAGE':
      return state.setIn(['message', 'val'], action.text)
    case 'SET_EMAIL':
      return state.setIn(['email', 'val'], action.text)
    case 'customLocation':
      return state.setIn(['customLocation', 'val'], action.text)
    default:
  }
}

