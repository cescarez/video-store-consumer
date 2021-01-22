import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';


const Customer = ( { match, location }) => {
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
  const [currentRentals, setCurrentRentals] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);

  const customerId = match.params.id
  const { baseURL } = location.state


  useEffect(() => {
      axios.get(baseURL + '/customers/' + customerId)
      .then((response) => {
        const apiCustomer = { ...response.data,
          registeredAt: response.data.registered_at, 
          postalCode: response.data.postal_code,
          accountCredit: response.data.account_credit,
          videosCheckedOutCount: response.data.videos_checked_out_count,
        };
        setCustomer(apiCustomer);
      })
      .catch((error) => {
        const message=`Customer info not found. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
    }, [customerId, baseURL]);
    
  //current rentals
  useEffect(() => {
    axios.get(baseURL + '/customers/' + customerId + '/current')
      .then((response) =>{
        if (response.data) {
          setCurrentRentals(response.data);
        }
      })
      .catch((error) => {
        const message=`Current rentals not loaded. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }, [baseURL, customerId])

  //rental history (already checked in)
  useEffect(() => {
    axios.get(baseURL + '/customers/' + customerId + '/history')
      .then((response) =>{
        console.log(response.data)
        if (response.data) {
          setRentalHistory(response.data);
        }
      })
      .catch((error) => {
        const message=`Rental history not loaded. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }, [baseURL, customerId])


  const onSelectCustomerForRental = () => {
    sessionStorage.setItem('selectedCustomerId', customer.id)
    sessionStorage.setItem('selectedCustomerName', customer.name)
    console.log(`${customer.name}, id: ${customer.id} selected for rental`)
  }


  const listVideos = (videos) => {
    return (
      <div>
      {videos.map((video) => {
        return(
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Date Checked Out</th>
                <th>Date Due</th>
                <th>Date Checked In</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={{
                    pathname:`/videos/${video.title}`,
                    state: {
                      baseURL: baseURL, 
                    }
                  }}>
                    {video.title}
                  </Link>
                </td>
                <td>{video.checkout_date}</td>
                <td>{video.due_date}</td>
                <td>{video.checkin_date ? video.checkin_date : 'Title has not been returned.'}</td>
              </tr>
            </tbody>

          </Table>
        )
      })}
      </div>
    )
  }

  const customerInfo = () => {
    return (
      <div>
        <h3>{customer.name}</h3>
        <button onClick={onSelectCustomerForRental}>Select Customer for Rental</button><br/>
        <small>Account Credit: ${customer.accountCredit}</small><br/>
        <small>Videos Checked Out: {customer.videosCheckedOutCount}</small><br/>
        <h4>Current Rentals</h4>
        { currentRentals.length > 0 ? listVideos(currentRentals) : <p>No currently rented titles.</p>}
        <h4>Rental History</h4>
        { rentalHistory.length > 0 ? listVideos(rentalHistory) : <p>No previously rented (and returned) titles.</p>}
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