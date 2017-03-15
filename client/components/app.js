import React from 'react'
import LandingPage from './landingpage.js'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>RoadChip</h1>
        <LandingPage />
      </div>
    )
  }
}

export default App