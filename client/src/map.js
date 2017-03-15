/* global google */

import {
  default as React,
  Component
} from 'react'

import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

const MyGoogleMap = withGoogleMap(props => {
  return (
  <GoogleMap
    ref={props.onMapLoad}
    zoom={props.zoom}
    center={props.center}
    onClick={props.onMapClick}
    onZoomChanged={props.onMapZoomChanged}
    >
    <Marker
      position={ props.marker}
      />
  </GoogleMap>
  )
})

export default class extends Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        <MyGoogleMap
          center={this.props.center}
          marker={this.props.marker}
          zoom={this.props.zoom}
          containerElement={
              <div style={{height: '100%'}}/>
              }

              mapElement={
                  <div style={{height: '100%'}}/>
                  }
                  onMapClick={this.props.mapClick}
                  onMapZoomChanged={this.props.mapZoomChanged}
                  />
      </div>
    )
  }
}
