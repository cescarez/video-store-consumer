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
import Rental from './components/Rental'
import './App.css';

const BASE_URL = 'http://localhost:3000'

function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Rental />
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
