import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected$ = new EventEmitter<Recipe>();

  private recipes: Array<Recipe> = [
    new Recipe(
      'Veg Sandwich',
      'This is a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
    ),
    new Recipe(
      'Grilled Sandwich',
      'This is a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
