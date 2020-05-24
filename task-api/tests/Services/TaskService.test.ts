import PostgresConnection from '../../src/Connection/PostgressConnection';
import TaskService from '../../src/Services/TaskService';
import { setUp, tearDown, clearTasks } from '../Fixtures/TaskFixture';

describe('The postgres connection will', () => {
	const host = 'localhost';
	const invalidHost = 'invalid';
	const user = 'pguser';
	const db = 'trustflight';
	const password = 'pgpass';
	const validTaskCount = 2;
	const validNewTaskCount = 3;
	const validTaskName = 'Check The Right Wing';
	const validUserId = 2;
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

	it('Will get all tasks in the database', async () => {
		const taskService = new TaskService(dbConn);
		const result = await taskService.getAllTasks();
		expect(result.length).toBe(validTaskCount);
	});

	it('Will not get any tasks without data existing', async () => {
		await clearTasks();
		const taskService = new TaskService(dbConn);
		try {
			await taskService.getAllTasks();
			fail();
		} catch (e) {
			expect(e.message).toBe(notFoundError);
		}
	});

	it('Will not get any tasks with a bad database connection', async () => {
		process.env.DB_HOST = invalidHost;
		dbConn = new PostgresConnection();
		const taskService = new TaskService(dbConn);
		try {
			await taskService.getAllTasks();
			fail();
		} catch (e) {
			expect(e.message).toBe(badAddress);
		}
	});

	it('Will add a new task', async () => {
		const taskService = new TaskService(dbConn);
		const result = await taskService.getAllTasks();
		expect(result.length).toBe(validTaskCount);
		await taskService.addTask(validTaskName, validUserId);
		const newResults = await taskService.getAllTasks();
		expect(newResults.length).toBe(validNewTaskCount);
	});
});
