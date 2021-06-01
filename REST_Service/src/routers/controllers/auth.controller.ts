import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../../services/user.service';
import { controllerLogger } from '../../logger/controller-loger';
import { ExecutionMethodTimeLogger } from '../../logger/execution-method-time-logger';

class AuthController {
    @ExecutionMethodTimeLogger()
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const userCredentials = { ...req.body };
            const token = await userService.login(userCredentials.login, userCredentials.password);
            if (!token) {
                res.status(401).json({
                    error: 'Invalid credentials'
                });
                return;
            }
            res.status(200).json({ token });
        } catch (e) {
            controllerLogger('login', JSON.stringify(req.body), e.message);
            res.status(404).json({ error: e.message });
        }
    }

    @ExecutionMethodTimeLogger()
    public async authentification(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                error: 'Invalid credentials'
            });
            return;
        }

        jwt.verify(token, process.env.SECRET_KEY as string, (error) => {
            if (error) {
                res.status(403).json({ error });
                return;
            }
            next();
        });
    }
}

export default new AuthController();
