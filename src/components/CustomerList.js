import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './CustomerList.css';


const CustomerList = ({baseURL}) => {
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect( ()=> {
    axios.get(`${baseURL}/customers`)
      .then ((response) => {
        const apiCustomers = response.data
        // console.log(response);
        setCustomers(apiCustomers);
      })
      .catch((error) => {
        const message=`Customer list did not load. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }, [baseURL])

  const listCustomers = () => {
    return (
      <ul>
        {customers.map((customer)=>{
          return(
            <Link to={`/customers/${customer.id}`}>
              <li key={customer.id}>{customer.name}</li>
            </Link>
          );
        })}
      </ul>
    );
  }

  return (
    <div className='customer-list'>
      <h3>Customer List</h3>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : listCustomers() }
    </div>
  );
}

export default CustomerList;