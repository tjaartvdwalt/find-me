import * as types from '../constants/actions'

const initState = {
  address: '',
  subject: 'my location',
  message: ''
}

const email = (state = initState, action) => {
  switch (action.type) {
    case types.SET_ADDRESS:
      return Object.assign({}, state, {address: action.address})
    case types.SET_SUBJECT:
      return Object.assign({}, state, {subject: action.subject})
    case types.SET_MESSAGE:
      return Object.assign({}, state, {message: action.message})
    default:
      return state
  }
}

export default email
