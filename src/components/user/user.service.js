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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = require("../../common/config");
const exceptions_1 = require("../../common/exceptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield config_1.Database
                    .collection('users')
                    .where('email', '==', email)
                    .limit(1)
                    .get();
                if (!user.empty) {
                    const token = jsonwebtoken_1.default.sign({ email: email }, this.secretKey, { expiresIn: '1h' });
                    return {
                        token,
                        email: user.docs[0].data()
                    };
                }
                else {
                    throw new exceptions_1.CustomErrorException(404, "User not found");
                }
            }
            catch (error) {
                throw new exceptions_1.CustomErrorException(error.statusCode, error.message);
            }
        });
    }
    addUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = userData;
                yield config_1.Database.collection('users').doc(email).set({ email: email });
                return { message: "User added successfully" };
            }
            catch (error) {
                throw new exceptions_1.CustomErrorException(error.statusCode || 500, error.message || "Failed to add user");
            }
        });
    }
}
exports.UserService = UserService;
