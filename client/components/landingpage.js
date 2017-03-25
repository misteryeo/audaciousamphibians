import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'react'
import Search from './search.js'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="landingpage">
        <Search />
      </div>
    )
  }
}

export default LandingPage
