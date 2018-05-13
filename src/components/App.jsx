import React, { Component } from 'react'
import Header from './Header.jsx'
import Inventory from './Inventory.jsx'
import Order from './Order.jsx'
import sampleFishes from '../sample-fishes'
import Fish from './Fish.jsx'
import base from '../base'

class App extends Component {
  state = {
    fishes: {},
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
    this.ref = base.syncState(`${params.storeID}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate () {
    // console.log(this.props.match.params.storeID, JSON.stringify(this.state.order))
    localStorage.setItem(this.props.match.params.storeID, JSON.stringify(this.state.order))
  }

  componontWillUnmount () {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes }
    // Add new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish
    // Set new fishes object to state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // Take a copy of current state
    const fishes = { ...this.state.fishes }
    // Update that state
    fishes[key] = updatedFish
    // Set that to state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
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
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder} />)
            )}
          </ul>
        </div>
        {/* Could use spread, <Order {...this.state} /> */}
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
         />
      </div>
    )
  }
}

export default App
