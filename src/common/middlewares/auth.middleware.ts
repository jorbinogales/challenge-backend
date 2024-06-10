import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const authenticateToken = (secretKey: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Obtener el token de la cabecera Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verificar y decodificar el token JWT
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decoded;
            next();
        });
    };
};