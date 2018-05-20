import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <h1> Welcome To The Marvel Library </h1>
      <p> Here you can search for all things Marvel Comic related.</p>
      <h4> Not sure what you are looking for? </h4>
      <Link to='image-search'> Click here to search the Library with an image! </Link>
    </div>
  )
}

export default Home;