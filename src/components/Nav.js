import React, {useState} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  const selectedVideoTitle = sessionStorage.getItem('selectedVideoTitle')
  console.log(`selectedVideoTitle: ${selectedVideoTitle}`)
  const selectedCustomerId = sessionStorage.getItem('selectedCustomerId')
  console.log(`selectedCustomer: ${selectedCustomerId}`)

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
        { (selectedVideoTitle && selectedCustomerId) ? <button>Rent {selectedVideoTitle}</button> : null}
        { (selectedVideoTitle && !selectedCustomerId) ? <div>Selected Video for Rental: {selectedVideoTitle}</div> : null }
    </nav>
  )
};

export default Nav; 