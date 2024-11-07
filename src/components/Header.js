import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Book Review App</h1>
      <nav>
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {/* <li><a href="#add-review" className="nav-link">Add Review</a></li> */}
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
