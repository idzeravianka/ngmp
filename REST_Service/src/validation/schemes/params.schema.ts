import Joi from 'joi';

export const idSchema = Joi.object().keys({
    id: Joi.number().required()
});
