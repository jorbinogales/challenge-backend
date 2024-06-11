import {Router} from 'express';
import {UserController} from '../../components/user/user.controller';
import {UserService} from "../../components/user/user.service";
import {validationPipe} from "../pipe";
import {CreateUserDto} from "../../components/user/dto";
import {TaskService} from "../../components/task/task.service";
import {TaskController} from "../../components/task/task.controller";
import {authenticateToken} from "../middlewares";
import {envs} from "../config";


export const router = Router();
const userService: UserService = new UserService(envs.jwtSecretKey);
const userController: UserController = new UserController(userService);

const taskService: TaskService = new TaskService();
const taskController: TaskController = new TaskController(taskService);


router.post('/users', validationPipe(CreateUserDto), userController.addUser.bind(userController));
router.get('/users/:email', userController.getUser.bind(userController));

router.get('/tasks', authenticateToken(envs.jwtSecretKey), taskController.getTaskList.bind(taskController));
router.post('/tasks', authenticateToken(envs.jwtSecretKey), taskController.addTask.bind(taskController));
router.get('/tasks/:id', authenticateToken(envs.jwtSecretKey), taskController.getTask.bind(taskController));
router.delete('/tasks/:id', authenticateToken(envs.jwtSecretKey), taskController.removeTask.bind(taskController));
router.put('/tasks/:id', authenticateToken(envs.jwtSecretKey), taskController.udpateTask.bind(taskController));
router.put('/tasks/status/:id', authenticateToken(envs.jwtSecretKey), taskController.changeStatus.bind(taskController));