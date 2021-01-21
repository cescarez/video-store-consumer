import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import './CustomerList.css';


const CustomerList = ({ customerList }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(customerList);
  }, [customerList])

  const listCustomers = () => {
    return (
      // <ul>
      //   {customers.map((customer)=>{
      //     return(
      //       <Link to={`/customers/${customer.id}`}>
      //         <li key={customer.id}>{customer.name}</li>
      //       </Link>
      //     );
      //   })}
      // </ul>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID #</th>
            <th>Name</th>
            <th>Account Credit</th>
            <th>Videos Checked Out</th>
            {/* <th>Select Customer For Rental</th> */}
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
                {/* <th width='10%'><Button variant='secondary' onClick={() => {onSelectCustomerForRental(customer)}}>Select</Button></th> */}
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
      { listCustomers() }
    </div>
  );
}

export default CustomerList;