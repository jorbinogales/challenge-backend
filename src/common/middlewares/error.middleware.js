"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (error, req, res, next) => {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
