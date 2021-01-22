import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';


const VideoLibrary = ({videoLibrary}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoLibrary);
  }, [videoLibrary])

  const listVideos = () => {
    return (
      <div>
        <ul>
      {videos.map((video) => (

      <section className="movie-container">
      <section className="movie-details">
      <img className="move-image" src={video.image_url} alt='movie poster' />
          <li key={video.external_id}>
          <Link to={`/videos/${video.title}`}>
            <li>{video.title}</li>
          </Link>
          </li>
          </section>
          </section>
        )
    )}
      </ul>
      </div>
    )
  }

  return (
    <div>
    <h3>Library</h3>
    { listVideos() }
    </div>
  );
}


export default VideoLibrary;