import React, {useState, useEffect} from 'react';
import axios from 'axios';

// const Rental = ({onRentalRequest, selectedCustomerId, selectedCustomerName, selectedVideoTitle}) => {
const Rental = ({onRentalRequest, selectedCustomerName, selectedVideoTitle, selectedCustomerId}) => {
  return (
    <div>
      { (selectedVideoTitle) ? <div className='router__div--selected-item'> Selected Video for Rental: {selectedVideoTitle} </div> : null }
      { (selectedCustomerId) ? <div className='router__div--selected-item'> Selected Customer for Rental: {selectedCustomerName}, id: {selectedCustomerId} </div> : null }
      <br/>
      { (selectedVideoTitle && selectedCustomerId) ? <button className='router__button--check-out' onClick={ () => {onRentalRequest()}}>Rent {selectedVideoTitle} for Customer {selectedCustomerName}, id: {selectedCustomerId}</button> : null}
    </div>
  );

}

export default Rental;