import { cleanStringData } from '../index.js';
import { signInSchema } from '../models/signInSchema.js';

export function signInValidation(req, res, next) {
	const { email, password } = req.body;

	const user = { email: cleanStringData(email), password };

	const { error } = signInSchema.validate(user, { abortEarly: false });

	if (error) {
		const errors = error.details.map((details) => details.message);
		return res.status(422).send({ message: errors });
	}

	res.locals.user = user;
	next();
}
