import React from 'react'
import DrivingGoogleMap from './googleMap'
import $ from 'jQuery'
import axios from 'axios'

class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null,
      foodMarkers: [],
      attractionsMarker: [],
      midpoint: null,
      radius: null
    }
    this.getFood = this.getFood.bind(this);
    this.getAttractions = this.getAttractions.bind(this);
    this.setFoodMarkers = this.setFoodMarkers.bind(this)
    this.setAttractionsMarkers = this.setAttractionsMarkers.bind(this)
  }

  latlong() {
    return this.state.midpoint.lat + ',' + this.state.midpoint.lng
  }

  allMarkers() {
    return this.state.foodMarkers.concat(this.state.attractionsMarker)
  }

  setFoodMarkers(food) {
    this.setState({
      foodMarkers: this.mapToMarkers(food)
    })
  }

  setAttractionsMarkers(attr) {
    this.setState({
      attractionsMarker: this.mapToMarkers(attr)
    })
  }

  mapToMarkers(places) { // array of objects
    if (!places) return
    return places.reduce((acc, place) => {
      let marker = {}
      marker.position = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng)
      marker.place = {location: marker.position, placeId: place.place_id}
      acc.push(marker)
      return acc
    }, [])
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
        //console.log('Success', data)
        startCoords = data.results[0].geometry.location;
        $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json',
          method: 'GET',
          data: {
            address: end,
            key: 'AIzaSyDDIM1VDHvleJBp4Q5y9vFx8jd6wU8j4pE'
          },
          success: (data) => {
            //console.log('Success', data)
            endCoords = data.results[0].geometry.location;
            var midLat = (startCoords.lat + endCoords.lat) / 2;
            //console.log('midLat', midLat);
            var midLong = (startCoords.lng + endCoords.lng) / 2;
            //console.log('midLong', midLong);
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
        coords: this.latlong(),
        type: 'restaurant'
      },
      success: (data) => {
        //console.log('Client Get Food Success', JSON.parse(data).results);
        food = JSON.parse(data).results
        this.setFoodMarkers(food)
        this.props.setFood(food);
      },
      error: (error) => {
        //console.error('Client Error', error);
      }
    })
  }

  getAttractions() {
    var context = this;

    function getPark() {
      return axios.post('/places', {
        coords: context.latlong(),
        radius: context.state.radius,
        type: 'park'
      })
    }

    function getCampground() {
      return axios.post('/places', {
        coords: context.latlong(),
        radius: context.state.radius,
        type: 'campground'
      })
    }

    function getAmusementPark() {
      return axios.post('/places', {
        coords: context.latlong(),
        radius: context.state.radius,
        type: 'amusement_park'
      })
    }

    function getMuseum() {
      return axios.post('/places', {
        coords: context.latlong(),
        radius: context.state.radius,
        type: 'museum'
      })
    }

    axios.all([getPark(), getCampground(), getAmusementPark(), getMuseum()])
      .then(axios.spread(function (parks, campgrounds, amusements, museums) {
        let collection = []
        let memo = {}
        setTimeout(() => {
          [parks, campgrounds, amusements, museums].forEach(el => {
            el.data.results.forEach(place => {
              if (!memo[place.place_id]) {
                memo[place.place_id] = true
                collection.push(place)
              }
            })
          })
          context.setAttractionsMarkers(collection)
          context.props.setAttractions(collection);
        }, 1000)
      }))
      .catch(err => console.log(err))

  }

  render() {
    return(
      <div id="map">
        <DrivingGoogleMap
          containerElement={<div style={{height: `100%`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
          directions={this.state.directions}
          markers={this.allMarkers()}
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
