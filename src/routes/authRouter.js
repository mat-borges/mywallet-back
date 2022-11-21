import { deleteSignOut, postSignIn, postSignUp } from '../controllers/authController.js';

import { Router } from 'express';
import { signInValidation } from '../middlewares/singInValidationMiddleware.js';
import { signUpValidation } from '../middlewares/signUpValidationMiddleware.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const router = Router();

router.post('/auth/sign-up', signUpValidation, postSignUp);

router.post('/auth/sign-in', signInValidation, postSignIn);

router.delete('/sign-out', validateToken, deleteSignOut);

export default router;
