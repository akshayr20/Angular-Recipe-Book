import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shopping-list/model/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/toast/toast-service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(
    private shoppingListService: ShoppingListService,
    private toastService: ToastService,
    private db: AngularFireDatabase
  ) {}

  fetchRecipes() {
    this.db.list('recipes').valueChanges().subscribe(res =>  {
      console.log(res);
    });
  }

  createRecipe(recipe: Recipe) {
    return this.db.database.ref('recipes').push(recipe);
  }

  updateRecipe(index: string, updatedRecipe: Recipe) {
    return this.db.list<Recipe>('recipe').update(index, updatedRecipe);
  }

  deleteRecipe(index: string) {
    return this.db.list('recipe').remove(index);
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
