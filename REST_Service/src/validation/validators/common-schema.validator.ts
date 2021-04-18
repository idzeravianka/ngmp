import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidationType } from '../enums/validation-type.enum';

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]) => {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });

    return {
        status: 'Failed',
        errors
    };
};

export const validateSchema = (schema: Joi.ObjectSchema, validationType: ValidationType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[validationType], {
            abortEarly: false,
            allowUnknown: false
        });

        if (error?.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
};

