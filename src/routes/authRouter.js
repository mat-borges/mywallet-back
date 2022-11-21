import { postSignIn, postSignUp } from '../controllers/authController.js';

import { Router } from 'express';
import { signInValidation } from '../middlewares/singInValidationMiddleware.js';
import { signUpValidation } from '../middlewares/signUpValidationMiddleware.js';

const router = Router();

router.post('/auth/sign-up', signUpValidation, postSignUp);

router.post('/auth/sign-in', signInValidation, postSignIn);

export default router;
