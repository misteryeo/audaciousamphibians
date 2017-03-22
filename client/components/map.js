import React from 'react'
import DrivingGoogleMap from './googleMap'
import $ from 'jQuery'
import axios from 'axios'


class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null,
      midpoint: null,
      radius: null
    }
    this.getFood = this.getFood.bind(this);
    this.getAttractions = this.getAttractions.bind(this);
  }

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
    this.getMidpoint(this.getFood,this.getAttractions);
  }

  // https://developers.google.com/maps/documentation/javascript/examples/directions-simple

  getMidpoint(cb1, cb2) {
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
            console.log('midLat', midLat);
            var midLong = (startCoords.lng + endCoords.lng) / 2;
            console.log('midLong', midLong);
            this.setState({
              midpoint: {
                lat: midLat,
                lng: midLong
              }
            })
            var radiusKm = this.calcRadius(startCoords.lat, startCoords.lng, this.state.midpoint.lat, this.state.midpoint.lng);
            var radiusM = radiusKm * 1000;
            console.log('radiusM', radiusM);
            this.setState({
              radius: radiusM
            })
            cb1();
            cb2();
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

  calcRadius(lat1,lon1,lat2,lon2){
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
  }

  getFood() {
    var food = [];
    $.ajax({
      url: '/places',
      method: 'POST',
      data: {
        radius: this.state.radius,
        coords: this.state.midpoint.lat + ',' + this.state.midpoint.lng,
        type: 'restaurant'
      },
      success: (data) => {
        console.log('Client Get Food Success', JSON.parse(data).results);
        food = food.concat(JSON.parse(data).results);
        this.props.setFood(food);
      },
      error: (error) => {
        console.error('Client Error', error);
      }
    })
  }

  getAttractions() {
    var attractions = [];
    var context = this;

    function getPark() {
      return axios.post('/places', {
        coords: context.state.midpoint.lat + ',' + context.state.midpoint.lng, 
        radius: context.state.radius,
        type: 'park'
      })
      .then(function (response) {
        console.log('Park Response', response);
        attractions = attractions.concat(response.data.results);
      })
      .catch(function (error) {
        console.log('Park Error', error);
      });
    }

    function getCampground() {
      return axios.post('/places', {
        coords: context.state.midpoint.lat + ',' + context.state.midpoint.lng, 
        radius: context.state.radius,
        type: 'campground'
      })
      .then(function (response) {
        console.log('Campground Response', response);
        attractions = attractions.concat(response.data.results);
      })
      .catch(function (error) {
        console.log('Campground Error', error);
      });
    }

    function getAmusementPark() {
      return axios.post('/places', {
        coords: context.state.midpoint.lat + ',' + context.state.midpoint.lng, 
        radius: context.state.radius,
        type: 'amusement_park'
      })
      .then(function (response) {
        console.log('Amusement Park Response', response);
        attractions = attractions.concat(response.data.results);
      })
      .catch(function (error) {
        console.log('Amusement Park Error', error);
      });
    }

    function getMuseum() {
      return axios.post('/places', {
        coords: context.state.midpoint.lat + ',' + context.state.midpoint.lng, 
        radius: context.state.radius,
        type: 'museum'
      })
      .then(function (response) {
        console.log('Museum Response', response);
        attractions = attractions.concat(response.data.results);
      })
      .catch(function (error) {
        console.log('Museum Error', error);
      });
    }

    axios.all([getPark(), getCampground(), getAmusementPark(), getMuseum()])
      .then(axios.spread(function (acct, perms) {
        // Both requests are now complete
        context.props.setAttractions(attractions);
      }));

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




// park
// campground
// museum
// amusement_park

// bar
// cafe
// restaurant



