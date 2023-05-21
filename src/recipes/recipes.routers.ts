import {Router, NextFunction, Request, Response} from 'express';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';
import {validateRequest, upload} from '../utils/middlewares';
import {recipeValidation, idValidation} from './validatiors';

const router = Router();

router.get('/', requireAuth, RecipesController.getAllRecipes);
router.post('/add', recipeValidation, validateRequest, requireAuth, RecipesController.addRecipe);
router.post('/update/:id', recipeValidation, idValidation, validateRequest, requireAuth, RecipesController.updateRecipe)
router.delete('/delete/:id', idValidation, validateRequest, requireAuth, RecipesController.deleteRecipe);
router.post('/add-image-to-recipe/:id', idValidation, validateRequest, upload.single('image'), RecipesController.sendImageToS3)
router.get('/:id', idValidation, validateRequest, requireAuth, RecipesController.getSingleRecipe);

export {router as recipesRouters};
