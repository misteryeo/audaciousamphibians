import React from 'react'

const POIEntry = (props) => (
  <div className='poiEntries'>
    <div className='icon'><img src={props.icon}/> 
    </div>
    <div className='title'> {props.name}
    </div>
    <div className='clear'></div>
  </div>
)

export default POIEntry