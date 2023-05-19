import {Router} from 'express';
import {body} from 'express-validator';
import AuthController from './auth.controllers';
import {currentUser, validateRequest} from '../utils/middlewares';

const router = Router();

const emailAndPwdValidation = [
  body('email')
    .not().isEmpty()
    .isEmail()
    .withMessage('a valid email is required'),

  body('password')
    .not().isEmpty()
    .isLength({min: 6})
    .withMessage('a valid password is required')
];

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
