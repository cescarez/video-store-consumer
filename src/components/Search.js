import React, { useState, useEffect } from 'react';
import './Search.css';
import { Button } from 'react-bootstrap';

function Search({ videoLibrary, addToCollection, onSearchRequest, searchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

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
      <ul>
        {
          searchResults.map((result) => (
              <section className="movie-container">
                <section className="movie-details">
                <img className="move-image" src={result.image_url} alt='movie poster' />
              <li key={result.external_id}>
                <h3 className="movie-title">{result.title}</h3>
                <p className="movie-release-date"> Release Date: {result.release_date}</p>
                <div className="overview">
                <h2>Overview</h2>
                <p>{result.overview} { libraryTitles.includes(result.title) ? <p className="title-in-library">Title in Library</p> : <Button variant="warning"  onClick={() => addToCollection(result)}>Add Title to Library</Button> }</p>
                </div>
                
              </li>
              </section>
              </section>
            )
          )
        }
      </ul>
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
      { displaySearchResults() }
    </div>
  );
}

export default Search;