import {CreateTaskDto} from "./create-task.dto";
import {IsEnum, IsOptional, IsString} from "class-validator";
import {TaskStatusInterface} from "../../../common/interface";

export class UpdateTaskDto extends CreateTaskDto {

    @IsEnum(TaskStatusInterface, { message: 'status must be a valid enum value' })
    status: TaskStatusInterface;
}