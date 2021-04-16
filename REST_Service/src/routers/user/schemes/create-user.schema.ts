import Joi from 'joi';

const minUserAge = 4;
const maxUserAge = 130;

export const createUserBodySchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/).required(),
    age: Joi.number().required().min(minUserAge).max(maxUserAge)
});
