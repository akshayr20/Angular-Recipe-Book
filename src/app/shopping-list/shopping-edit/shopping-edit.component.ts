import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ToastService } from 'src/app/toast/toast-service';
import { ShoppingListService } from '../service/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @ViewChild('f', { static: true }) shoppingForm: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(
    private toastService: ToastService,
    private shoppingListService: ShoppingListService
  ) {}

  onSubmit() {
    if (this.shoppingForm.valid) {
      const { name, amount } = this.shoppingForm.value;
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
      this.shoppingForm.reset();
    }
  }

  resetForm() {
    this.shoppingForm.reset();
    this.toastService.warning('Form cleared successfully!');
  }
}
