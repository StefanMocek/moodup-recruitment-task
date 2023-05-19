import {NextFunction, Request, Response} from 'express';
import {BadRequestError, CustomError} from '../utils/errors';
import {recipesService} from './recipes.service';

class RecipesController {
  public async getAllRecipes(req: Request, res: Response, next: NextFunction) {
    const recipes = await recipesService.getAllRecipes();
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
    console.log(req.currentUser!.userId);
    console.log(typeof (req.currentUser!.userId));

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
      userId: req.currentUser!.userId})
    if (result instanceof CustomError) {
      return next(result)
    };

    res.status(200).send(true)
  };
}; 

export default new RecipesController()