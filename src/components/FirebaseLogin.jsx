import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import base, { firebaseApp } from '../base'

// NOTE: Do not need this keyword.
// Stateless functional component! Must pass props
class FirebaseLogin extends Component {
  // Don't forget propTypes!

  state = {
    isSignedIn: false,
    uid: null,
    owner: null
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {
        const store = await base.fetch(this.props.storeID, { context: this })
        if (!store.owner) {
          // save it as our own
          await base.post(`${this.props.storeID}/owner`, {
            data: authResult.user.uid
          })
        }
        this.setState({
          isSignedIn: !!authResult.user,
          uid: authResult.user.uid,
          owner: store.owner || authResult.user.uid
        })
      }
    }
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
    return (
      <div>
        {!this.state.uid && !this.state.isSignedIn &&
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        }
        { this.state.uid !== this.state.owner &&
          <div className='login-dialog'>
            <p>Sorry, dog. This ain't your store.</p>
            {logout}
          </div>
        }
      </div>
    )
  }
}

export default FirebaseLogin
