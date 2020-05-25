import PostgresConnection from '../Connection/PostgressConnection';

interface Task {
	id: number;
	taskName: string;
	userid: number;
}

export default class TaskService {
	private dbConn: PostgresConnection;

	constructor(dbConn: PostgresConnection) {
		this.dbConn = dbConn;
	}

	async getAllTasks(): Promise<Array<Task>> {
		const allTasks = await this.dbConn.runQuery(
			'select tasks.id, tasks.taskname, tasks.userid from public.tasks'
		);
		if (allTasks.rowCount <= 0) {
			throw new Error('No Results');
		}

		const resultTasks = allTasks.rows.map((task) => {
			return this.buildTask(task.id, task.taskName, task.userid);
		});
		return resultTasks;
	}

	async addTask(taskName: string, userid: number): Promise<boolean> {
		await this.dbConn.runQuery(
			'insert into public.tasks (taskname, userid) values ($1, $2)',
			[taskName, userid.toString()]
		);
		return true;
	}

	private buildTask(id: number, taskName: string, userid: number): Task {
		return {
			id,
			taskName,
			userid,
		};
	}
}
