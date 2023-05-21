import {Router, NextFunction, Request, Response} from 'express';
import {requireAuth} from '../utils/middlewares';
import RecipesController from './recipes.controllers';
import {validateRequest, upload} from '../utils/middlewares';
import {recipeValidation} from './validatiors/add-recipe';

const router = Router();

router.get('/', requireAuth, RecipesController.getAllRecipes);
router.post('/add', recipeValidation, validateRequest, requireAuth, RecipesController.addRecipe);
router.post('/update/:id', recipeValidation, validateRequest, requireAuth, RecipesController.updateRecipe)
router.delete('/delete/:id', requireAuth, RecipesController.deleteRecipe);
router.post('/add-image-to-recipe/:id', upload.single('image'), RecipesController.sendImageToS3)
router.get('/:id', requireAuth, RecipesController.getSingleRecipe);

export {router as recipesRouters};
