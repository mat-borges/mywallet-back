import { deleteWallet, getWallet, postWallet, putWallet } from '../controllers/walletController.js';

import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { walletSchemaVal } from '../middlewares/walletSchemaValMiddleware.js';

const router = Router();

router.use(validateToken);

router.get('/wallet', getWallet);

router.post('/wallet', walletSchemaVal, postWallet);

router.put('/wallet', putWallet);

router.delete('/wallet', deleteWallet);

export default router;
