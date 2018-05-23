import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import render from 'react-dom'
import { getFunName } from '../helpers.js'

class StorePicker extends Component {
  // constructor () {
  //   super()
  //   this.goToStore = this.goToStore.bind(this)
  // }
  static propTypes = {
    history: PropTypes.object
  }

  // myInput is a prop on the component
  myInput = React.createRef()

  // Use arrow function if we want to use 'this' keyword
  goToStore = event => {
    // Stop the form from submitting
    event.preventDefault()
    //console.log(this.setStore)
    const storeName = this.myInput.current.value
    this.props.history.push(`/store/${storeName}`)
  }

  // componentDidMount () {
  //   console.log('Mounted!')
  // }

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        {/* comment */}
        <h2>Please Enter a Store</h2>
        <input
          type='text'
          ref={this.myInput}
          required
          placeholder='Store Name'
          defaultValue={getFunName()}
        />
        <button type='submit'>Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker
