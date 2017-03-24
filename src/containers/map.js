import { setCenter, setMarker, setZoom } from '../actions'

export const mapStateToProps = (state, ownProps) => {
  return state.location
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mapClick: (marker) => {
      dispatch(setMarker(marker))
    },

    setCenter: (center) => {
      dispatch(setCenter(center))
    },

    setMarker: (marker) => {
      dispatch(setMarker(marker))
    },

    setZoom: (zoom) => {
      console.log(zoom)
      dispatch(setZoom(zoom))
    }
  }
}

