import React from 'react'
import PropTypes from "prop-types";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  formValidation = () => {
    const { email, password } = this.state
    const errors = {};
    let isValid = true;

    if (password.trim().length < 6) {
      errors.passwordlength = "email is too short"
      isValid = false
    }
    if (!email.includes("@")) {
      errors.emailValid = "email must includes @"
      isValid = false
    }
    this.setState({ errors });
    return isValid
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    const { history } = this.props;
    const { email, password } = this.state
    e.preventDefault()
    let isValid = this.formValidation()
    if (isValid) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password)
      history.push("/");
    }
  }

  render() {
    const { email, password, errors } = this.state
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
          onClick={this.handleSubmit}
          type="submit"
        >
          Enviar
        </button>
        {Object.keys(errors).map((key) => {
          return <div key={key} >{errors[key]} </div> }
        )}
      </form>
    )
  }
}

export default Login
