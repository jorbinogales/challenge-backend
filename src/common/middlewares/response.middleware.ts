// src/middlewares/response.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const response: (this: Response, body: any) => Response = res.json;
    res.json = function(this: Response, body: any): Response {
        if(this.statusCode == 200) {
            return response.call(this, {
                statusCode: this.statusCode,
                data: body
            });
        } else {
            return response.call(this, {
                statusCode: this.statusCode,
                ...body
            });
        }
    };
    next();
};