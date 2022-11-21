import Joi from 'joi';

export const sessionsSchema = Joi.object({ token: Joi.string().required(), userId: Joi.string().required() });
