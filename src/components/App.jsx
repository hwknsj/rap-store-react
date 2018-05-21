import React, { Component } from 'react'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'
// import _ from 'lodash'
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
    // Sort by artist names
    //albums.onReOrder()
    // Set that to state
    this.setState({ albums })
  }

  deleteAlbum = (key) => {
    // Take a copy of current state
    const albums = { ...this.state.albums }
    // Update state to null (required by firebase)
    albums[key] = null
    // Set that to state
    this.setState({ albums })
  }

  loadSampleAlbums = (key) => {
    console.log(sampleAlbums, Object.keys(sampleAlbums))
    // const sortedAlbums = _.orderBy(sampleAlbums, 'artist', 'desc')
    //console.log(sortedAlbums)
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

  removeFromOrder = key => {
    // Copy the current state
    const order = { ...this.state.order }
    // Either decrease qty by 1, or delete
    // NOTE: delete is ok here because order is held in localStorage
    // TODO: Make this more concise
    if (order[key] > 1) {
      order[key] -= 1
    } else {
      delete order[key]
    }
    // Call setState to update our state object
    this.setState({ order })
  }

  render () {
    return (
      <div>
        <PageHeader>
          {this.props.match.params.storeID} Online Store
        </PageHeader>
        <Grid className='rap-caviar' fluid>
          <Row className='show-grid'>
            <Col xs={6} md={4} className='menu'>
              <Header tagline={this.props.match.params.storeID} />
              <ul className='albums'>
                {Object.keys(this.state.albums).map(key => (
                  <Album
                    key={key}
                    index={key}
                    details={this.state.albums[key]}
                    addToOrder={this.addToOrder} />)
                )}
              </ul>
            </Col>
            {/* Could use spread, <Order {...this.state} /> */}
            <Col xs={3} md={4} className='order'>
              <Order
                albums={this.state.albums}
                order={this.state.order}
                removeFromOrder={this.removeFromOrder}
              />
            </Col>
            <Col xs={3} md={4} className='inventory'>
              <Inventory
                addAlbum={this.addAlbum}
                updateAlbum={this.updateAlbum}
                deleteAlbum={this.deleteAlbum}
                loadSampleAlbums={this.loadSampleAlbums}
                albums={this.state.albums}
                storeID={this.props.match.params.storeID}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
