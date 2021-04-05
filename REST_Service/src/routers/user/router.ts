import { Router } from 'express';
import { ValidationType } from '../enums/validation-type.enum';
import { USER_API } from '../routes/user-api.enum';
import { loginValidator, validateSchema } from '../validators';
import { autoSuggestSchema, idSchema, createUserBodySchema } from './schemes';
import userService from './services/user.service';

const router = Router();

export default router
    .get(USER_API.GET_USER,
        validateSchema(idSchema, ValidationType.Params),
        userService.getUserById)
    .get(USER_API.AUTO_SUGGEST,
        validateSchema(autoSuggestSchema, ValidationType.Query),
        userService.getAutoSuggestUsers)
    .put(USER_API.UPDATE_USER,
        validateSchema(idSchema, ValidationType.Params),
        validateSchema(createUserBodySchema, ValidationType.Body),
        userService.updateUser)
    .post(USER_API.CREATE_USER,
        loginValidator,
        validateSchema(createUserBodySchema, ValidationType.Body),
        userService.createUser)
    .post(USER_API.DELETE_USER,
        validateSchema(idSchema, ValidationType.Params),
        userService.deleteUser);
