import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <h3 className="welcome">WELCOME AGAIN</h3>
      <ul className="nav-link">
        <Link to='/' className="link">
          <li className="Home">Home</li>
        </Link>
        <Link to='/customerlist' className="link">
          <li className="Customer">Customers</li>
        </Link>
        <Link to='/videolibrary' className="link">
          <li className="VideoLibrary">Video Library</li>
        </Link>
        <Link to='/search' className="link">
          <li className="Search">Search Videos</li>
        </Link>
      </ul>
    </nav>
  )
};

export default Nav; 