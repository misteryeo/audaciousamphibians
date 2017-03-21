import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

const dummyData = [
    {
      geometry : {
        location: {
          lat: -33.870775,
          lng: 151.199025
        }
      },
      icon: "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
      name: 'Rhythmboat Cruises',
      place_id: 'ChIJyWEHuEmuEmsRm9hTkapTCrk',
      types: [ "travel_agency", "restaurant", "food", "establishment" ]
    },
    {
      geometry : {
        location: {
          lat: -33.866891,
          lng: 151.200814
        }
      },
      icon: "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      name: "Private Charter Sydney Habour Cruise",
      place_id: "ChIJqwS6fjiuEmsRJAMiOY9MSms",
      types: [ "restaurant", "food", "establishment" ]
    },
    {
      geometry : {
        location: {
          lat: -33.867591,
          lng: 151.201196
        }
      },
      icon: "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
      name: "Australian Cruise Group",
      place_id: "ChIJrTLr-GyuEmsRBfy61i59si0",
      types: [ "travel_agency", "restaurant", "food", "establishment" ]
    }
  ];

class TripPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: dummyData
    }
  }

  render() {
    return(
      <div id="trip">
        <POI food={this.props.food} attractions={this.props.attractions} markers={this.state.markers}/>
        <MapPage start={this.props.start} end={this.props.end}/>
      </div>
    )
  }
}

export default TripPage
