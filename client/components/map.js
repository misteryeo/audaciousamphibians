import React from 'react'
import DrivingGoogleMap from './googleMap'
import $ from 'jQuery'


class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null,
      midpoint: null
    }
  }

  // https://developers.google.com/maps/documentation/javascript/examples/directions-simple
  componentDidMount() {
    const directionsService = new google.maps.DirectionsService
    directionsService.route({
      origin: this.props.start,
      destination: this.props.end,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
    this.getMidpoint();
  }

  getMidpoint() {
    var start = this.props.start;
    var end = this.props.end;
    var startCoords = {};
    var endCoords = {};
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      method: 'GET',
      data: {
        address: start,
        key: 'AIzaSyDDIM1VDHvleJBp4Q5y9vFx8jd6wU8j4pE'
      },
      success: (data) => {
        console.log('Success', data)
        startCoords = data.results[0].geometry.location;
        $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json',
          method: 'GET',
          data: {
            address: end,
            key: 'AIzaSyDDIM1VDHvleJBp4Q5y9vFx8jd6wU8j4pE'
          },
          success: (data) => {
            console.log('Success', data)
            endCoords = data.results[0].geometry.location;
            var midLat = (startCoords.lat + endCoords.lat) / 2;
            var midLong = (startCoords.lng + endCoords.lng) / 2;
            this.setState({
              midpoint: {
                lat: midLat,
                lng: midLong
              }
            })
            console.log(this.state.midpoint);
          },
          error: (error) => {
            console.error('Error', error)
          }
        })
      },
      error: (error) => {
        console.error('Error', error)
      }
    })

  }


  render() {
    return(
      <div id="map">
        <DrivingGoogleMap
          containerElement={<div style={{height: `100%`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
          directions={this.state.directions}
          >
          </DrivingGoogleMap>
      </div>
    )
  }
}

export default MapPage
