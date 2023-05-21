import {param} from 'express-validator';

export const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID parameter'),
]