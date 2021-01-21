import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

function Search({baseURL}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [libraryTitles, setLibraryTitles] = useState([]);
  useEffect(() => {
    axios.get(baseURL + '/videos')
    .then((response) => {
      const films = response.data.map((movie) =>{
        return movie.title;
      });
      setLibraryTitles(films);
      console.log(films)
    })
    .catch((error) => {
      const message=`Video list did not load. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }, [baseURL])

  const onInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  }

  const onSendExternalRequest = () => {
    axios.get('http://localhost:3000/videos?query=' + searchTerm)
      .then((response) => {
        const apiSearchResults = response.data;
        setSearchResults(apiSearchResults);
      })

      .catch((error) => {
        const message=`Search failed. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
  }

  const addToCollection = (result) => {
    axios.post('http://localhost:3000/videos', result )
    .then((response) => {
    const message =`${result.title} Added to Collection!`; 
    console.log(message)
    })
    .catch((error) => {
      const message=`Error. Video could not be added to collection. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }

  const displaySearchResults = () => {
    return (
      <div className="movie">
      <ul className="movie-info">
        {
          searchResults.map((result) => {
            return(
              <div className="container">
              <li key={result.external_id}>
                <h3>{result.title}</h3>
                <span><small>Release Date: {result.release_date}</small></span>
                <img src={result.image_url} alt='movie poster' />
                { libraryTitles.includes(result.title) ? <div>Title in Library</div> : <button onClick={() => addToCollection(result)}>Add Title to Library</button> }
              </li>
              </div>
            );
          })
        }
      </ul>
      </div>
    );
  }


  return (
    <div>
      <h3>Search</h3>
      <input 
        type='text'
        className='searchbox'
        placeholder='Enter a movie title' 
        name='search-term' 
        onChange={onInputChange}>
      </input>
      <button onClick={onSendExternalRequest}>Search</button>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : displaySearchResults() }
    </div>
  );
}

export default Search;