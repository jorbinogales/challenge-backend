// src/controllers/dataController.ts
import {NextFunction, Request, Response} from 'express';
import { UserService } from "./user.service";
import {CreateUserDto} from "./dto";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email;
            const serviceResponse = await this.userService.getUser(email);
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);
        }
    }

    async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createUserDto: CreateUserDto = req.body;
            const serviceResponse = await this.userService.addUser(createUserDto)
            res.status(200).json(serviceResponse);
        } catch (error) {
            next(error);
        }
    }
}