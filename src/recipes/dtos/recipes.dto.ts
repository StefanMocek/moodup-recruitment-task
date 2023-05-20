import { Request } from 'express';

export interface CreateRecipeDto {
  userId: string,
  name: string,
  ingredients: { [key: string]: string}[],
  preparing: { [key: number]: string}[],
  time: string
};

export interface UpdateRecipeDto {
  userId: string,
  userRole: string,
  name: string,
  ingredients: { [key: string]: string}[],
  preparing: { [key: number]: string}[],
  time: string,
  recipeId: string
};

export interface DeleteRecipeDto {
  userId: string,
  userRole: string,
  recipeId: string
};

export interface AddImageDto {
  userId: string,
  recipeId: string,
  userRole: string,
  image: Request['file']
}

export interface AddImageToRecipeDto {
  recipeId: string;
  imageUrl: string;
}