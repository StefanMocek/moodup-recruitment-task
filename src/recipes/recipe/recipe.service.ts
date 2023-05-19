import {RecipeModel, Recipe} from './recipe.model';

export class RecipeService {
  constructor(public recipeModel: RecipeModel) { }

  async getOneById(recipeId: string) {
    return await this.recipeModel.findOne({_id: recipeId});
  }

  async getAllRecipes() {
    return await this.recipeModel.find({});
  }
};

export const recipeService = new RecipeService(Recipe);