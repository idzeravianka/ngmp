import Joi from 'joi';

export const userToGroupSchema = Joi.object().keys({
    groupId: Joi.number().required(),
    userIds: Joi.array().items(Joi.number()).required()
});
