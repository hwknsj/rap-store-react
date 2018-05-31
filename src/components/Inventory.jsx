import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddAlbumForm from './AddAlbumForm.jsx'
import EditAlbumForm from './EditAlbumForm.jsx'
import Login from './Login.jsx'
import base, { firebaseApp } from '../base'

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
    isSignedIn: false,
    uid: null,
    owner: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged ( user => {
      if (user) this.authHandler({ user })
    })
  }

  componentWillUnmount () {
    if (this.state.isSignedIn) this.logout()
  }

  authHandler = async authData => {
    // Look up current store in firebase db
    const store = await base.fetch(this.props.storeID, { context: this })
    // Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid
      })
    }
    // Set the state of the Inventory component to reflect current user
    this.setState({
      isSignedIn: true,
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp.auth().signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(error => alert(error))
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({
      isSignedIn: false,
      uid: null
    })
  }

  render () {
    const logout = <button onClick={this.logout}>Log out</button>
    // Check if logged in
    if (!this.state.uid && !this.state.isSignedIn) {
      return <Login authenticate={this.authenticate} />
    }
    // Check if user is NOT owner of store
    if (this.state.uid !== this.state.owner && this.state.isSignedIn) {
      return (
        <div className='inventory-wrap'>
          <h2>Inventory</h2>
          <div className='inventory-buttons'>
            <p>Sorry, dog. This ain't your store.</p>
            {logout}
          </div>
        </div>
      )
    }

    // User must be the owner to access the inventory
    return (
      <div className='inventory-wrap'>
        <h2>Inventory</h2>
        <div className='inventory-buttons'>
          <p>What's good, {firebaseApp.auth().currentUser.displayName}?</p>
          {logout}
          <button onClick={this.props.loadSampleAlbums}>Load Joel's Most Necessary</button>
        </div>
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
