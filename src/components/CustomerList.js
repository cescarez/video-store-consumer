import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

// import './CustomerList.css';


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

  const onSelectCustomerForRental = (customer) => {
    sessionStorage.setItem('selectedCustomerId', customer.id)
    sessionStorage.setItem('selectedCustomerName', customer.name)
    console.log(`${customer.name}, id: ${customer.id} selected for rental`)
  }

  const listCustomers = () => {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID #</th>
            <th>Name</th>
            <th>Account Credit</th>
            <th>Videos Checked Out</th>
            <th>Select Customer For Rental</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer)=>{
            return(
              <tr>
                <th>{customer.id}</th>
                <th>
                  <Link to={`/customers/${customer.id}`}>
                    {customer.name}
                  </Link>
                </th>
                <th>${customer.account_credit}</th>
                <th>{customer.videos_checked_out_count}</th>
                <th width='10%'><Button variant='secondary' onClick={() => {onSelectCustomerForRental(customer)}}>Select</Button></th>
              </tr>
            );
          })}
        </tbody>
      </Table>
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