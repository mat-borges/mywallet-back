import { cleanStringData } from '../index.js';
import { signUpSchema } from '../models/signUpSchema.js';

export function signUpValidation(req, res, next) {
	const { name, email, password } = req.body;

	const user = {
		name: cleanStringData(name),
		email: cleanStringData(email),
		password,
	};

	const { error } = signUpSchema.validate(user, { abortEarly: false });
	if (error) {
		const errors = error.details.map((details) => details.message);
		return res.status(422).send({ message: errors });
	}

	res.locals.user = user;
	next();
}
