import React from 'react';
import { render } from '@testing-library/react';
import Task from '../../src/Components/Task';
import '@testing-library/jest-dom/extend-expect';

describe('Task displays a task', () => {
	const username = 'Bob';
	const taskname = 'Test this compoenent';

	it('Will display username and task name', () => {
		const { getByText } = render(
			<Task username={username} taskname={taskname} />
		);
		const linkElement = getByText(/Bob/i);
		expect(linkElement).toBeInTheDocument();
	});
});
