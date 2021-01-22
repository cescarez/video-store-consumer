import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { Button } from 'react-bootstrap';

function Search({ videoLibrary, addToCollection, onSearchRequest, searchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [libraryTitles, setLibraryTitles] = useState([]);

  //extract library titles for searching
  const stringifyLibraryTitles = () => {
    const apiLibraryTitles = videoLibrary.map((movie) =>{
      return movie.title;
    });
    setLibraryTitles(apiLibraryTitles);
  }
  useEffect(() => {
    stringifyLibraryTitles();
  }, [])

  const onInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  }
  
  const onSelectSearchResult = (movie) => {
    stringifyLibraryTitles();
    addToCollection(movie, searchTerm);
  }

  const displaySearchResults = () => {
    return (
      <div>
      <ul>
        {
          searchResults.map((movie) => (
              <section className="movie-container">
                <section className="movie-details">
                <img className="move-image" src={movie.image_url} alt='movie poster' />
              <li key={movie.external_id}>
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-release-date"> Release Date: {movie.release_date}</p>
                <div className="overview">
                <h2>Overview</h2>
                <p>{movie.overview} { libraryTitles.includes(movie.title) ? <div className="title-in-library">Title in Library</div> : <Button variant="warning"  onClick={()=> onSelectSearchResult(movie)}>Add Title to Library</Button> }</p>
                </div>
                
              </li>
              </section>
              </section>
            )
          )
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
      <Button variant="success" onClick={() => onSearchRequest(searchTerm)}>Search</Button>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : displaySearchResults() }
    </div>
  );
}

export default Search;