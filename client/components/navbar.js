import React from 'react'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="Start"></input>
        <input type="text" placeholder="Finish"></input>
        <button>Search</button>
      </div>
    )
  }
}

export default NavBar