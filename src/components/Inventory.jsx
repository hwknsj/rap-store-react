import React, { Component } from 'react'
import AddAlbumForm from './AddAlbumForm.jsx'
import EditAlbumForm from './EditAlbumForm.jsx'

class Inventory extends Component {
  render () {
    return (
      <div className='inventory'>
        <h2>Inventory</h2>
        {Object.keys(this.props.albums).map(key => <EditAlbumForm key={key} index={key} album={this.props.albums[key]} updateAlbum={this.props.updateAlbum} />)}
        <AddAlbumForm addAlbum={this.props.addAlbum} />
        <button onClick={this.props.loadSampleAlbums}>Load Sample Albums</button>
      </div>
    )
  }
}

export default Inventory
