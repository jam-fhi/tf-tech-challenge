import PostgresConnection from '../../src/Connection/PostgressConnection';
import UserService from '../../src/Services/UserService';
import { setUp, tearDown, clearUsers } from '../Fixtures/UserFixture';
import TaskServer from '../../src/Server/Server';
import superagent from 'superagent';
import { BASE, ALL_USERS } from '../../src/models/RouteConstants';

describe('The server', () => {
	const apiHost = 'http://localhost';
	const host = 'localhost';
	const user = 'pguser';
	const db = 'trustflight';
	const password = 'pgpass';
	const port = 3002;
	const connectFailError = 'connect ECONNREFUSED 127.0.0.1:3002';
	const internalServerError = 'Internal Server Error';

	let dbConn: PostgresConnection;
	let userService: UserService;
	let taskServer: TaskServer;

	beforeEach(async () => {
		process.env.DB_USER = user;
		process.env.DB_HOST = host;
		process.env.DB_PASSWORD = password;
		process.env.DB_DATABASE = db;
		// Due to db seeding, always teardown first.
		await tearDown();
		await setUp();
		dbConn = new PostgresConnection();
		userService = new UserService(dbConn);
		taskServer = new TaskServer(userService);
		taskServer.startServer(port);
	});

	afterEach(async () => {
		await taskServer.stopServer();
	});

	it('Will get all users in the system', async () => {
		const result = await superagent.get(
			`${apiHost}:${port}/${BASE}/${ALL_USERS}`
		);
		expect(result.body).toMatchSnapshot();
	});

	it('Will throw an error when there are no users', async () => {
		await clearUsers();
		try {
			await superagent.get(`${apiHost}:${port}/${BASE}/${ALL_USERS}`);
		} catch (e) {
			expect(e.message).toBe(internalServerError);
		}
	});

	it('Will not do anything if the server is already stopped', async () => {
		// Stop called twice so that the if statement
		// within the stop method can be tested
		await taskServer.stopServer();
		await taskServer.stopServer();
		try {
			await superagent.get(`${apiHost}:${port}/${BASE}/${ALL_USERS}`);
		} catch (e) {
			expect(e.message).toBe(connectFailError);
		}
	});
});