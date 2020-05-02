import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ToastService } from 'src/app/toast/toast-service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ];

  private ingredients$ = new BehaviorSubject<Array<Ingredient>>(this.ingredients);

  constructor(private toastService: ToastService) {}

  getIngredient() {
    return this.ingredients$;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients = [...this.ingredients, ingredient];
    this.ingredients$.next(this.ingredients);
    this.toastService.success('Ingredient added successfully!');
  }
}
