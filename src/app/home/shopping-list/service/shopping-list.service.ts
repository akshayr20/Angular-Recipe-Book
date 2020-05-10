import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ];

  private ingredients$ = new BehaviorSubject<Array<Ingredient>>(
    this.ingredients
  );

  public startedEditing$ = new Subject<number>();

  constructor(private toastService: ToastService) {}

  getIngredients() {
    return this.ingredients$;
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients = [...this.ingredients, ingredient];
    this.ingredients$.next(this.ingredients.slice());
    this.toastService.success('Ingredient added successfully!');
  }

  addIngredients(ingredients: Array<Ingredient>) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredients$.next(this.ingredients.slice());
  }

  upgradeIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients = this.ingredients.map((ingredient, i) => {
      if (i === index) {
        return newIngredient;
      }
      return ingredient;
    });
    this.ingredients$.next(this.ingredients.slice());
    this.toastService.success('Ingredient updated successfully!');
  }

  deleteIngredient(index) {
    this.ingredients = this.ingredients.filter((ingredient, i) => i !== index);
    this.ingredients$.next(this.ingredients.slice());
    this.toastService.danger('Ingredient deleted successfully!');
  }
}
