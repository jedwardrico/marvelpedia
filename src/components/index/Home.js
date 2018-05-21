import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className='text-center'>
      <div className='head-title'> Welcome To The Marvelpedia! </div>
      <h4> Here you can search for all things Marvel Comic related.</h4>
      <Link to='image-search'><img src='public/icons/hero_image.png' alt='get it? HERO image!'/></Link>
    </div>
  )
}

export default Home;