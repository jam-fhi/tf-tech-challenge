import express from 'express';
import { SERVER_COPY } from '../models/DisplayCopyConstants';
import { BASE, ALL_USERS, USER, ALL_TASKS } from '../models/RouteConstants';
import cors from 'cors';
import UserService, { User } from '../Services/UserService';
import { Server } from 'http';
import httpStatusCodes from 'http-status-codes';
import TaskService, { Task } from '../Services/TaskService';

export default class TaskServer {
	private activeServer?: Server;
	private userService: UserService;
	private taskService: TaskService;
	private server: express.Express;

	constructor(userService: UserService, taskService: TaskService) {
		this.server = express();
		this.userService = userService;
		this.taskService = taskService;
	}

	private async setupServer() {
		this.server.use(express.json());
		this.server.use(express.urlencoded({ extended: true }));
		this.server.use(cors());
		this.buildAPI();
	}

	private buildAPI() {
		/**
		 * @swagger
		 *
		 * /user:
		 *   get:
		 *     description: Gets a user by id number
		 *     produces:
		 *       - application/json
		 *     consumes:
		 *       - text/plain; charset=utf-8
		 *     parameters:
		 *       - name: userid
		 *         description: The id of the user
		 *         in: query
		 *         required: true
		 *         type: integer
		 *     responses:
		 *       200:
		 *         description: all users returned
		 *       500:
		 *         description: an error occured when getting the users
		 */
		this.server.get(`/${BASE}/${USER}`, async (req, res) => {
			try {
				if (req.query.userid) {
					const userId: number = parseInt(req.query.userid.toString());
					const user: User = await this.userService.getUserById(userId);
					return res.json(user);
				}
				throw new Error('Parameter Problem');
			} catch (e) {
				return res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR);
			}
		});

		/**
		 * @swagger
		 *
		 * /all_users:
		 *   get:
		 *     description: Gets all users in the system
		 *     produces:
		 *       - application/json
		 *     consumes:
		 *       - text/plain; charset=utf-8
		 *     responses:
		 *       200:
		 *         description: all users returned
		 *       500:
		 *         description: an error occured when getting all users
		 */
		this.server.get(`/${BASE}/${ALL_USERS}`, async (req, res) => {
			try {
				const users: Array<User> = await this.userService.getAllUsers();
				return res.json(users);
			} catch (e) {
				return res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR);
			}
		});

		/**
		 * @swagger
		 *
		 * /all_tasks:
		 *   get:
		 *     description: Gets all tasks in the system
		 *     produces:
		 *       - application/json
		 *     consumes:
		 *       - text/plain; charset=utf-8
		 *     responses:
		 *       200:
		 *         description: all tasks returned
		 *       500:
		 *         description: an error occured when getting all tasks
		 */
		this.server.get(`/${BASE}/${ALL_TASKS}`, async (req, res) => {
			try {
				const tasks: Array<Task> = await this.taskService.getAllTasks();
				return res.json(tasks);
			} catch (e) {
				return res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR);
			}
		});
	}

	startServer(port: number) {
		this.setupServer();
		this.activeServer = this.server.listen(port, () => {
			console.log(`${SERVER_COPY.LIVE_ON} ${port}`);
		});
	}

	async stopServer() {
		if (this.activeServer) {
			await this.activeServer.close();
			this.activeServer = undefined;
		}
	}
}
