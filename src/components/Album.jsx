import React, { Component } from 'react'
import { formatPrice } from '../helpers'

class Album extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index)
  }
  render () {
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = status === 'available'
    return (
      <li className='menu-album'>
        <img src={image} alt={name} />
        <h3 className='album-name'>
          {name}
          <span className='price'>{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to Order' : 'Gone, bruh'}</button>
      </li>
    )
  }
}

export default Album