import React from 'react'
import { Query, Mutation  } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
			name
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

export default function HomePage() {
	return (
		<Query
			query={GET_USERS}
		>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;
				return (
					<div>
						<h1>From server: {data.hello}</h1>
						<ul>
							{
								data.allUsers.length
									? data.allUsers.map(user => (
										<Mutation
											mutation={DELETE_USER}
											variables={{ id: user._id }}
											update={(cache) => {
												const { allUsers } = cache.readQuery({ query: GET_USERS });
												cache.writeQuery({
													query: GET_USERS,
													data: {
														allUsers: allUsers.filter(foundUser => foundUser._id !== user._id)
													},
												});
											}}
											key={user._id}>
											{deleteUser => (
												<div>
													<li>{user.name}</li>
													<button
														type='button'
														onClick={deleteUser}
													>delete</button>
												</div>
											)}
										</Mutation>
									))
									: (<h3>Users not found</h3>)
							}	
						</ul>
					</div>
					
				);
			}}
		</Query>
	)
}
