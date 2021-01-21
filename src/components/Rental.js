import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Rental = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  const storedVideoTitle = sessionStorage.getItem('selectedVideoTitle');
  const storedCustomerId = sessionStorage.getItem('selectedCustomerId');
  const storedCustomerName = sessionStorage.getItem('selectedCustomerName');
  console.log(`selectedVideoTitle: ${selectedVideoTitle}`)
  console.log(`selectedCustomer: ${selectedCustomerName}, id: ${selectedCustomerId}`)

  useEffect(() => {

    setSelectedVideoTitle(storedVideoTitle);
    setSelectedCustomerId(storedCustomerId);
    setSelectedCustomerName(storedCustomerName);

  }, [storedVideoTitle, storedCustomerId, storedCustomerName])

  const onRentalRequest = () => {
    const rentalObject = {
      // eslint-disable-next-line camelcase
      customer_id: selectedCustomerId,
      title: selectedVideoTitle,
    }

    axios.post('http://localhost:3000/rentals/'+ selectedVideoTitle + '/check-out', rentalObject )
    .then((response) => {

      setSelectedVideoTitle('');
      setSelectedCustomerId('');
      setSelectedCustomerName('');
      sessionStorage.clear();

      const message =`Checkout Complete!`; 
      console.log(message)
    })
    .catch((error) => {
      const message=`There was an error with your rental request. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

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