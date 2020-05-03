import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/toast/toast-service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
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

  private recipes$ = new BehaviorSubject<Array<Recipe>>(this.recipes);

  constructor(
    private shoppingListService: ShoppingListService,
    private toastService: ToastService
  ) {}

  getRecipes() {
    return this.recipes$;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes = [...this.recipes, recipe];
    this.recipes$.next(this.recipes.slice());
    this.toastService.success('Recipe Added successfully!');
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes = this.recipes.map((recipe, i) => {
      if (i === index) {
        return updatedRecipe;
      } else {
        return recipe;
      }
    });
    this.recipes$.next(this.recipes.slice());
    this.toastService.success('Recipe Updated successfully!');
  }
}
