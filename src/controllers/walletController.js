import { sessionsCollection, walletsCollection } from '../db/db.js';

import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(timezone);

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
		const now = dayjs();
		const dateBrazil = dayjs.tz(now).tz('America/Sao_Paulo').format('DD/MM');

		await walletsCollection.insertOne({
			userId: userId,
			description,
			value,
			type,
			date: dateBrazil,
		});
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function deleteWallet(req, res) {
	const { token } = res.locals;
	const { id } = req.params;

	try {
		console.log(token);
		const session = await sessionsCollection.findOne({ token });
		console.log(session);
		const userId = JSON.stringify(session?.userId);
		console.log('userId', userId);
		const entry = await walletsCollection.findOne({ _id: new ObjectId(id) });

		if (!entry) return res.sendStatus(400);

		const entryUser = JSON.stringify(entry?.userId);
		console.log('entryUser', entryUser);
		if (userId === entryUser) {
			await walletsCollection.deleteOne({ _id: new ObjectId(id) });
			return res.status(200).send({ message: 'Entry deleted successfully' });
		}

		res.sendStatus(401);
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

		res.status(404).send('Não implementado ainda');
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
