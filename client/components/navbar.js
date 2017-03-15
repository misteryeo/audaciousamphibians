import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>RoadChip</h1>
        <Link className="login" to="/login">Login</Link>
        <input type="text" placeholder="Start"></input>
        <input type="text" placeholder="Finish"></input>
        <Link className="search" to="/trippage">Search</Link>
      </div>
    )
  }
}

export default NavBar