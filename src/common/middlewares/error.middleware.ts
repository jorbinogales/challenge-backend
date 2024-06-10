import { Request, Response } from 'express';

export const errorHandlerMiddleware = (error: any, req: Request, res: Response) => {
    res.status(400).json({ message: error.message });
};