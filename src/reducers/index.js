import { combineReducers } from 'redux'
import email from './email'
import location from './location'

const app = combineReducers({
  email,
  location
})

export default app
