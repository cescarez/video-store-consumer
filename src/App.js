import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
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

  const addToCollectionCallback = (result) => {
    axios.post(BASE_URL + '/videos', result )
    .then((response) => {
      const message =`${result.title} Added to Collection!`; 
      const newVideoLibrary = [...videoLibrary];
      setVideoLibrary(newVideoLibrary);
      console.log(message);
    })
    .catch((error) => {
      const message=`Error. Video could not be added to collection. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Rental />
        { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : 
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/customers/:id" component={Customer}/>
            <Route path="/customerlist">
              <CustomerList customerList={customerList}/>
            </Route>
            <Route path="/videos/:title" component={Video}/>
            <Route path="/videolibrary">
              <VideoLibrary videoLibrary={videoLibrary} />
            </Route>
            <Route path="/search">
              <Search videoLibrary={videoLibrary} addToCollection={addToCollectionCallback} />
            </Route>
          </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
