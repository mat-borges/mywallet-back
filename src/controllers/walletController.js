import { sessionsCollection, userCollection, walletsCollection } from '../db/db.js';

export async function getWallet(req, res) {
	const { token } = res.userData;

	try {
		const session = await sessionsCollection.findOne({ token });
		const user = await userCollection.findOne({ _id: session?.userId });

		if (!user) return res.sendStatus(401);

		const wallet = await walletsCollection.findOne({ userId: session.userId });

		delete user.password;
		res.send({ user });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	res.send({ wallet });
}

export async function postWallet(req, res) {
	const { authorization } = req.headers;
}

export async function putWallet(req, res) {
	const { authorization } = req.headers;
}

export async function deleteWallet(req, res) {
	const { authorization } = req.headers;
}
