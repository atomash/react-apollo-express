import React, { Component } from 'react'

export default class UsersList extends Component {
	componentDidMount() {
		this.props.subAdd()
		this.props.subDelete()
	}

	render() {
		const { data, deleteUser } = this.props
		return (
			<ul>
				{
					data.length
						? data.map(user => (
							<div key={user._id}>
								<li>{user.name}</li>
								<button
									type='button'
									onClick={() => deleteUser({
										variables: {
											id: user._id
										}
									})}
								>delete</button>
							</div>
						)
						)
						: (<h3>Users not found</h3>)
				}	
			</ul>
		)
	}
}
