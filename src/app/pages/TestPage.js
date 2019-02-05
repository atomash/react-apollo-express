import React from 'react';
import Footer from "../components/Footer";
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function TestPage() {
	return (
		<div>
	  <h1>Test Todo Page</h1>

			<TodoForm />
			<TodoList />
			<Footer />
		</div>
	)
}
