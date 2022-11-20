import db, { userCollection } from '../db.js';

import bcrypt from 'bcrypt';
import { cleanStringData } from '../index.js';
import { userSchema } from '../models/userSchema.js';
import { v4 as uuid } from 'uuid';

const token = uuid();

export async function postSignIn(req, res) {
	const { email, password } = req.body;

	try {
		const userExists = await userCollection.findOne({ email });
		if (!userExists) {
			return res.sendStatus(401);
		}

		const passwordOk = bcrypt.compareSync(password, userExists.password);
		if (!passwordOk) {
			return res.sendStatus(401);
		}

		res.status(200).send('OK');
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postSignUp(req, res) {
	const user = req.body;

	try {
		const userExists = await userCollection.findOne({ email: user.email });
		if (userExists) {
			return res.status(409).send({ message: 'Esse email já existe' });
		}

		const { error } = userSchema.validate(user, { abortEarly: false });

		if (error) {
			const errors = error.details.map((detail) => detail.message);
			return res.status(400).send({ message: errors });
		}

		const hashPassword = bcrypt.hashSync(user.password, 10);
		await userCollection.insertOne({ ...user, password: hashPassword });
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
