import React, { Component } from 'react'

class EditAlbumForm extends Component {
  handleChange = event => {
    // update that fish
    // Take a copy of the current fish
    const updatedAlbum = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    // This change still needs to be reflected in App.jsx
    // NOTE: Need to pass down key ourselves. Check Inventory.jsx
    this.props.updateAlbum(this.props.index, updatedAlbum)
  }

  render () {
    return (
      <div className='fish-edit'>
        <input type='text' name='name' onChange={this.handleChange} value={this.props.fish.name} />
        <input type='text' name='price' onChange={this.handleChange} value={this.props.fish.price} />
        <select type='text' name='status' onChange={this.handleChange} value={this.props.fish.status}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea name='desc' onChange={this.handleChange} value={this.props.fish.desc} />
        <input type='text' name='image' onChange={this.handleChange} value={this.props.fish.image} />
      </div>
    )
  }
}

export default EditAlbumForm
