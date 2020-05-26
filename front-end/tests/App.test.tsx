import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom/extend-expect';

describe('Trust Flight Task Management', () => {
	it('Will have a Trust flight task management title', () => {
		const { getByText } = render(<App />);
		const linkElement = getByText(/Trust Flight Task Management/i);
		expect(linkElement).toBeInTheDocument();
	});
});
