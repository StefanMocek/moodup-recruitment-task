import {v4 as uuidv4} from 'uuid';
import {RecipeService, recipeService} from "./recipe/recipe.service";
import {CreateRecipeDto, UpdateRecipeDto, DeleteRecipeDto, AddImageDto} from './dtos/recipes.dto';
import {BadRequestError, NotAuthorizedError} from '../utils/errors';
import {s3} from '../utils/AWS-S3/s3';

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

    // removing image object in AWS bucket 
    const imageUrl = recipe.imageUrl;
    if (imageUrl) {
      try {
        const urlParts = imageUrl.split('/');
        const fileKey = urlParts[urlParts.length - 1];
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileKey,
        };

        s3.deleteObject(params, async (err, data) => {
          if (err) {
            console.error(err);
            return new BadRequestError('Failed to delete the image in AWS S3')
          }
          return await this.recipeService.delete(deleteRecipeDto);
        });
      } catch (error) {
        console.log(error);
        return new BadRequestError('Failed to delete the image in AWS S3');
      }
    }
    return await this.recipeService.delete(deleteRecipeDto);
  }

  async addImageToRecipe(addImageDto: AddImageDto) {
    const recipe = await this.recipeService.getOneById(addImageDto.recipeId);
    if (!recipe) {
      return new BadRequestError('Recipe not found!');
    };
    if (recipe.userId.toString() !== addImageDto.userId && addImageDto.userRole !== 'admin') {
      return new NotAuthorizedError();
    };
    if (!addImageDto.image) {
      return new BadRequestError('Add image (jpeg/jpg');
    };
    try {
      const fileName = `${uuidv4()}.jpg`;

      // Env is checked when up is starting
      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: addImageDto.image.buffer
      };

      const uploadResult = await s3.upload(params).promise();

      return await this.recipeService.addImageUrl({recipeId: addImageDto.recipeId, imageUrl: uploadResult.Location});
    } catch (error) {
      console.log(error);
      return new BadRequestError('Failed to send image to AWS S3');
    }
  }
};

export const recipesService = new RecipesService(recipeService);

