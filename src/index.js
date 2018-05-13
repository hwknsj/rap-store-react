import React from 'react'
import { render } from 'react-dom'
// import StorePicker from './components/StorePicker'
// import App from './components/App.jsx'
import Router from './components/Router'
import './css/style.css'

// class StorePicker extends Component {
//   render() {
//     return <p>Hello!</p>
//   }
// }

render(<Router />, document.querySelector('#main'))
