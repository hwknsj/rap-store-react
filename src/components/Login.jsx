import React from 'react'
import PropTypes from 'prop-types'

// NOTE: Do not need this keyword.
// Stateless functional component! Must pass props
const Login = props => (
  <nav className='login'>
    <h2>Inventory Login</h2>
    <p>Sign in to manage your inventory</p>
    <button
      className='facebook'
      onClick={() => props.authenticate('Facebook')}
    >
      Login with Facebook
    </button>
  </nav>
)

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login
