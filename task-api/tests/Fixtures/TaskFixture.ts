import { Client } from 'pg';

export async function tearDown() {
	process.env.PGUSER = 'pguser';
	process.env.PGHOST = 'localhost';
	process.env.PGPASSWORD = 'pgpass';
	process.env.PGDATABASE = 'trustflight';
	process.env.PGPORT = '5432';
	const conn = new Client();
	await conn.connect();
	try {
		await conn.query('drop table public.tasks');
	} catch (e) {
		// silently fail. not a big deal if we can't drop a table
		// during teardown.
	}
	await conn.end();
}

export async function clearTasks() {
	process.env.PGUSER = 'pguser';
	process.env.PGHOST = 'localhost';
	process.env.PGPASSWORD = 'pgpass';
	process.env.PGDATABASE = 'trustflight';
	process.env.PGPORT = '5432';
	const conn = new Client();
	await conn.connect();
	await conn.query('truncate table public.tasks');
	await conn.end();
}

export async function setUp() {
	process.env.PGUSER = 'pguser';
	process.env.PGHOST = 'localhost';
	process.env.PGPASSWORD = 'pgpass';
	process.env.PGDATABASE = 'trustflight';
	process.env.PGPORT = '5432';
	const conn = new Client();
	await conn.connect();
	await conn.query(
		'CREATE TABLE public.tasks (id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, taskname varchar(255) NOT NULL, userid int NOT NULL)'
	);
	await conn.query({
		text: 'insert into public.tasks (taskname, userid) values ($1, $2)',
		values: ['Make a cup of tea', '1'],
	});
	await conn.query({
		text: 'insert into public.tasks (taskname, userid) values ($1, $2)',
		values: ['Check the left wing', '2'],
	});
	await conn.end();
}