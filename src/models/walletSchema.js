import Joi from 'joi';

export const walletSchema = Joi.object({
	userId: Joi.object(),
	description: Joi.string().alphanum().required(),
	value: Joi.number().required(),
	type: Joi.string().valid('income', 'expense').required(),
});
