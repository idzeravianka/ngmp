import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../models';

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login;

    const isLoginExist = await UserModel.findOne({ where: { login } });

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
