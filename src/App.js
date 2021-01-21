import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
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
          { (selectedVideoTitle) ? <div className='router__div--selected-item'> Selected Video for Rental: {selectedVideoTitle} </div> : null }
          { (selectedCustomerId) ? <div className='router__div--selected-item'> Selected Customer for Rental: {selectedCustomerName}, id: {selectedCustomerId} </div> : null }
          <br/>
          { (selectedVideoTitle && selectedCustomerId) ? <button className='router__button--check-out' variant='success'>Rent {selectedVideoTitle} for Customer {selectedCustomerName}, id: {selectedCustomerId}</button> : null}
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
