import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './VideoLibrary.css';


const VideoLibrary = () => {
  const BASE_URL = 'http://localhost:3000'
  const [videos, setVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL + '/videos')
    .then((response) => {
      const films = response.data;
      setVideos(films);
      console.log(films)
    })
    .catch((error) => {
      const message=`Video list did not load. ${error.message}.`;
      setErrorMessage(message);
      console.log(message);
    })
  }, []);

  const listVideos = () => {
    return (

      <div>
      {videos.map((video) => {
        return(
          <Link to={`http://localhost:3000/customers/${video.title}`}>
          <li>{video.title}</li>
          </Link>
        )
      })}
      </div>
    )
  }

  return (
    <div>
    <h3>Library</h3>
    { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : listVideos() }

    </div>
  );
}


export default VideoLibrary;