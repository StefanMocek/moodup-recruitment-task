import {Router} from 'express';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';

const router = Router();

router.get('/recipes', requireAuth, RecipesController.getAllRecipes);
router.get('/recipes/:id', requireAuth, RecipesController.getSingleRecipe);

