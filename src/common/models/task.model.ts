import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class TaskModel {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    created_at: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsOptional()
    deleted_at: string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.email = data.email;
        this.description = data.description;
        this.status = data.status;

        if (data.created_at) {
            this.created_at = data.created_at.toDate().toLocaleString();
        } else {
            this.created_at = data.created_at;
        }

        if (data.deleted_at) {
            this.deleted_at = data.deleted_at.toDate().toLocaleString();
        } else {
            this.deleted_at = data.deleted_at;
        }
    }
}