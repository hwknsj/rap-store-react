import React, { Component } from 'react'
import { formatPrice } from '../helpers'
import { Media, Image, Clearfix } from 'react-bootstrap'

class Album extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index)
  }

  render () {
    const { image, name, artist, price, desc, status } = this.props.details
    const isAvailable = status === 'available'
    const albumInstance = (
      <Media className='menu-album'>
        {/* <Media.Left> */}
        {/* </Media.Left> */}
        <Media.Body>
          <Media.Heading className='album-name'>
            <span>{name} <br />
              <small className='artist-name'>{artist}</small>
            </span>
            <span className='price'>{formatPrice(price)}</span>
          </Media.Heading>
          <Image src={image} alt={name} className='img' />
          <p>{desc}</p>
          <Clearfix></Clearfix>
          <button
            className={isAvailable ? 'pull-right' : ''}
            disabled={!isAvailable}
            onClick={this.handleClick} >
            {isAvailable ? 'Get It' : 'Too late, bruh'}
          </button>
        </Media.Body>
      </Media>
    )
    return ( albumInstance )
    //   {/*<li className='menu-album'>
    //     <img src={image} alt={name} />
    //     <h3 className='album-name'>
    //       {name}
    //       <span className='price'>{formatPrice(price)}</span>
    //     </h3>
    //     <p>{desc}</p>
    //     <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to Order' : 'Gone, bruh'}</button>
    //   </li>
    // )*/}
  }
}

export default Album
