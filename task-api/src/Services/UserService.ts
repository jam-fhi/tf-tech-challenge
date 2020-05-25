import PostgresConnection from '../Connection/PostgressConnection';

export interface User {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	id: number;
}

export default class UserService {
	private dbConn: PostgresConnection;

	constructor(dbConn: PostgresConnection) {
		this.dbConn = dbConn;
	}

	async getUserById(userId: number): Promise<User> {
		const userResult = await this.dbConn.runQuery(
			'select first_name, last_name, email, username, id from public.user where id = $1',
			[userId.toString()]
		);
		if (userResult.rowCount <= 0) {
			throw new Error('No Results');
		}
		return this.buildUser(
			userResult.rows[0].first_name,
			userResult.rows[0].last_name,
			userResult.rows[0].email,
			userResult.rows[0].username,
			userResult.rows[0].id
		);
	}

	async getAllUsers(): Promise<Array<User>> {
		const userResult = await this.dbConn.runQuery(
			'select first_name, last_name, email, username, id from public.user'
		);
		if (userResult.rowCount <= 0) {
			throw new Error('No Results');
		}
		const allUsers: Array<User> = userResult.rows.map((user) => {
			return this.buildUser(
				user.first_name,
				user.last_name,
				user.email,
				user.username,
				user.id
			);
		});
		return allUsers;
	}

	private buildUser(
		first_name: string,
		last_name: string,
		email: string,
		username: string,
		id: number
	): User {
		return {
			first_name,
			last_name,
			email,
			username,
			id,
		};
	}
}
