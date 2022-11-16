import express, { json } from 'express';

import Joi from 'joi';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import { stripHtml } from 'string-strip-html';

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
// Collections
//........

const cleanStringData = (string) => stripHtml(string).result.trim();

// Schemas
// .......

try {
	await mongoClient.connect();
	db = mongoClient.db('myWallet');
} catch (err) {
	console.log('Erro no mongo.connect', err.message);
}

// Routes
app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
