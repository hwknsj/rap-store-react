import React, { Component } from 'react'

class AddAlbumForm extends Component {
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()
  createAlbum = event => {
    // Stop the form from submitting
    event.preventDefault()

    const album = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }
    this.props.addAlbum(album)
    console.log(album)
    // Refresh the form
    event.currentTarget.reset()
  }
  render () {
    return (
      <form className='album-edit' onSubmit={this.createAlbum}>
        <input name='name' ref={this.nameRef} type='text' placeholder='Name' />
        <input name='price' ref={this.priceRef} type='text' placeholder='Price' />
        <select name='status' ref={this.statusRef} type='text' placeholder='Status'>
          <option value='available'>Fresh</option>
          <option value='unavailable'>Gone, bruh</option>
        </select>
        <textarea name='desc' ref={this.descRef} placeholder='Desc' />
        <input name='image' ref={this.imageRef} type='text' placeholder='Image' />
        <button type='submit'>+ Add Album</button>
      </form>
    )
  }
}

export default AddAlbumForm
