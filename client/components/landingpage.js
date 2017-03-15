import React from 'react'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="landingpage">
        <input class="start" type="text" placeholder="Start"></input>
        <input class="finish" type="text" placeholder="Finish"></input>
        <button>Search</button>
      </div>
    )
  }
}

export default LandingPage