import express from 'express';
import { SERVER_COPY } from '../models/DisplayCopyConstants';
import { BASE, ALL_USERS } from '../models/RouteConstants';
import cors from 'cors';
import UserService from '../Services/UserService';
import { Server } from 'http';
import httpStatusCodes from 'http-status-codes';

export default class TaskServer {
	private activeServer?: Server;
	private userService: UserService;
	private server: express.Express;

	constructor(userService: UserService) {
		this.server = express();
		this.userService = userService;
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
		         500:
		 *         description: an error occured when getting all users
		 */
		this.server.get(`/${BASE}/${ALL_USERS}`, async (req, res) => {
			try {
				const users = await this.userService.getAllUsers();
				return res.json(users);
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
