import {NextFunction, Request, Response} from 'express';
import {CustomError, BadRequestError} from '../utils/errors';
import {recipesService} from './recipes.service';
import {getPagination} from '../utils/get-pagination'

class RecipesController {
  public async getAllRecipes(req: Request, res: Response, next: NextFunction) {
    const {skip, limit} = getPagination(req.query);
    const recipes = await recipesService.getAllRecipes(skip, limit);
    res.status(200).send(recipes)
  }

  public async getSingleRecipe(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const recipe = await recipesService.getSingleRecipe(id);
    if (recipe instanceof CustomError) {
      return next(recipe)
    };
    res.status(200).send(recipe)
  }

  public async addRecipe(req: Request, res: Response, next: NextFunction) {
    const {name, ingredients, preparing, time} = req.body;

    const recipe = await recipesService.addRecipe({
      userId: req.currentUser!.userId,
      name,
      ingredients,
      preparing,
      time
    })
    res.status(201).send(recipe)
  }

  public async updateRecipe(req: Request, res: Response, next: NextFunction) {
    const {name, ingredients, preparing, time} = req.body;
    const {id: recipeId} = req.params;

    const result = await recipesService.updateRecipe({
      userId: req.currentUser!.userId,
      userRole: req.currentUser!.role,
      recipeId,
      name,
      ingredients,
      preparing,
      time
    })

    if (result instanceof CustomError) {
      return next(result)
    };

    res.status(200).send(result)
  }

  public async deleteRecipe(req: Request, res: Response, next: NextFunction) {
    const {id: recipeId} = req.params;

    const result = await recipesService.deleteRecipe({
      recipeId,
      userRole: req.currentUser!.role,
      userId: req.currentUser!.userId
    })
    if (result instanceof CustomError) {
      return next(result)
    };

    res.status(200).send(true)
  };

  public async sendImageToS3(req: Request, res: Response, next: NextFunction) {
    if (req.uploaderError) {
      return next(new BadRequestError(req.uploaderError.message))
    };
    const {id: recipeId} = req.params;
    const result = await recipesService.addImageToRecipe({
      userId: req.currentUser!.userId,
      userRole: req.currentUser!.role,
      recipeId,
      image: req.file
    })
    if (result instanceof CustomError) {
      return next(result)
    };
    res.status(200).send(result)
  }

  public async searchRecipe(req: Request, res: Response, next: NextFunction) {
    const {name} = req.body;
    const recipe = await recipesService.searchRecipeByName(name);
    if (recipe instanceof CustomError) {
      return next(recipe)
    };
    res.status(200).send(recipe)
  }
}

export default new RecipesController()