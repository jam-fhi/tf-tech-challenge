import React from 'react';
import { render } from '@testing-library/react';
import AllTasks from '../../src/Components/AllTasks';
import '@testing-library/jest-dom/extend-expect';

describe('Task displays a task', () => {
	const username = 'Bob';
	const taskName = 'Test this compoenent';
	const id = 1;

	it('Will display username and task name', () => {
		const { getByText } = render(
			<AllTasks allTasks={[{ id, username, taskName }]} />
		);
		const linkElement = getByText(/Bob/i);
		expect(linkElement).toBeInTheDocument();
	});
});
