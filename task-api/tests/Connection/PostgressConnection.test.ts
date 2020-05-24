import PostgresConnection from '../../src/Connection/PostgressConnection';

describe('The postgres connection will', () => {
	const host = 'localhost';
	const invalidHost = 'invalid';
	const user = 'pguser';
	const db = 'trustflight';
	const password = 'pgpass';
	const failedToThrow = 'failedToThrow';
	const badAddress = `getaddrinfo ENOTFOUND ${invalidHost}`;
	const validQueryOneResult = 'select * from public.user where email = $1';
	const validParamsOneResult = ['Bob@smith.comm'];
	const validQueryOneResultCount = 1;
	const validQueryAllResult = 'select * from public.user';
	const validQueryAllResultCount = 2;

	beforeEach(() => {
		process.env.DB_USER = user;
		process.env.DB_HOST = host;
		process.env.DB_PASSWORD = password;
		process.env.DB_DATABASE = db;
		/**
		 * Normally I would setup and tear down,
		 * for the connection, data exists from
		 * db-seed.
		 */
	});

	it('Will provide query access to the database', async () => {
		const connn = new PostgresConnection();
		const result = await connn.runQuery(
			validQueryOneResult,
			validParamsOneResult
		);
		expect(result.rowCount).toBe(validQueryOneResultCount);
	});

	it('Will provide query access to the database', async () => {
		const connn = new PostgresConnection();
		const result = await connn.runQuery(validQueryAllResult);
		expect(result.rowCount).toBe(validQueryAllResultCount);
	});

	it('Will fail to connect to an invalid host', async () => {
		process.env.DB_HOST = invalidHost;
		const connn = new PostgresConnection();
		try {
			await connn.runQuery(validQueryAllResult);
			throw new Error(failedToThrow);
		} catch (e) {
			expect(e.message).toBe(badAddress);
		}
	});
});
