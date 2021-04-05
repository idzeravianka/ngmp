import { Request, Response, NextFunction } from 'express';
import { mockedUsers } from '../user/services/mocked-users';

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login;

    const regexp = new RegExp(`^${login}$`);
    const isLoginExist = mockedUsers.find(user => user.login.match(regexp));

    if (isLoginExist) {
        res.status(400).json({
            status: 'Failed',
            errors: [
                {
                    path: ['login'],
                    message: 'User with this login already exist'
                }
            ]
        });
    } else {
        next();
    }
};
