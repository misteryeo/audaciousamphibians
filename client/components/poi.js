import React from 'react'

const dummyData = {
  results: [
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
  ],
  status: 'OK'
}

class POI extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="poi">
        <input type="text" placeholder="Start"></input>
        <input type="text" placeholder="Finish"></input>
        {/*}<Link className="search" to="/trippage">Search</Link>*/}
        Here is the POI component
        <button onClick={this.requestRoute}>Search</button>
      </div>
    )
  }
}

export default POI
