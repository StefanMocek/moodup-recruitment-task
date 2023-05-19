import {Router} from 'express';
import {body} from 'express-validator';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';
import {validateRequest} from '../utils/middlewares';

const router = Router();

const recipeValidation = [
  body('name')
    .not().isEmpty()
    .isString()
    .withMessage('A valid name is required'),

  body('ingredients')
    .not().isEmpty()
    .withMessage('A valid ingredients are required'),

  body('preparing')
    .not().isEmpty()
    .withMessage('A valid preparing is required'),

  body('time')
    .not().isEmpty()
    .isString()
    .withMessage('A valid time is required'),
];

router.get('/recipes', requireAuth, RecipesController.getAllRecipes);
router.get('/recipes/:id', requireAuth, RecipesController.getSingleRecipe);
router.post('/recipes/add', recipeValidation, validateRequest, requireAuth, RecipesController.addRecipe);

export {router as recipesRouters};
