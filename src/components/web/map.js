/* global google */
import React from 'react'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import { connect } from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../../containers/map.js'

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

const MapComponent = class extends React.Component {
  componentWillMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
        this.props.setMarker({lat: position.coords.latitude, lng: position.coords.longitude})
      }, (err) => {
        console.error(err)
      })
    }
  }

  render () {
    let self = this
    return (
      <div style={{height: '100%'}}>
        <MyGoogleMap
          center={this.props.center}
          marker={this.props.marker}
          zoom={this.props.zoom}
          containerElement={
              <div style={{height: '100%'}}/>
              }

              mapElement={<div style={{height: '100%'}}/>}
              onMapClick={function (e) {
                self.props.setMarker({lat: e.latLng.lat(), lng: e.latLng.lng()})
              }
              }
              onMapZoomChanged={function () { self.props.setZoom(this.zoom) }}
              />
      </div>
    )
  }
}

const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)

export default Map
