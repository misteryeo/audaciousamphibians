import React from 'react'
import POI from './poi.js'
import MapPage from './map.js'

class TripPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: [],
      attractions: [],
      selectedPOI: null
    }

    this.setFood = this.setFood.bind(this);
    this.setAttractions = this.setAttractions.bind(this);
    this.setSelectedPOI = this.setSelectedPOI.bind(this);
  }

  setFood (food) {
    this.setState({
      food: food
    })
  }

  setAttractions (attractions) {
    this.setState({
      attractions: attractions
    })
  }

  setSelectedPOI (selected) {
    this.setState({
      selectedPOI: selected
    })
  }

  render() {
    return(
      <div id="trip">
        <POI food={this.props.food} 
          attractions={this.props.attractions} 
          foodMarker={this.state.food} 
          attractionsMarker={this.state.attractions}
          setSelectedPOI={this.setSelectedPOI}
        />
        <MapPage 
          start={this.props.start} 
          end={this.props.end}
          setFood={this.setFood}
          setAttractions={this.setAttractions}
          setSelectedPOI={this.setSelectedPOI}
        />
      </div>
    )
  }
}

export default TripPage
