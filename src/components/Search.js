import React, { useState, useEffect } from 'react';
import './Search.css';
import { Button } from 'react-bootstrap';

function Search({ videoLibrary, addToCollection, searchResults, loadSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dummyState, setDummyState] = useState(false);

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

  const displaySearchResults = () => {
    return (
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
                      <p>{movie.overview} { libraryTitles.includes(movie.title) ? <p className="title-in-library">Title in Library</p> : <Button variant="warning"  onClick={() => addToCollection(movie)}>Add Title to Library</Button> }</p>
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

  const onSearchRequestSelection = (searchTerm) => {
    loadSearchResults(searchTerm);
    setDummyState(true)
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
      <Button variant="success" onClick={() => onSearchRequestSelection(searchTerm)}>Search</Button>
      { displaySearchResults() }
    </div>
  );
}

export default Search;