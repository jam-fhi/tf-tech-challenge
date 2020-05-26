import React from 'react';

export default function Task(props: any) {
	return (
		<div>
			{props.username} - {props.taskname}
		</div>
	);
}
