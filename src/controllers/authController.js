import { sessionsCollection, userCollection } from '../db/db.js';

import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function postSignIn(req, res) {
	const { email, password } = res.locals.user;

	try {
		const userExists = await userCollection.findOne({ email });

		if (!userExists) return res.sendStatus(401);

		const { name } = userExists;

		const passwordOk = bcrypt.compareSync(password, userExists.password);

		if (!passwordOk) return res.status(401).send({ message: 'Senha incorreta' });

		const sessionExists = await sessionsCollection.findOne({ userId: userExists._id });

		if (sessionExists) return res.send({ token: sessionExists.token, name });

		const token = uuid();
		await sessionsCollection.insertOne({ token, userId: userExists._id });

		res.send({ token, name });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postSignUp(req, res) {
	const { user } = res.locals;

	try {
		const userExists = await userCollection.findOne({ email: user.email });
		if (userExists) return res.status(409).send({ message: 'Esse email já existe' });

		const hashPassword = bcrypt.hashSync(user.password, 10);
		await userCollection.insertOne({ ...user, password: hashPassword });

		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function deleteSignOut(req, res) {
	const { token } = res.locals;
	try {
		await sessionsCollection.deleteOne({ token });
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
