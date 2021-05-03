import { Router } from 'express';
import { ValidationType } from '../validation/enums/validation-type.enum';
import { GROUP_API } from '../configs/api-path-enum/group-api.enum';
import { validateSchema } from '../validation/validators';
import { idSchema, groupBodySchema, userToGroupSchema } from '../validation/schemes';
import groupController from './controllers/group.controller';

const router = Router();

export default router
    .get(GROUP_API.GET_GROUP,
        validateSchema(idSchema, ValidationType.Params),
        groupController.getGroupById)
    .get(GROUP_API.GET_ALL_GROUP,
        groupController.getAllGroup)
    .put(GROUP_API.UPDATE_GROUP,
        validateSchema(idSchema, ValidationType.Params),
        validateSchema(groupBodySchema, ValidationType.Body),
        groupController.updateGroup)
    .post(GROUP_API.CREATE_GROUP,
        validateSchema(groupBodySchema, ValidationType.Body),
        groupController.createGroup)
    .post(GROUP_API.DELETE_GROUP,
        validateSchema(idSchema, ValidationType.Params),
        groupController.deleteGroup)
    .post(GROUP_API.ADD_USER_TO_GROUP,
        validateSchema(userToGroupSchema, ValidationType.Body),
        groupController.addUsersToGroup);
