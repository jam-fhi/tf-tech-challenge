module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	testPathIgnorePatterns: [
		'/app/',
		'/node_modules/',
		'/tests/Fixtures/',
		'/tests/mocks/',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': '<rootDir>/tests/mocks/styleMocks.js',
	},
	collectCoverage: true,
};
