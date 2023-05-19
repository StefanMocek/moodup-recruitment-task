import mongoose from 'mongoose';
import {UserDoc} from '../../auth/user/user.model';

interface RecipeDoc extends mongoose.Document {
  userId: UserDoc | string,
  name: string,
  ingredients: Record<string, string>[],
  preparing: string[],
  time: string;
  imageUrl?: string
}

export interface RecipeModel extends mongoose.Model<RecipeDoc> {}

const schema = new mongoose.Schema<RecipeDoc, RecipeModel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [
      {
        type: mongoose.Schema.Types.Mixed,
        validate: {
          validator: function (value: any) {
            return Array.isArray(value) && value.every((obj) => typeof obj === 'object');
          },
          message: 'Ingredients must be an array of objects',
        },
      },
    ],
    required: true,
  },
  preparing: {
    type: [String],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

export const Recipe = mongoose.model<RecipeDoc, RecipeModel>('Recipe', schema);