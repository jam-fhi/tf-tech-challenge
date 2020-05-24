import PostgresConnection from '../../src/Connection/PostgressConnection';
import UserService from '../../src/Services/UserService';
import { setUp, tearDown, clearUsers } from '../Fixtures/UserFixture';

describe('The postgres connection will', () => {
	const host = 'localhost';
	const invalidHost = 'invalid';
	const user = 'pguser';
	const db = 'trustflight';
	const password = 'pgpass';
	const validUserId = 1;
	const invalidUserId = 10;
	const validUserName = 'bsmith';
	const validAllUsers = 2;
	const validOtherUserName = 'mjones';
	const notFoundError = 'No Results';
	const badAddress = `getaddrinfo ENOTFOUND ${invalidHost}`;

	let dbConn: PostgresConnection;

	beforeEach(async () => {
		process.env.DB_USER = user;
		process.env.DB_HOST = host;
		process.env.DB_PASSWORD = password;
		process.env.DB_DATABASE = db;
		dbConn = new PostgresConnection();
		// Due to db seeding, always teardown first.
		await tearDown();
		await setUp();
	});

	it('Will find a user based on id number', async () => {
		const userService = new UserService(dbConn);
		const result = await userService.getUserById(validUserId);
		expect(result.username).toBe(validUserName);
	});

	it('Will not find a user with an invalid user id', async () => {
		const userService = new UserService(dbConn);
		try {
			await userService.getUserById(invalidUserId);
			fail();
		} catch (e) {
			expect(e.message).toBe(notFoundError);
		}
	});

	it('Will not find a user with a bad db connection', async () => {
		process.env.DB_HOST = invalidHost;
		dbConn = new PostgresConnection();
		const userService = new UserService(dbConn);
		try {
			await userService.getUserById(invalidUserId);
			fail();
		} catch (e) {
			expect(e.message).toBe(badAddress);
		}
	});

	it('Will find all users', async () => {
		const userService = new UserService(dbConn);
		const result = await userService.getAllUsers();
		expect(result.length).toBe(validAllUsers);
		expect(result[0].username).toBe(validUserName);
		expect(result[1].username).toBe(validOtherUserName);
	});

	it('Will fail to find all users', async () => {
		await clearUsers();
		const userService = new UserService(dbConn);
		try {
			await userService.getAllUsers();
		} catch (e) {
			expect(e.message).toBe(notFoundError);
		}
	});
});
