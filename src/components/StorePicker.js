import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getHipName } from '../helpers.js'

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  // myInput is a prop on the component
  myInput = React.createRef()

  // Use arrow function if we want to use 'this' keyword
  goToStore = event => {
    // Stop the form from submitting
    event.preventDefault()
    const storeName = this.myInput.current.value
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Enter Store Name <br /><small>Cop The Latest Drop | Manage Inventory</small></h2>
        <input
          type='text'
          ref={this.myInput}
          required
          placeholder='Store Name'
          defaultValue={getHipName()}
        />
        <button type='submit'>Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker
