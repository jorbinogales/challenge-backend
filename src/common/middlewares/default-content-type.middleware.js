"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultContentTypeMiddleware = void 0;
const defaultContentTypeMiddleware = (req, res, next) => {
    if (!req.headers['content-type']) {
        req.headers['content-type'] = 'application/json';
    }
    next();
};
exports.defaultContentTypeMiddleware = defaultContentTypeMiddleware;
