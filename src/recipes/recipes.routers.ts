import {Router, NextFunction, Request, Response} from 'express';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';
import {validateRequest, upload} from '../utils/middlewares';
import {recipeValidation} from './validatiors/add-recipe';

const router = Router();

router.get('/recipes', requireAuth, RecipesController.getAllRecipes);
router.post('/recipes/add', recipeValidation, validateRequest, requireAuth, RecipesController.addRecipe);
router.post('/recipes/update/:id', recipeValidation, validateRequest, requireAuth, RecipesController.updateRecipe)
router.delete('/recipes/delete/:id', requireAuth, RecipesController.deleteRecipe);
router.post('/recipes/add-image-to-recipe/:id', upload.single('image'), RecipesController.sendImageToS3)
router.get('/recipes/:id', requireAuth, RecipesController.getSingleRecipe);

export {router as recipesRouters};
