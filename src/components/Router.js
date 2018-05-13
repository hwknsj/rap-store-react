import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StorePicker from './StorePicker.js'
import App from './App.jsx'
import NotFound from './NotFound.jsx'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={StorePicker} />
      <Route path='/store/:storeID' component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router
