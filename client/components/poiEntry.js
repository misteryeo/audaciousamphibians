import React from 'react'

const POIEntry = (props) => (
  <div>
    <div className='icon'><img src={props.icon}/> 
    </div>
    <div className='title'> {props.name}
    </div>
  </div>
)

export default POIEntry