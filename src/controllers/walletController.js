import { sessionsCollection, walletsCollection } from '../db/db.js';

export async function getWallet(req, res) {
	const { token } = res.locals;

	try {
		const session = await sessionsCollection.findOne({ token });
		const userId = session?.userId;

		const wallet = await walletsCollection.find({ userId }).toArray();

		let balance = 0;
		for (let data of wallet) {
			if (data.type === 'income') {
				balance += data.value;
			} else {
				balance -= data.value;
			}
		}

		res.send({ wallet, balance });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postWallet(req, res) {
	const { token } = res.locals;
	const { description, value, type } = res.locals.data;

	try {
		const session = await sessionsCollection.findOne({ token });
		const userId = session?.userId;

		await walletsCollection.insertOne({ userId: userId, description, value, type });

		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function putWallet(req, res) {
	const { token } = res.locals;
	try {
		const session = await sessionsCollection.findOne({ token });
		const userId = session?.userId;

		res.send('Não implementado ainda');
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function deleteWallet(req, res) {
	const { token } = res.locals;
	try {
		const session = await sessionsCollection.findOne({ token });
		const userId = session?.userId;

		res.send('Não implementado ainda');
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
