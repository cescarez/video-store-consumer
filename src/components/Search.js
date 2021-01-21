import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

function Search({ videoLibrary, addToCollection, onSearchRequest, searchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [libraryTitles, setLibraryTitles] = useState([]);
  useEffect(() => {
    const apiLibraryTitles = videoLibrary.map((movie) =>{
      return movie.title;
    });
    setLibraryTitles(apiLibraryTitles);
  }, [videoLibrary])

  const onInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
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
      <button onClick={() => onSearchRequest(searchTerm)}>Search</button>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : displaySearchResults() }
    </div>
  );
}

export default Search;