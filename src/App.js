import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/customer" component={Customer}/>
          <Route path="/customerlist">
            <CustomerList baseURL={BASE_URL}/>
          </Route>
          <Route path="/videos/:id" component={Video}/>
          <Route path="/videolibrary">
            <VideoLibrary baseURL={BASE_URL}/>
          </Route>
          <Route path="/search" component={Search}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
