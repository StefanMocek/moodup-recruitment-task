import {RecipeModel, Recipe} from './recipe.model';
import {CreateRecipeDto, UpdateRecipeDto, DeleteRecipeDto, AddImageToRecipeDto} from '../dtos/recipes.dto';

export class RecipeService {
  constructor(public recipeModel: RecipeModel) { }

  async getOneById(recipeId: string) {
    return await this.recipeModel.findOne({_id: recipeId});
  }

  async getAllRecipes(skip: number, limit: number) {
    return await this.recipeModel
      .find({})
      .sort({name: 1})
      .skip(skip)
      .limit(limit)
  }

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = new this.recipeModel({
      userId: createRecipeDto.userId,
      name: createRecipeDto.name,
      ingredients: createRecipeDto.ingredients,
      preparing: createRecipeDto.preparing,
      time: createRecipeDto.time
    })

    return await recipe.save();
  }

  async update(updateRecipeDto: UpdateRecipeDto) {
    return await this.recipeModel.findOneAndUpdate(
      {_id: updateRecipeDto.recipeId},
      {
        $set: {
          userId: updateRecipeDto.userId,
          name: updateRecipeDto.name,
          ingredients: updateRecipeDto.ingredients,
          preparing: updateRecipeDto.preparing,
          time: updateRecipeDto.time
        }
      },
      {new: true})
  }

  async delete(deleteRecipeDto: DeleteRecipeDto) {
    return await this.recipeModel.findOneAndRemove({ _id: deleteRecipeDto.recipeId })
  }

  async addImageUrl(addImageToRecipeDto:AddImageToRecipeDto) {
    return await this.recipeModel.findOneAndUpdate(
      {_id: addImageToRecipeDto.recipeId},
      {
        $set: {
          imageUrl: addImageToRecipeDto.imageUrl,
        }
      },
      {new: true})
  }

  async findByName(searachName: string) {
    return await this.recipeModel.find({ name: { $regex: searachName, $options: 'i' } });
  }
};

export const recipeService = new RecipeService(Recipe);