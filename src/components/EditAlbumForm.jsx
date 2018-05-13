import React, { Component } from 'react'

class EditAlbumForm extends Component {
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
        <input type='text' name='price' onChange={this.handleChange} value={this.props.album.price} />
        <select type='text' name='status' onChange={this.handleChange} value={this.props.album.status}>
          <option value='available'>Fresh</option>
          <option value='unavailable'>Gone, bruh</option>
        </select>
        <textarea name='desc' onChange={this.handleChange} value={this.props.album.desc} />
        <input type='text' name='image' onChange={this.handleChange} value={this.props.album.image} />
      </div>
    )
  }
}

export default EditAlbumForm
