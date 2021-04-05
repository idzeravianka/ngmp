import Joi from 'joi';

export const autoSuggestSchema = Joi.object().keys({
    limit: Joi.number().required(),
    loginSubstring: Joi.string().required()
});
