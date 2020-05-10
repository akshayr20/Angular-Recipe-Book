import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from '../service/shopping-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  shoppingForm: FormGroup;
  editMode = false;
  editModeIndex: number;

  constructor(
    private toastService: ToastService,
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder
  ) {
    this.shoppingForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [1, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
    });
  }

  ngOnInit() {
    this.shoppingListService.startedEditing$.subscribe((index) => {
      this.editMode = true;
      this.editModeIndex = index;
      const { name, amount } = this.shoppingListService.getIngredient(index);
      this.shoppingForm.patchValue({ name, amount });
    });
  }

  onSubmit(shoppingForm) {
    if (shoppingForm.valid) {
      const { name, amount } = this.shoppingForm.value;
      if (this.editMode) {
        this.shoppingListService.upgradeIngredient(
          this.editModeIndex,
          new Ingredient(name, amount)
        );
      } else {
        this.shoppingListService.addIngredient(new Ingredient(name, amount));
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.editModeIndex = null;
  }

  clearForm() {
    this.resetForm();
    this.toastService.warning('Form cleared successfully!');
  }

  deleteIngredient() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editModeIndex);
      this.resetForm();
    }
  }
}
