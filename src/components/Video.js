import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Video = ( { match }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [video, setVideo] = useState({});
  const videoTitle = match.params.title
  useEffect(() => {
      axios.get('http://localhost:3000/videos/' + videoTitle)
      .then((response) => {
        const film = response.data;
        console.log(film)
        setVideo(film)
      })
      .catch((error) => {
        const message=`Video did not load. ${error.message}.`;
        setErrorMessage(message);
        console.log(message);
      })
    }, [videoTitle]);
  return (
    <div>
      {console.log(match.params.title)}
      <h3>Video</h3>
    </div>
  );
}




export default Video;


