import { Router } from 'express';

import { AUTH_API } from '../configs/api-path-enum/auth-api.enum';
import AuthController from './controllers/auth.controller';
import { validateSchema } from '../validation/validators';
import { loginSchema } from '../validation/schemes/login.schema';
import { ValidationType } from '../validation/enums/validation-type.enum';

const router = Router();

export default router
    .post(
        AUTH_API.LOGIN,
        validateSchema(loginSchema, ValidationType.Body),
        AuthController.login,
    );

