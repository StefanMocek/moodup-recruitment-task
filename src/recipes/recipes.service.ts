import {RecipeService, recipeService} from "./recipe/recipe.service";
import {CreateRecipeDto, UpdateRecipeDto, DeleteRecipeDto} from './dtos/recipes.dto';
import {BadRequestError, NotAuthorizedError} from '../utils/errors';

export class RecipesService {
  constructor(
    public recipeService: RecipeService
  ) { }

  async getAllRecipes() {
    return await this.recipeService.getAllRecipes();
  }

  async getSingleRecipe(recipeId: string) {
    const recipe = await this.recipeService.getOneById(recipeId);
    if (!recipe) {
      return new BadRequestError('Recipe not found!');
    }
    return recipe
  }

  async addRecipe(createRecipeDto: CreateRecipeDto) {
    return await this.recipeService.create(createRecipeDto)
  }

  async updateRecipe(updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeService.getOneById(updateRecipeDto.recipeId);
    if (!recipe) {
      return new BadRequestError('Recipe not found!')
    }
    if (recipe.userId.toString() !== updateRecipeDto.userId && updateRecipeDto.userRole !== 'admin') {
      return new NotAuthorizedError()
    }

    return await this.recipeService.update(updateRecipeDto);
  }

  async deleteRecipe(deleteRecipeDto: DeleteRecipeDto) {
    const recipe = await this.recipeService.getOneById(deleteRecipeDto.recipeId);
    if (!recipe) {
      return new BadRequestError('Recipe not found!')
    }
    if (recipe.userId.toString() !== deleteRecipeDto.userId && deleteRecipeDto.userRole !== 'admin') {
      return new NotAuthorizedError()
    }

    return await this.recipeService.delete(deleteRecipeDto);
  }
};

export const recipesService = new RecipesService(recipeService);

