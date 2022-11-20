import { postSignIn, postSignUp } from '../controllers/authController.js';

import { Router } from 'express';

const router = Router();

router.post('/auth/sign-up', postSignUp);

router.post('/auth/sign-in', postSignIn);

export default router;
