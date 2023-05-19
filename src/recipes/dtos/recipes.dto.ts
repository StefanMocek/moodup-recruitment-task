export interface CreateRecipeDto {
  userId: string,
  name: string,
  ingredients: { [key: string]: string}[],
  preparing: { [key: number]: string}[],
  time: string
}

export interface UpdateRecipeDto {
  userId: string,
  userRole: string,
  name: string,
  ingredients: { [key: string]: string}[],
  preparing: { [key: number]: string}[],
  time: string,
  recipeId: string
}