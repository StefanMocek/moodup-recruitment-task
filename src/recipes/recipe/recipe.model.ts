import mongoose from 'mongoose';
import {UserDoc} from '../../auth/user/user.model';

interface RecipeDoc extends mongoose.Document {
  user: UserDoc | string,
  name: string,
  ingredients: { [key: string]: string}[],
  preparing: { [key: number]: string}[],
  time: string;
  image?: string
}

export interface RecipeModel extends mongoose.Model<RecipeDoc> {}

const schema = new mongoose.Schema<RecipeDoc, RecipeModel>({
  user: {
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
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  preparing: {
    type: [
      {
        key: {
          type: Number,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export const Recipe = mongoose.model<RecipeDoc, RecipeModel>('Recipe', schema);