import * as types from '../constants/actions'
import * as actions from './index'

describe('actions', () => {
  it('should create an action to set the map center', () => {
    const center = {lat: 32, lng: 64}
    const expectedAction = {
      type: types.SET_CENTER,
      center
    }
    expect(actions.setCenter(center)).toEqual(expectedAction)
  })

  it('should create an action to set the marker position', () => {
    const marker = {lat: 42, lng: 35}
    const expectedAction = {
      type: types.SET_MARKER,
      marker
    }
    expect(actions.setMarker(marker)).toEqual(expectedAction)
  })

  it('should create an action to set the zoom', () => {
    const zoom = 12
    const expectedAction = {
      type: types.SET_ZOOM,
      zoom
    }
    expect(actions.setZoom(zoom)).toEqual(expectedAction)
  })

  it('should create an action to set the email address', () => {
    const address = 'test@me.com'
    const expectedAction = {
      type: types.SET_ADDRESS,
      address
    }
    expect(actions.setAddress(address)).toEqual(expectedAction)
  })

  it('should create an action to set the email subject line', () => {
    const subject = 'my custom subject'
    const expectedAction = {
      type: types.SET_SUBJECT,
      subject
    }
    expect(actions.setSubject(subject)).toEqual(expectedAction)
  })

  it('should create an action to set the email message', () => {
    const message = 'my custom message'
    const expectedAction = {
      type: types.SET_MESSAGE,
      message
    }
    expect(actions.setMessage(message)).toEqual(expectedAction)
  })
})

