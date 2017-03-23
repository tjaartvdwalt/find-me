import location from './location'
import * as types from '../constants/actions'

describe('location reducer', () => {
  it('should return the initial state', () => {
    expect(location(undefined, {})).toEqual({
      center: {lat: 0, lng: 0},
      marker: {lat: 0, lng: 0},
      zoom: 17
    })
  })

  it('should return the current state', () => {
    expect(location({center: {lat: 35, lng: 10}}, {type: 'INVALID_TYPE'})).toEqual({
      center: {lat: 35, lng: 10}
    })
  })

  it('should handle SET_CENTER', () => {
    expect(
      location({}, {
        type: types.SET_CENTER,
        center: {lat: 30, lng: 64}
      })
    ).toEqual(
      {
        center: {lat: 30, lng: 64}
      }
    )
  })

  it('should handle SET_MARKER', () => {
    expect(
      location({}, {
        type: types.SET_MARKER,
        marker: {lat: 23, lng: 37}
      })
    ).toEqual(
      {
        marker: {lat: 23, lng: 37}
      }
    )
  })

  it('should handle SET_ZOOM', () => {
    expect(
      location({}, {
        type: types.SET_ZOOM,
        zoom: 12
      })
    ).toEqual(
      {
        zoom: 12
      }
    )
  })
})
