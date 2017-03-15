import React from 'react'
import POI from './POI.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <POI />
        <Map />
      </div>
    )
  }
}

export default TripPage