import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Video = ( { match }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [video, setVideo] = useState({
    availableInventory: 0,
    inventory: 0,
    title: '',
    releaseDate: '',
    overview: '',
  });

  const videoTitle = match.params.title

  useEffect(() => {
      axios.get('http://localhost:3000/videos/' + videoTitle)
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
    }, [videoTitle]);

  const videoInfo = () => {
    return (
      <div>
        <h3>{video.title}</h3>
        <small>{video.releaseDate}</small>
        <p>{video.overview}</p>
        <p>Available: {video.availableInventory} of {video.inventory}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Video</h3>
      { errorMessage ? <h3 className='error-message'>{errorMessage}</h3> : videoInfo() }
    </div>
  );
}




export default Video;


