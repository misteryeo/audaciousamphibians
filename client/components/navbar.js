import React from 'react'
import { Link, Route } from 'react-router-dom'
import Login from './login.js'
import Signup from './signup.js'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="navbar">
        <Link className="heading" to="/"><h1>RoadChip</h1></Link>
        <Link className="signup" to="/signup">Sign Up</Link>
        <Link className="login" to="/login">Login</Link>
      </div>
    )
  }
}

export default NavBar