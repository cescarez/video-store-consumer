import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './VideoLibrary.css';



const VideoLibrary = ({videoLibrary, baseURL, onSelectVideoForRental}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoLibrary);
  }, [videoLibrary])

  const listVideos = () => {
    return (
      <div>
        <ul>
        {videos.map((video) => (
          <section className="move-container">
          <section className="movie-details">
          <img className="move-image" src={video.image_url} alt='movie poster' />
          <div key={video.external_id}>
            <div className="movie-title">
            <Link to={{
              pathname:`/videos/${video.title}`,
              state: {
                baseURL: baseURL, 
              },
            }}>
              <li className="movie-title">{video.title}</li>
            </Link>
            </div>
            </div>
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