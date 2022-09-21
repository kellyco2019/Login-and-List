import React from 'react'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

handleChange = e => {
  const { name, value } = e.target
  this.setState({ [name]: value })
}
handleSubmit = (e) => {
  const { email , password} = this.state
      e.preventDefault()
      localStorage.setItem( 'email', email);
      localStorage.setItem( 'password', password)
}
render() {
  const { email, password } = this.state

  return (
    <form onSubmit={this.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={this.handleChange}
        value={email}
        placeholder="name@test.com"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={this.handleChange}
        value={password}
      />
      <button
        type="submit"
      >
     Enviar
      </button>
    </form>
  )
}
}
  
export default Login
