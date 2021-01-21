import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //only needs to be in App.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';

import Home from './components/Home';
import Customer from './components/Customer';
import CustomerList from './components/CustomerList';
import Video from './components/Video';
import VideoLibrary from './components/VideoLibrary';
import Search from './components/Search';
import Nav from './components/Nav';
import './App.css';

const BASE_URL = 'http://localhost:3000'

function App() {

  const selectedVideoTitle = sessionStorage.getItem('selectedVideoTitle')
  console.log(`selectedVideoTitle: ${selectedVideoTitle}`)
  const selectedCustomerId = sessionStorage.getItem('selectedCustomerId')
  const selectedCustomerName = sessionStorage.getItem('selectedCustomerName')
  console.log(`selectedCustomer: ${selectedCustomerName}, id: ${selectedCustomerId}`)

  return (
    <Router>
      <div className="App">
        <Nav />
        <div>
          { (selectedVideoTitle) ? <Badge variant='info'> Selected Video for Rental: {selectedVideoTitle} </Badge> : null }
          { (selectedCustomerId) ? <Badge variant='info'> Selected Customer for Rental: {selectedCustomerName}, id: {selectedCustomerId} </Badge> : null }
          <br/>
          { (selectedVideoTitle && selectedCustomerId) ? <Button variant='outline-primary' size='sm'>Rent {selectedVideoTitle} for Customer {selectedCustomerName}, id: {selectedCustomerId}</Button> : null}
        </div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/customers/:id" component={Customer}/>
          <Route path="/customerlist">
            <CustomerList baseURL={BASE_URL}/>
          </Route>
          <Route path="/videos/:title" component={Video}/>
          <Route path="/videolibrary">
            <VideoLibrary baseURL={BASE_URL}/>
          </Route>
          <Route path="/search">
            <Search baseURL={BASE_URL} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
