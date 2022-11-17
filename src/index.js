import { deleteWallet, getWallet, postWallet, putWallet } from './controllers/walletController.js';
import express, { json } from 'express';
import { postSignIn, postSignUp } from './controllers/authController.js';

import Joi from 'joi';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { stripHtml } from 'string-strip-html';

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
export let users;
export let wallet;
// Collections
//........

const cleanStringData = (string) => stripHtml(string).result.trim();

// Schemas
export const userSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
export const walletSchema = Joi.object({
	userId: Joi.string().required(),
	description: Joi.string().alphanum().required(),
	value: Joi.number().required(),
});
export const sessionsSchema = Joi.object({ token: Joi.string().required(), userId: Joi.string().required() });

try {
	await mongoClient.connect();
	db = mongoClient.db('myWallet');
	users = db.collection('users');
	wallet = db.collection('wallet');
} catch (err) {
	console.log('Erro no mongo.connect', err.message);
}

// Routes
app.post('/sign-up', postSignUp);
app.post('/sign-in', postSignIn);

app.get('/wallet', getWallet);
app.post('/wallet', postWallet);
app.put('/wallet', putWallet);
app.delete('/wallet', deleteWallet);

app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
