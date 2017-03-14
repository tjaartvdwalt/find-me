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
    onCenterChanged={props.onMapCenterChanged}
    onZoomChanged={props.onMapZoomChanged}
    >
    <Marker
      position={ props.center}
      />
  </GoogleMap>
  )
})

export default class extends Component {
  // handleMapLoad = this.handleMapLoad.bind(this);
  // handleCenterChanged = this.handleCenterChanged.bind(this);

  // handleCenterChanged () {
  //   this.props.lat = this._mapComponent.getCenter().lat()
  //   this.props.lon = this._mapComponent.getCenter().lng()
  //   if (this._mapComponent) { console.log('center changed') }
  // }
  // handleMapLoad (map) {
  //   console.log('handle map load')
  //   this._mapComponent = map
  //   if (map) {
  //     console.log('map loaded')
  //     console.log(this._mapComponent)
  //   }
  // }

  render () {
    return (
      <div style={{height: '100%'}}>
        <MyGoogleMap
          center={{ lat: this.props.lat, lng: this.props.lon }}
          zoom={this.props.zoom}
          containerElement={
              <div style={{height: '100%'}}/>
              }

              mapElement={
                  <div style={{height: '100%'}}/>
                  }
                  onMapCenterChanged={this.props.mapCenterChanged}
                  onMapZoomChanged={this.props.mapZoomChanged}
                  onMapLoad={this.handleMapLoad}
                  onMapClick={this.handleMapClick}
                  onMarkerRightClick={this.handleMarkerRightClick}
                  />
      </div>
    )
  }
}
