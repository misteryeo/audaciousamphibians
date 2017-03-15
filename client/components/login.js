import React from 'react'
import { Route, Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
      Username: <input></input>
      Password: <input></input>
      <button onClick="KEITH"></button>
      </div>
    )
  }
}

export default Login