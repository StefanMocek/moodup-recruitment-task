import {body} from 'express-validator';

export const searchValidation = [
  body('name')
    .not().isEmpty()
    .isString()
    .withMessage('A valid name is required'),
]