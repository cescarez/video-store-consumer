import React from 'react';

import Image from '../image/hollywood-video-logo-vector.png'

function Home() {
  return (
  <div>
    <h3>Home</h3>
    <img className="home-image" src={Image} alt='movie poster' />
  </div>

  );
}

export default Home;