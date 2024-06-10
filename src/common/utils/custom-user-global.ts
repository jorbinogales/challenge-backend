import {UserModel} from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: UserModel | any; // Adjust the type according to your actual User type
        }
    }
}

export {};
