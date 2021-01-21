import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';


const VideoLibrary = ({videoLibrary, baseURL}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoLibrary);
  }, [videoLibrary])

  const listVideos = () => {
    return (
      <div>
      {videos.map((video) => {
        return(
          <Link to={{
            pathname:`/videos/${video.title}`,
            state: {
              baseURL: baseURL, 
            }
          }}>
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