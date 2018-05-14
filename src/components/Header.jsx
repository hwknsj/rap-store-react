import React from 'react'

// Stateless functional component
const Header = props => (
  // There is no 'this' when using a function
  // return () not necessary
  <header className='top'>
    <h1>
      MOST NECESSARY
      {/* <span className='ofThe'>
        <span className='of'>joel.biz</span>
        <span className='the'>presents</span>
      </span> */}
    </h1>
    <h3 className='tagline'>
      <span>{props.tagline}</span>
    </h3>
  </header>
)

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
