import { Request, Response } from 'express';
import userService from '../../services/user.service';
import { controllerLogger } from '../../logger/controller-loger';
import { ExecutionMethodTimeLogger } from '../../logger/execution-method-time-logger';
import { UnauthorizedError } from '../../custom-errors/invalid-credentials.error';

class AuthController {
    @ExecutionMethodTimeLogger()
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const userCredentials = { ...req.body };

            const token = await userService.login(userCredentials.login, userCredentials.password);

            res.status(200).json({ token });
        } catch (e) {
            controllerLogger('login', JSON.stringify(req.body), e.message);
            if (e instanceof UnauthorizedError) {
                res.status(e.statusCode).json({ error: e.message });
            } else {
                res.status(404).json({ error: e.message });
            }
        }
    }
}

export default new AuthController();
