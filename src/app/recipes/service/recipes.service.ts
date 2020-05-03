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
  private recipes: Array<Recipe> = [];
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

  setRecipe(recipes: Array<Recipe>) {
    this.recipes = recipes;
    this.recipes$.next(this.recipes);
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

  deleteRecipe(index: number) {
    this.recipes = this.recipes.filter((recipe, i) => i !== index);
    this.toastService.danger('Recipe Deleted successfully!');
    this.recipes$.next(this.recipes.slice());
  }
}
