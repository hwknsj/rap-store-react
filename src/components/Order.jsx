import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { formatPrice } from '../helpers'

class Order extends Component {
  renderOrder = key => {
    const album = this.props.albums[key]
    const count = this.props.order[key]
    // NOTE: this makes sure we don't see anything until album have been loaded from firebase
    if (!album) return null
    // NOTE: 'album && album.status' is a cheap fix. Reloading page will quickly flash 'Sorry album is no longer available'
    const isAvailable = album && album.status === 'available'

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry, {album ? album.name : 'album'} is fresh out, homie.
        </li>
      )
    }
    return (
      // <li key={key} className='order-item'>
      //   <strong>{count}</strong> <em>{album.name}</em> {formatPrice(count * album.price)}
      // </li>
      <li key={key} className='order-item'>
        <strong>{count}</strong> <em>{album.name}</em> {formatPrice(count * album.price)}
        <button className='order-remove'><Glyphicon glyph='remove' /></button>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const album = this.props.albums[key]
      const count = this.props.order[key]
      const isAvailable = album && album.status === 'available'
      if (isAvailable) {
        return prevTotal + count * album.price
      }
      return prevTotal
    }, 0)
    return (
      <div className='order-wrap'>
        <h2>Order</h2>
        <div className='order-headings'>
          <span className='order-qty'>Qty</span>
          <span className='order-title'>Album</span>
          <span className='order-price'>Price</span>
        </div>
        <ul className='order'>{orderIds.map(this.renderOrder)}</ul>
        {/* <ListGroup className='order'>
          {orderIds.map(this.renderOrder)}
        </ListGroup> */}
        <div className='total'>
          Total: &nbsp;
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
