import {NextFunction, Request, Response} from "express";
import {TaskService} from "./task.service";
import {TaskModel} from "../../common/models";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UserModel} from "../../common/models/user.model";
import {UpdateTaskDto} from "./dto/update-task.dto";

export class TaskController {
    constructor(
        private  readonly taskService: TaskService
    ) {
    }

    async getTaskList(req: Request, res: Response, next: NextFunction) {
        try {
            const user: UserModel = req.user;
            const serviceResponse: TaskModel[] = await this.taskService.getTaskList(user);
            res.status(200).json(serviceResponse);
        } catch (error){
            next(error)
        }
    }

    async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const user: UserModel = req.user;
            const createTaskDto: CreateTaskDto = req.body;
            const serviceResponse = await this.taskService.addTask(user, createTaskDto)
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error)
        }
    }

    async getTask(req: Request, res: Response, next: NextFunction){
        try{
            const id: string = req.params.id;
            const user: UserModel = req.user;
            const { taskModel } = await this.taskService.getTask(user, id)
            res.status(200).json(taskModel);
        } catch (error){
            next(error)
        }
    }

    async udpateTask(req: Request, res: Response, next: NextFunction){
        try{
            const id: string = req.params.id;
            const user: UserModel = req.user;
            const updateTaskDto: UpdateTaskDto = req.body;
            const serviceResponse = await this.taskService.updateTask(user, updateTaskDto, id)
            res.status(200).json(serviceResponse);
        } catch (error){
            next(error)
        }
    }

    async changeStatus(req: Request, res: Response, next: NextFunction){
        try{
            const id: string = req.params.id;
            const user: UserModel = req.user;
            const updateTaskDto: UpdateTaskDto = req.body;
            const serviceResponse = await this.taskService.changeStatus(user, updateTaskDto, id)
            res.status(200).json(serviceResponse);
        } catch (error){
            next(error)
        }
    }

    async removeTask(req: Request, res: Response, next: NextFunction){
        try{
            const id: string = req.params.id;
            const user: UserModel = req.user;
            const serviceResponse = await this.taskService.removeTask(user, id)
            res.status(200).json(serviceResponse);
        } catch (error){
            next(error)
        }
    }


}