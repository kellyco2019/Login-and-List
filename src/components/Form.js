import React from 'react'

class Form extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
    const { buttonText, disabled, handleSubmit } = this.props

    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(this.state)
      }}>
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
          disabled={disabled}
        >
          {buttonText}
        </button>
      </form>
    )
  }
}

export default Form
