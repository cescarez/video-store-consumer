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
        <Link to='/customerlist' className="link">
          <li>Customers</li>
        </Link>
        <Link to='/videolibrary' className="link">
          <li>Video Library</li>
        </Link>
        <Link to='/search' className="link">
          <li>Search Videos</li>
        </Link>
      </ul>
    </nav>
  )
};

export default Nav; 