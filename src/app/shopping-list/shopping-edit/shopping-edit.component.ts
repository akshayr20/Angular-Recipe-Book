import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ToastService } from 'src/app/toast/toast-service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @ViewChild('f', { static: true }) shoppingForm: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private toastService: ToastService) {}

  onSubmit() {
    if (this.shoppingForm.valid) {
      const { name, amount } = this.shoppingForm.value;
      this.ingredientAdded.emit(new Ingredient(name, amount));
      this.shoppingForm.reset();
      this.toastService.success('Ingredient added successfully!');
    }
  }

  resetForm() {
    this.shoppingForm.reset();
    this.toastService.warning('Form cleared successfully!');
  }
}
