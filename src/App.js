import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Customer from './components/Customer';
import CustomerList from './components/CustomerList';
import Video from './components/Video';
import VideoLibrary from './components/VideoLibrary';
import Search from './components/Search';
import Nav from './components/Nav';

const BASE_URL = 'http://localhost:3000'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" exact component={Home}/>
        <Route path="/customer" component={Customer}/>
        <Route path="/customerlist" component={CustomerList}/>
        <Route path="/video" component={Video}/>
        <Route path="/videolibrary" render={(props)=><VideoLibrary baseURL={BASE_URL}/>}/>
        <Route path="/search" component={Search}/>
      </div>
    </Router>
  );
}

export default App;
