import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const Nav = (props) => {
  return (
    <nav className='nav navbar navbar-expand navbar-dark'>
    
      <div className='nav-items'>
        <a className="navbar-brand" href="#">
          <img className='nav-logo' src="/public/icons/marvel-logo.svg" width="100" height="40" alt="marvel-studios" />
        </a>
        <ul className="navbar-nav nav-links">
          <li className='nav-item'><NavLink className='nav-link' to='/' exact> Home </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/comics'> Comics </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/characters'> Characters </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/image-search'> Image Search </NavLink></li>
        </ul>
      </div>
      <SearchBar search={props.search}/>
    </nav>
  )
}

export default Nav;