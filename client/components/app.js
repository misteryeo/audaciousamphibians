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
  }

  render() {
    return(
      <div>
        <NavBar />
        <Route exact path="/" component={LandingPage}/>
        <Route path="/trip" component={TripPage}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </div>
    )
  }
}

export default App
