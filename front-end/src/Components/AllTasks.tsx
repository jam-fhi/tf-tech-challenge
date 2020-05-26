import React from 'react';
import Task from './Task';

export default function AllTasks(props: any) {
	return (
		<div>
			<p>All Tasks</p>
			<div>
				{props.allTasks.map((task: any) => {
					if (task) {
						return (
							<Task
								key={task.id}
								username={task.username}
								taskname={task.taskName}
							/>
						);
					}
				})}
			</div>
		</div>
	);
}
