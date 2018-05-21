import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddAlbumForm extends Component {
  nameRef = React.createRef()
  artistRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  static propTypes = {
    addAlbum: PropTypes.func
  }

  createAlbum = event => {
    // Stop the form from submitting
    event.preventDefault()

    const album = {
      name: this.nameRef.current.value,
      artist: this.artistRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }
    this.props.addAlbum(album)
    // Refresh the form
    event.currentTarget.reset()
  }
  render () {
    return (
      <form className='album-edit' onSubmit={this.createAlbum}>
        <input name='name' ref={this.nameRef} type='text' placeholder='Name' />
        <input name='artist' ref={this.artistRef} type='text' placeholder='Artist' />
        <input name='price' ref={this.priceRef} type='number' placeholder='Price' />
        <textarea name='desc' ref={this.descRef} placeholder='Desc' />
        <input name='image' ref={this.imageRef} type='text' placeholder='Image path' />
        <select name='status' ref={this.statusRef} type='text' placeholder='Status'>
          <option value='available'>Fresh In Stock</option>
          <option value='unavailable'>We out</option>
        </select>
        <button type='submit'>+ Add Album</button>
      </form>
    )
  }
}

export default AddAlbumForm
