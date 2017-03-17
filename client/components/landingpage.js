import React from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  updateFilters(){
    // Get the values of the checkboxes (booleans)
    console.log(this)
    var food = this.refs.food.checked; //value of checkbox
    var attractions = this.refs.attractions.checked; //value of checkbox
    this.props.setFilters(food, attractions)
  } 

  requestRoute() {
   console.log('Sending search request to Google Maps API')
  }

  render() {
    return(
      <div id="landingpage">
        <input className="start" type="text" placeholder="Start"></input>
        <input className="finish" type="text" placeholder="Finish"></input>
        <button className="search" onClick={this.updateFilters}>Search</button>
        <input ref="food" type="checkbox"></input>
        <input ref="attractions" type="checkbox"></input>
      </div>
    )
  }
}

export default LandingPage
