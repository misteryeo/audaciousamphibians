import React from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="landingpage">
        <input className="start" type="text" placeholder="Start"></input>
        <input className="finish" type="text" placeholder="Finish"></input>
        <Link className="search" to="/trippage">Search</Link>
      </div>
    )
  }
}

export default LandingPage