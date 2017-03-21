import React from 'react'
import POIEntry from './poiEntry.js'

class POI extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="poi">
        <div>
          <input type="text" placeholder="Start"></input>
          <input type="text" placeholder="Finish"></input>
          <button onClick={this.requestRoute}>Search</button>
        </div>
        <div>
          {/*}<Link className="search" to="/trippage">Search</Link>*/}
          {
            this.props.markers.map((entry) => {
              return (<POIEntry {...entry} key={entry.place_id}/>)
            })
          }
        </div>
      </div>
    )
  }
}

export default POI
