import React from 'react'
import NavBar from './navbar.js'
import { Link, Route } from 'react-router-dom'
import LandingPage from './landingpage'
import TripPage from './trippage'
import Signup from './signup'
import Login from './login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: false,
      attractions: false
    }
    this.setFilters = this.setFilters.bind(this);
  }

  setFilters(food, attractions) {
    // alert(food);
    // alert(attractions);
    this.setState({
      food: food,
      attractions: attractions
    })
  }

  render() {
    return(
      <div>
        <NavBar />
        //
        <Route exact path="/" render={props => (<LandingPage {...props} setFilters={this.setFilters}/>)} />
        <Route food={this.state.food} attractions={this.state.attractions} path="/trip" component={TripPage}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </div>
    )
  }
}

export default App
