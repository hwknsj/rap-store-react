import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Glyphicon } from 'react-bootstrap'
import { formatPrice } from '../helpers'

class Order extends Component {
  static propTypes = {
    albums: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      artist: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = key => {
    const album = this.props.albums[key]
    const count = this.props.order[key]
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 250, exit: 250 }
    }
    // NOTE: this makes sure we don't see anything until album have been loaded from firebase
    if (!album) return null
    // NOTE: 'album && album.status' is a cheap fix. Reloading page will quickly flash 'Sorry album is no longer available'
    const isAvailable = album && album.status === 'available'

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}
        >
          <li key={key} className='unavailable'>
            Sorry, &nbsp; <em>{album ? album.name : 'album'}</em> &nbsp; is fresh out, homie.
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key} className='order-item'>
          <TransitionGroup component='span' className='order-qty'>
            <CSSTransition
              classNames='order-qty'
              key={count}
              timeout={ { enter: 250, exit: 250 } }
            >
              <span className='order-qty'><strong>{count}</strong></span>
            </CSSTransition>
          </TransitionGroup>
          <span className='order-title'><em>{album.name}</em></span>
          <span className='order-price'>
            <strong className='price'>{formatPrice(count * album.price)}</strong>
          </span>
          <button
            className='order-remove'
            onClick={() => this.props.removeFromOrder(key)}>
            <Glyphicon glyph='remove' />
          </button>
        </li>
      </CSSTransition>
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
          <span className='order-qty'>Qty.</span>
          <span className='order-title'>Album</span>
          <span className='order-price'>Price</span>
        </div>
        {/* <ul className='order'> */}
        <TransitionGroup component='ul' className='order'>
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        {/* </ul> */}
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
