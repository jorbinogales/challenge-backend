import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UserModel {
    @IsString()
    token: string;

    @IsEmail()
    email: string;

    constructor(data: any) {
        this.token = data.token;
        this.email = data.email;
    }
}