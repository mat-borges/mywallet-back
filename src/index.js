import express, { json } from 'express';

import authRouter from './routes/authRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { stripHtml } from 'string-strip-html';
import walletRouter from './routes/walletRouter.js';

dotenv.config();

const app = express();
export const cleanStringData = (string) => stripHtml(string).result.trim();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(walletRouter);

app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
