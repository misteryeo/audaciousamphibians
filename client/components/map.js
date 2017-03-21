import React from 'react'

class MapPage extends React.Component {
  constructor(props) {
    super(props)
  }

  // https://developers.google.com/maps/documentation/javascript/examples/directions-simple
  componentDidMount() {
    console.log(this.props);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
    this.calculateAndDisplayRoute(directionsService, directionsDisplay, this.props.start, this.props.end);
  }


  calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    return(
      <div id="map">
      </div>
    )
  }
}

export default MapPage
