import {CustomErrorException} from "../../common/exceptions";
import {Database} from "../../common/config";
import {TaskModel} from "../../common/models";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatusInterface} from "../../common/interface";
import {v4 as uuidv4} from 'uuid';
import {UserModel} from "../../common/models/user.model";
import {UpdateTaskDto} from "./dto/update-task.dto";

export class TaskService {
    constructor() {
    }

    async getTaskList(user: UserModel): Promise<TaskModel[]> {
        try {
            const {email} = user;
            const tasksQuery = await Database
                .collection('tasks')
                .where('email', '==', email)
                .where('deleted_at', '==', null)
                .orderBy('created_at', 'desc')
                .get();
            return tasksQuery.docs.map(doc => new TaskModel(doc.data()));
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode, error.message);
        }
    }


    async addTask(user: UserModel, createTaskDto: CreateTaskDto) {
        try {
            const uuid_value = uuidv4();
            const {email} = user;
            const {title, description} = createTaskDto;
            const created_at = new Date();
            const status: TaskStatusInterface = TaskStatusInterface.PENDING;
            await Database.collection('tasks').add({
                id: uuid_value,
                email,
                title,
                description,
                status,
                created_at,
                deleted_at: null
            });
            return {
                message: "Task created successfully",
            };
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode, error.message);
        }
    }

    async getTask(user: UserModel, id: string) {
        try {
            const {email} = user;
            const tasksQuery = await Database
                .collection('tasks')
                .where('email', '==', email)
                .where('id', '==', id)
                .where('deleted_at', '==', null)
                .limit(1)
                .get();

            if (!tasksQuery.empty) {
                const firstDoc = tasksQuery.docs[0];
                const taskId = firstDoc.id;
                const taskData = firstDoc.data();
                const taskModel = new TaskModel(taskData);
                return {
                    taskId,
                    taskModel
                };
            } else {
                throw new CustomErrorException(404, "Task not found");
            }
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode, error.message);
        }
    }


    async updateTask(user: UserModel, updateTaskDto: UpdateTaskDto, id: string) {
        try {
            const task = await this.getTask(user, id);
            if(task.taskId){
                const {title, description} = updateTaskDto;
                await Database.collection('tasks').doc(task.taskId).update({
                    title,
                    description,
                });
                return {message: "Task updated successfully"};
            }
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode, error.message);
        }
    }

    async changeStatus(user: UserModel, updateTaskDto: UpdateTaskDto, id: string) {
        try {
            const task = await this.getTask(user, id);
            if(task.taskId){
                const { status} = updateTaskDto;
                await Database.collection('tasks').doc(task.taskId).update({
                    status
                });
                return {message: "Task updated successfully"};
            }
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode, error.message);
        }
    }

    async removeTask(user: any, id: string) {
        const task = await this.getTask(user, id)
        if (task.taskId) {
            const deleted_at = new Date();
            await Database.collection('tasks').doc(task.taskId).update({
                deleted_at
            });
            return {message: "Task deleted successfully"};
        }
    }
}