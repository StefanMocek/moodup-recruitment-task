import {Router} from 'express';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';
import {validateRequest} from '../utils/middlewares';
import {recipeValidation} from './validatiors/add-recipe';

const router = Router();

router.get('/recipes', requireAuth, RecipesController.getAllRecipes);
router.get('/recipes/:id', requireAuth, RecipesController.getSingleRecipe);
router.post('/recipes/add', recipeValidation, validateRequest, requireAuth, RecipesController.addRecipe);

export {router as recipesRouters};
