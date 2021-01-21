import React, {useState} from 'react';
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
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

function App() {

  const [errorMessage, setErrorMessage] = useState('')

  const selectedVideoTitle = sessionStorage.getItem('selectedVideoTitle')
  console.log(`selectedVideoTitle: ${selectedVideoTitle}`)
  const selectedCustomerId = sessionStorage.getItem('selectedCustomerId')
  const selectedCustomerName = sessionStorage.getItem('selectedCustomerName')
  console.log(`selectedCustomer: ${selectedCustomerName}, id: ${selectedCustomerId}`)
  
  const onRentalRequest = () => {
    const rentalObject = {
      // eslint-disable-next-line camelcase
      customer_id: selectedCustomerId,
      title: selectedVideoTitle,
    }
    axios.post('http://localhost:3000/rentals/'+ selectedVideoTitle + '/check-out', rentalObject )
    .then((response) => {
    const message =`Checkout Complete!`; 
    console.log(message)
    })
    .catch((error) => {
      const message=`There was an error with your rental request. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <div>
          { (selectedVideoTitle) ? <div className='router__div--selected-item'> Selected Video for Rental: {selectedVideoTitle} </div> : null }
          { (selectedCustomerId) ? <div className='router__div--selected-item'> Selected Customer for Rental: {selectedCustomerName}, id: {selectedCustomerId} </div> : null }
          <br/>
          { (selectedVideoTitle && selectedCustomerId) ? <button className='router__button--check-out'onClick={ () => {onRentalRequest()}}>Rent {selectedVideoTitle} for Customer {selectedCustomerName}, id: {selectedCustomerId}</button> : null}
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
