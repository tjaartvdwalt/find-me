import { setEmail, setSubject, setMessage,
         setToast, clearToast } from '../actions'

export const mapStateToProps = (state, ownProps) => {
  return state.locations
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setEmail: (val) => {
      dispatch(setEmail(val))
    },

    setToast: (toast) => {
      dispatch(setToast(toast))
    },

    clearToast: () => {
      dispatch(clearToast())
    },

    setMessage: (val) => {
      dispatch(setMessage(val))
    },

    setSubject: (subject) => {
      dispatch(setSubject(subject))
    }
  }
}
