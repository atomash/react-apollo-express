import React from 'react';
import { Link } from 'react-router-dom'

import "./App.scss";

const Layout = ({ children }) => (
	<div className='App'>
		<nav>
			<Link to='/'> Home </Link>|
			<Link to='/test'> Test </Link>|
		</nav>
		{ children }
	</div>
);

export default Layout;
