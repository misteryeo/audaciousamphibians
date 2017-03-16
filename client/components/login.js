import React from 'react'
import { Link, Route } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <input placeholder="Username"></input>
        <input placeholder="Password"></input>
        <button>Login</button>
      </div>
    )
  }
}

export default Login
