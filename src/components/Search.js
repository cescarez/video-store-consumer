import React, {useState} from 'react';
import axios from 'axios';
// import './Search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (event) => {
    const newSearchTerm = event.target.value;
    console.log(newSearchTerm)
    setSearchTerm(newSearchTerm);
  }

  const onSendExternalRequest = () => {
    axios.get('http://localhost:3000/videos?query=' + searchTerm)
      .then((response) => {
        const apiSearchResults = response.data;
        setSearchResults(apiSearchResults);
        console.log(apiSearchResults)
        console.log(response)
      })

      .catch((error) => {
        const message=`Search failed. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }


  return (
    <div>
      <h3>Search</h3>
      <input placeholder='Enter a movie title' name='search-term' onChange={onInputChange} ></input>
      <button onClick={onSendExternalRequest}>Search</button>
    </div>
  );
}

export default Search;