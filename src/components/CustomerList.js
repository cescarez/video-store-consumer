import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './CustomerList.css';


const CustomerList = ({ customerList }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(customerList);
  }, [customerList])

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
      { listCustomers() }
    </div>
  );
}

export default CustomerList;