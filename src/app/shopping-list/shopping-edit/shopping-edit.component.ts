import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ToastService } from 'src/app/toast/toast-service';
import { ShoppingListService } from '../service/shopping-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm: FormGroup;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(
    private toastService: ToastService,
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.shoppingForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [1, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
    });
  }

  onSubmit(shoppingForm) {
    if (shoppingForm.valid) {
      const { name, amount } = this.shoppingForm.value;
      shoppingForm.reset();
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }
  }

  resetForm() {
    this.shoppingForm.reset();
    this.toastService.warning('Form cleared successfully!');
  }
}
