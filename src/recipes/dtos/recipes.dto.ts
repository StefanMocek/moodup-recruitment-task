export interface CreateRecipeDto {
  userId: string,
  name: string,
  ingredients: { [key: string]: string}[],
  preparing: { [key: number]: string}[],
  time: string
}