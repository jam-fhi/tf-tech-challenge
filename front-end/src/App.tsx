import React, { useState, useEffect } from 'react';
import './App.css';
import AllTasks from './Components/AllTasks';
import superagent from 'superagent';
import httpStatusCodes from 'http-status-codes';
import AddTask from './Components/AddTask';

function App() {
	const [allUsers, setAllUsers] = useState([]);
	const [allTasks, setAllTasks] = useState([]);
	const [displayTasks, setDisplayTasks] = useState([]);
	const [error, setError] = useState('');

	const getAllTasks = async () => {
		const result = await superagent.get('http://localhost:3001/api/all_tasks');
		if (result.status === httpStatusCodes.OK) {
			setAllTasks(result.body);
			setDisplayTasks([]);
		}
	};

	const handleSubmit = async (event: any) => {
		setError('');
		event.preventDefault();
		const newTask = new FormData(event.currentTarget);
		event.currentTarget.reset();
		const response = await superagent
			.post('http://localhost:3001/api/add_task')
			.send(newTask);
		if (response.status === httpStatusCodes.OK) {
			getAllTasks();
		} else {
			setError('There was an error submitting the new tasks');
		}
	};

	useEffect(() => {
		const getUser = async () => {
			const result = await superagent.get(
				`http://localhost:3001/api/all_users`
			);
			if (result.status === httpStatusCodes.OK) {
				setAllUsers(result.body);
			}
		};

		if (allTasks.length <= 0) {
			getAllTasks();
		}
		if (allUsers.length <= 0) {
			getUser();
		}
		if (displayTasks.length <= 0) {
			const newTasks: any = allTasks.map((task: any) => {
				let user: any = allUsers.find((user: any) => {
					return user.id === task.userid;
				});
				if (user) {
					return {
						taskName: task.taskName,
						id: task.id,
						username: user.username,
					};
				}
			});
			setDisplayTasks(newTasks);
		}
	}, [allUsers, allTasks, displayTasks]);

	return (
		<div className='App'>
			<header className='App-header'>
				<p>Trust Flight Task Management</p>
				<p>{error}</p>
				<AddTask allUsers={allUsers} handleSubmit={handleSubmit} />
				<AllTasks allTasks={displayTasks} />
			</header>
		</div>
	);
}

export default App;
