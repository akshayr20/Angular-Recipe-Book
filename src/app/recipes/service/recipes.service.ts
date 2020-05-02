import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected$ = new EventEmitter<Recipe>();

  private recipes: Array<Recipe> = [
    new Recipe(
      'Veg Sandwich',
      'A super tasty french veg sandwich',
      'https://c1.peakpx.com/wallpaper/368/646/353/sandwich-ham-cheese-pommes-fast-food-wallpaper-preview.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Carrots', 1),
        new Ingredient('Pickle', 1),
        new Ingredient('Tomatoes', 2),
      ]
    ),
    new Recipe(
      'Chicken Stack Burger',
      'The most popular chicken stack burger',
      'https://img1.mashed.com/img/gallery/the-best-copycat-popeyes-chicken-sandwich-recipe/the-perfect-popeyes-chicken-sandwich-directions-1574269393.jpg',
      [
        new Ingredient('Chicken', 2),
        new Ingredient('Bun', 2),
        new Ingredient('Tomatoes', 1),
        new Ingredient('Onion', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
