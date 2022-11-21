import { cleanStringData } from '../index.js';
import { walletSchema } from '../models/walletSchema.js';

export function walletSchemaVal(req, res, next) {
	const { description, value, type } = req.body;

	const data = {
		description: cleanStringData(description),
		value: Number(cleanStringData(value)),
		type: cleanStringData(type),
	};

	const { error } = walletSchema.validate(data, { abortEarly: false });

	if (error) {
		const errors = error.details.map((details) => details.message);
		return res.status(422).send({ message: errors });
	}

	res.locals.data = data;
	next();
}
