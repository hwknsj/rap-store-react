import React, { Component } from 'react'
import AddAlbumForm from './AddAlbumForm.jsx'
import EditAlbumForm from './EditAlbumForm.jsx'

class Inventory extends Component {
  render () {
    return (
      <div>
        <h2>Inventory</h2>
        <button onClick={this.props.loadSampleAlbums}>Load <em>Joel's Most Necessary</em></button>
        <br />
        {Object.keys(this.props.albums).map(key => <EditAlbumForm key={key} index={key} album={this.props.albums[key]} updateAlbum={this.props.updateAlbum} />)}
        <AddAlbumForm addAlbum={this.props.addAlbum} />
      </div>
    )
  }
}

export default Inventory
