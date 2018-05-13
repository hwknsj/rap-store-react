import React, { Component } from 'react'
import { formatPrice } from '../helpers'

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.albums[key]
    const count = this.props.order[key]
    // NOTE: this makes sure we don't see anything until fish have been loaded from firebase
    if (!fish) return null
    // NOTE: 'fish && fish.status' is a cheap fix. Reloading page will quickly flash 'Sorry fish is no longer available'
    const isAvailable = fish && fish.status === 'available'

    if (!isAvailable) {
      // FIXME: I'm not sure why this won't work when you change fish.status to 'unavailable'
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available.
        </li>
      )
    }
    return (
      <li key={key}>
        {count} lbs {fish.name} &ndash; {formatPrice(count * fish.price)}
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.albums[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + count * fish.price
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total: &nbsp;
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
