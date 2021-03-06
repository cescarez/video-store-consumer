import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Home from './components/Home';
import Customer from './components/Customer';
import CustomerList from './components/CustomerList';
import Video from './components/Video';
import VideoLibrary from './components/VideoLibrary';
import Search from './components/Search';
import Nav from './components/Nav';
import Rental from './components/Rental'
import './App.css';

const BASE_URL = 'http://localhost:3000'

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [videoLibrary, setVideoLibrary] = useState([]);

  const [overdueRentals, setOverdueRentals] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  useEffect(() => {
    axios.get(BASE_URL + '/videos')
    .then((response) => {
      const apiVideoLibrary = response.data;
      setVideoLibrary(apiVideoLibrary);
    })
    .catch((error) => {
      const message=`Video list did not load. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }, []);

  useEffect(()=> {
    axios.get(`${BASE_URL}/customers`)
      .then ((response) => {
        const apiCustomerList = response.data
        setCustomerList(apiCustomerList);
      })
      .catch((error) => {
        const message=`Customer list did not load. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }, []);

  //overdue rentals
  const loadOverdueRentals = () => {
    axios.get(BASE_URL + '/rentals/overdue')
      .then((response) =>{
        if (response.data) {
          setOverdueRentals(response.data);
        }
        console.log(`overdue rentals: ${overdueRentals.length}`)
      })
      .catch((error) => {
        const message=`Overdue rentals not loaded. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }
  useEffect(() => {
    loadOverdueRentals();
  }, [])

  //search results
  const onSearchRequestCallback = (searchTerm) => {
    axios.get(BASE_URL + '/videos?query=' + searchTerm)
      .then((response) => {
        const apiSearchResults = response.data;
        setSearchResults(apiSearchResults);
      })
      .catch((error) => {
        const message=`Search failed. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }

  const addToCollectionCallback = (result) => {
    axios.post(BASE_URL + '/videos', result )
    .then((response) => {
      const message =`${result.title} Added to Collection!`; 
      const newSearchResults = [...searchResults];
      setSearchResults(newSearchResults);
      console.log(message);
    })
    .catch((error) => {
      const message=`Error. Video could not be added to collection. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

  //load rental selections (ie if page refreshes??)
  useEffect(() => {
    const storedVideoTitle = sessionStorage.getItem('selectedVideoTitle');
    const storedCustomerId = sessionStorage.getItem('selectedCustomerId');
    const storedCustomerName = sessionStorage.getItem('selectedCustomerName');

    setSelectedVideoTitle(storedVideoTitle);
    setSelectedCustomerId(storedCustomerId);
    setSelectedCustomerName(storedCustomerName);
  }, [])

  //rental checkout callback
  const onRentalRequestCallback = (selectedCustomerId, selectedVideoTitle) => {
    const rentalObject = {
      // eslint-disable-next-line camelcase
      customer_id: selectedCustomerId,
      title: selectedVideoTitle,
    }
    axios.post(BASE_URL + '/rentals/'+ selectedVideoTitle + '/check-out', rentalObject )
    .then((response) => {

      setSelectedVideoTitle('');
      setSelectedCustomerId('');
      setSelectedCustomerName('');
      sessionStorage.clear();

      const message =`Checkout Complete!`; 
      console.log(message)
    })
    .catch((error) => {
      const message=`There was an error with your rental request. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

  //video selection callback
  const onSelectVideoForRentalCallback = (videoTitle) => {
    sessionStorage.setItem('selectedVideoTitle', videoTitle);
    setSelectedVideoTitle(videoTitle);
    console.log(`${videoTitle} selected for rental`)
  }

  //user selection callback
  const onSelectCustomerForRentalCallback = (customerId, customerName) => {
    sessionStorage.setItem('selectedCustomerId', customerId)
    sessionStorage.setItem('selectedCustomerName', customerName)
    setSelectedCustomerId(customerId);
    setSelectedCustomerName(customerName);
    console.log(`${customerName}, id: ${customerId} selected for rental`)
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Rental onRentalRequest={onRentalRequestCallback} selectedVideoTitle={selectedVideoTitle} selectedCustomerId={selectedCustomerId} selectedCustomerName={selectedCustomerName} />

        { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : 
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/customers/:id" >
              <Customer baseURL={BASE_URL} onSelectCustomerForRental={onSelectCustomerForRentalCallback} overdueRentals={overdueRentals} loadOverdueRentals={loadOverdueRentals} />
            </Route>
            <Route path="/customerlist">
              <CustomerList customerList={customerList} />
            </Route>
            <Route path="/videos/:title">
              <Video baseURL={BASE_URL} onSelectVideoForRental={onSelectVideoForRentalCallback}/>
            </Route>
            <Route path="/videolibrary">
              <VideoLibrary videoLibrary={videoLibrary} overdueRentals={overdueRentals} loadOverdueRentals={loadOverdueRentals} />
            </Route>
            <Route path="/search">
              <Search videoLibrary={videoLibrary} searchResults={searchResults} addToCollection={addToCollectionCallback} onSearchRequest={onSearchRequestCallback} />
            </Route>
          </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
