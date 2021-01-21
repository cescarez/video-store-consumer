import React, {useState} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  const selectedVideoTitle = sessionStorage.getItem('selectedVideoTitle')
  console.log(`selectedVideoTitle: ${selectedVideoTitle}`)
  const selectedCustomer = sessionStorage.getItem('selectedCustomer')
  console.log(`selectedCustomer: ${selectedCustomer}`)

  // wrap this in a function???

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
        { selectedVideoTitle ? <div>Selected Video for Rental: {selectedVideoTitle}</div> : null }
        { selectedCustomer ? <div>Selected Customer for Rental: {selectedCustomer.name}</div> : null }
    </nav>
  )
};

export default Nav; 