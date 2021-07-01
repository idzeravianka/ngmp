import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExecutionMethodTimeLogger } from '../logger/execution-method-time-logger';
import { UnauthorizedError } from '../custom-errors/invalid-credentials.error';

export class AuthenticationService {
    @ExecutionMethodTimeLogger()
    public static async authentication(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) throw new UnauthorizedError('Token not provided');

            jwt.verify(token, process.env.SECRET_KEY as string, (error) => {
                if (error) throw error;
                next();
            });
        } catch (e) {
            if (e instanceof UnauthorizedError) {
                res.status(e.statusCode).json({ error: e.message });
            } else {
                res.status(403).json({ error: e.message });
            }
        }
    }

    public static generateToken(login: string): string {
        return jwt.sign(login, process.env.SECRET_KEY as string);
    }
}
