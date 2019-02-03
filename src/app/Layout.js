import React from 'react';
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div>
    <nav>
      <Link to='/'> Home </Link>|
      <Link to='/test'> Test </Link>|
    </nav>
    { children }
  </div>
);

export default Layout;
