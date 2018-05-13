import React, { Component } from 'react'
import Header from './Header.jsx'
import Inventory from './Inventory.jsx'
import Order from './Order.jsx'
import sampleAlbums from '../sample-albums'
import Album from './Album.jsx'
import base from '../base'

class App extends Component {
  state = {
    albums: {},
    order: {}
  }

  componentDidMount () {
    const { params } = this.props.match
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeID)
    // console.log(localStorageRef)
    if (localStorageRef) this.setState({ order: JSON.parse(localStorageRef) })
    // Set up syncState
    // NOTE: w/ no modification to Order.jsx, the if statement above runs *before* firebase can populate it
    this.ref = base.syncState(`${params.storeID}/albums`, {
      context: this,
      state: 'albums'
    })
  }

  componentDidUpdate () {
    // console.log(this.props.match.params.storeID, JSON.stringify(this.state.order))
    localStorage.setItem(this.props.match.params.storeID, JSON.stringify(this.state.order))
  }

  componontWillUnmount () {
    base.removeBinding(this.ref)
  }

  addAlbum = album => {
    // Take a copy of the existing state
    const albums = { ...this.state.albums }
    // Add new album to that albums variable
    albums[`album${Date.now()}`] = album
    // Set new albums object to state
    this.setState({ albums })
  }

  updateAlbum = (key, updatedAlbum) => {
    // Take a copy of current state
    const albums = { ...this.state.albums }
    // Update that state
    albums[key] = updatedAlbum
    // Set that to state
    this.setState({ albums })
  }

  loadSampleAlbums = () => {
    this.setState({ albums: sampleAlbums })
  }

  addToOrder = key => {
    // Take a copy of state
    const order = { ...this.state.order }
    // Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1
    // Call setState to update our state object
    this.setState({ order })
  }

  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Most Necessary By Joel' />
          <ul className='albums'>
            {Object.keys(this.state.albums).map(key => (
              <Album
                key={key}
                index={key}
                details={this.state.albums[key]}
                addToOrder={this.addToOrder} />)
            )}
          </ul>
        </div>
        {/* Could use spread, <Order {...this.state} /> */}
        <Order albums={this.state.albums} order={this.state.order} />
        <Inventory
          addAlbum={this.addAlbum}
          updateAlbum={this.updateAlbum}
          loadSampleAlbums={this.loadSampleAlbums}
          albums={this.state.albums}
         />
      </div>
    )
  }
}

export default App
