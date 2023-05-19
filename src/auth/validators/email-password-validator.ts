import {body} from 'express-validator';

export const emailAndPwdValidation = [
  body('email')
    .not().isEmpty()
    .isEmail()
    .withMessage('a valid email is required'),

  body('password')
    .not().isEmpty()
    .isLength({min: 6})
    .withMessage('a valid password is required')
];