import React from 'react'
import {hot} from 'react-hot-loader'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Client from './Client'
import Navigation from './components/Navigation'
import Profile from './components/Profile'
import RepositoryDetail from './components/RepositoryDetail'
import Search from './components/Search'

function App() {
  return (
    <Client>
      <Router>
        <div>
          <Navigation/>
          <Route path='/' exact component={Search}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/repository/:owner/:name' component={RepositoryDetail}/>
        </div>
      </Router>
    </Client>
  )
}

export default hot(module)(App)
