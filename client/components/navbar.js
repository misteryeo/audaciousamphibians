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
      <div>
        <h1>RoadChip</h1>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default NavBar
