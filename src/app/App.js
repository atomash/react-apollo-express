import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';


const App = () => (
	<Layout>
		<Switch>
			<Route exact path='/' component={ HomePage } />
			<Route exact path='/test' component={ TestPage} />
		</Switch>
	</Layout>
);

export default App;
