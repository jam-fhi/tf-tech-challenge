import React from 'react';

export default function AddTask(props: any) {
	return (
		<div>
			<p>Add Task</p>
			<form onSubmit={props.handleSubmit}>
				Task Name: <input type='text' name='taskName' required />
				Assignee:
				<select name='userId'>
					{props.allUsers.map((user: any) => (
						<option value={user.id} key={user.id}>
							{user.username}
						</option>
					))}
				</select>
				<input type='submit' />
			</form>
		</div>
	);
}
