import React from 'react'

class POI extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="Start"></input>
        <input type="text" placeholder="Finish"></input>
        <Link className="search" to="/trippage">Search</Link>
      </div>
    )
  }
}

export default POI