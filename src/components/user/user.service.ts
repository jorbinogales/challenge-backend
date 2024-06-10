import { Database } from "../../common/config";
import {CustomErrorException} from "../../common/exceptions";
import {CreateUserDto} from "./dto";
import jwt from 'jsonwebtoken';

export class UserService {

    constructor(private readonly secretKey: string) {
    }
    async getUser(email: string) {
        try {
            const user = await Database
                .collection('users')
                .where('email', '==', email)
                .limit(1)
                .get();
            if (!user.empty) {
                let response =  user.docs[0].data()
                const token = jwt.sign({ email: email }, this.secretKey, { expiresIn: '1h' });
                return {
                    token,
                    ...response
                }
            } else {
                throw new CustomErrorException(404, "User not found");
            }
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode, error.message);
        }
    }

    async addUser(userData: CreateUserDto) {
        try {
            const { email } = userData;
            await Database.collection('users').doc(email).set({ email: email });
            const token = jwt.sign({ email: email }, this.secretKey, { expiresIn: '1h' });
            return {
                token,
                email
            }
        } catch (error: any) {
            throw new CustomErrorException(error.statusCode || 500, error.message || "Failed to add user");
        }
    }
}