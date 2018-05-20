import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const Nav = (props) => {
  return (
    <nav className='nav navbar navbar-expand navbar-dark bg-dark'>
      <div >
        <ul className="navbar-nav">
          <li className='nav-item'><NavLink className='nav-link' to='/' exact> Home </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/comics'> Comics </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/mcu'> Movies/TV </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/characters'> Characters </NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to='/image-search'> Image Search </NavLink></li>
        </ul>
      </div>
      <SearchBar search={props.search}/>
    </nav>
  )
}

export default Nav;