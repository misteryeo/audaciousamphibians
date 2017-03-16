import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <input placeholder="Username"></input>
        <input placeholder="Password"></input>
        <input placeholder="Email"></input>
        <button>Sign Up</button>
      </div>
    )
  }
}

export default Signup
