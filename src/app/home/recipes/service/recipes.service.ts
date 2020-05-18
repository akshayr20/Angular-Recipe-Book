import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/service/shopping-list.service';
// import { Ingredient } from '../../shopping-list/model/ingredient.model';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  userId: string;
  recipes: AngularFireList<Recipe> = null;

  constructor(
    private shoppingListService: ShoppingListService,
    private toastService: ToastService,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  fetchRecipes(): AngularFireList<Recipe> {
    if (!this.userId) {
      return;
    }
    this.recipes = this.db.list(`recipes/${this.userId}`);
    return this.recipes;
  }

  getRecipeByKey(key: string) {
    // TODO:  Find a way to get item from the list
    const recipe = this.recipes.query.ref.child(key);
    return;
  }

  createRecipe(recipe: Recipe) {
    this.recipes = this.fetchRecipes();
    this.recipes.push(recipe);

    const listObservable = this.recipes.snapshotChanges();
    listObservable.subscribe();
  }

  updateRecipe(key: string, updatedRecipe: Recipe) {
    this.recipes
      .update(key, updatedRecipe)
      .catch((error) => console.log(error));
  }

  deleteRecipe(key: string) {
    this.recipes.remove(key).catch((error) => console.log(error));
  }
}
