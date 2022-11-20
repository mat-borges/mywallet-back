import express, { json } from 'express';

import authRouter from './routes/authRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { stripHtml } from 'string-strip-html';
import walletRouter from './routes/walletRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(walletRouter);
app.use(authRouter);

export const cleanStringData = (string) => stripHtml(string).result.trim();

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

app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
