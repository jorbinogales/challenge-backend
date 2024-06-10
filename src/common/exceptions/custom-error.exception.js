"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorException = void 0;
class CustomErrorException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomErrorException.prototype);
    }
}
exports.CustomErrorException = CustomErrorException;
