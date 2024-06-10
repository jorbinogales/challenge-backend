"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMiddleware = void 0;
const responseMiddleware = (req, res, next) => {
    const response = res.json;
    res.json = function (body) {
        if (this.statusCode == 200) {
            return response.call(this, {
                statusCode: this.statusCode,
                data: body
            });
        }
        else {
            return response.call(this, Object.assign({ statusCode: this.statusCode }, body));
        }
    };
    next();
};
exports.responseMiddleware = responseMiddleware;
