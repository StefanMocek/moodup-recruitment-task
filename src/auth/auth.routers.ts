import {Router} from 'express';
import AuthController from './auth.controllers';
import {currentUser, validateRequest} from '../utils/middlewares';
import {emailAndPwdValidation} from './validators/email-password-validator';

const router = Router();

router.post('/register',
  emailAndPwdValidation,
  validateRequest,
  AuthController.register);

router.post('/login',
  emailAndPwdValidation,
  validateRequest, 
  AuthController.login);

router.get('/current-user', currentUser(process.env.JWT_KEY!), AuthController.getCurrentUser);
router.get('/logout', currentUser(process.env.JWT_KEY!), AuthController.logout);

export {router as authRouters};
