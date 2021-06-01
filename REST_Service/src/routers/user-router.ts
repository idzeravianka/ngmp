import { Router } from 'express';
import { ValidationType } from '../validation/enums/validation-type.enum';
import { USER_API } from '../configs/api-path-enum/user-api.enum';
import { loginValidator, validateSchema } from '../validation/validators';
import { autoSuggestSchema, idSchema, createUserBodySchema } from '../validation/schemes';
import userController from './controllers/user.controller';
import authController from './controllers/auth.controller';

const router = Router();

export default router
    .get(USER_API.GET_USER,
        authController.authentification,
        validateSchema(idSchema, ValidationType.Params),
        userController.getUserById)
    .get(USER_API.AUTO_SUGGEST,
        authController.authentification,
        validateSchema(autoSuggestSchema, ValidationType.Query),
        userController.getAutoSuggestUsers)
    .put(USER_API.UPDATE_USER,
        authController.authentification,
        validateSchema(idSchema, ValidationType.Params),
        validateSchema(createUserBodySchema, ValidationType.Body),
        loginValidator,
        userController.updateUser)
    .post(USER_API.CREATE_USER,
        authController.authentification,
        validateSchema(createUserBodySchema, ValidationType.Body),
        loginValidator,
        userController.createUser)
    .post(USER_API.DELETE_USER,
        authController.authentification,
        validateSchema(idSchema, ValidationType.Params),
        userController.deleteUser);
