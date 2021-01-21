import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Customer = ( { match }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [customer, setCustomer] = useState({
    id: -1,
    name: '',
    registeredAt:'',
    address: '',
    city:'',
    state: '',
    phone: '',
    postalCode: '',
    accountCredit: -1,
    videosCheckedOutCount: '',
  });

  const customerId = match.params.id

  useEffect(() => {
      axios.get('http://localhost:3000/customers/' + customerId)
      .then((response) => {
        console.log(response)
        const apiCustomer = { ...response.data,
          registeredAt: response.data.registered_at, 
          postalCode: response.data.postal_code,
          accountCredit: response.data.account_credit,
          videosCheckedOutCount: response.data.videos_checked_out_count,
        };
        console.log(apiCustomer)
        setCustomer(apiCustomer);
      })
      .catch((error) => {
        const message=`Customer info not found. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
    }, [customerId]);


  const onSelectCustomerForRental = () => {
    sessionStorage.setItem('selectedCustomerId', customer.id)
    sessionStorage.setItem('selectedCustomerName', customer.name)
    console.log(`${customer.name}, id: ${customer.id} selected for rental`)
  }

  const customerInfo = () => {
    return (
      <div>
        <h3>{customer.name}</h3>
        <button onClick={onSelectCustomerForRental}>Select Customer for Rental</button><br/>
        <small>Account Credit: ${customer.accountCredit}</small><br/>
        <small>Videos Checked Out: {customer.videosCheckedOutCount}</small>
      </div>

    )
  }

  return (
    <div>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : customerInfo() }
    </div>
  );
};

export default Customer;