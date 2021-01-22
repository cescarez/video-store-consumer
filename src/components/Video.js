import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';


const Video = ( { onSelectVideoForRental, baseURL }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [video, setVideo] = useState({
    availableInventory: 0,
    inventory: 0,
    title: '',
    releaseDate: '',
    overview: '',
  });
  const [currentRentals, setCurrentRentals] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);

  const match = useRouteMatch('/videos/:title');
  const videoTitle = match.params.title

  //get video info
  useEffect(() => {
      axios.get(baseURL + '/videos/' + videoTitle)
      .then((response) => {
        const film = { ...response.data,
          availableInventory: response.data.available_inventory, 
          releaseDate: response.data.release_date,
        };
        console.log(film)
        setVideo(film)
      })
      .catch((error) => {
        const message=`Video did not load. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
    }, [videoTitle, baseURL]);


  //current rentals
  const loadCurrentRentals = () => {
    axios.get(baseURL + '/videos/' + videoTitle + '/current')
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
  }
  useEffect(() => {
    loadCurrentRentals();
  }, [])

  //rental history (already checked in)
  const loadRentalHistory = () => {
    axios.get(baseURL + '/videos/' + videoTitle + '/history')
      .then((response) =>{
        if (response.data) {
          setRentalHistory(response.data);
        }
      })
      .catch((error) => {
        const message=`Rental history not loaded. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }
   
  useEffect(() => {
    loadRentalHistory();
  }, [])

  const onReturnVideo = (customerId) => {
    const videoToReturn = {
      title: videoTitle,
      // eslint-disable-next-line camelcase
      customer_id: customerId,
    }
    axios.post(baseURL + '/rentals/' + videoTitle + '/return', videoToReturn)
      .then((response) => {
        const message =`${videoToReturn} outstanding rental by customer id ${customerId} has been checked in.`; 
        const currentCustomer = response.data.customer
        console.log(response.data)
        console.log('customer key:')
        console.log(response.data.customer)

        loadCurrentRentals();
        loadRentalHistory();

        console.log(message);
      })
      .catch((error) => {
        const message=`Rental history not loaded. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }

  const listCustomers = (customers) => {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Customer ID #</th>
            <th>Name</th>
            <th>Date Checked Out</th>
            <th>Date Due</th>
            <th>Date Checked In</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer)=>{
            return(
              <tr>
                <td>{customer.id}</td>
                <td>
                  <Link to={{
                    pathname:`/customers/${customer.id}`,
                    state: {
                      baseURL: baseURL, 
                    }
                  }}>
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.checkout_date}</td>
                <td>{customer.due_date}</td>
                <td>{customer.checkin_date ? customer.checkin_date : <Button onClick={()=>onReturnVideo(customer.id)}>Return Title</Button>}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  const videoInfo = () => {
    return (
      <div>
        <h3>{video.title}</h3>
        <Button onClick={()=>onSelectVideoForRental(video.title)}>Select Video for Rental</Button><br/>
        <small>{video.releaseDate}</small>
        <p>{video.overview}</p>
        <p>Available: {video.availableInventory} of {video.inventory}</p>
        <h4>Current Rentals</h4>
        { currentRentals.length > 0 ? listCustomers(currentRentals) : <p>No currently rented titles.</p>}
        <h4>Rental History</h4>
        { rentalHistory.length > 0 ? listCustomers(rentalHistory) : <p>No previously rented (and returned) titles.</p>}
      </div>
    )
  }


  return (
    <div>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : videoInfo() }
    </div>
  );
}




export default Video;


