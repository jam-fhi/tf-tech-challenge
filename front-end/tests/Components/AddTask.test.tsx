import React from 'react';
import { render } from '@testing-library/react';
import AddTask from '../../src/Components/AddTask';
import '@testing-library/jest-dom/extend-expect';

describe('Task displays a task', () => {
	const username = 'Bob';
	const userid = 1;

	it('Will display username and task name', () => {
		const { getByText } = render(
			<AddTask allUsers={[{ username, id: userid }]} />
		);
		const linkElement = getByText(/Add Task/i);
		expect(linkElement).toBeInTheDocument();
	});
});
