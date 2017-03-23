import email from './email'
import * as types from '../constants/actions'

describe('email reducer', () => {
  it('should return the initial state', () => {
    expect(email(undefined, {})).toEqual({
      address: '',
      subject: 'my location',
      message: ''
    })
  })

  it('should return the current state', () => {
    expect(email({address: 'my@test.com', subject: 'test subject', message: 'test message'},
                 {type: 'INVALID_TYPE'}))
      .toEqual({address: 'my@test.com', subject: 'test subject', message: 'test message'})
  })

  it('should handle SET_ADDRESS', () => {
    expect(
      email({}, {
        type: types.SET_ADDRESS,
        address: 'my@email.com'
      })
    ).toEqual(
      {
        address: 'my@email.com'
      }
    )
  })

  it('should handle SET_SUBJECT', () => {
    expect(
      email({}, {
        type: types.SET_SUBJECT,
        subject: 'custom subject'
      })
    ).toEqual(
      {
        subject: 'custom subject'
      }
    )
  })

  it('should handle SET_MESSAGE', () => {
    expect(
      email({}, {
        type: types.SET_MESSAGE,
        message: 'custom message'
      })
    ).toEqual(
      {
        message: 'custom message'
      }
    )
  })
})
