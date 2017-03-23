import * as types from '../constants/actions'

const initState = {
  center: {lat: 0, lng: 0},
  marker: {lat: 0, lng: 0},
  zoom: 17
}

const locations = (state = initState, action) => {
  switch (action.type) {
    case types.SET_CENTER:
      return Object.assign({}, state, {center: action.center})
    case types.SET_MARKER:
      return Object.assign({}, state, {marker: action.marker})
    case types.SET_ZOOM:
      return Object.assign({}, state, {zoom: action.zoom})
    default:
      return state
  }
}

export default locations
