import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddAlbumForm from './AddAlbumForm.jsx'
import EditAlbumForm from './EditAlbumForm.jsx'

class Inventory extends Component {
  static propTypes = {
    albums: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      artist: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addAlbum: PropTypes.func,
    updateAlbum: PropTypes.func,
    deleteAlbum: PropTypes.func,
    loadSampleAlbums: PropTypes.func
  }

  render () {
    return (
      <div className='inventory-wrap'>
        <h2>Inventory</h2>
        <button onClick={this.props.loadSampleAlbums}>Load <em>Joel's Most Necessary</em></button>
        <br />
        {Object.keys(this.props.albums).map(key => <EditAlbumForm
          key={key}
          index={key}
          album={this.props.albums[key]}
          updateAlbum={this.props.updateAlbum}
          deleteAlbum={this.props.deleteAlbum} />)}
        <AddAlbumForm addAlbum={this.props.addAlbum} />
      </div>
    )
  }
}

export default Inventory
