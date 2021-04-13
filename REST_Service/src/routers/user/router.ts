import { Router } from 'express';
import { ValidationType } from '../enums/validation-type.enum';
import { USER_API } from '../routes/user-api.enum';
import { loginValidator, validateSchema } from '../validators';
import { autoSuggestSchema, idSchema, createUserBodySchema } from './schemes';
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
        userController.updateUser)
    .post(USER_API.CREATE_USER,
        loginValidator,
        validateSchema(createUserBodySchema, ValidationType.Body),
        userController.createUser)
    .post(USER_API.DELETE_USER,
        validateSchema(idSchema, ValidationType.Params),
        userController.deleteUser);
