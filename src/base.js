import Rebase from 're-base'
import firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyC266ET8i1maUeI0QnH21CNoWtyn06XeL0',
  authDomain: 'catch-of-the-day-joel-biz.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-joel-biz.firebaseio.com',
  projectId: 'catch-of-the-day-joel-biz',
  storageBucket: 'catch-of-the-day-joel-biz.appspot.com',
  messagingSenderId: '283335564537'
}

const firebaseApp = firebase.initializeApp(config)

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// This is a default export
export default base
