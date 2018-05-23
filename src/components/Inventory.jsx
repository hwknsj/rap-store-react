import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddAlbumForm from './AddAlbumForm.jsx'
import EditAlbumForm from './EditAlbumForm.jsx'
import Login from './Login.jsx'
import base, { firebaseApp, db } from '../base'

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

  state = {
    uid: null,
    owner: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged ( user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async authData => {
    // Look up current store in firebase db
    const store = await base.fetch(this.props.storeID, { context: this//, then (data) { console.log(data) }
    })
    // Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid
      })
    }
    // Set the state of the Inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp.auth().signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch((error) => alert(error))
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({
      uid: null
    })
  }

  render () {
    const logout = <button onClick={this.logout}>Log out</button>
    // Check if logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    // Check if user is NOT owner of store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, dog. This ain't your store.</p>
          {logout}
        </div>
      )
    }

    // User must be the owner to access the inventory
    return (
      <div className='inventory-wrap'>
        <h2>Inventory</h2>
        {logout}
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
