import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
	await mongoClient.connect();
	console.log('MongoDB connected!');
} catch (err) {
	console.log('Erro no mongo.connect', err.message);
}

const db = mongoClient.db('myWallet');
export let userCollection = db.collection('user');
export let walletsCollection = db.collection('wallet');

export default db;
