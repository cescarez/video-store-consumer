import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <h3>WELCOME AGAIN</h3>
      <ul className="nav-link">
        <Link to='/' className="link">
          <li>Home</li>
        </Link>
        <Link to='/customers' className="link">
          <li>Customers</li>
        </Link>
        <Link to='/library' className="link">
          <li>Library</li>
        </Link>
        <Link to='/search' className="link">
          <li>Search Videos</li>
        </Link>
      </ul>
    </nav>
  )
};

export default Nav; 