import {Router, NextFunction, Request, Response} from 'express';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';
import {validateRequest, upload} from '../utils/middlewares';
import {recipeValidation, idValidation} from './validatiors';

const router = Router();

router
  .route('/')
  .post(recipeValidation, validateRequest, requireAuth, RecipesController.addRecipe)
  .get(requireAuth, RecipesController.getAllRecipes);

router
  .route('/add-image-to-recipe/:id')
  .post(idValidation, validateRequest, upload.single('image'), RecipesController.sendImageToS3)

router
  .route('/:id')
  .post(recipeValidation, idValidation, validateRequest, requireAuth, RecipesController.updateRecipe)
  .delete(idValidation, validateRequest, requireAuth, RecipesController.deleteRecipe)
  .get(idValidation, validateRequest, requireAuth, RecipesController.getSingleRecipe);

export {router as recipesRouters};
