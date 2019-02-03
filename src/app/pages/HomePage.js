import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default function HomePage() {
  return (
		<Query
    query={gql`
      query {
        hello
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;
					return (
						<h1>{data.hello}</h1>
					);
				}}
			</Query>
  )
}
