import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <POI food={this.props.food} attractions={this.props.attractions}/>
        <MapPage />
      </div>
    )
  }
}

export default TripPage
