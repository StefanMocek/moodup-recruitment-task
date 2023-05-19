import {RecipeService, recipeService} from "./recipe/recipe.service";
import {BadRequestError} from '../utils/errors';

export class RecipesService {
  constructor(
    public recipeService: RecipeService
  ) { }

  async getAllRecipes () {
    return await this.recipeService.getAllRecipes();
  }

  async getSingleRecipe (recipeId: string) {
    const recipe = await this.recipeService.getOneById(recipeId);
    if (!recipe) {
      return new BadRequestError('Recipe not found!');
    }
    return recipe
  }
};

export const recipesService = new RecipesService(recipeService);

