import { deleteWallet, getWallet, postWallet, putWallet } from '../controllers/walletController.js';

import { Router } from 'express';

const router = Router();

router.get('/wallet', getWallet);

router.post('/wallet', postWallet);

router.put('/wallet', putWallet);

router.delete('/wallet', deleteWallet);

export default router;
