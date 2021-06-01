import { Router } from 'express';
import { ValidationType } from '../validation/enums/validation-type.enum';
import { GROUP_API } from '../configs/api-path-enum/group-api.enum';
import { validateSchema } from '../validation/validators';
import { idSchema, groupBodySchema, userToGroupSchema } from '../validation/schemes';
import groupController from './controllers/group.controller';
import authController from './controllers/auth.controller';

const router = Router();

export default router
    .get(GROUP_API.GET_GROUP,
        authController.authentification,
        validateSchema(idSchema, ValidationType.Params),
        groupController.getGroupById)
    .get(GROUP_API.GET_ALL_GROUP,
        authController.authentification,
        groupController.getAllGroup)
    .put(GROUP_API.UPDATE_GROUP,
        authController.authentification,
        validateSchema(idSchema, ValidationType.Params),
        validateSchema(groupBodySchema, ValidationType.Body),
        groupController.updateGroup)
    .post(GROUP_API.CREATE_GROUP,
        authController.authentification,
        validateSchema(groupBodySchema, ValidationType.Body),
        groupController.createGroup)
    .post(GROUP_API.DELETE_GROUP,
        authController.authentification,
        validateSchema(idSchema, ValidationType.Params),
        groupController.deleteGroup)
    .post(GROUP_API.ADD_USER_TO_GROUP,
        authController.authentification,
        validateSchema(userToGroupSchema, ValidationType.Body),
        groupController.addUsersToGroup);
