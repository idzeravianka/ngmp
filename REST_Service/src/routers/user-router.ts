import { Router } from 'express';
import { ValidationType } from '../validation/enums/validation-type.enum';
import { USER_API } from '../configs/api-path-enum/user-api.enum';
import { loginValidator, validateSchema } from '../validation/validators';
import { autoSuggestSchema, idSchema, createUserBodySchema } from '../validation/schemes';
import userController from './controllers/user.controller';

const router = Router();

export default router
    .get(USER_API.GET_USER,
        validateSchema(idSchema, ValidationType.Params),
        userController.getUserById)
    .get(USER_API.AUTO_SUGGEST,
        validateSchema(autoSuggestSchema, ValidationType.Query),
        userController.getAutoSuggestUsers)
    .put(USER_API.UPDATE_USER,
        validateSchema(idSchema, ValidationType.Params),
        validateSchema(createUserBodySchema, ValidationType.Body),
        loginValidator,
        userController.updateUser)
    .post(USER_API.CREATE_USER,
        validateSchema(createUserBodySchema, ValidationType.Body),
        loginValidator,
        userController.createUser)
    .post(USER_API.DELETE_USER,
        validateSchema(idSchema, ValidationType.Params),
        userController.deleteUser);
