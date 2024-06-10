import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

export const validationPipe = (type: any, source: 'body' | 'query' = 'body') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = source === 'body' ? req.body : req.query;
            const dto = plainToClass(type, data);

            const errors: ValidationError[] = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            if (source === 'body') {
                req.body = dto;
            } else {
                req.query = dto as any;
            }
            next();
        } catch (error) {
            console.error('Error en validationPipe:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};