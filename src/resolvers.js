/* eslint-disable */

import gql from 'graphql-tag';

export const defaults = {
	todos: [],
	visibilityFilter: 'SHOW_ALL',
};

let nextTodoId = 0;

export const resolvers = {
	Mutation: {
		addTodo: (_, { text }, { cache }) => {
			const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `;
			const previous = cache.readQuery({ query });
			const newTodo = {
				id: nextTodoId++,
				text,
				completed: false,
				__typename: 'TodoItem',
			};
			const data = {
				todos: previous.todos.concat([newTodo]),
			};
			cache.writeData({ data });
			return newTodo;
		},
		toggleTodo: (_, variables, { cache }) => {
			const id = `TodoItem:${variables.id}`;
			const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `;
			const todo = cache.readFragment({ fragment, id });
			const data = { ...todo, completed: !todo.completed };
			cache.writeData({ id, data });
			return null;
		},
	},
};
