import React from 'react'
import NavBar from './navbar.js'
import { Route } from 'react-router-dom'
import TripPage from './trippage.js'
import LandingPage from './landingpage.js'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <NavBar />
        <Route path="/" component={LandingPage} />
        <Route path="/trippage" component={TripPage} />
      </div>
    )
  }
}

export default App