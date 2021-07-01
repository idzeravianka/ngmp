import { Router } from 'express';
import { ValidationType } from '../validation/enums/validation-type.enum';
import { GROUP_API } from '../configs/api-path-enum/group-api.enum';
import { validateSchema } from '../validation/validators';
import { idSchema, groupBodySchema, userToGroupSchema } from '../validation/schemes';
import { AuthenticationService } from '../services/authentication.service';
import groupController from './controllers/group.controller';

const router = Router();

export default router
    .get(GROUP_API.GET_GROUP,
        AuthenticationService.authentication,
        validateSchema(idSchema, ValidationType.Params),
        groupController.getGroupById)
    .get(GROUP_API.GET_ALL_GROUP,
        AuthenticationService.authentication,
        groupController.getAllGroup)
    .put(GROUP_API.UPDATE_GROUP,
        AuthenticationService.authentication,
        validateSchema(idSchema, ValidationType.Params),
        validateSchema(groupBodySchema, ValidationType.Body),
        groupController.updateGroup)
    .post(GROUP_API.CREATE_GROUP,
        AuthenticationService.authentication,
        validateSchema(groupBodySchema, ValidationType.Body),
        groupController.createGroup)
    .post(GROUP_API.DELETE_GROUP,
        AuthenticationService.authentication,
        validateSchema(idSchema, ValidationType.Params),
        groupController.deleteGroup)
    .post(GROUP_API.ADD_USER_TO_GROUP,
        AuthenticationService.authentication,
        validateSchema(userToGroupSchema, ValidationType.Body),
        groupController.addUsersToGroup);
