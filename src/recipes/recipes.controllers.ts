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
};

export default new RecipesController()