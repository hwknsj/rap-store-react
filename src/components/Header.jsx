import React from 'react'
import PropTypes from 'prop-types'

// Stateless functional component
const Header = props => (
  // There is no 'this' when using a function
  // return () not necessary
  <header className='top'>
    <h1>
      {props.tagline}
    </h1>
    <h1>
      <small>FRESH OUT THE BOX</small>
    </h1>
    <h3 className='tagline'>
      <span>Presented by joel.fm</span>
    </h3>
  </header>
)

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

/* Class definition
class Header extends Component {
  render () {
    return (
      <header className='top'>
        <h1>
          Catch
          <span className='ofThe'>
            <span className='of'>Of</span>
            <span className='the'>The</span>
          </span>
          Day
        </h1>
        <h3 className='tagline'>
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    )
  }
} */

export default Header
