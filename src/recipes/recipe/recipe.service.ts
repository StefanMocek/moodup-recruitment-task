import {RecipeModel, Recipe} from './recipe.model';
import {CreateRecipeDto} from '../dtos/recipes.dto';

export class RecipeService {
  constructor(public recipeModel: RecipeModel) { }

  async getOneById(recipeId: string) {
    return await this.recipeModel.findOne({_id: recipeId});
  }

  async getAllRecipes() {
    return await this.recipeModel.find({});
  }

  async create (createRecipeDto: CreateRecipeDto) {
    const recipe = new this.recipeModel({
      userId: createRecipeDto.userId,
      name: createRecipeDto.name,
      ingredients: createRecipeDto.ingredients,
      preparing: createRecipeDto.preparing,
      time: createRecipeDto.time
    })

    return await recipe.save();
  }
};

export const recipeService = new RecipeService(Recipe);