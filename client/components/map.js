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
    this.setFoodMarkers = this.setFoodMarkers.bind(this)
    this.setAttractionsMarkers = this.setAttractionsMarkers.bind(this)
    this.findAllPlacesAlongRoute = this.findAllPlacesAlongRoute.bind(this)
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
      attractionsMarker: [
        ...this.state.attractionsMarker,
        ...this.mapToMarkers(attr)
      ]
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
        this.findAllPlacesAlongRoute(result)
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  // Docs - https://developers.google.com/maps/documentation/javascript/directions#DirectionsResults
  findAllPlacesAlongRoute(directions) {
    let context = this
    let memo = {}
    this.setState({
      directions: directions,
    });
    directions.routes.forEach(route => {
      route.legs.forEach(leg => {
        leg.steps.forEach(step => {
          // get midpoint from start_location (step start) to end_location (start of next step)
          let lat = (step.start_location.lat() + step.end_location.lat()) / 2
          let lng = (step.start_location.lng() + step.end_location.lng()) / 2
          //let midpoint = new google.maps.LatLng(lat, lng)
          let midpoint = {lat: lat, lng: lng}
          // get radius from midpoint to end_location
          let radius = this.calcRadius(step.start_location.lat(), step.start_location.lng(), step.end_location.lat(), step.end_location.lng()) * 1000
          // call api for both categories (food and attractions) on this midpoint and radius
          this.getPlaces(midpoint, radius, 'restaurant')
          .then(data => {
            let food = data.data.results
            context.setFoodMarkers(food)
            context.props.setFood(food);
          })

          axios.all([
            this.getPlaces(midpoint, radius, 'park'),
            this.getPlaces(midpoint, radius, 'campground'),
            this.getPlaces(midpoint, radius, 'amusement_park'),
            this.getPlaces(midpoint, radius, 'museum')
          ])
          .then(axios.spread((parks, campgrounds, amusements, museums) => {
            let collection = []
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
        })
      })
    })
  }

  getPlaces(midpoint, radius, type) {
    return axios.post('/places', {
      coords: midpoint.lat + ',' + midpoint.lng,
      radius: radius,
      type: type
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
