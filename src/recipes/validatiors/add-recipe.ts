import {body} from 'express-validator';

export const recipeValidation = [
  body('name')
    .not().isEmpty()
    .isString()
    .withMessage('A valid name is required'),

  body('ingredients')
    .isArray({min: 1})
    .withMessage('Ingredients must be a non-empty array')
    .custom((value) => {
      for (const obj of value) {
        if (typeof obj !== 'object' || Array.isArray(obj)) {
          throw new Error('Ingredients must be objects');
        }
        const keys = Object.keys(obj);
        if (keys.length !== 1 || typeof obj[keys[0]] !== 'string') {
          throw new Error('Ingredients objects must have a single string key-value pair');
        }
      }
      return true;
    }),

  body('preparing')
    .not().isEmpty()
    .withMessage('A valid preparing is required'),

  body('time')
    .not().isEmpty()
    .isString()
    .withMessage('A valid time is required'),
];