import React from 'react'
import { Query, compose, graphql  } from 'react-apollo';
import gql from 'graphql-tag';

import UsersList from '../components/UsersList';

const USER_ADDED = gql`
subscription userAdded {
  userAdded {
		_id
	  name
  }
}
`;

const USER_DELETED = gql`
subscription userDeleted {
  userDeleted {
		_id
  }
}
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
		_id
		}
  }
`;

const GET_USERS = gql`
query {
	allUsers {
		_id
		name
	}
	hello
}
`

function HomePage({deleteUser}) {
	return (
		<Query
			query={GET_USERS}
		>
			{({ loading, error, data, subscribeToMore }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;
				const subAdd = () => subscribeToMore({
					document: USER_ADDED,
					updateQuery: (prev, { subscriptionData }) => ({
						...prev,
						allUsers: [
							...prev.allUsers, subscriptionData.data.userAdded
						]
						
					})
				});
				const subDelete = () => subscribeToMore({
					document: USER_DELETED,
					updateQuery: (prev, { subscriptionData }) => ({
						...prev,
						allUsers: prev.allUsers.filter(foundUser => foundUser._id !== subscriptionData.data.userDeleted._id),
					}),
					  });
				return (
					<div>
						<h1>From server: {data.hello}</h1>
						<UsersList
							subAdd={subAdd}
							subDelete={subDelete}
							deleteUser={deleteUser}
							data={data.allUsers}

						/>
					</div>
					
				);
			}}
		</Query>
	)
}


export default compose(
	graphql(DELETE_USER, { name: 'deleteUser' })
)(HomePage)