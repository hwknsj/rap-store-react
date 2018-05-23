import Rebase from 're-base'
import firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyBsTxXmPTG_BuxRn5X3jsTDnyLxU00C068',
  authDomain: 'certified-fresh-hip-hop-shop.firebaseapp.com',
  databaseURL: 'https://certified-fresh-hip-hop-shop.firebaseio.com',
  projectId: 'certified-fresh-hip-hop-shop',
  storageBucket: '',
  messagingSenderId: '1082605349665'
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()
const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// This is a default export
export default base

export { db }
