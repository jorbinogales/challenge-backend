"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const exceptions_1 = require("../../common/exceptions");
const config_1 = require("../../common/config");
const models_1 = require("../../common/models");
const interface_1 = require("../../common/interface");
class TaskService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    getTask(user, paginationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 1 } = paginationDto;
                const { email } = user;
                const tasksQuery = yield config_1.Database
                    .collection('tasks')
                    .where('email', '==', email)
                    .limit(limit)
                    .startAfter()
                    .get();
                return tasksQuery.docs.map(doc => new models_1.TaskModel(doc.data()));
            }
            catch (error) {
                throw new exceptions_1.CustomErrorException(error.statusCode, error.message);
            }
        });
    }
    addTask(user, createTaskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = user;
                const { title, description } = createTaskDto;
                const created_at = new Date();
                const status = interface_1.TaskStatusInterface.PENDING;
                yield config_1.Database.collection('users').doc(email).set({
                    email,
                    title,
                    description,
                    created_at,
                    status
                });
                return { message: "Task created successfully" };
            }
            catch (error) {
                throw new exceptions_1.CustomErrorException(error.statusCode, error.message);
            }
        });
    }
    validateTask(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = user;
                const tasksQuery = yield config_1.Database
                    .collection('tasks')
                    .where('email', '==', email)
                    .get();
                return tasksQuery.docs.map(doc => new models_1.TaskModel(doc.data()));
            }
            catch (error) {
                throw new exceptions_1.CustomErrorException(error.statusCode, error.message);
            }
        });
    }
    markTask() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateTask() { }
    removeTask() { }
}
exports.TaskService = TaskService;
