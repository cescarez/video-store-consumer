import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './VideoLibrary.css';



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
          <section className="move-container">
          <section className="movie-details">
            <h2 className="video-title">{video.title}</h2>
          <img className="move-image" src={video.image_url} alt='movie poster' />
          <div key={video.external_id}>
            </div>
            <p className="release-date">Release Date: {video.release_date}</p>
            <div className="video-overview">
            <h3>Overview</h3>
              <p>{video.overview}</p>
            <div>
            <Link to={`/videos/${video.title}`}>
              <li className="additional-details">Click for Details</li>
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