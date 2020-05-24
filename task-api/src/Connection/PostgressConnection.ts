import { Client } from 'pg';

interface queryObject {
	text: string;
	values: Array<string>;
}

export default class PostgresConnection {
	constructor() {
		process.env.PGUSER = process.env.DB_USER;
		process.env.PGHOST = process.env.DB_HOST;
		process.env.PGPASSWORD = process.env.DB_PASSWORD;
		process.env.PGDATABASE = process.env.DB_DATABASE;
		process.env.PGPORT = '5432';
	}

	private async getConnection() {
		const connection = new Client();
		await connection.connect();
		return connection;
	}

	private buildQuery(query: string, params?: Array<string>): queryObject {
		if (params === undefined) {
			params = [];
		}
		return { text: query, values: params };
	}

	async runQuery(query: string, params?: Array<string>) {
		const conn = await this.getConnection();
		try {
			const rows = await conn.query(this.buildQuery(query, params));
			return rows;
		} finally {
			await conn.end();
		}
	}
}
