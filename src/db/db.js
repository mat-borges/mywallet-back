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
export const userCollection = db.collection('user');
export const walletsCollection = db.collection('wallet');
export const sessionsCollection = db.collection('sessions');
