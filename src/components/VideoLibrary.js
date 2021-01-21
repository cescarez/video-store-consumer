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
      {videos.map((video) => {
        return(
          <Link to={`/videos/${video.title}`}>
            <li>{video.title}</li>
            <img src={video.image_url} alt='movie poster' />
          </Link>
        )
      })}
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