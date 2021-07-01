import Joi from 'joi';

export const loginSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/).required()
});
