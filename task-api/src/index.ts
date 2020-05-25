import PostgresConnection from './Connection/PostgressConnection';
import UserService from './Services/UserService';
import TaskService from './Services/TaskService';
import TaskServer from './Server/Server';

const dbConn = new PostgresConnection();
const userService = new UserService(dbConn);
const taskService = new TaskService(dbConn);
const taskServer = new TaskServer(userService, taskService);
const port: number = parseInt((process.env.API_PORT || 3001).toString());

taskServer.startServer(port);
