import React from 'react'

const POIEntry = (props) => (
  <div className='poiEntries'>
	  <div onClick={props.setSelectedPOI.bind(null, props)}>
	    <div className='icon'><img src={props.icon}/> 
	    </div>
	    <div className='title'> {props.name}
	    </div>
	  </div>
    <div className='clear'></div>
    <div><button>Add To Trip</button></div>
  </div>
)

export default POIEntry