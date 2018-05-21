import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditAlbumForm extends Component {
  static propTypes = {
    index: PropTypes.string,
    album: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      artist: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    deleteAlbum: PropTypes.func
  }

  handleChange = event => {
    // update that album
    // Take a copy of the current album
    const updatedAlbum = {
      ...this.props.album,
      [event.currentTarget.name]: event.currentTarget.value
    }
    // This change still needs to be reflected in App.jsx
    // NOTE: Need to pass down key ourselves. Check Inventory.jsx
    this.props.updateAlbum(this.props.index, updatedAlbum)
  }

  render () {
    return (
      <div className='album-edit'>
        <input type='text' name='name' onChange={this.handleChange} value={this.props.album.name} />
        <input type='text' name='artist' onChange={this.handleChange} value={this.props.album.artist} />
        <input type='number' name='price' onChange={this.handleChange} value={this.props.album.price} />
        <textarea name='desc' onChange={this.handleChange} value={this.props.album.desc} />
        <input type='text' name='image' onChange={this.handleChange} value={this.props.album.image} />
        <select type='text' name='status' onChange={this.handleChange} value={this.props.album.status}>
          <option value='available'>Fresh In Stock</option>
          <option value='unavailable'>All gone, bruh</option>
        </select>
        <button onClick={() => this.props.deleteAlbum(this.props.index)}>
          Delete Album
        </button>
      </div>
    )
  }
}

export default EditAlbumForm
